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

if (!class_exists('AbsoluteUrl')) {
    require_once(plugin_dir_path(__DIR__) . 'src/Service/AbsoluteUrl.php');
}
if (!class_exists('DownloadImage')) {
    require_once(plugin_dir_path(__DIR__) . 'src/Service/DownloadImage.php');
}
if (!class_exists('GetTransCoding')) {
    require_once(plugin_dir_path(__DIR__) . 'src/Service/GetTransCoding.php');
}

use Nesk\Rialto\Data\JsFunction;
use QL\Ext\AbsoluteUrl;
use QL\Ext\Chrome;
use QL\Ext\DownloadImage;
use QL\Ext\GetTransCoding;
use QL\QueryList;

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
            return ['code' => FRC_ApiError::FAIL, 'msg' => '链接不能为空'];
        }
        if (empty($name) || !in_array($name, ['wx', 'js', 'zh'])){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '链接不能为空'];
        }

        switch ($name){
            case 'wx':
                $name = '微信';
                $urls = $this->wx_url_format($urls);
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

        return $this->response(FRC_ApiError::SUCCESS, $this->single_spider($option, $urls), $name .'数据处理完成, F12可查看单条数据具体采集结果喔');
    }

    private function wx_url_format($urls){
        $urls = explode(' ', $urls);
        foreach ($urls as &$url){
            $i = strpos($url, '&chksm');
            if ($i === false){
                continue;
            }
            $url = substr($url, 0, $i);
        }

        return join(' ', $urls);
    }

    /**
     * 抓取详情
     * @return array
     */
    public function grab_details_page(){
        $urls       = frc_sanitize_text('collect_details_urls');
        $option_id  = frc_sanitize_text('collect_details_relus', 0);
        if (empty($urls)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '链接不能为空'];
        }
        if (empty($option_id)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '请选择一个有效的详情配置'];
        }
        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
        }

        return $this->response(FRC_ApiError::SUCCESS, $this->single_spider($option, $urls));
    }


    /**
     * 列表采集
     * @return array
     */
    public function grab_list_page()
    {
        $option_id = frc_sanitize_text('option_id', 0);

        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
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

        $articles = $this->_QlObject($config)->absoluteUrl($config)->query(function($item) use ($option, $config) {
            if ($this->checkPostLink($item['link'])){
                return $this->format($item, '已滤重');
            }

            $config->url = $item['link'];
            $config->range = $option['collect_content_range'];
            $config->rules = $this->rulesFormat($option['collect_content_rules']);
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->special($config)->query()->getDataAndRelease();
            $detail = array_merge($item, current($detail));
            $this->paging($detail, $config);
            return $this->insert_article($detail, $option);
        })->getDataAndRelease();

        return $this->response(FRC_ApiError::SUCCESS, $articles, '列表采集完成');
    }


    /**
     * 历史(分页)页面
     */
    public function grab_history_page()
    {
        $history_page_number    = frc_sanitize_text('collect_history_page_number');
        $option_id              = frc_sanitize_text('collect_history_relus_id', null);
        if ($option_id === null){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '请选择一个配置'];
        }
        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '请选择一个有效的配置, 配置异常'];
        }

        if (empty($history_page_number)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '请填写页码/翻页'];
        }

        if (empty($option['collect_list_url_paging'])){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '请配置分页采集地址'];
        }

        if ($option['collect_rendering'] == 1){

            if (!strstr($option['collect_list_url_paging'], '{page}')){
                return ['code' => FRC_ApiError::FAIL, 'msg' => 'URL不正确。未包含 {page} 关键字 or URL不能为空'];
            }

            $page_count = explode('-', $history_page_number);
            $page_count = count($page_count) == 2 ? range($page_count[0], $page_count[1]) : [(int)$page_count[0]];

            if (!get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP) && count($page_count) > 3){
                return ['code' => FRC_ApiError::FAIL, 'msg' => FRC_Validation::FRC_HINT_F];
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
                $article = $this->_QlPagingObject($config)->absoluteUrl($config)->query(function($item) use ($option, $config) {
                    if ($this->checkPostLink($item['link'])){
                        return $this->format($item, '已滤重');
                    }

                    $config->url = $item['link'];
                    $config->range = $option['collect_content_range'];
                    $config->rules = $this->rulesFormat($option['collect_content_rules']);
                    $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->special($config)->query()->getDataAndRelease();
                    $detail = array_merge($item, current($detail));
                    $this->paging($detail, $config);
                    return $this->insert_article($detail, $option);
                })->getDataAndRelease();
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
            $article = $this->_QlPagingObject($config)->absoluteUrl($config)->query(function($item) use ($option, $config) {
                if ($this->checkPostLink($item['link'])){
                    return $this->format($item, '已滤重');
                }

                $config->url = $item['link'];
                $config->range = $option['collect_content_range'];
                $config->rules = $this->rulesFormat($option['collect_content_rules']);
                $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->query()->getDataAndRelease();
                $detail = array_merge($item, current($detail));
                $this->paging($detail, $config);
                return $this->insert_article($detail, $option);
            })->getDataAndRelease();
            $articles['rolling'] = $history_page_number;
            $articles['data'] = $article;
        }

        return $this->response(FRC_ApiError::SUCCESS, $articles, '分页采集完成');
    }


    /**
     * @return array
     */
    public function grab_all_page()
    {
        $option_id = frc_sanitize_text('option_id', 0);

        $options = new FRC_Options();
        $option = $options->option($option_id);
        if (!$option) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
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

        // TODO: 优化内存使用
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
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->query()->getDataAndRelease();
            $detail = array_merge($item, current($detail));
            $this->paging($detail, $config);
            return $this->insert_article($detail, $option);
        });

        return $this->response(FRC_ApiError::SUCCESS, $articles, '全站采集完成');
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
            return $this->response(FRC_ApiError::SUCCESS, null, '请输入参数.');
        }

        $detail = $this->_QlObject($config)->absoluteUrl($config)->query()->getDataAndRelease();

        return $this->response(FRC_ApiError::SUCCESS, $detail, '调试完成, 请在F12中查看');
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
            $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->special($config)->query()->getDataAndRelease();
            $detail = array_merge(['link' => $url], current($detail));
            $this->paging($detail, $config);

            return $this->insert_article($detail, $option);
        });


        return ['message' => '处理完成', 'data' => $article];
    }


    /**
     * @param $detail
     * @param $config
     */
    private function paging(&$detail, $config)
    {
        $i = 1;
        $maximum = 50;
        $detail['paging'] = AbsoluteUrl::urlFormat($detail['paging'], $config->url); // url format
        if (!empty($detail['paging'])) {
            $config->url = $detail['paging'];
            while (true) {
                $pagging = $this->_QlObject($config)
                    ->absoluteUrl($config)
                    ->downloadImage($config)
                    ->special($config)
                    ->query()->getDataAndRelease();
                $pagging = current($pagging);
                $pagging['paging'] = AbsoluteUrl::urlFormat($pagging['paging'], $config->url);
                $detail['content'] .= $pagging['content'];
                if (empty($pagging['paging']) || $pagging['paging'] == $config->url || $i > $maximum) {
                    break;
                }
                $config->url = AbsoluteUrl::urlFormat($pagging['paging'], $config->url); // url format
                $detail['paging_'.$i] = $config->url;
                $i++;
            }
        }
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

        return preg_replace('#<!--[^\!\[]*?(?<!\/\/)-->#' , '' , $text); // 去掉注释
    }


    /**
     * 定时爬虫
     * @return array
     */
    public function timing_spider()
    {
        $options = collect((new FRC_Options())->options());

        $re = $options->reverse()->map(function ($option){
            if ($option['collect_type'] == 'single'){
                return $this->format($option, '详情采集不支持自动');
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

            // 采集列表
            $articles = $this->_QlObject($config)->absoluteUrl($config)->query(function($item) use ($option, $config) {
                if ($this->checkPostLink($item['link'])){
                    return $this->format($item, '已滤重');
                }

                // 采集详情
                $config->url = $item['link'];
                $config->range = $option['collect_content_range'];
                $config->rules = $this->rulesFormat($option['collect_content_rules']);
                $detail = $this->_QlObject($config)->absoluteUrl($config)->downloadImage($config)->query()->getDataAndRelease();
                $detail = array_merge($item, current($detail));
                $this->paging($detail, $config);

                return $this->insert_article($detail, $option);
            })->getDataAndRelease();

            return $articles;
        });

        return ['message' => '处理完成', 'data' => $re];
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

        $ql = $this->_QlInstance();
        if (!$config->pure) {
            $ql->rules($config->rules)->range($config->range);
        }

        try{
            if ($config->rendering == 1) {
                if ($config->remove_head == 3){
                    $ql->getTransCoding($config->url);
                } else {
                    $ql->get($config->url, [], ['timeout' => 10]);
                }
            } elseif ($config->rendering == 2) {
                $ql->use(Chrome::class);
                $options = ['args' => ['--no-sandbox', '--disable-setuid-sandbox'], 'timeout' => 10000];
                $ql->chrome($config->url, $options);
            }
        } catch (Exception $e){
            // http error
        }
        $ql->encoding('UTF-8');

        if (strstr('2-3', $config->remove_head)) {
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

        $ql = $this->_QlInstance()->rules($config->rules)->range($config->range);

        if ($config->rendering == 1) {
            $url = str_replace('{page}', $config->pn, $config->url);
            if ($config->remove_head == 3){
                $ql->getTransCoding($url);
            } else {
                $ql->get($url, [], ['timeout' => 10]);
            }
        } elseif ($config->rendering == 2) {
            $ql->use(Chrome::class);
            $options = ['args' => ['--no-sandbox', '--disable-setuid-sandbox'], 'timeout' => 10000];
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

    private function _QlInstance(){
        $ql = QueryList::getInstance();
        $ql->use(AbsoluteUrl::class);
        $ql->use(DownloadImage::class);
        $ql->use(GetTransCoding::class);
        $ql->bind('getDataAndRelease', function (){
            // 获取数据，释放内存
            $data = $this->getData();
            $this->destruct(); // 不销毁ql对象，仅销毁phpQuery Documents占用内存 // TODO: 升级ql后续要改动
            return $data->toArray();
        });
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

        return $ql;
    }


    /**
     * @param $article
     * @param $option
     * @return mixed
     */
    protected function insert_article($article, $option){
        if (empty($article) | empty($article['title']) | empty($article['content'])) {
            return $this->format($article, '内容错误, 如果debugging正常, 可能目标站有js拦截等其他防采集策略');
        }

        if (!empty($option['collect_custom_content'])){
            $stdClass = json_decode($option['collect_custom_content'], true);
            $stdClass['head'] = htmlspecialchars_decode($stdClass['head'], ENT_QUOTES);
            $stdClass['foot'] = htmlspecialchars_decode($stdClass['foot'], ENT_QUOTES);
            $stdClass = str_replace(
                ['{link}', '{title}', '{title+link}', '{author}', '{name}'],
                [$article['link'], $article['title'], '<a href=' . $article['link'] . ' target="_blank">' . $article['title'] . '</a>', (isset($article['author']) ? $article['author'] : ''), (isset($article['name']) ? $article['name'] : '')],
                $stdClass);

            if (!empty($stdClass['head'])) $article['content'] = $stdClass['head'] . $article['content'] ;
            if (!empty($stdClass['foot'])) $article['content'] = $article['content'] . $stdClass['foot'] ;
        }

        $data['status'] = 2;
        $data['option_id'] = $option['id'];
        $data['cover'] = isset($article['image']) ? $article['image'] : '';
        $data['link'] = $article['link'];
        $data['title'] = mb_substr($this->text_keyword_replace($article['title'], $option), 0, 120);
        $data['content'] = $this->text_keyword_replace($article['content'], $option);
        $insertKeyword = get_option(FRC_Validation::FRC_VALIDATION_INSERT_KEYWORD);
        if (!empty($insertKeyword) && json_decode($insertKeyword)->switch == 'open') {
            $data['content'] = $this->insertKeywords($data['content'], $option);
        }
        $data['message'] = 'Success.';
        $data['created_at'] = current_time('mysql');
        $data['updated_at'] = current_time('mysql');

        if ($this->wpdb->insert($this->table_post, $data)){
            return $this->format($article, '采集完成');
        }

        return $this->format($article, '入库失败、可能此条数据已经在数据库中存在了');
    }


    /**
     * @param $txt
     * @param $option
     * @return string
     */
    protected function insertKeywords($txt, $option){
        if (empty($option['collect_keywords'])){
            return $txt;
        }
        $keywords = json_decode($option['collect_keywords']);
        if (empty($keywords)){
            return $txt;
        }
        $items = [];
        foreach ($keywords as $keyword){
            for ($i=0; $i<$keyword->count; $i++){
                if (isset($keyword->link)){
                    $item = sprintf('<a href="%s">%s</a>', $keyword->link, $keyword->title);
                } else {
                    $item = $keyword->title;
                }
                array_push($items, $item);
            }
        }

        return randomInsertString($txt, $items);
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
        return [
            '胖鼠采集' => '欢迎使用胖鼠采集调试功能.',
            'code' => $error,
            'msg' => $msg,
            'data' => $data
        ];

        /*
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
        ];*/
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
    if (!frc_mysql_upgrade()){
        return ;
    }
    frc_front_loading();
    $frc_options = new FRC_Options();
    $options = collect($frc_options->options())->reverse()->groupBy('collect_type');
    // TODO:首页拆分。优化速度。
    ?>

    <div class="wrap">
        <h1 class="frc-plugin-name">
            <?php esc_html_e('胖鼠采集', 'Fat Rat Collect') ?>
            <?php if (!empty(get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP))) { ?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png') ?>" />
            <?php } ?>
            <img width="80" class="float-end" src="<?php frc_image('fat-rat-256x256.png') ?>">
        </h1>
        <p></p>
        <span style="font-size: 14px">
        <?php
        if (array_rand([1, 2], 1) === 1) {
            esc_html_e('胖鼠采集, WordPress最好用的开源采集小工具');
        } else {
            esc_html_e('胖鼠采集, WordPress优秀开源采集插件');
        }
        ?></span>
        <p></p>
        <div><p style="color: #0000cc"><?php _e((new FRC_Validation())->announcement('notice-home')); ?></p></div>
        <div class="progress progress-striped active">
            <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success progress-bar-striped spider-progress-bar" role="progressbar"
                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                 style="width: 0%;">
            </div>
        </div>
        <p></p>
<!--        <ul class="nav nav-tabs">-->
<!--            <li class="active"><a href="#single_wx" data-toggle="tab">微信爬虫</a></li>-->
<!--            <li><a href="#single_js" data-toggle="tab">简书爬虫</a></li>-->
<!--            <li><a href="#single_zh" data-toggle="tab">知乎采集</a></li>-->
<!--            <li><a href="#list" data-toggle="tab">列表采集</a></li>-->
<!--            <li><a href="#historypage" data-toggle="tab">列表分页采集</a></li>-->
<!--            <li><a href="#details" data-toggle="tab">详情采集</a></li>-->
<!--            --><?php //if (get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT)){ ?>
<!--            <li><a href="#all" data-toggle="tab">全站采集</a></li>-->
<!--            --><?php //} ?>
<!--            <li><a href="#todolist" data-toggle="tab">Todo & 胖鼠</a></li>-->
<!--        </ul>-->
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#single_wx" type="button">微信爬虫</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#single_js" type="button">简书爬虫</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#single_zh" type="button">知乎采集</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#list" type="button">列表采集</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#historypage" type="button">列表分页采集</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#details" type="button">详情采集</button>
                <?php if (get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT)){ ?>
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#all" type="button">全站采集</button>
                <?php } ?>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#todolist" type="button">Todo & 胖鼠</button>
            </div>
        </nav>
        <div class="tab-content spider-tab-content">
            <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
            <!--微信爬虫-->
            <div class="tab-pane fade show active" id="single_wx">
                <table class="form-table">
                    <tr>
                        <th>微信文章地址</th>
                        <td>
                            <textarea name="collect_wx_urls" cols="80" rows="14" placeholder="把微信公众号文章链接直接粘贴进来. 点击采集即可. 推荐使用短的Url,点击复制的那种
多篇文章使用回车区分, 一行一个."></textarea>
                            <p>小提示: 如需要内容过滤需求 如删除: 第一张图片 or 第二个p标签 or 倒数第三张图片 等需求 请使用<a href="https://www.fatrat.cn/docs/v2/content-filtering" target="_blank">内容过滤</a>功能</p>
                            <p>例: -img:gt(-4) 过滤文章底部倒数3张图片! -img:eq(1) 只过滤文章正文第2张图片 (程序从0开始)</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <button type="button" class="btn btn-primary wx-spider-run-button" id="liveToastBtn">采集</button>
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
                            <p>Tips: 简书默认规则过滤了a标签, 一定要了解a与-a的区别哦、 你们可以在配置中心查看胖鼠写的配置</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <button type="button" class="btn btn-primary js-spider-run-button" id="liveToastBtn">采集</button>
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
                            <p>可使用F12调试模式、查看采集结果哦</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <button type="button" class="btn btn-primary zh-spider-run-button" id="liveToastBtn">采集</button>
                        </th>
                    </tr>
                </table>
            </div>
            <!--列表爬虫-->
            <div class="tab-pane fade spider-tab-content" id="list">
                <?php
                if (!isset($options['list'])) {
                    _e('<p></p>');
                    _e("<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮虾: 目前没有任何一个列表配置。皮皮虾我们走 </a></h4>");
                } else {
                ?>
                <ul class="list-group">
                    <p></p>
                    <a disabled class="list-group-item active">
                        <h5 class="list-group-item-heading">
                            列表爬虫(点击采集)
                        </h5>
                    </a>
                    <p></p>
                    <?php
                    foreach ($options['list'] as $option) {
                        _e("<a href='javascript:;' data-id='{$option['id']}' class='list-spider-run-button list-group-item'>{$option['collect_name']}</a>");
                    }
                    ?>
                    <!-- bootstrap进度条 -->
                    <p></p>
                    <?php _e((new FRC_Validation())->getAppreciatesHtml(7)); ?>
                </ul>
                <?php } ?>
            </div>
            <!--分页爬虫-->
            <div class="tab-pane fade" id="historypage">
                <p class="p-tips-style"><?php esc_html_e(FRC_ApiError::FRC_TIPS[array_rand(FRC_ApiError::FRC_TIPS, 1)]); ?></p>
                <?php
                if (!isset($options['list'])) {
                    _e('<p></p>');
                    _e("<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的毛毛虫: 目前没有任何一个分页配置。毛毛虫我们走 </a></h4>");
                } else {
                ?>
                <table class="form-table">
                    <tr>
                        <th>选择页面的规则配置</th>
                        <td>
                            <?php
                            $option_list = $options['list'];
                            $string = '<select class="form-select" name="collect_history_relus"><option value="0">请选择一个配置</option>';
                            foreach ($option_list as $option) {
                                $string .= '<option value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                            }
                            $string .= '</select>';
                            _e($string);
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
                            <button type="button" class="btn btn-primary history-page-spider-run-button" id="liveToastBtn">采集</button>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="2"><?php _e((new FRC_Validation())->getAppreciatesHtml(7)); ?></td>
                    </tr>
                </table>
                <?php } ?>
            </div>
            <!--详情爬虫-->
            <div class="tab-pane fade" id="details">
                <?php
                if (!isset($options['single'])) {
                    _e('<p></p>');
                    _e("<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮: 目前没有任何一个详情配置。胖鼠我们走 </a></h4>");
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
                                if (in_array($option['collect_name'], FRC_ApiError::BUTTON_DISABLED)){
                                    $string .= '<option disabled value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                                } else {
                                    $string .= '<option value="'.$option['id'].'">'.$option['collect_name'].'</option>';
                                }
                            }
                            $string .= '</select>';
                            _e($string);
                            ?>
                            <p>配置创建在 新建配置->配置类型=详情</p>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <button type="button" class="btn btn-primary details-spider-run-button" id="liveToastBtn">采集</button>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="2"><?php _e((new FRC_Validation())->getAppreciatesHtml(7)); ?></td>
                    </tr>
                </table>
                <?php } ?>
            </div>
            <!--全站采集-->
            <div class="tab-pane fade spider-tab-content" id="all">
                <?php
                if (!isset($options['all'])) {
                    _e('<p></p>');
                    _e("<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的胖球: 目前没有任何一个全站采集配置。兔子我们走 </a></h4>");
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
                            _e("<a href='javascript:;' data-id='{$option['id']}' class='all-spider-run-button list-group-item'>{$option['collect_name']}</a>");
                        }
                        ?>
                        <p></p>
                    </ul>
                <?php } ?>
            </div>
            <!--胖鼠 && Todo-->
            <div class="tab-pane fade" id="todolist">
                <p></p>
                <p class="p-tips-style"><?php esc_html_e(FRC_ApiError::FRC_TIPS[array_rand(FRC_ApiError::FRC_TIPS, 1)]); ?></p>
                <div class="todo-and-author-class">
                    <div align="right" style="margin-top: 0px; float: right;">
                        <img width="300" src="<?php frc_image('fat-rat-appreciates.jpeg'); ?>" />
                    </div>
                    <h5>鼠言鼠语:</h5>
                    <ul style="">
                        <?php if (get_option(FRC_Validation::FRC_INSERT_TIME) != '') { ?>
                            <li style="color: #9b51e0">鼠友, 我们第一次相遇是在 <?php esc_html_e(date('Y年m月d日 H:i', get_option(FRC_Validation::FRC_INSERT_TIME))) ?> 在此留影, 以示纪念. </li>
                        <?php } ?>
                        <li><a href="https://www.fatrat.cn" target="_blank">胖鼠采集</a>是github开源作品, 有问题欢迎大家在<a href="https://github.com/KitePig/FatRat-Collect" target="_blank">github</a>的issues提问.</li>
                        <li>胖鼠支持有能力鼠友2次开发胖鼠采集开源使用, 鼠友不可直接Copy && Rename</a></li>
                        <li>胖鼠采集, 最重要的应该是新建一个规则并上手使用, 我觉得通过视频教程、文字教程的学习后, 20分钟就能就能搞定.</li>
                        <li>新建采集规则, 有默认的配置. 可一键导入, 无需等待, 即刻使用. 鼠友照葫芦画瓢即可.</li>
                        <li>欢迎鼠友给胖鼠采集<a href="https://www.fatrat.cn/bounty" target="_blank"> 赞赏</a>, 同时也可以给胖鼠采集插件<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">五星好评</a>, 这也算对胖鼠采集无声的支持.</li>
                        <li>胖鼠采集: 1群:454049736(已满) 2群:846069514(已满) 3群(微信群): waxx-xxswnb 加胖鼠好友,或扫描下方二维码</li>
                        <li>胖鼠采集为开源学习交流, 严禁有任何违反国家法律的行为.</li>
                        <li>胖鼠采集 20181230</li>
                        <li><img width="200" src="<?php frc_image('fat-rat-pswx.png'); ?>" /></li>
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

function frc_mysql_upgrade(){
    $option = get_option('frc_mysql_upgrade');
    if ($option == 'upgrade complete'){
        return true;
    }
    $last_id = get_option('frc_mysql_upgrade_progress', 0);
    ?>
        <h1>鼠友你好, 欢迎来到胖鼠采集2.0</h1>
        <h1>此次大版本更新, 耗时无数夜晚, 重写了胖鼠采集底层</h1>
        <h1>接下来请进行数据库迁移升级, 如遇到问题请到群内寻找帮助</h1>
        <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php esc_attr_e(admin_url('admin.php?page=frc-spider')); ?>">

        <hr />

        <?php
            if ($option == '1'){
                _e(sprintf('<button class="frc_mysql_upgrade btn btn-danger btn-lg" data-value="1">(①)点我迁移升级采集配置</button>'));
            } elseif ($option == '2') {
                _e(sprintf('<button class="frc_mysql_upgrade btn btn-danger btn-lg" data-value="2">(②)点我迁移升级采集数据表</button>'));
                _e(sprintf('<h3>大数据量用户会进行分段数据迁移,每次迁移500条,目前数据库迁移进度%s</h3>', $last_id));
            } else {
                update_option('frc_mysql_upgrade', 'upgrade complete');
                _e('<h1>升级已结束</h1>');
            }
        ?>

        <h3>过程可能过长, 请耐心等待.</h3>
    <?php

    return false;
}

function frc_front_loading(){
    array_rand(range(1,3)) == 0 && (new FRC_Validation())->notice();
    (new FRC_Validation())->report_permissions();
}
