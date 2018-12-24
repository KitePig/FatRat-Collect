<?php

use QL\QueryList;
use GuzzleHttp\Exception\RequestException;

class FatRatCrawl
{

    protected $wpdb;
    protected $table_post;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'fr_post';
        $this->table_options = $wpdb->prefix . 'fr_options';
    }

    /**
     * todo 安全域名
     * todo 编码
     * todo 阅读全文
     * todo 入库 合并
     * todo 验证是否重复 合并
     *
     * todo 计时任务
     * todo 内容 -
     * todo 链接去除
     * todo 关键字替换
     * todo 图片跳转的URL处理
     */
    public function crawl_run($option_id)
    {
        if (empty($option_id)){
            return false;
        }

        $option = $this->option_info($option_id);
        if (empty($option)){
            return false;
        }

        $articles = $this->_QueryList($option['collect_list_url'], $option['collect_remove_head'])
            ->range($option['collect_list_range'])
            ->encoding('UTF-8')
            ->rules( $this->rulesFormat($option['collect_list_rules']) )
            ->query(function($item) use ($option) {
                // 新闻详情

                // 目前只爬当前域名
                if (!empty($item['link']) && parse_url($item['link'])['host'] == parse_url($option['collect_list_url'])['host']) {
                    try {
                        $ql = $this->_QueryList($item['link'], $option['collect_remove_head'])
                                ->range($option['collect_content_range'])
                                ->encoding('UTF-8')
                                ->rules( $this->rulesFormat($option['collect_content_rules']) )
                                ->queryData();
                    } catch (RequestException $e) {
                        self::log($e, 'error');
                        return false;
                    }

                    $ql = current($ql);
                    $item = array_merge($item, $ql);

                    // 图片本地化
                    $doc = phpQuery::newDocumentHTML($item['content']);
                    $images = collect();
                    foreach (pq($doc)->find('img') as $img) {
                        // 图片名
                        $originImg = pq($img)->attr('src');
                        if (in_array(strtolower(strrchr($originImg, '.')), ['.jpg', '.png', '.jpeg', '.gif', '.swf'])){
                            $newImg = md5($originImg) . strrchr($originImg, '.');
                        } else {
                            $suffix = '';
                            switch (getimagesize($originImg)[2]){
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
                            $newImg = md5($originImg) . $suffix;
                        }
                        // 内容url替换
                        $item['content'] = str_replace($originImg, '/wp-content/uploads' . wp_upload_dir()['subdir'] . DIRECTORY_SEPARATOR . $newImg, $item['content']);
                        // 存起来。图片下载
                        $images->put($newImg, $originImg);
                    }
                    $item['download_img'] = $images;
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
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = $option_id order by id desc limit 200",
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
        $articles->map(function ($article, $i) use ($http, $option_id) {
            print_r("正在处理第$i 条数据");
            if ($article != false && !empty($article['title']) && !empty($article['content'])) {
                $data['title'] = $this->text_keyword_replace($article['title']);
                $data['content'] = $this->text_keyword_replace($article['content']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $option_id;
                $data['link'] = $article['link'];
                $data['author'] = 'fb';
                $data['created'] = date('Y-m-d H:i:s');
                // 入库
                print_r("正在入库第$i 条数据");
                $this->wpdb->insert($this->table_post, $data);
                print_r($article['title']);
                // 下图
                print_r("正在下载第$i 条数据图片");
                $article['download_img']->map(function ($url, $imgName) use ($http) {
                    try {
                        $data = $http->request('get', $url)->getBody()->getContents();
                        file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
                    } catch (\Exception $e) {
                        self::log($e, 'error');
                    }
                });
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

    public function option_list()
    {
        return $this->wpdb->get_results("select * from $this->table_options",ARRAY_A);
    }

    public function option_info($option_id)
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

    private function text_keyword_replace($text)
    {
        if (!$text) {
            return $text;
        }
        $options = $this->wpdb->get_row("select * from $this->table_options limit 1", ARRAY_A);
        $keywords_array = explode("\n", trim($options['keywords_replace_rule']));

        collect($keywords_array)->map(function ($keywords) use (&$text) {
            list($string, $replace) = explode('=', $keywords);
            $text = str_replace($string, $replace, $text);
        });

        return $text;
    }

    public static function log($log_info, $log_type = 'info')
    {
        global $wpdb;
        $wpdb->insert($wpdb->prefix . 'fr_log', [
            'log_type' => $log_type,
            'log_info' => json_encode($log_info)
        ]);
    }

}

/**
 * 启动一个爬虫
 */
function frc_ajax_frc_spider_run()
{
    $option_id = !empty($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']) : 0 ;

    $crawl = new FatRatCrawl();
    if ($crawl->crawl_run($option_id)){
        wp_send_json(['code' => 0, 'msg' => '成功。']);
    } else {
        wp_send_json(['code' => 0, 'msg' => '失败了']);
    }
    wp_die();
}
add_action('wp_ajax_frc_spider_run', 'frc_ajax_frc_spider_run');


/**
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
    $crawl = new FatRatCrawl();
    $options = $crawl->option_list();
    foreach ($options as $option){
        $crawl->crawl_run($option['id']);
    }

    FatRatCrawl::log(['message' => 'frc_spider_timing_task', 'date' => date('Y-m-d H:i:s')] , 'auto');
}
add_action('frc_cron_spider_hook', 'frc_spider_timing_task');
//wp_clear_scheduled_hook('frc_cron_spider_hook');


function frc_spider()
{
    $crawl = new FatRatCrawl();
    $options = $crawl->option_list();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('爬虫中心', 'Far Rat Collect') ?></h1>
        <span>胖鼠采集 一个可以定时采集列表新闻的采集小工具</span>
        <div>

            <div class="progress progress-striped active">
                <div id="bootstrop-progress-bar" class="progress-bar progress-bar-success" role="progressbar"
                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                     style="width: 0%;">
                    <span class="sr-only">90% 完成（成功）</span>
                </div>
            </div>

            <?php
            if (!$options) {
                echo '<hr><div><h1>注意：你目前没有任何一个配置。要先创建去一个爬虫规则</h1><a href="' . admin_url('admin.php?page=frc-options-add-edit') . '">去创建</a></div><hr>';
            }
            echo "<ul>";
            foreach ($options as $option) {
                echo '<li><input type="button" data-id="' . $option['id'] . '" class="spider-run-button button button-primary" value="' . $option['collect_name'] . '" </li>';
            }
            ?>

            <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
            <br/>
            <br/>
            <div>Todo: 点击手动执行一次对单独网站的爬取。</div>
            <div>Todo: 定时爬取已开启！ 一日两次（每次间隔12小时）爬取配置中所有的网站。(后期是优化用户可以自定义时间)</div>
            <div>Todo: 默认给你创建了五个插件的配置。仅供参考</div>
            <div>Todo: 可能失败的原因: 配置错误 - 采集超时 - 没有图片目录权限 - 文章被滤重了</div>
            <div>Todo: 图片是本地自动化</div>
            <div>Todo: 文章滤重 同一个配置 只滤近期200篇文章以内的重复文章</div>
            <div>Todo: 17173 列表页 有文章也有论坛帖子。暂时只抓文章。 论坛帖子内容是ajax</div>
            <div>Todo: 发布分类</div>
        </div>
    </div>
    <?php
}
