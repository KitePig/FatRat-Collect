<?php
/**
 * Copyright (c) 2018 Fat Rat Collect . All rights reserved.
 * 胖鼠采集要做wordpress最好用的采集器.
 * 如果你觉得我写的还不错.可以去Github上 Star
 * 现在架子已经有了.欢迎大牛加入开发.一起丰富胖鼠的功能
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
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
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '微信', `collect_describe` = '胖鼠创建. 可修改为更适合你的微信采集规则. 不可删除..', `collect_type` = 'single', `collect_content_range` = '#img-content',  `collect_content_rules` = 'title%#activity-name|text|null)(content%#js_content|html|null' ";
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
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '简书', `collect_describe` = '胖鼠创建. 可修改为更适合你的简书采集规则. 不可删除..', `collect_type` = 'single', `collect_content_range` = '.article',  `collect_content_rules` = 'title%h1[class=title]|text|null)(content%div[class=show-content]|html|a' ";
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

        $articles = $this->_QueryList($option['collect_list_url'], $option['collect_remove_head'])
            ->range($option['collect_list_range'])
            ->encoding('UTF-8')
            ->rules( $this->rulesFormat($option['collect_list_rules']) )
            ->query(function($item) use ($option) {
                // 新闻详情

                // 如果没有域名头自动拼接一下
                if (!isset(parse_url($item['link'])['host'])){
                    $item['link'] = parse_url($option['collect_list_url'])['scheme'].'://'.parse_url($option['collect_list_url'])['host'].'/'.ltrim($item['link'], '/');
                }

                // 目前只爬当前域名
                if (!empty($item['link']) && parse_url($item['link'])['host'] == parse_url($option['collect_list_url'])['host']) {
                    try {
                        $ql = $this->_QueryList($item['link'], $option['collect_remove_head'])
                            ->range($option['collect_content_range'])
                            ->encoding('UTF-8')
                            ->rules( $this->rulesFormat($option['collect_content_rules']) )
                            ->queryData();
                    } catch (RequestException $e) {
                        return false;
                    }

                    $ql = current($ql);
                    $item = array_merge($item, $ql);

                    // 图片本地化
                    $item = $this->matching_img($item);

                    return $item;
                }
                return false;
            })
            ->getData();

        if ($articles->isEmpty()){
            return false;
        }

        // 过滤
        $last_sign_array = array_column($this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = {$option['id']} order by id desc limit 200",
            ARRAY_A
        ), 'sign');
        $articles = $articles->filter(function ($item) use ($last_sign_array) {
            if ($item != false && !in_array(md5($item['link']), $last_sign_array)) {
                return true;
            }
            return false;
        });

        $articles->map(function ($article) use ($option) {
            if ($article != false && !empty($article['title']) && !empty($article['content'])) {
                $data['title'] = $this->text_keyword_replace($article['title'], $option['id']);
                $data['content'] = $this->text_keyword_replace($article['content'], $option['id']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $option['id'];
                $data['link'] = $article['link'];
                $data['author'] = get_current_user_id();
                $data['created'] = date('Y-m-d H:i:s');
                if ($this->wpdb->insert($this->table_post, $data)){
                    $this->download_img($article['download_img']);
                }
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

            $article = $this->matching_img($article);
            if ($article != false && !empty($article['title']) && !empty($article['content'])) {
                $data['title'] = $this->text_keyword_replace($article['title'], $option['id']);
                $data['content'] = $this->text_keyword_replace($article['content'], $option['id']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $option['id'];
                $data['link'] = $url;
                $data['author'] = get_current_user_id();
                $data['created'] = date('Y-m-d H:i:s');
                if ($this->wpdb->insert($this->table_post, $data)){
                    $this->download_img($article['download_img']);
                }
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


    protected function matching_img($article)
    {
        //  图片的异步加载src属性值
        $img_special_src = ['src', 'data-src', 'data-original-src'];
        $doc = phpQuery::newDocumentHTML($article['content']);
        $images = collect();
        foreach ($img_special_src as $special_src){
            foreach (pq($doc)->find('img') as $img) {
                $originImg = pq($img)->attr($special_src);
                if (!$originImg){
                    break;
                }

                $suffix = '';
                if (in_array(strtolower(strrchr($originImg, '.')), ['.jpg', '.png', '.jpeg', '.gif', '.swf'])) {
                    $suffix = strrchr($originImg, '.');
                } else {
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

                $article['content'] = str_replace($originImg, '/wp-content/uploads' . wp_upload_dir()['subdir'] . DIRECTORY_SEPARATOR . $newImg, $article['content']);
                // src format
                if ($special_src != 'src') {
                    $article['content'] = str_replace($special_src.'="', 'src="', $article['content']);
                }
                $images->put($newImg, $originImg);
            }
        }

        $article['download_img'] = $images;

        return $article;
    }


    protected function download_img($download_img)
    {
        $http = new \GuzzleHttp\Client();
        $download_img->map(function ($url, $imgName) use ($http) {
            try {
                $data = $http->request('get', $url)->getBody()->getContents();
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
if (!wp_next_scheduled('frc_cron_spider_hook')) {
    wp_schedule_event(time(), 'twicedaily', 'frc_cron_spider_hook');
}


function frc_spider_timing_task()
{
    $frc_spider = new FRC_Spider();
    $options = $frc_spider->get_option_list();
    foreach ($options as $option){
        $frc_spider->run_spider_list_page($option);
    }
}
add_action('frc_cron_spider_hook', 'frc_spider_timing_task');
//wp_clear_scheduled_hook('frc_cron_spider_hook');


function frc_spider()
{
    $frc_spider = new FRC_Spider();
    $options = collect($frc_spider->get_option_list())->groupBy('collect_type');
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('胖鼠爬虫', 'Fat Rat Collect') ?></h1>
        <p></p>
        <span>胖鼠采集 要做Wordpress最好的采集小工具</span>
        <p></p>
        <div>

            <!-- bootstrap tabs -->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#single_wx" data-toggle="tab">微信爬虫</a></li>
                <li><a href="#single_js" data-toggle="tab">简书爬虫</a></li>
                <li><a href="#list" data-toggle="tab">列表爬虫</a></li>
                <li><a href="#historypage" data-toggle="tab">列表爬虫->分页数据爬取</a></li>
                <li><a href="#details" data-toggle="tab">详情爬虫</a></li>
                <li><a href="#autospider" data-toggle="tab">自动爬虫</a></li>
                <li><a href="#todolist" data-toggle="tab">TODO & 胖鼠</a></li>
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
                                <p>有些小功能 以后有人需要的话再做吧. 现在没空. 欢迎你给我需求.</p>
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
                                <p>简书默认规则过滤了a标签,你们可以在配置中心看到.</p>
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
                        echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮虾: 目前没有任何一个详情配置。皮皮虾我们走 </a></h4>";
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
                    <p>已自动开启</p>
                    <p>12小时爬取一次</p>
                </div>
                <div class="tab-pane fade" id="todolist">
                    <p class="p-tips-style"><?php esc_html_e(FRC_Api_Error::FRC_TIPS[array_rand(FRC_Api_Error::FRC_TIPS, 1)]); ?></p>
                    <div class="todo-and-author-class">
                        <h3>TODO:</h3>
                        <p>建议大家及时更新胖鼠,推荐最新版</p>
                        <ul>
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
                        <li>Todo: 采集时是否增加采集作者?时间?</li>
                        <li>Todo: 发布时增加选择发布分类?发布人?等功能?</li>
                        <li>Todo: 给列表和详情 支持ajax页面爬取?</li>
                        <li>Todo: ok 内容中Img图片自动识别 图片属性src? data-src? 或者其他?</li>
                        <li>Todo: 增加简书 头条等其他和微信一样默认爬虫?</li>
                        <li>Todo: 多线程爬虫.爬虫速度优化..</li>
                        <li>Todo: 各种采集/页面 错误提示 更加丰富? 让用户看到所有错误.</li>
                        <li>Todo: ok 详情页面 访问路径判断是(相对/绝对)路径（紧急）</li>
                        <li>Todo: 教会用户会使用debug模式，在新建配置页下方</li>
                        <li>Todo: FAQ丰富一下.</li>
                        <li>Todo: 是否要模仿一些其他采集工具的小功能选项? 有必要吗?</li>
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
                        </ul>
                        <hr />
                        <h4>胖鼠留:</h4>
                        <ul>
                            <li>胖鼠采集: <a href="https://github.com/fbtopcn/fatratcollect">Github</a> 欢迎 Star. Fork.</li>
                            <li>大家可以使用所有功能, 功能全部无保留给大家免费开放.(自动采集/自动发布)</li>
                            <li>有用的不爽的地方, 大家可以联系我, 接受大家提出的合理的需求, 迭代.</li>
                            <li>配置默认给咱们留了一些, 大家前几次不会写可以照葫芦画瓢. 还有疑问可以来找鼠友帮忙.</li>
                            <li>胖鼠采集配置页.应该比较人性化了, 自我感觉上手使用应该不会超过20分钟. 胖鼠应该可以碾压插件库中的其他 某某某某 好多采集插件, 当然也有些做的不错的, 但是感觉代码随意了好多.</li>
                            <li>胖鼠的设计思想-分三大块. 爬虫模块|配置模块|数据模块 爬虫模块主要使用配置模块的各种特色配置来爬取数据 配置模块为爬虫模块提供支持 数据模块支撑胖鼠各种特色发布功能!</li>
                            <li>使用环境: Wordpress新版 Php7+ 版本 Mysql Nginx 没有要求, 服务器带宽也不要太慢, 毕竟爬虫嘛.不想去兼容PHP7以下的站点.麻烦.</li>
                            <li>胖鼠声明: 作者原创; 供参考学习, 作者不承担任何法律风险. 前端Html使用<a href="http://www.bootcss.com/">Bootstrap</a> 采集基于<a href="https://www.querylist.cc/docs/guide/v4/overview">QueryList</a></li>
                            <li>如果你用了觉得不错, 可以去给胖鼠<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews">打个分</a>!</li>
                            <li>胖鼠Q群: 454049736 希望抽空大家帮忙推荐一下.或者给胖鼠打个分,这都是对作者无声的支持.</li>
                            <li></li>
                            <li>胖鼠第一次上线: 2018年12月30日 02:24</li>
                            <li><img src="<?php echo plugin_dir_url(dirname(__FILE__)).'images/fat-rat-128x128.png'  ?>" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
}
