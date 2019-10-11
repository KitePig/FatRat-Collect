<?php
/**
 * Copyright (c) 2018 Fat Rat Collect . All rights reserved.
 * 胖鼠采集要做wordpress最好用的采集器.
 * 如果你觉得我写的还不错.可以去Github上 Star
 * 现在架子已经有了.欢迎大牛加入开发.一起丰富胖鼠的功能
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: FatRat
 * @CreateTime: 2018年12月30日 02:24
 */

use QL\QueryList;
use GuzzleHttp\Exception\RequestException;

class FRC_Spider
{

    protected $wpdb;
    protected $table_post;
    protected $table_options;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'fr_post';
        $this->table_options = $wpdb->prefix . 'fr_options';
    }

    /**
     * 微信
     * @return array
     */
    public function grab_wx_page(){
        $urls = !empty($_REQUEST['collect_wx_urls']) ? sanitize_text_field($_REQUEST['collect_wx_urls']) : '' ;
        if (empty($urls)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '链接不能为空'];
        }
        $option = $this->wpdb->get_row("SELECT * FROM {$this->table_options} WHERE `collect_name` = '微信'", ARRAY_A );
        if (empty($option)){
            // 默认生成基础配置
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '微信', `collect_describe` = '胖鼠创建. 可修改为更适合你的微信采集规则. 不可删除..', `collect_type` = 'single', `collect_image_attribute` = 'data-src', `collect_content_range` = '#img-content',  `collect_content_rules` = 'title%#activity-name|text|null)(content%#js_content|html|null)(author%#js_author_name|text|null)(name%#js_name|text|null' ";
            $this->wpdb->query($sql);
            $option = $this->wpdb->get_row("SELECT * FROM {$this->table_options} WHERE `collect_name` = '微信'", ARRAY_A );
        }

        if ($this->run_spider_single_page($option, $urls)) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
        }

    }

    /**
     * 简书
     * @return array
     */
    public function grab_js_page(){
        $urls = !empty($_REQUEST['collect_js_urls']) ? sanitize_text_field($_REQUEST['collect_js_urls']) : '' ;
        if (empty($urls)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '链接不能为空'];
        }
        $option = $this->wpdb->get_row("SELECT * FROM {$this->table_options} WHERE `collect_name` = '简书'", ARRAY_A );
        if (empty($option)){
            // 默认生成基础配置
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '简书', `collect_describe` = '胖鼠创建. 可修改为更适合你的简书采集规则. 不可删除..', `collect_type` = 'single', `collect_image_attribute` = 'data-original-src', `collect_content_range` = 'body',  `collect_content_rules` = 'title%h1|text|null)(content%article|html|a)(author%span[class=name]|text|null' ";
            $this->wpdb->query($sql);
            $option = $this->wpdb->get_row("SELECT * FROM {$this->table_options} WHERE `collect_name` = '简书'", ARRAY_A );
        }

        if ($this->run_spider_single_page($option, $urls)) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
        }

    }


    /**
     * 抓取历史页面
     */
    public function grab_history_page()
    {

        $history_url            = !empty($_REQUEST['collect_history_url']) ? sanitize_text_field($_REQUEST['collect_history_url']) : '';
        $history_page_number    = !empty($_REQUEST['collect_history_page_number']) ? sanitize_text_field($_REQUEST['collect_history_page_number']) : '';
        $option_id              = !empty($_REQUEST['collect_history_relus_id']) ? sanitize_text_field($_REQUEST['collect_history_relus_id']) : '';

        if (!strstr($history_url, '{page}')){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'URL不正确。未包含 {page} 关键字 or URL不能为空'];
        }

        if (empty($history_page_number)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请填写要采集的页面'];
        }

        $page_count = explode(',', $history_page_number);
        if (count($page_count) < 0 || count($page_count) > 10){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '页码不建议超过10页'];
        }

        $option = $this->get_option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '请选择一个有效的配置, 配置异常'];
        }

        if (parse_url($history_url)['host'] != parse_url($option['collect_list_url'])['host']){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '你的规则配置肯定选错了。自己检查一下改改'];
        }

        collect($page_count)->map(function($digital) use ($history_url, $option){
            $option['collect_list_url'] = str_replace('{page}', $digital, $history_url);
            $this->run_spider_list_page($option);
        });


        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];

    }


    /**
     * 抓取列表页面
     * @return array
     */
    public function grab_list_page()
    {
        $option_id = !empty($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']) : 0;

        $option = $this->get_option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
        }

        if ($this->run_spider_list_page($option)) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
        }
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
        $option = $this->get_option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
        }

        if ($this->run_spider_single_page($option, $urls)) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
        }

    }

    /**
     * TODO 此函数抽空优化
     * @param $option
     * @return bool
     */
    public function run_spider_list_page($option)
    {
        // TODO 错误信息再优化
        if ($option['collect_type'] != 'list'){
            return false;
        }

        $last_sign_array = array_column($this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = {$option['id']} order by id desc",
            ARRAY_A
        ), 'sign');

        $articles = $this->_QueryList($option['collect_list_url'], $option['collect_remove_head'])
            ->range($option['collect_list_range'])
            ->encoding('UTF-8')
            ->rules( $this->rulesFormat($option['collect_list_rules']) )
            ->query(function($article) use ($option, $last_sign_array) {
                if (!empty($article['link'])) {
                    // 如果没有域名头自动拼接一下
                    if (!isset(parse_url($article['link'])['host'])){
                        $article['link'] = parse_url($option['collect_list_url'])['scheme'].'://'.parse_url($option['collect_list_url'])['host'].'/'.ltrim($article['link'], '/');
                    }
                    if (!in_array(md5($article['link']), $last_sign_array)){
                        try {
                            $ql = $this->_QueryList($article['link'], $option['collect_remove_head'])
                                ->range($option['collect_content_range'])
                                ->encoding('UTF-8')
                                ->rules( $this->rulesFormat($option['collect_content_rules']) )
                                ->queryData();
                        } catch (RequestException $e) {
                            return false;
                        }

                        $article = array_merge($article, current($ql));
                        $article = $this->matching_img($article, $option);
                        $article = $this->article_install($article, $option);

                        return $article;
                    }
                }
                return false;
            })
            ->getData();

        if ($articles->isEmpty()){
            return false;
        }

        $articles->map(function ($article) use ($option) {
                if (isset($article['install_state']) && $article['install_state'] == 1 && isset($article['download_img'])){
                $this->download_img($article['download_img'], $option);
            }
        });

        return true;
    }


    /**
     * TODO 此函数抽空优化
     * @param $option
     * @return bool
     */
    protected function run_spider_single_page($option, $urls)
    {
        // TODO 错误信息再优化
        if ($option['collect_type'] != 'single'){
            return false;
        }

        if ($option['collect_remove_head'] == '1'){
            $ql = QueryList::range($option['collect_content_range'])
                ->encoding('UTF-8')
                ->removeHead()
                ->rules($this->rulesFormat($option['collect_content_rules']));
        } else {
            $ql = QueryList::range($option['collect_content_range'])
                ->encoding('UTF-8')
                ->rules($this->rulesFormat($option['collect_content_rules']));
        }

        if (empty($ql)){
            return false;
        }
        collect(explode(' ', $urls))->map(function($url) use ($ql, $option) {
            $article = $ql->get($url)->queryData();
            $article = current($article);
            $article['link'] = $url;

            $article = $this->matching_img($article, $option);
            $article = $this->article_install($article, $option);
            if (isset($article['install_state']) && $article['install_state'] == 1 && $article['download_img']){
                $this->download_img($article['download_img'], $option);
            }
        });

        return true;
    }


    protected function _QueryList($url, $remove_head){
        if ( $remove_head == 1 ){
            return QueryList::get($url)->removeHead();
        }
        return QueryList::get($url);
    }


    protected function matching_img($article, $option)
    {
        if ($option['collect_image_download'] == 2){
            return $article;
        }

        $doc = phpQuery::newDocumentHTML($article['content']);
        $images = collect();
        foreach (pq($doc)->find('img') as $img) {
            $originImg = pq($img)->attr($option['collect_image_attribute']);
            if (!$originImg){
                break;
            }

            $suffix = 'jpg'; // 默认一个值
            if (in_array(strtolower(strrchr($originImg, '.')), ['.jpg', '.png', '.jpeg', '.gif', '.swf'])) {
                $suffix = strrchr($originImg, '.');
            } else {
                if (!isset(parse_url($originImg)['host'])){
                    $originImg = parse_url($option['collect_list_url'])['scheme'].'://'.parse_url($option['collect_list_url'])['host'].'/'.ltrim($originImg, '/');
                } elseif (substr($originImg, 0, 2) == '//'){
                    $url_prefix = isset(parse_url($option['collect_list_url'])['scheme']) ? parse_url($option['collect_list_url'])['scheme'] : 'http';
                    $originImg = $url_prefix.'://'.ltrim($originImg, '//');
                }
                switch (getimagesize($originImg)[2]) {
                    case IMAGETYPE_GIF:
                        $suffix = '.gif';
                        break;
                    case IMAGETYPE_JPEG:
                        $suffix = '.jpeg';
                        break;
                    case IMAGETYPE_PNG:
                        $suffix = '.png';
                        break;
                    case IMAGETYPE_SWF:
                        $suffix = '.swf';
                        break;
                }
            }

            $newImg = 'frc-' . md5($originImg) . $suffix;
            if ($option['collect_image_path'] == 2){
                $img_path = '/wp-content/uploads' . wp_upload_dir()['subdir'] . '/' . $newImg;
            } else {
                $img_path = wp_upload_dir()['url'] . '/' . $newImg;
            }

            pq($img)->removeAttr('*');
            pq($img)->attr('src', $img_path);
            pq($img)->attr('alt', $article['title']);
            pq($img)->attr('class', 'aligncenter');

            $images->put($newImg, $originImg);
        }

        // 微信视频特殊逻辑 - 祸害 要去掉
        if ($option['collect_name'] == '微信'){
            foreach (pq($doc)->find('.video_iframe') as $iframe) {
                $iframeSrc = pq($iframe)->attr($special_src);
                if (!$iframeSrc){ break; }
                $iframeSrc = preg_replace('/(width|height)=([^&]*)/i', '', $iframeSrc);
                pq($iframe)->attr('src', str_replace('&&', '&', $iframeSrc));
            }
        }


        // 简书图片特殊逻辑 - 祸害 要去掉
        if ($option['collect_name'] == '简书'){
            foreach (pq($doc)->find('.image-container-fill') as $div) {
                pq($div)->removeAttr('*');
            }
        }


        $article['content'] = $doc->html();
        $article['download_img'] = $images;

        return $article;
    }


    protected function article_install($article, $option)
    {
        if ($article != false && !empty($article['title']) && !empty($article['content'])) {
            $data['title'] = mb_substr($this->text_keyword_replace($article['title'], $option['id']), 0, 120);
            $article['content'] = $this->text_keyword_replace($article['content'], $option['id']);

            if (!empty($option['collect_custom_content'])){
                $stdClass = json_decode($option['collect_custom_content'], true);
                $stdClass['head'] = str_replace("\\", '', htmlspecialchars_decode($stdClass['head'], ENT_QUOTES));
                $stdClass['foot'] = str_replace("\\", '', htmlspecialchars_decode($stdClass['foot'], ENT_QUOTES));
                $stdClass = str_replace(['{link}', '{title}', '{title+link}', '{author}', '{name}'], [$article['link'], $article['title'], '<a href='.$article['link'].' target="_blank">'.$article['title'].'</a>', (isset($article['author']) ? $article['author'] : ''), (isset($article['name']) ? $article['name'] : '')], $stdClass);
                if (!empty($stdClass['head'])) $article['content'] = $stdClass['head'] . $article['content'] ;
                if (!empty($stdClass['foot'])) $article['content'] = $article['content'] . $stdClass['foot'] ;
            }
            $data['content'] = $article['content'];
            $data['image'] = isset($article['image']) ? $article['image'] : '';
            $data['pic_attachment'] = isset($article['download_img']) ? json_encode($article['download_img']) : '[]';
            $data['post_type'] = $option['id'];
            $data['link'] = $article['link'];
            $data['author'] = get_current_user_id();
            $data['created'] = date('Y-m-d H:i:s');
            if ($this->wpdb->insert($this->table_post, $data)){
                $article['install_state'] = 1;
            } else {
                $article['install_state'] = 0;
            }
        }

        return $article;
    }


    protected function download_img($download_img, $option)
    {
        $http = new \GuzzleHttp\Client();
        $download_img->map(function ($url, $imgName) use ($http, $option) {
            try {
                // 如果没有域名头自动拼接一下 这段可以去掉了
                if (!isset(parse_url($url)['host'])){
                    $url = parse_url($option['collect_list_url'])['scheme'].'://'.parse_url($option['collect_list_url'])['host'].'/'.ltrim($url, '/');
                }
                $data = $http->request('get', $url, ['verify' => false])->getBody()->getContents();
                file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
            } catch (\Exception $e) {
                // ..记日志
            }
        });
    }


    // TODO 此函数要移走
    public function get_option_list()
    {
        return $this->wpdb->get_results("select * from $this->table_options",ARRAY_A);
    }


    // TODO 此函数要移走
    protected function get_option($option_id)
    {
        return $this->wpdb->get_row("select * from $this->table_options where `id` = $option_id",ARRAY_A);
    }


    private function rulesFormat($rules)
    {
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


    private function text_keyword_replace($text, $option_id)
    {
        if (!$text || !$option_id) {
            return $text;
        }
        $options = $this->wpdb->get_row("select * from $this->table_options where `id` = $option_id limit 1", ARRAY_A);
        $keywords_array = explode(" ", trim($options['collect_keywords_replace_rule']));

        collect($keywords_array)->map(function ($keywords) use (&$text) {
            list($string, $replace) = explode('=', $keywords);
            $text = str_replace($string, $replace, $text);
        });

        return $text;
    }
}


/**
 * FRC_Spider (入口)
 * TODO code => msg 单独提出来
 * TODO 抽空合并其他入口
 */
function frc_spider_interface()
{
    if(version_compare(PHP_VERSION,'7.0.0', '<')){
        wp_send_json(['code' => 5003, 'msg' => '检测到你当前PHP版本为'.phpversion().'. 请去胖鼠采集的Github下载使用胖鼠v5.6版本 分支名: based_php_5.6!']);
        wp_die();
    }
    $action_func = !empty($_REQUEST['action_func']) ? sanitize_text_field($_REQUEST['action_func']) : '';
    if (empty($action_func)){
        wp_send_json(['code' => 5001, 'msg' => 'Parameter error!']);
        wp_die();
    }

    $result = null;
    $action_func = 'grab_'.$action_func;
    $frc_spider = new FRC_Spider();
    method_exists($frc_spider, $action_func) && $result = (new FRC_Spider())->$action_func();
    if ($result != null){
        wp_send_json($result);
        wp_die();
    }
    wp_send_json(['code' => 5002, 'result' => $result, 'msg' => 'Action there is no func! or Func is error!']);
    wp_die();
}
add_action('wp_ajax_frc_spider_interface', 'frc_spider_interface');


/**
 * 此函数要处理掉
 * debug 规则
 */
function frc_ajax_frc_debug_option() {

    $debug = [];
    $debug['debug_url']             = !empty($_REQUEST['debug_url']) ? sanitize_text_field($_REQUEST['debug_url']) : '';
    $debug['debug_range']           = !empty($_REQUEST['debug_range']) ? sanitize_text_field($_REQUEST['debug_range']) : '';
    $debug['debug_rules_origin']    = !empty($_REQUEST['debug_rules']) ? sanitize_text_field($_REQUEST['debug_rules']) : '';
    $debug['debug_remove_head']     = !empty($_REQUEST['debug_remove_head']) ? sanitize_text_field($_REQUEST['debug_remove_head']) : 0;
    $debug['debug_rules_new']       = !empty($_REQUEST['debug_rules']) ? rulesFormat($debug['debug_rules_origin']) : '';

    if ($debug['debug_remove_head'] == 1)
        $ql = QueryList::get($debug['debug_url'])->removeHead();
    else
        $ql = QueryList::get($debug['debug_url']);

    $info = $ql
        ->range($debug['debug_range'])
        ->encoding('UTF-8')
        ->rules( rulesFormat($debug['debug_rules_origin']) )
        ->queryData();

    $debug['result'] = $info;

    wp_send_json($debug);
    wp_die();
}
add_action( 'wp_ajax_frc_debug_option', 'frc_ajax_frc_debug_option' );

function rulesFormat($rules)
{
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


/**
 * 定时爬取 cron
 */
function frc_spider_timing_task()
{
    $frc_spider = new FRC_Spider();
    $options = $frc_spider->get_option_list();
    foreach ($options as $option){
        $frc_spider->run_spider_list_page($option);
    }
}
if ($frc_cron_spider = get_option('frc_cron_spider')){
    if (!wp_next_scheduled('frc_cron_spider_hook')) {
        wp_schedule_event(time(), $frc_cron_spider, 'frc_cron_spider_hook');
    }
    add_action('frc_cron_spider_hook', 'frc_spider_timing_task');
} else {
    wp_clear_scheduled_hook('frc_cron_spider_hook');
}


function frc_spider()
{
    $frc_spider = new FRC_Spider();
    $options = collect($frc_spider->get_option_list())->groupBy('collect_type');
    ?>
    <div class="wrap">
        <h1>
            <?php esc_html_e('胖鼠爬虫', 'Fat Rat Collect') ?>
            <?php if (get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE) != '') { ?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" />
            <?php } ?>
        </h1>
        <p></p>
        <span>胖鼠采集要做Wordpress最好用的开源采集小工具</span>
        <p></p>
        <div>
            <div><p style="color: #0000cc"><?php esc_html_e((new FRC_Validation())->announcement()); ?></p></div>
            <!-- bootstrap tabs -->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#single_wx" data-toggle="tab">微信爬虫</a></li>
                <li><a href="#single_js" data-toggle="tab">简书爬虫</a></li>
                <li><a href="#list" data-toggle="tab">列表爬虫</a></li>
                <li><a href="#historypage" data-toggle="tab">列表爬虫->分页数据爬取</a></li>
                <li><a href="#details" data-toggle="tab">详情爬虫</a></li>
                <li><a href="#autospider" data-toggle="tab">自动采集</a></li>
                <li><a href="#todolist" data-toggle="tab">Todo & 胖鼠</a></li>
            </ul>
            <div class="tab-content spider-tab-content">
                <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
<!--                微信爬虫-->
                <div class="tab-pane fade in active" id="single_wx">
                    <table class="form-table">
                        <tr>
                            <th>微信文章地址</th>
                            <td>
                                <textarea name="collect_wx_urls" cols="80" rows="14" placeholder="多篇文章使用回车区分,一行一个。每次不要太多、要对自己的服务器心里要有数"></textarea>
                                <p>如采集遇到 内容过滤需求 如删除: 第一张图片 or 第二个p标签 or 倒数第三张图片 等需求 请使用<a href="http://www.fatrat.cn/fatrat/92.html" target="_blank">内容过滤</a>功能</p>
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
                <!--                简书爬虫-->
                <div class="tab-pane fade" id="single_js">
                    <table class="form-table">
                        <tr>
                            <th>简书文章地址</th>
                            <td>
                                <textarea name="collect_js_urls" cols="80" rows="14" placeholder="多篇文章使用回车区分,一行一个"></textarea>
                                <p>简书默认规则过滤了a标签,你们可以在配置中心看到,也可以自定义过滤任何内容.去尝试吧</p>
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
<!--                列表爬虫-->
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
                            echo "<a href='#' data-id='{$option['id']}' class='list-spider-run-button list-group-item'>{$option['collect_name']}</a>";
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
<!--                分页爬虫-->
                <div class="tab-pane fade" id="historypage">
                    <?php
                    if (!isset($options['list'])) {
                        echo '<p></p>';
                        echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的毛毛虫: 目前没有任何一个分页配置。毛毛虫我们走 </a></h4>";
                    } else {
                    ?>
                    <table class="form-table">
                        <tr>
                            <td colspan="2">
                                <p>这个功能其实是列表爬取的附加功能. 嫌弃列表页最新的文章太少? 那就先用这个功能采集一下他们分页的历史新闻吧.</p>
                            </td>
                        </tr><tr>
                            <th>文章分页地址</th>
                            <td>
                                <input name="collect_history_url" size="82" placeholder="http://timshengmingguoke.bokee.com/newest/{page}" />
                                <p>把页码的码数替换为 {page}</p>
                                <p>例子: http://news.17173.com/z/pvp/list/zxwz_{page}.shtml</p>
                                <p>例子: http://xy2.yzz.cn/guide/skill/477,{page}.shtml</p>
                            </td>
                        </tr>
                        <tr>
                            <th>要采集的页码</th>
                            <td>
                                <input name="collect_history_page_number" size="82" placeholder="2,3,4,5,6,7,8,9,10" />
                                <p>页数用逗号隔开 2,3,4 慢点采集。一次1 ~ 3页慢慢来</p>
                            </td>
                        </tr>
                        <tr>
                            <th>选择页面的规则配置</th>
                            <td>
                                <?php
                                $string = '<select name="collect_history_relus"><option value="0">请选择</option>';
                                foreach ($options['list'] as $option) {
                                    $string .= '<option value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                                }
                                $string .= '</select>';

                                echo $string;
                                ?>
                                <p>配置创建在 新建配置->配置类型=列表</p>
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
<!--                详情爬虫-->
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
                                <textarea name="collect_details_urls" cols="80" rows="14" placeholder="这里使用你设置过的详情配置, 来输入一条目标url, 多篇文章使用回车键, 尽情享受吧！"></textarea>
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
<!--                自动爬虫-->
                <div class="tab-pane fade" id="autospider">
                    <p></p>
                    <p>好用? 请大家给胖鼠<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">打分</a>, 谢了!</p>
                    <ul>
                    <li><input type="radio" name="collect_spider_time" value="" <?php echo get_option('frc_cron_spider') == '' ? 'checked' : ''; ?> ><b>关闭</b></li>
                    <li><input type="radio" name="collect_spider_time" value="daily" <?php echo get_option('frc_cron_spider') == 'daily' ? 'checked' : ''; ?> ><b>每天自动爬取一次</b></li>
                    <li><input type="radio" name="collect_spider_time" value="twicedaily" <?php echo get_option('frc_cron_spider') == 'twicedaily' ? 'checked' : ''; ?> ><b>每天自动爬取两次</b></li>
                    </ul>
                    <p>启动即立即运行第一次.</p>
                    <p>如果想看到爬虫具体的执行时间? 下载安装插件 Advanced Cron Manager 里面 frc_ 开头的就是咱们的自动任务, 其他类似插件均可</p>
                    <input type="button" class="frc_cron_spider btn btn-info" value="保存">
                </div>
                <div class="tab-pane fade" id="todolist">
                    <p class="p-tips-style"><?php esc_html_e(FRC_Api_Error::FRC_TIPS[array_rand(FRC_Api_Error::FRC_TIPS, 1)]); ?></p>
                    <div class="todo-and-author-class">
                        <h3>Todo:</h3>
                        <p>建议大家及时更新胖鼠,推荐最新版</p>
                        <ul>
                        <li><b>2019年9月19日</b></li>
                        <li>Todo: 简书规则升级</li>
                        <li><b>2019年9月4日</b></li>
                        <li>Todo: 优化了很多代码</li>
                        <li>Todo: 增加图片不本地化选项。(采集速度超快)</li>
                        <li>Todo: 可指定采集图片的属性。(对于某些js异步加载图片的站点很有效)</li>
                        <li><b>2019年6月12日</b></li>
                        <li>Todo: 优化一些地方</li>
                        <li><b>2019年5月19日</b></li>
                        <li>Todo: 优化 Dynamic Content 功能, 优化了取文字样式</li>
                        <li>Todo: 优化 Auto Tags 功能, 暂时去掉了标签追加链接功能, 有bug回头解决了再加</li>
                        <li>Todo: 数据中心弱网发布时间优化</li>
                        <li><b>2019年5月5日</b></li>
                        <li>Todo: 优化 Dynamic Content 功能</li>
                        <li>Todo: 优化 Auto Tags 功能</li>
                        <li>Todo: Auto Tags 功能 增加开关和一些优化</li>
                        <li><b>2019年5月4日(五一)</b></li>
                        <li>Todo: 新功能 Dynamic Content 文章自动添加动态内容</li>
                        <li>Todo: 代码优化</li>
                        <li><b>2019年5月3日(五一)</b></li>
                        <li>Todo: 新功能 Auto Tags 文章自动打Tag or 优化一些文案</li>
                        <li><b>2019年4月30日</b></li>
                        <li>Todo: ok 修复一个仅新鼠会出现bug</li>
                        <li><b>2019年4月29日（晚）</b></li>
                        <li>Todo: ok 文章滤重改为强滤重</li>
                        <li>Todo: ok 数据表增加一项字段</li>
                        <li>Todo: ok 一次发布最大数量增加到30</li>
                        <li><b>2019年4月23日（晚）</b></li>
                        <li>Todo: ok 优化 据个别鼠要求, 采集标题 增长为120个汉字</li>
                            <li><a href="javascript:void(0)"><span id="todo—more-button" style="color: blue;">更多</span></a>...</li>
                            <div class="todo—more-show" style="display:none">
                        <li>Todo: ok 优化 采集保存配置一点逻辑优化</li>
                        <li>Todo: ok 优化 文案优化</li>
                        <li><b>2019年4月15日</b></li>
                        <li>Todo: ok 优化 采集标题可能超过40个汉字长度 控制在40个字符之内 </li>
                        <li>Todo: ok 优化 下载图片可能会超时优化了连接时间 </li>
                        <li>Todo: ok 优化 一次发布很多篇, 极端情况可能图片超时问题 </li>
                        <li>Todo: ok 优化 发布文章个别情况可能出现报错, 捕获错误 </li>
                        <li>Todo: ok 优化 文章别名, 使用文章标题作为文章别名 </li>
                        <li>Todo: ok 新增 公告功能: 用于胖鼠紧急通知众鼠使用, 无风险。</li>
                        <li>Todo: ok 新增 微信增加 作者变量{author} 公众号名字变量{name} 简书增加作者变量{author}</li>
                        <li><b>2019年4月14日</b></li>
                        <li>Todo: ok 修复了 一个不影响大局的sql错误 </li>
                        <li><b>2019年4月14日</b></li>
                        <li>Todo: ok 修复了 微信 简书 采集失败bug </li>
                        <li>Todo: ok 群内热心鼠发现的问题 @x (大家给他点个赞) </li>
                        <li>Todo: ok 丰富了很多错误提示, 还改进了一些代码 </li>
                        <li><b>2019年4月14日</b></li>
                        <li>Todo: ok 胖鼠采集全新架构 1.8 版本正式上线  </li>
                        <li>Todo: ok 修复window主机用户采集微信图片 鼠友服务器CA证书验证不通过问题  </li>
                        <li>Todo: ok 修复window主机 路径 DIRECTORY_SEPARATOR 可能出现的bug  </li>
                        <li>Todo: ok 采集内核2.0。更快的采集速度。 (3.0规划已有。采集速度会超级超级快)  </li>
                        <li>Todo: ok 采集图片自动查找后缀算法优化  </li>
                        <li>Todo: ok 自动特色图片功能完成(仅对新爬文章生效)  </li>
                        <li>Todo: ok 图片加入媒体库功能(仅对新爬文章生效)  </li>
                        <li>Todo: ok 图片加入附件(仅对新爬文章生效)  </li>
                        <li>Todo: ok 发布时图片发布失败。补二次下载  </li>
                        <li>Todo: ok 早日进群, 解锁最新黑科技 </li>
                        <li>Todo: ok 鼠们给点力量, 要不然真的写不动了 <a href="http://www.fatrat.cn/bounty" target="_blank">赏</a> And <a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">赞</a> </li>
                        <li><b>2019年4月8日</b></li>
                        <li>Todo: ok 修复了几位鼠友用window服务器出现的图片路径乱码bug</li>
                        <li><b>2019年3月31日</b></li>
                        <li>Todo: ok 修复了简书图片bug</li>
                        <li>Todo: ok 数据中心增加数据统计功能</li>
                        <li><b>2019年3月8日</b></li>
                        <li>Todo: ok 冒泡</li>
                        <li><b>2019年2月25日</b></li>
                        <li>Todo: ok 修复群里一个鼠友采集图片失败的bug.</li>
                        <li>Todo: ok 升级群里鼠友采集的图片默认居中需求.</li>
                        <li><b>2019年2月15日</b></li>
                        <li>Todo: ok 胖鼠采集PHP v5.6 版本尝鲜版发布.</li>
                        <li>Todo: ok 优化一些文案.</li>
                        <li><b>2019年1月25日</b></li>
                        <li>Todo: ok 定时发布 (给鼠友增加开关）</li>
                        <li>Todo: ok 定时采集 (给鼠友增加开关）</li>
                        <li>Todo: ok 图片可设置使用 相对/绝对 路径. 站群/单站点/CDN可能要的需求 </li>
                        <li>Todo: ok 微信采集自定义内容(鼠友要求可增加来源)</li>
                        <li>Todo: ok 免责声明</li>
                        <li>Todo: ok 一些代码优化</li>
                        <li><b>2019年1月24日</b></li>
                        <li>Todo: ok 鼠友发现采集的微信视频无法播放BUG!</li>
                        <li><b>2019年1月22日</b></li>
                        <li>Todo: ok 微信 And 列表采集 图片 自动剔除多余属性 增加 Alt字段 值为title 更好的SEO!</li>
                        <li><b>2019年1月21日</b></li>
                        <li>Todo: ok 一个安全过滤误伤了鼠友. 已修复</li>
                        <li>Todo: ok 修正版本号</li>
                        <li><b>2019年1月20日晚0点</b></li>
                        <li>Todo: ok Php版本验证提示</li>
                        <li>Todo: ok 配置中心批量删除</li>
                        <li>Todo: ok 数据中心可能出现的一个notice错误</li>
                        <li>Todo: ok 数据发布,增加发布作者,文章状态.</li>
                        <li>Todo: ok 数据中心作者字段优化</li>
                        <li>Todo: ok 赞赏码</li>
                        <li><b>2019年1月15日</b></li>
                        <li>Todo: ok 帮助的a 标签跳转新开标签页</li>
                        <li>Todo: ok 增加自动发布tag页面</li>
                        <li>Todo: ok 新增加的文档的链接</li>
                        <li>Todo: ok 分页采集增加默认select</li>
                        <li>Todo: ok 修复自动爬去功能异常</li>
                        <li>Todo: ok Css Js样式 兼容了其他插件</li>
                        <li>Todo: ok 修复一个列表爬虫。由于目标站不统一。链接可能拼接错误bug</li>
                        <li><b>2019年1月13日晚11:28</b></li>
                        <li>Todo: ok 优化配置中心一个 notice 错误</li>
                        <li>Todo: ok 增加了数据批量删除</li>
                        <li>Todo: ok 增加数据批量发布</li>
                        <li>Todo: ok 文章增加发布分类</li>
                        <li>Todo: ok 使用权限增加作者 编辑 管理员</li>
                        <li><b>2019年1月3日晚10:30</b></li>
                        <li>Todo: ok 优化了详情爬虫, 增加了默认选项</li>
                        <li>Todo: ok 增加了几个采集配置 寻仙新闻 御龙在天新闻 心理咨询师新闻 直播吧详情 虎扑详情</li>
                        <li>Todo: ok 优化了前端错误提示</li>
                        <li>Todo: 有个个别网站 gbk 个别乱码问题/未解决。utf-8很稳定</li>
                        <li>Todo: 今天关闭了站群自动发布,自动发布什么时候再次开启?</li>
                        <li><b>2019年1月1日</b></li>
                        <li>Todo: 写图片地方优化</li>
                        <li>Todo: 列表爬取 button disabled (遗留)</li>
                        <li>Todo: 配置 发布列表页 鼠标移动到区域后 才显示选择</li>
                        <li>Todo: Add Log</li>
                        <li>Todo: ok 采集时是否增加采集作者?时间?</li>
                        <li>Todo: ok 发布时增加选择发布分类?发布人?等功能?</li>
                        <li>Todo: 给列表和详情 支持ajax页面爬取?</li>
                        <li>Todo: ok 内容中Img图片自动识别 图片属性src? data-src? 或者其他?</li>
                        <li>Todo: 增加简书 头条等其他和微信一样默认爬虫?</li>
                        <li>Todo: 多线程爬虫.爬虫速度优化..</li>
                        <li>Todo: 各种采集/页面 错误提示 更加丰富? 让用户看到所有错误.</li>
                        <li>Todo: ok 详情页面 访问路径判断是(相对/绝对)路径（紧急）</li>
                        <li>Todo: ok 教会用户会使用debug模式，在新建配置页下方</li>
                        <li>Todo: ok FAQ丰富一下.</li>
                        <li>Todo: ok 是否要模仿一些其他采集工具的小功能选项? 有必要吗?</li>
                        <li>Todo: 胖鼠和其他采集器不一样。不需要脱离wordpress 完美支持jquery语法。想采什么采什么。可以删除内容任何标签</li>
                        <li>Todo: 图片因为站群的原因, 目前整站使用相对路径。后期考虑让用户选择 相对/绝对路径.</li>
                        <li>Todo: 定时爬取已自动开启！ 一日两次（每次间隔12小时）第一次运行在你安装胖鼠的时候. (后期是优化用户可以自定义时间, 增加用户可控制开关)</li>
                        <li>Todo: 想看爬虫下次执行时间? 安装一个插件 Cron Manager 里面有两个 frc_ 开头的任务就是咱们的定时程序</li>
                        <li>Todo: ok 数据中心文章预览功能</li>
                        <li>Todo: ok 配置中心 配置删除功能</li>
                        <li>Todo: ok 各种操作的友好提示</li>
                        <li>Todo: ok 自定义详情配置</li>
                        <li>Todo: ok 优化一些前端体验</li>
                        <li>Todo: ok 优化掉了一个log表</li>
                        <li>Todo: ok 优化掉了服务端无数行代码</li>
                        <li>Todo: ok 发一个稳定版本 应该不会大改框架了</li>
                        <li>Todo: ...</li>
                        </div>
                        </ul>
                        <hr />
                        <div align="right" style="margin-top: 0px; float: right;">
                            <img width="400" src="<?php frc_image('fat-rat-appreciates.jpeg'); ?>" />
                        </div>
                        <h4>胖鼠留:</h4>
                        <ul>
                            <?php if (get_option(FRC_Validation::FRC_INSERT_TIME) != '') { ?>
                                <li style="color: #0eb5d6">鼠, 我们第一次相遇是在 <?php esc_html_e(date('Y-m-d H:i', get_option(FRC_Validation::FRC_INSERT_TIME))) ?> 这天, 你可曾记得？ 胖鼠采集是否为鼠带来便利了呢？插件好评支持一下呗！</li>
                            <?php } ?>
                            <li>欢迎大家在<a href="https://github.com/fbtopcn/fatratcollect" target="_blank">GitHub</a>提问; 欢迎star. <a href="http://www.fatrat.cn" target="_blank">胖鼠官网</a>
                            <li>胖鼠新建规则上手使用应该不会超过20分钟.请大家耐心一点点 </li>
                            <li>如不会新建配置? 就先导入默认配置. 照葫芦画瓢即可. 还有疑问可以来找鼠友帮忙.</li>
                            <li>开源不易, 大家可以帮忙推荐一下.或者给胖鼠<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">五星好评</a>,这是对作者无声的支持. 前端Html使用<a href="http://www.bootcss.com/" target="_blank">Bootstrap</a> 采集基于<a href="https://www.querylist.cc/docs/guide/v4/overview" target="_blank">QueryList</a></li>
                            <li>胖鼠采集: QQ群1: 454049736 (高级群) QQ群2: 846069514 </li>
                            <li>由于胖鼠平时工作比较忙, 加上鼠友越来越多. 请鼠们多学会自我学习, 避免浪费大家精力, 所以设置一点门槛. </li>
                            <li>胖鼠第一次上线: 2018年12月30日 02:24</li>
                            <li>胖鼠采集初衷为开源学习; 请勿违反国家法律. 作者不承担任何法律风险. </li>
                            <li><img src="<?php frc_image('fat-rat-128x128.png'); ?>" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
}
