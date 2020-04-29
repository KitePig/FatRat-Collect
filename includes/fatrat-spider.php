<?php
/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * 如果你觉得这个项目还不错.可以去Github上 Star 关注我.
 * 您可使用胖鼠采集自行二次开发满足您的个性化需求.
 * 请不要Copy, Rename. OR 修改源代码进行售卖获利.
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: FatRat
 * @CreateTime: 2018年12月30日 02:24
 */

use Nesk\Rialto\Data\JsFunction;
use QL\Ext\AbsoluteUrl;
use QL\Ext\Chrome;
use QL\Ext\DownloadImage;
use QL\QueryList;

if (!class_exists('AbsoluteUrl')) {
    require_once(plugin_dir_path(__DIR__) . 'src/Service/AbsoluteUrl.php');
}
if (!class_exists('DownloadImage')) {
    require_once(plugin_dir_path(__DIR__) . 'src/Service/DownloadImage.php');
}

class FRC_Spider
{
    protected $wpdb;
    protected $table_post;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'frc_post';
    }


    /**
     * 懒人采集
     * @return array
     */
    public function grab_custom_page(){
        $urls = frc_sanitize_text('collect_urls');
        $name = frc_sanitize_text('collect_name');

        if (empty($urls)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '链接不能为空'];
        }
        if (empty($name) || !in_array($name, ['wx', 'js', 'zh'])){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '链接不能为空'];
        }

        switch ($name){
            case 'wx':
                $name = '微信';
                break;
            case 'js':
                $name = '简书';
                break;
            case 'zh':
                $name = '知乎';
                break;
        }

        $options = new FRC_Options();
        $option = $options->lazy_person($name);

        return $this->response(FRC_Api_Error::SUCCESS, $this->single_spider($option, $urls), $name .'数据采集完成');
    }

    /**
     * 抓取详情
     * @return array
     */
    public function grab_details_page(){
        $urls       = !empty($_REQUEST['collect_details_urls']) ? sanitize_text_field($_REQUEST['collect_details_urls']) : '' ;
        $option_id  = !empty($_REQUEST['collect_details_relus']) ? sanitize_text_field($_REQUEST['collect_details_relus']) : 0 ;
        if (empty($urls)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '链接不能为空'];
        }
        if (empty($option_id)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请选择一个有效的详情配置'];
        }
        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
        }

        return $this->response(FRC_Api_Error::SUCCESS, $this->single_spider($option, $urls));
    }


    /**
     * 列表采集
     * @return array
     */
    public function grab_list_page()
    {
        $option_id = !empty($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']) : 0;

        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
        }

        $config = new stdClass();
        $config->url = $option['collect_list_url'];
        $config->range = $option['collect_list_range'];
        $config->rules = $this->rulesFormat($option['collect_list_rules']);
        $config->rendering = $option['collect_rendering'];
        $config->remove_head = $option['collect_remove_head'];
        $config->image_download = $option['collect_image_download'];
        $config->image_path = $option['collect_image_path'];
        $config->src = $option['collect_image_attribute'];

        $articles = $this->_QlObject($config)->absoluteUrl($config)->queryData(function($item) use ($option, $config) {
            if ($this->checkPostLink($item['link'])){
                return $this->format($item, '已滤重');
            }

            $config->url = $item['link'];
            $config->range = $option['collect_content_range'];
            $config->rules = $this->rulesFormat($option['collect_content_rules']);
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->special($config)->queryData();
            $detail = array_merge($item, current($detail));
            return $this->insert_article($detail, $option);
        });

        return $this->response(FRC_Api_Error::SUCCESS, $articles, '列表采集完成');
    }


    /**
     * 历史(分页)页面
     */
    public function grab_history_page()
    {

        $history_page_number    = !empty($_REQUEST['collect_history_page_number']) ? sanitize_text_field($_REQUEST['collect_history_page_number']) : '';
        $option_id              = !empty($_REQUEST['collect_history_relus_id']) ? sanitize_text_field($_REQUEST['collect_history_relus_id']) : null;
        if ($option_id === null){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请选择一个配置'];
        }
        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请选择一个有效的配置, 配置异常'];
        }

        if (empty($history_page_number)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请填写页码/翻页'];
        }

        if (empty($option['collect_list_url_paging'])){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请配置分页采集地址'];
        }

        if ($option['collect_rendering'] == 1){

            if (!strstr($option['collect_list_url_paging'], '{page}')){
                return ['code' => FRC_Api_Error::FAIL, 'msg' => 'URL不正确。未包含 {page} 关键字 or URL不能为空'];
            }

            $page_count = explode('-', $history_page_number);
            $page_count = count($page_count) == 2 ? range($page_count[0], $page_count[1]) : [(int)$page_count];

            if (!get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP) && count($page_count) > 2){
                return ['code' => FRC_Api_Error::FAIL, 'msg' => FRC_Validation::FRC_HINT_F];
            }

            $articles = collect($page_count)->map(function($digital) use ($option){
                $config = new stdClass();
                $config->url = $option['collect_list_url_paging'];
                $config->range = $option['collect_list_range'];
                $config->rules = $this->rulesFormat($option['collect_list_rules']);
                $config->rendering = $option['collect_rendering'];
                $config->remove_head = $option['collect_remove_head'];
                $config->image_download = $option['collect_image_download'];
                $config->image_path = $option['collect_image_path'];
                $config->src = $option['collect_image_attribute'];
                $config->pn = $digital;

                $result['url'] = str_replace('{page}', $config->pn, $config->url);
                $article = $this->_QlPagingObject($config)->absoluteUrl($config)->queryData(function($item) use ($option, $config) {
                    if ($this->checkPostLink($item['link'])){
                        return $this->format($item, '已滤重');
                    }

                    $config->url = $item['link'];
                    $config->range = $option['collect_content_range'];
                    $config->rules = $this->rulesFormat($option['collect_content_rules']);
                    $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->special($config)->queryData();
                    $detail = array_merge($item, current($detail));
                    return $this->insert_article($detail, $option);
                });
                $result['data'] = $article;
                return $result;
            });
        } else {
            $config = new stdClass();
            $config->url = $option['collect_list_url'];
            $config->range = $option['collect_list_range'];
            $config->rules = $this->rulesFormat($option['collect_list_rules']);
            $config->rendering = $option['collect_rendering'];
            $config->remove_head = $option['collect_remove_head'];
            $config->image_download = $option['collect_image_download'];
            $config->image_path = $option['collect_image_path'];
            $config->src = $option['collect_image_attribute'];
            $config->pn = $history_page_number;
            $article = $this->_QlPagingObject($config)->absoluteUrl($config)->queryData(function($item) use ($option, $config) {
                if ($this->checkPostLink($item['link'])){
                    return $this->format($item, '已滤重');
                }

                $config->url = $item['link'];
                $config->range = $option['collect_content_range'];
                $config->rules = $this->rulesFormat($option['collect_content_rules']);
                $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->queryData();
                $detail = array_merge($item, current($detail));
                return $this->insert_article($detail, $option);
            });
            $articles['rolling'] = $history_page_number;
            $articles['data'] = $article;
        }

        return $this->response(FRC_Api_Error::SUCCESS, $articles, '分页采集完成');
    }


    /**
     * @return array
     */
    public function grab_all_page()
    {
        $option_id = !empty($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']) : 0;

        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
        }

        $config = new stdClass();
        $config->url = $option['collect_list_url'];
        $config->range = $option['collect_list_range'];
        //$config->rules = $this->rulesFormat($option['collect_list_rules']);
        $config->rendering = $option['collect_rendering'];
        $config->remove_head = $option['collect_remove_head'];
        $config->image_download = $option['collect_image_download'];
        $config->image_path = $option['collect_image_path'];
        $config->src = $option['collect_image_attribute'];
        $config->pure = true;

        $articles = $this->_QlObject($config)->absoluteUrl($config)->find('a')->attrs('href')->filter(function ($item) use ($config) {
            if ($item === null){
                return false;
            }

            $pattern = '/'.str_replace('/', '\/', $config->range).'/';
            if (preg_match($pattern, $item, $matches)){
                return true;
            }

            return false;
        });

        $articles = $articles->map(function ($link) use ($config, $option) {
            $item['link'] = $link;
            if ($this->checkPostLink($item['link'])){
                return $this->format($item, '已滤重');
            }
            $config->url = $item['link'];
            $config->range = $option['collect_content_range'];
            $config->rules = $this->rulesFormat($option['collect_content_rules']);
            $config->pure = false;
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->queryData();
            $detail = array_merge($item, current($detail));
            return $this->insert_article($detail, $option);
        });

        return $this->response(FRC_Api_Error::SUCCESS, $articles, '全站采集完成');
    }


    /**
     * @return array
     */
    public function grab_debug(){
        $config = new stdClass();
        $config->url = frc_sanitize_text('debug_url');
        $config->range = frc_sanitize_text('debug_range');
        $config->rules = $this->rulesFormat(frc_sanitize_text('debug_rules'));
        $config->rendering = frc_sanitize_text('debug_rendering', 1);
        $config->remove_head = frc_sanitize_text('debug_remove_head', 1);

        if (empty($config->url)){
            return $this->response(FRC_Api_Error::SUCCESS, null, '请输入参数.');
        }

        $articles = $this->_QlObject($config)->absoluteUrl($config)->queryData();

        return $this->response(FRC_Api_Error::SUCCESS, $articles, '调试完成, 请在F12中查看');
    }


    /**
     * @param $option
     * @param $urls
     * @return array|bool
     */
    protected function single_spider($option, $urls)
    {
        if ($option['collect_type'] != 'single'){
            return ['message' => '任务类型错误', 'data' => $option];
        }

        $config = new stdClass();
        $config->url = '';
        $config->range = $option['collect_content_range'];
        $config->rules = $this->rulesFormat($option['collect_content_rules']);
        $config->rendering = $option['collect_rendering'];
        $config->remove_head = $option['collect_remove_head'];
        $config->image_download = $option['collect_image_download'];
        $config->image_path = $option['collect_image_path'];
        $config->src = $option['collect_image_attribute'];

        $article = collect(explode(' ', $urls))->map(function($url) use ($config, $option) {
            $config->url = $url;
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->special($config)->queryData();
            $detail = array_merge(['link' => $url], current($detail));
            return $this->insert_article($detail, $option);
        });


        return ['message' => '处理完成', 'data' => $article];
    }


    /**
     * @param $text
     * @param $option
     * @return mixed
     */
    private function text_keyword_replace($text, $option)
    {
        if (!$text || !$option) {
            return $text;
        }
        $keywords_array = explode(" ", trim($option['collect_keywords_replace_rule']));
        collect($keywords_array)->map(function ($keywords) use (&$text) {
            list($string, $replace) = explode('=', $keywords);
            $text = str_replace($string, $replace, $text);
        });

        return $text;
    }


    /**
     * 定时爬虫
     * @param $option
     * @return array
     */
    public function timing_spider($option)
    {
        if (!in_array($option['collect_type'], ['list'])){
            return ['message' => '任务类型不支持.', 'data' => $option];
        }

        $config = new stdClass();
        $config->url = $option['collect_list_url'];
        $config->range = $option['collect_list_range'];
        $config->rules = $this->rulesFormat($option['collect_list_rules']);
        $config->rendering = $option['collect_rendering'];
        $config->remove_head = $option['collect_remove_head'];
        $config->src = $option['collect_image_attribute'];

        // 采集列表
        $articles = $this->_QlObject($config)->absoluteUrl($config)->queryData(function($item) use ($option, $config) {
            if ($this->checkPostLink($item['link'])){
                return $this->format($item, '已滤重');
            }

            // 采集详情
            $config->url = $item['link'];
            $config->range = $option['collect_content_range'];
            $config->rules = $this->rulesFormat($option['collect_content_rules']);
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->queryData();
            $detail = array_merge($item, current($detail));

            return $this->insert_article($detail, $option);
        });

        return ['message' => '处理完成', 'data' => $articles];
    }


    /**
     * @param $option
     * @return QueryList
     */
    public function _QlObject($option)
    {
        $config = new \stdClass;
        $config->url = $option->url;
        $config->range = $option->range;
        $config->rules = $option->rules;
        $config->rendering = $option->rendering;
        $config->remove_head = $option->remove_head;
        $config->pure = isset($option->pure) && $option->pure === true ? true : false;

        $ql = QueryList::getInstance();
        if (!$config->pure) {
            $ql->rules($config->rules)->range($config->range);
        }
        $ql->use(AbsoluteUrl::class);
        $ql->use(DownloadImage::class);
        $ql->bind('special', function ($config){
            if (strstr($config->url, 'www.jianshu.com')) {
                $this->find('.image-container-fill')->remove();
            }
            /*
            if (strstr($config->url, 'mp.weixin.qq.com')) {
                $this->find('.video_iframe')->map(function($iframe) use ($config){
                    $iframeSrc = $iframe->attr($config->src);
                    if (!$iframeSrc){ return ; }
                    $iframeSrc = preg_replace('/(width|height)=([^&]*)/i', '', $iframeSrc);
                    $iframe->attr('src', str_replace('&&', '&', $iframeSrc));

                    return $iframe;
                });
            }*/
            return $this;
        });

        if ($config->rendering == 1) {
            $ql->get($config->url);
        } elseif ($config->rendering == 2) {
            $ql->use(Chrome::class);
            $options = ['args' => ['--no-sandbox', '--disable-setuid-sandbox']];
            $ql->chrome($config->url, $options);
        }
        $ql->encoding('UTF-8');

        if ($config->remove_head == 2) {
            $ql->removeHead();
        }

        return $ql;

    }


    /**
     * @param $option
     * @return QueryList
     */
    public function _QlPagingObject($option)
    {
        $config = new \stdClass;
        $config->url = $option->url;
        $config->range = $option->range;
        $config->rules = $option->rules;
        $config->rendering = $option->rendering;
        $config->remove_head = $option->remove_head;
        $config->pn = $option->pn;

        $ql = QueryList::getInstance()->rules($config->rules)->range($config->range);
        $ql->use(AbsoluteUrl::class);
        $ql->use(DownloadImage::class);

        if ($config->rendering == 1) {
            $ql->get(str_replace('{page}', $config->pn, $config->url));
        } elseif ($config->rendering == 2) {
            $ql->use(Chrome::class);
            $options = ['args' => ['--no-sandbox', '--disable-setuid-sandbox'], 'timeout' => 3000];
            $ql->chrome(function ($page, $browser) use ($config) {
                $page->goto($config->url);

                for ($i = 1; $i <= $config->pn; $i++) {
                    // 翻页
                    $page->evaluate(JsFunction::createWithBody("return Promise.resolve(window.scrollTo(0, i*768));")
                        ->scope(['i' => $i, 'height' => 768]));
                    $page->waitFor(500); // 翻页后延迟0.5秒;
                }

                $html = $page->content();
                $browser->close();
                return $html;
            }, $options);
        }
        $ql->encoding('UTF-8');

        if ($config->remove_head == 2) {
            $ql->removeHead();
        }

        return $ql;

    }


    /**
     * @param $article
     * @param $option
     * @return mixed
     */
    protected function insert_article($article, $option){
        if (empty($article) | empty($article['title']) | empty($article['content'])) {
            return $this->format($article, '内容错误');
        }

        if (!empty($option['collect_custom_content'])){
            $stdClass = json_decode($option['collect_custom_content'], true);
            $stdClass['head'] = str_replace("\\", '', htmlspecialchars_decode($stdClass['head'], ENT_QUOTES));
            $stdClass['foot'] = str_replace("\\", '', htmlspecialchars_decode($stdClass['foot'], ENT_QUOTES));
            $stdClass = str_replace(['{link}', '{title}', '{title+link}', '{author}', '{name}'], [$article['link'], $article['title'], '<a href='.$article['link'].' target="_blank">'.$article['title'].'</a>', (isset($article['author']) ? $article['author'] : ''), (isset($article['name']) ? $article['name'] : '')], $stdClass);
            if (!empty($stdClass['head'])) $article['content'] = $stdClass['head'] . $article['content'] ;
            if (!empty($stdClass['foot'])) $article['content'] = $article['content'] . $stdClass['foot'] ;
        }

        $data['status'] = 2;
        $data['option_id'] = $option['id'];
        $data['cover'] = isset($article['image']) ? $article['image'] : '';
        $data['link'] = $article['link'];
        $data['title'] = mb_substr($this->text_keyword_replace($article['title'], $option), 0, 120);
        $data['content'] = $this->text_keyword_replace($article['content'], $option);
        $data['message'] = 'Success.';
        $data['created_at'] = current_time('mysql');
        $data['updated_at'] = current_time('mysql');

        if ($this->wpdb->insert($this->table_post, $data)){
            return $this->format($article, '采集完成');
        }

        return $this->format($article, '入库失败');
    }


    /**
     * @param $link
     * @return array|null|object
     */
    protected function checkPostLink($link){
        return $this->wpdb->get_results(
            "select `link` from $this->table_post where `link` = '{$link}'",
            ARRAY_A
        );
    }


    /**
     * @param $rules
     * @return array
     */
    private function rulesFormat($rules)
    {
        if (empty($rules)){
            return '';
        }
        $resRule = [];
        collect( explode(")(", $rules) )->map(function ($item) use (&$resRule){
            list($key, $value) = explode("%", $item);
            list($label, $rule, $filter) = explode("|", $value);
            $label == 'null' && $label = null;
            $rule == 'null' && $rule = null;
            $filter == 'null' && $filter = null;
            $resRule[$key] = [$label, $rule, $filter];
        });

        return $resRule;
    }

    public function response($error, $data = [], $msg = 'ok'){
        $frc_validation_sponsorship = get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP);
        if ($frc_validation_sponsorship === 'sponsorship'){
            return [
                'code' => $error,
                '胖鼠' => FRC_Validation::FRC_HINT_D,
                'msg' => $msg,
                'data' => $data
            ];
        }

        if (time() - get_option(FRC_Validation::FRC_INSERT_TIME) < 86400){
            return [
                'code' => $error,
                'msg' => $msg,
                'data' => $data
            ];
        }

        $frc_validation_debug_count = get_option(FRC_Validation::FRC_VALIDATION_DEBUG_COUNT, '0');
        if ($frc_validation_debug_count === '0'){
            return array_merge(FRC_Validation::FRC_DEBUG_INFO_PROMPT, [
                'code' => $error,
                'msg' => $msg
            ]);
        }

        $remaining = $frc_validation_debug_count-1;
        update_option(FRC_Validation::FRC_VALIDATION_DEBUG_COUNT, $remaining);
        return [
            'code' => $error,
            '胖鼠' => sprintf(FRC_Validation::FRC_HINT_E, $remaining),
            'msg' => $msg,
            'data' => $data
        ];
    }


    /**
     * @param $article
     * @param string $msg
     * @return mixed
     */
    protected function format($article, $msg = ''){
        $article['message'] = $msg;
        $article['content'] = !empty($article['content']) ? mb_substr($article['content'], 0, 100).'.....' : '';

        return $article;
    }
}


function frc_spider()
{
    if (!fatrat_mysql_upgrade()){
        return ;
    }
    array_rand(range(1,5)) == 0 && (new FRC_Validation())->notice();

    $frc_options = new FRC_Options();
    $options = collect($frc_options->options())->groupBy('collect_type');
    // TODO:首页拆分。优化速度。
    ?>
    <div class="wrap">
        <h1 class="frc-plugin-name">
            <?php esc_html_e('胖鼠采集', 'Fat Rat Collect') ?>
            <img width="80" class="pull-right" src="<?php frc_image('fat-rat-256x256.png') ?>">
        </h1>
        <p></p>
        <span>
        <?php
        if (array_rand([1, 2], 1) === 1) {
            esc_html_e('胖鼠采集, WordPress最好用的开源采集小工具');
        } else {
            esc_html_e('胖鼠采集, WordPress优秀开源采集插件');
        }
        ?></span>
        <p></p>
        <div><p style="color: #0000cc"><?php echo ((new FRC_Validation())->announcement('notice-home')); ?></p></div>
        <!-- bootstrap tabs -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#single_wx" data-toggle="tab">微信爬虫</a></li>
            <li><a href="#single_js" data-toggle="tab">简书爬虫</a></li>
            <li><a href="#single_zh" data-toggle="tab">知乎采集</a></li>
            <li><a href="#list" data-toggle="tab">列表采集</a></li>
            <li><a href="#historypage" data-toggle="tab">列表分页采集</a></li>
            <li><a href="#details" data-toggle="tab">详情采集</a></li>
            <?php if (get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT)){ ?>
            <li><a href="#all" data-toggle="tab">全站采集</a></li>
            <?php } ?>
            <li><a href="#todolist" data-toggle="tab">Todo & 胖鼠</a></li>
        </ul>
        <div class="tab-content spider-tab-content">
            <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
            <!--微信爬虫-->
            <div class="tab-pane fade in active" id="single_wx">
                <table class="form-table">
                    <tr>
                        <th>微信文章地址</th>
                        <td>
                            <textarea name="collect_wx_urls" cols="80" rows="14" placeholder="多篇文章使用回车区分,一行一个. 每次不要太多, 要对自己的服务器心里要有数"></textarea>
                            <p>Tips: 如采集遇到 内容过滤需求 如删除: 第一张图片 or 第二个p标签 or 倒数第三张图片 等需求 请使用<a href="http://www.fatrat.cn/fatrat/92.html" target="_blank">内容过滤</a>功能</p>
                            <p>其他好用的小功能, 以后慢慢加, 欢迎你的合理需求!</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <!-- bootstrap进度条 -->
                            <div class="progress progress-striped active">
                                <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success wx-spider-progress-bar" role="progressbar"
                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                     style="width: 0%;">
                                    <span class="sr-only">90% 完成（成功）</span>
                                </div>
                            </div>
                            <input class="button button-primary wx-spider-run-button" type="button" value="运行"/>
                        </th>
                    </tr>
                </table>
            </div>
            <!--简书爬虫-->
            <div class="tab-pane fade" id="single_js">
                <table class="form-table">
                    <tr>
                        <th>简书文章地址</th>
                        <td>
                            <textarea name="collect_js_urls" cols="80" rows="14" placeholder="多篇文章使用回车区分, 一行一个"></textarea>
                            <p>Tips: 简书默认规则过滤了a标签, 你们可以在配置中心看到</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <!-- bootstrap进度条 -->
                            <div class="progress progress-striped active">
                                <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success js-spider-progress-bar" role="progressbar"
                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                     style="width: 0%;">
                                    <span class="sr-only">90% 完成（成功）</span>
                                </div>
                            </div>
                            <input class="button button-primary js-spider-run-button" type="button" value="运行"/>
                        </th>
                    </tr>
                </table>
            </div>
            <!--知乎爬虫-->
            <div class="tab-pane fade" id="single_zh">
                <table class="form-table">
                    <tr>
                        <th>知乎(问答)地址</th>
                        <td>
                            <textarea name="collect_zh_urls" cols="80" rows="14" placeholder="多篇文章使用回车区分, 一行一个"></textarea>
                            <p>Tips: 此规则是采集知乎问答页面, 不是知乎文章详情页</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <!-- bootstrap进度条 -->
                            <div class="progress progress-striped active">
                                <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success zh-spider-progress-bar" role="progressbar"
                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                     style="width: 0%;">
                                    <span class="sr-only">90% 完成（成功）</span>
                                </div>
                            </div>
                            <input class="button button-primary zh-spider-run-button" type="button" value="运行"/>
                        </th>
                    </tr>
                </table>
            </div>
            <!--列表爬虫-->
            <div class="tab-pane fade spider-tab-content" id="list">
                <?php
                if (!isset($options['list'])) {
                    echo '<p></p>';
                    echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮虾: 目前没有任何一个列表配置。皮皮虾我们走 </a></h4>";
                } else {
                ?>
                <ul class="list-group">
                    <p></p>
                    <a disabled class="list-group-item active">
                        <h5 class="list-group-item-heading">
                            列表爬虫(点击运行)
                        </h5>
                    </a>
                    <p></p>
                    <?php
                    foreach ($options['list'] as $option) {
                        echo "<a href='javascript:;' data-id='{$option['id']}' class='list-spider-run-button list-group-item'>{$option['collect_name']}</a>";
                    }
                    ?>
                    <!-- bootstrap进度条 -->
                    <p></p>
                    <div class="progress progress-striped active">
                        <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success list-spider-progress-bar" role="progressbar"
                             aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                             style="width: 0%;">
                            <span class="sr-only">90% 完成（成功）</span>
                        </div>
                    </div>
                </ul>
                <?php } ?>
            </div>
            <!--分页爬虫-->
            <div class="tab-pane fade" id="historypage">
                <p class="p-tips-style"><?php esc_html_e(FRC_Api_Error::FRC_TIPS[array_rand(FRC_Api_Error::FRC_TIPS, 1)]); ?></p>
                <?php
                if (!isset($options['list'])) {
                    echo '<p></p>';
                    echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的毛毛虫: 目前没有任何一个分页配置。毛毛虫我们走 </a></h4>";
                } else {
                ?>
                <table class="form-table">
                    <tr>
                        <th>选择页面的规则配置</th>
                        <td>
                            <?php
                            $option_list = $options['list'];
                            $string = '<select name="collect_history_relus"><option value="0">请选择一个配置</option>';
                            foreach ($option_list as $option) {
                                $string .= '<option value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                            }
                            $string .= '</select>';

                            echo $string;
                            ?>
                            <p>配置创建在 新建配置->配置类型=列表</p>
                        </td>
                    </tr>
                    <tr>
                        <th>采集页码/翻页</th>
                        <td>
                            <input name="collect_history_page_number" size="82" placeholder="2-10" />
                            <p>页码用 - 隔开 例: 2-10 采集2->10页</p>
                            <?php if (get_option(FRC_Validation::FRC_VALIDATION_RENDERING)){ ?>
                                <p>动态渲染页面是向下翻页几次 例: 3 向下翻页三次, 翻页高度768px</p>
                            <?php } ?>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <!-- bootstrap进度条 -->
                            <div class="progress progress-striped active">
                                <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success history-page-spider-progress-bar" role="progressbar"
                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                     style="width: 0%;">
                                    <span class="sr-only">90% 完成（成功）</span>
                                </div>
                            </div>
                            <input class="button button-primary history-page-spider-run-button" type="button" value="运行"/>
                        </th>
                    </tr>
                </table>
                <?php } ?>
            </div>
            <!--详情爬虫-->
            <div class="tab-pane fade" id="details">
                <?php
                if (!isset($options['single'])) {
                    echo '<p></p>';
                    echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮: 目前没有任何一个详情配置。胖鼠我们走 </a></h4>";
                } else {
                ?>
                <table class="form-table">
                    <tr>
                        <th>详情地址</th>
                        <td>
                            <textarea name="collect_details_urls" cols="80" rows="14" placeholder="输入目标url, 这里使用你配置的详情配置, 胖鼠采集 WordPress优秀开源采集插件."></textarea>
                            <p></p>
                        </td>
                    </tr>
                    <tr>
                        <th>详情配套配置</th>
                        <td>
                            <?php
                            $string = '<select name="collect_details_relus"><option value="0">请选择</option>';
                            foreach ($options['single'] as $option) {
                                if (in_array($option['collect_name'], FRC_Api_Error::BUTTON_DISABLED)){
                                    $string .= '<option disabled value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                                } else {
                                    $string .= '<option value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                                }
                            }
                            $string .= '</select>';

                            echo $string;
                            ?>
                            <p>配置创建在 新建配置->配置类型=详情</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <!-- bootstrap进度条 -->
                            <div class="progress progress-striped active">
                                <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success details-spider-progress-bar" role="progressbar"
                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                     style="width: 0%;">
                                    <span class="sr-only">90% 完成（成功）</span>
                                </div>
                            </div>
                            <input class="button button-primary details-spider-run-button" type="button" value="运行"/>
                        </th>
                    </tr>
                </table>
                <?php } ?>
            </div>
            <!--全站采集-->
            <div class="tab-pane fade spider-tab-content" id="all">
                <?php
                if (!isset($options['all'])) {
                    echo '<p></p>';
                    echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的胖球: 目前没有任何一个全站采集配置。兔子我们走 </a></h4>";
                } else {
                    ?>
                    <ul class="list-group">
                        <p></p>
                        <a disabled class="list-group-item active">
                            <h5 class="list-group-item-heading">
                                全站采集
                            </h5>
                        </a>
                        <p></p>
                        <?php
                        foreach ($options['all'] as $option) {
                            echo "<a href='javascript:;' data-id='{$option['id']}' class='all-spider-run-button list-group-item'>{$option['collect_name']}</a>";
                        }
                        ?>
                        <!-- bootstrap进度条 -->
                        <p></p>
                        <div class="progress progress-striped active">
                            <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success all-spider-progress-bar" role="progressbar"
                                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                 style="width: 0%;">
                                <span class="sr-only">90% 完成（成功）</span>
                            </div>
                        </div>
                    </ul>
                <?php } ?>
            </div>
            <!--胖鼠 && Todo-->
            <div class="tab-pane fade" id="todolist">
                <p></p>
                <p class="p-tips-style"><?php esc_html_e(FRC_Api_Error::FRC_TIPS[array_rand(FRC_Api_Error::FRC_TIPS, 1)]); ?></p>
                <div class="todo-and-author-class">
                    <div align="right" style="margin-top: 0px; float: right;">
                        <img width="400" src="<?php frc_image('fat-rat-appreciates.jpeg'); ?>" />
                    </div>
                    <h4>胖鼠:</h4>
                    <ul>
                        <?php if (get_option(FRC_Validation::FRC_INSERT_TIME) != '') { ?>
                            <li style="color: #9b51e0">鼠友, 我们第一次相遇是在 <?php esc_html_e(date('Y年m月d日 H:i', get_option(FRC_Validation::FRC_INSERT_TIME))) ?> 在此留影, 以示纪念. </li>
                        <?php } ?>
                        <li><a href="https://www.fatrat.cn" target="_blank">胖鼠采集</a>是github开源作品, 有问题欢迎大家在<a href="https://github.com/fbtopcn/fatratcollect" target="_blank">github</a>的issues提问.</li>
                        <li>胖鼠支持有能力的小伙伴自行2次开发胖鼠采集开源使用, 但会鄙视有些小伙伴直接Copy && Rename</a></li>
                        <li>胖鼠采集, 最重要的应该是新建一个规则并上手使用, 我觉得通过视频教程、文字教程的学习后, 20分钟就能就能搞定.</li>
                        <li>新建采集规则, 有默认的配置. 可一键导入, 无需等待, 即刻使用. 鼠友照葫芦画瓢即可.</li>
                        <li>欢迎鼠友给胖鼠采集<a href="https://www.fatrat.cn/bounty" target="_blank"> 赞赏</a>, 同时也可以给胖鼠采集插件<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">五星好评</a>, 这也算对胖鼠采集无声的支持.</li>
                        <li>胖鼠采集: 1群:454049736 2群:846069514 </li>
                        <li>胖鼠采集为开源学习交流, 严禁有任何违反国家法律的行为.</li>
                        <li>胖鼠采集 20181230</li>
                        <li><img src="<?php frc_image('fat-rat-128x128.png'); ?>" /></li>
                    </ul>
                    <hr />
                    <?php require_once(plugin_dir_path(__DIR__) . 'views/todo.html'); ?>
                </div>
            </div>
        </div>
    </div>
    <?php
}


function fatrat_mysql_upgrade(){
    $option = get_option('frc_mysql_upgrade');
    if ($option == 'upgrade complete'){
        return true;
    }
    $last_id = get_option('frc_mysql_upgrade_progress', 0);
    ?>
        <h1>鼠友你好, 欢迎来到胖鼠采集2.0</h1>
        <h1>此次大版本更新, 耗时无数夜晚, 重写了胖鼠采集底层</h1>
        <h1>接下来请进行数据库迁移升级</h1>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php echo admin_url('admin.php?page=frc-spider'); ?>">

        <hr />

        <?php
            if ($option == '1'){
                echo sprintf('<button class="frc_mysql_upgrade btn btn-danger btn-lg" data-value="1">(①)点我迁移升级采集配置</button>');
            } elseif ($option == '2') {
                echo sprintf('<button class="frc_mysql_upgrade btn btn-danger btn-lg" data-value="2">(②)点我迁移升级采集数据表</button>');
                echo sprintf('<h3>大数据量用户会进行分段数据迁移,每次迁移500条,目前数据库迁移进度%s</h3>', $last_id);
            } else {
                update_option('frc_mysql_upgrade', 'upgrade complete');
                echo '<h1>升级已结束</h1>';
            }
        ?>

        <h3>过程可能过长, 请耐心等待.</h3>
    <?php

    return false;
}