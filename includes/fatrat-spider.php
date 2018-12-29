<?php
/**
 * Copyright (c) 2018 Fat Rat Collect . All rights reserved.
 * 胖鼠采集要做wordpress最好用的采集器.
 * 如果你觉得我写的还不错.可以去Github上 Star
 * 现在架子已经有了.欢迎大牛加入开发.一起丰富胖鼠的功能
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2018:12:28 01:01:00
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
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '微信', `collect_describe` = '作者创建. 可修改为更适合你的微信采集规则. 不可删除..', `collect_type` = 'single', `collect_content_range` = '#img-content',  `collect_content_rules` = 'title%h2|text)(content%#js_content|html' ";
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
     * 抓取历史页面
     */
    public function grab_history_page()
    {

        $history_url            = !empty($_REQUEST['collect_history_url']) ? sanitize_text_field($_REQUEST['collect_history_url']) : '';
        $history_page_number    = !empty($_REQUEST['collect_history_page_number']) ? sanitize_text_field($_REQUEST['collect_history_page_number']) : '';
        $option_id              = !empty($_REQUEST['collect_history_relus_id']) ? sanitize_text_field($_REQUEST['collect_history_relus_id']) : '';

        if (!strstr($history_url, '{page}')){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'URL不正确。未包含 {page} 关键字'];
        }

        if (empty($history_page_number)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '页码不能为空'];
        }

        $page_count = explode(',', $history_page_number);
        if (count($page_count) < 0 || count($page_count) > 10){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '页码不建议超过10页'];
        }

        $option = $this->get_option($option_id);
        if (!$option) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '未查询到配置, 配置ID错误'];
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
     * @param $option
     * @return bool
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
    protected function run_spider_list_page($option)
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
                    $item['link'] = parse_url($option['collect_list_url'])['scheme'].'://'.parse_url($option['collect_list_url'])['host'].$item['link'];
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

        // 过滤
        if ($articles->isEmpty()){
            return false;
        }

        $sign = $this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = {$option['id']} order by id desc limit 200",
            ARRAY_A
        );
        $last_sign_array = array_column($sign, 'sign');

        $articles = $articles->filter(function ($item) use ($last_sign_array) {
            if ($item != false && !in_array(md5($item['link']), $last_sign_array)) {
                return true;
            }
            return false;
        });

        // 写
        $http = new \GuzzleHttp\Client();
        $articles->map(function ($article) use ($http, $option) {
            if ($article != false && !empty($article['title']) && !empty($article['content'])) {
                $data['title'] = $this->text_keyword_replace($article['title'], $option['id']);
                $data['content'] = $this->text_keyword_replace($article['content'], $option['id']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $option['id'];
                $data['link'] = $article['link'];
                $data['author'] = get_current_user_id();
                $data['created'] = date('Y-m-d H:i:s');
                // 入库
                $this->wpdb->insert($this->table_post, $data);
                // 下载图片
                $this->download_img($article['download_img']);
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

        $ql = QueryList::range($option['collect_content_range'])
                ->encoding('UTF-8')
                ->rules($this->rulesFormat($option['collect_content_rules']));

        if (empty($ql)){
            return false;
        }
        collect(explode(' ', $urls))->map(function($url) use ($ql, $option) {

            $article = $ql->get($url)->queryData();
            $article = current($article);

            // 图片本地化
            $article = $this->matching_img($article, 'data-src');

            $data['title'] = $article['title'];
            $data['content'] = $article['content'];
            $data['image'] = isset($article['image']) ? $article['image'] : '';
            $data['post_type'] = $option['id'];
            $data['link'] = $url;
            $data['author'] = get_current_user_id();
            $data['created'] = date('Y-m-d H:i:s');
            $this->wpdb->insert($this->table_post, $data);

            // 图片下载
            $this->download_img($article['download_img']);
        });

        return true;
    }


    protected function _QueryList($url, $remove_head){
        if ( $remove_head == 1 ){
            return QueryList::get($url)->removeHead();
        }
        return QueryList::get($url);
    }


    protected function matching_img($article, $img_attr = 'src')
    {
        // 图片本地化
        $doc = phpQuery::newDocumentHTML($article['content']);
        $images = collect();
        foreach (pq($doc)->find('img') as $img) {
            // 图片名
            $originImg = pq($img)->attr($img_attr);
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
            // data-src to src
            if ($img_attr != 'src') {
                $article['content'] = str_replace('data-src="', 'src="', $article['content']);
            }
            // 存起来。图片下载
            $images->put($newImg, $originImg);
        }
        $article['download_img'] = $images;

        return $article;
    }

    protected function download_img(Illuminate\Support\Collection $download_img)
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
    $debug['debug_url']             = !empty($_REQUEST['debug_url']) ? esc_url($_REQUEST['debug_url']) : '';
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
        <span>胖鼠采集 一个可以定时采集列表新闻的采集小工具</span>
        <p></p>
        <div>

            <!-- bootstrap tabs -->
            <ul class="nav nav-tabs">
                <li class="active"><a href="#single" data-toggle="tab">微信爬虫</a></li>
                <li><a href="#list" data-toggle="tab">列表爬虫</a></li>
                <li><a href="#historypage" data-toggle="tab">列表爬虫->分页数据爬取</a></li>
                <li><a href="#details" data-toggle="tab">详情爬虫</a></li>
                <li><a href="#todolist" data-toggle="tab">TODO & Q群</a></li>
            </ul>
            <div class="tab-content spider-tab-content">
                <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
<!--                微信爬虫-->
                <div class="tab-pane fade in active" id="single">
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
<!--                列表爬虫-->
                <div class="tab-pane fade" id="list">
                    <?php
                    if (!$options['list']) {
                        echo '<p></p>';
                        echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮虾: 目前没有任何一个列表配置。皮皮虾我们走 </a></h4>";
                    } else {
                    ?>
                    <ul class="list-group">
                        <p></p>
                        <a disabled class="list-group-item active">
                            <h5 class="list-group-item-heading">
                                列表爬虫
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
                    <br/>
                    <br/>
                    <div>注释: </div>
                    <div>// 点击手动执行一次对单独网站的爬取。</div>
                    <div>// 定时爬取已开启！ 一日两次（每次间隔12小时）爬取配置中所有的网站。(后期是优化用户可以自定义时间)</div>
                    <div>// 想看爬虫下次执行时间? 安装一个插件 Cron Manager 里面有两个 frc_ 开头的任务就是咱们的自动程序</div>
                    <div>// 默认给你创建了五个网站的列表爬取配置。供参考学习</div>
                    <div>// 没爬到 失败的原因: 配置错误 - 采集超时 - 没有图片目录权限 - 文章被滤重了</div>
                    <div>// 图片是本地自动化</div>
                    <div>// 文章滤重 同一个配置 只滤近期200篇文章以内的重复文章</div>
                    <div>// 17173 列表页 有文章也有论坛帖子。暂时只抓文章。 论坛帖子内容是ajax 所以17173可能抓到文章比较少</div>
                    <div>// 图片目前默认使用相对路径。</div>
                    <?php } ?>
                </div>
                <div class="tab-pane fade" id="historypage">
                    <?php
                    if (!$options['list']) {
                        echo '<p></p>';
                        echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮虾: 目前没有任何一个详情配置。皮皮虾我们走 </a></h4>";
                    } else {
                    ?>
                    <h4>这个功能其实是列表爬取的附加功能. 目标站最新的文章太少? 先用这个功能采集一下他们的历史新闻吧</h4>
                    <table class="form-table">
                        <tr>
                            <th>文章分页地址</th>
                            <td>
                                <input name="collect_history_url" size="82" placeholder="http://timshengmingguoke.bokee.com/newest/{page}" /> 把页码的码数替换为 {page}
                            </td>
                        </tr>
                        <tr>
                            <th>要采集的页码</th>
                            <td>
                                <input name="collect_history_page_number" size="82" placeholder="2,3,4,5,6,7,8,9,10" /> 页数用逗号隔开(2,3,4)，慢点采集。一次1 ~ 3页慢慢来
                            </td>
                        </tr>
                        <tr>
                            <th>选择页面的规则配置</th>
                            <td>
                                <?php
                                $string = '<select name="collect_history_relus">';
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
                    if (!$options['single']) {
                        echo '<p></p>';
                        echo "<h4><a href='". admin_url('admin.php?page=frc-options') ."'>亲爱的皮皮: 目前没有任何一个详情配置。胖鼠我们走 </a></h4>";
                    } else {
                    ?>
                    <table class="form-table">
                        <tr>
                            <th>详情地址</th>
                            <td>
                                <textarea name="collect_details_urls" cols="80" rows="14" placeholder="多篇文章使用回车区分,一行一个。每次不要太多、要对自己的服务器心里要有数"></textarea>
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <th>详情配套配置</th>
                            <td>
                                <?php
                                $string = '<select name="collect_details_relus">';
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
                <div class="tab-pane fade" id="todolist">
                    <div>
                        <br />
                        <h2>TODO</h2>
                        <ul>
                        <li>Todo: 发布时增加发布分类功能</li>
                        <li>Todo: 发布时增加选择作者功能</li>
                        <li>Todo: 暂时不支持ajax页面</li>
                        <li>Todo: Img 指定标签是 src 还是 data-src</li>
                        <li>Todo: 增加简书 头条等爬虫</li>
                        <li>Todo: 爬虫速度优化</li>
                        <li>Todo: 各种采集/页面 错误提示 丰富</li>
                        <li>Todo: 详情路径判断是否是相对路径丰富 + 紧急</li>
                        <li>Todo: 教他们使用debug模式，在新建配置最下方</li>
                        <li>Todo: 写FAQ 刚开始用你肯定有写不懂的。不要着急。等我</li>
                        <li>Todo: 模仿一些其他采集工具爬取时候的小功能选项</li>
                        <li>Todo: 目前你每次关闭胖鼠然后再打开胖鼠。你会发现配置文件多了五个默认重复的。删除即可。有空优化</li>
                        <li>Todo: 胖鼠和其他采集器不一样。不需要脱离wordpress 完美支持jquery语法。想采什么采什么。可以删除内容任何标签</li>
                        <li>Todo: 爬取文章预览</li>
                        <li>Todo: 自定义单篇配置</li>
                        <li>Todo: ...</li>
                        </ul>

                        <h5>胖鼠Q群: 454049736</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
}
