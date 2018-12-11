<?php

use QL\QueryList;

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

    protected $crawl = [
        '17173' => 'http://news.17173.com/z/pvp/list/zxwz.shtml',
        'yzz' => 'http://xy2.yzz.cn/guide/skill/',
        'adventure_mood' => 'http://mxd.52pk.com/xinq/',
        'adventure_strategy' => 'http://mxd.52pk.com/zhiye/list_2186_1.html',
    ];

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
    public function crawl_run()
    {
        collect($this->crawl)->map(function ($url, $platform) {
            switch ($platform) {
                case '17173':
                    $this->crawl_17173($url);
                    break;
                case 'yzz':
                    $this->crawl_yezizhu($url);
                    break;
                case 'adventure_mood':
                    $this->crawl_adventure_mood($url);
                    break;
                case 'adventure_strategy':
                    $this->crawl_adventure_strategy($url);
                    break;
                default:
                    break;
            }
        });
    }

    protected function crawl_adventure_strategy($url)
    {
        $securityDomain = 'mxd.52pk.com';
        $post_type = '4';

        // 读
        $articles = QueryList::get($url)
            ->range('.mb1>ul>li')
            ->encoding('UTF-8')
            ->removeHead()
            ->rules([
                'janeTitle' => ['a', 'text'],
                'link'      => ['a', 'href'],
//                'image' => ['a>img', 'src'],
            ])
            ->query(function ($item) use ($securityDomain) {
                // 新闻详情
                if (!empty($item['link']) && parse_url($item['link'])['host'] == $securityDomain){
                    // 阅读全文
//                    if ($string = strstr($item['link'], '1.shtml')){
//                        $item['link'] = str_replace($string, 'all.shtml', $item['link']);
//                    }
                    $ql = QueryList::get($item['link'])
                        ->range('#main>div[class=content]')
                        ->encoding('UTF-8')
                        ->removeHead()
                        ->rules([
                            'title' => ['h2', 'text'],
                            'content' => ['div[class=article_show]', 'html', 'a'],
                        ])
                        ->queryData();

                    $ql = current($ql);
                    $item = array_merge($item, $ql);

                    // 图片本地化
                    $doc = phpQuery::newDocumentHTML($item['content']);
                    $images = collect();
                    foreach (pq($doc)->find('img') as $img) {
                        // 图片名
                        $originImg = pq($img)->attr('src');
                        $newImg = md5($originImg) . strrchr($originImg, '.');
                        // 内容url替换
                        $item['content'] = str_replace($originImg, wp_upload_dir()['url'] . DIRECTORY_SEPARATOR . $newImg, $item['content']);
                        // 存起来。图片下载
                        $images->put($newImg, $originImg);
                    }
                    $item['download_img'] = $images;
                    return $item;
                }
                return false;
            })->getData();

        // 过滤

        $sign = $this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = $post_type order by id desc limit 200",
            ARRAY_A
        );
        $last_sign_array = array_column($sign, 'sign');

        $articles = $articles->filter(function ($item) use ($last_sign_array){
            if ($item != false && !in_array(md5($item['link']), $last_sign_array)){
                return true;
            }
            return false;
        });

        // 写
        $http = new \GuzzleHttp\Client();
        $articles->map(function ($article, $i) use ($http, $post_type) {
            print_r("正在处理第$i 条数据");
            if ($article != false) {
                $data['title'] = $this->text_keyword_replace($article['title']);
                $data['content'] = $this->text_keyword_replace($article['content']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $post_type;
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
                    try{
                        $data = $http->request('get', $url)->getBody()->getContents();
                        file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
                    } catch (\Exception $e){
                        self::log($e,'error');
                    }
                });
            }
        });
    }

    protected function crawl_adventure_mood($url)
    {
        $securityDomain = 'mxd.52pk.com';
        $post_type = '3';

        // 读
        $articles = QueryList::get($url)
            ->range('.mb1>ul>li')
            ->encoding('UTF-8')
            ->removeHead()
            ->rules([
                'janeTitle' => ['a', 'text'],
                'link'      => ['a', 'href'],
//                'image' => ['a>img', 'src'],
            ])
            ->query(function ($item) use ($securityDomain) {
                // 新闻详情
                if (!empty($item['link']) && parse_url($item['link'])['host'] == $securityDomain){
                    // 阅读全文
//                    if ($string = strstr($item['link'], '1.shtml')){
//                        $item['link'] = str_replace($string, 'all.shtml', $item['link']);
//                    }
                    $ql = QueryList::get($item['link'])
                        ->range('#main>div[class=content]')
                        ->encoding('UTF-8')
                        ->removeHead()
                        ->rules([
                            'title' => ['h2', 'text'],
                            'content' => ['div[class=article_show]', 'html', 'a'],
                        ])
                        ->queryData();

                    $ql = current($ql);
                    $item = array_merge($item, $ql);

                    // 图片本地化
                    $doc = phpQuery::newDocumentHTML($item['content']);
                    $images = collect();
                    foreach (pq($doc)->find('img') as $img) {
                        // 图片名
                        $originImg = pq($img)->attr('src');
                        $newImg = md5($originImg) . strrchr($originImg, '.');
                        // 内容url替换
                        $item['content'] = str_replace($originImg, wp_upload_dir()['url'] . DIRECTORY_SEPARATOR . $newImg, $item['content']);
                        // 存起来。图片下载
                        $images->put($newImg, $originImg);
                    }
                    $item['download_img'] = $images;
                    return $item;
                }
                return false;
            })->getData();

        // 过滤

        $sign = $this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = $post_type order by id desc limit 200",
            ARRAY_A
        );
        $last_sign_array = array_column($sign, 'sign');

        $articles = $articles->filter(function ($item) use ($last_sign_array){
            if ($item != false && !in_array(md5($item['link']), $last_sign_array)){
                return true;
            }
            return false;
        });

        // 写
        $http = new \GuzzleHttp\Client();
        $articles->map(function ($article, $i) use ($http, $post_type) {
            print_r("正在处理第$i 条数据");
            if ($article != false) {
                $data['title'] = $this->text_keyword_replace($article['title']);
                $data['content'] = $this->text_keyword_replace($article['content']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $post_type;
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
                    try{
                        $data = $http->request('get', $url)->getBody()->getContents();
                        file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
                    } catch (\Exception $e){
                        self::log($e,'error');
                    }
                });
            }
        });
    }

    protected function crawl_yezizhu($url)
    {
        $securityDomain = 'xy2.yzz.cn';
        $post_type = '2';

        // 读
        $articles = QueryList::get($url)
            ->range('#getMaxHeight>ul>li')
            ->encoding('UTF-8')
            ->removeHead()
            ->rules([
                'janeTitle' => ['a', 'text'],
                'link'      => ['a', 'href'],
//                'image' => ['a>img', 'src'],
            ])
            ->query(function ($item) use ($securityDomain) {
                // 新闻详情
                if (!empty($item['link']) && parse_url($item['link'])['host'] == $securityDomain){
                    // 阅读全文
//                    if ($string = strstr($item['link'], '1.shtml')){
//                        $item['link'] = str_replace($string, 'all.shtml', $item['link']);
//                    }
                    $ql = QueryList::get($item['link'])
                        ->range('#article')
                        ->encoding('UTF-8')
                        ->removeHead()
                        ->rules([
                            'title' => ['h1', 'text'],
                            'content' => ['table', 'html', 'a -.editor -p:last -div[class=tag]'],
                        ])
                        ->queryData();

                    $ql = current($ql);
                    $item = array_merge($item, $ql);

                    // 图片本地化
                    $doc = phpQuery::newDocumentHTML($item['content']);
                    $images = collect();
                    foreach (pq($doc)->find('img') as $img) {
                        // 图片名
                        $originImg = pq($img)->attr('src');
                        $newImg = md5($originImg) . strrchr($originImg, '.');
                        // 内容url替换
                        $item['content'] = str_replace($originImg, wp_upload_dir()['url'] . DIRECTORY_SEPARATOR . $newImg, $item['content']);
                        // 存起来。图片下载
                        $images->put($newImg, $originImg);
                    }
                    $item['download_img'] = $images;
                    return $item;
                }
                return false;
            })->getData();

        // 过滤

        $sign = $this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = $post_type order by id desc limit 200",
            ARRAY_A
        );
        $last_sign_array = array_column($sign, 'sign');

        $articles = $articles->filter(function ($item) use ($last_sign_array){
            if ($item != false && !in_array(md5($item['link']), $last_sign_array)){
                return true;
            }
            return false;
        });

        // 写
        $http = new \GuzzleHttp\Client();
        $articles->map(function ($article, $i) use ($http, $post_type) {
            print_r("正在处理第$i 条数据");
            if ($article != false) {
                $data['title'] = $this->text_keyword_replace($article['title']);
                $data['content'] = $this->text_keyword_replace($article['content']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $post_type;
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
                    try{
                        $data = $http->request('get', $url)->getBody()->getContents();
                        file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
                    } catch (\Exception $e){
                        self::log($e,'error');
                    }
                });
            }
        });
    }

    protected function crawl_17173($url)
    {
        $securityDomain = 'news.17173.com';
        $post_type = '1';
        // 读
        $articles = QueryList::get($url)
            ->rules([
                'janeTitle' => ['h3>a', 'text'],
                'link' => ['a', 'href'],
                'image' => ['a>img', 'src'],
            ])
            ->range('.list-item')
            ->query(function ($item) use ($securityDomain) {
                // 新闻详情
                if (!empty($item['link']) && parse_url($item['link'])['host'] == $securityDomain){
                    // 阅读全文
                    if ($string = strstr($item['link'], '_1.shtml')){
                        $item['link'] = str_replace($string, '_all.shtml', $item['link']);
                    }
                    $ql = QueryList::get($item['link'])
                        ->range('.col-l')
                        ->rules([
                            'title' => ['.gb-final-tit-article', 'text'],
                            'content' => ['.gb-final-mod-article', 'html', 'a -.include-style3 -.loltag -div:last -#content_end -style:gt(-1)'],
                        ])
                        ->queryData();
                    $ql = current($ql);
                    $item = array_merge($item, $ql);

                    // 图片本地化
                    $doc = phpQuery::newDocumentHTML($item['content']);
                    $images = collect();
                    foreach (pq($doc)->find('img') as $img) {
                        // 图片名
                        $originImg = pq($img)->attr('src');
                        $newImg = md5($originImg) . strrchr($originImg, '.');
                        // 内容url替换
                        $item['content'] = str_replace($originImg, wp_upload_dir()['url'] . DIRECTORY_SEPARATOR . $newImg, $item['content']);
                        // 存起来。图片下载
                        $images->put($newImg, $originImg);
                    }
                    $item['download_img'] = $images;
                    return $item;
                }
                return false;
            })->getData();

        // 过滤
        $sign = $this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post where `post_type` = $post_type order by id desc limit 30",
            ARRAY_A
        );
        $last_sign_array = array_column($sign, 'sign');

        $articles = $articles->filter(function ($item) use ($last_sign_array){
            if ($item != false && !in_array(md5($item['link']), $last_sign_array)){
                return true;
            }
            return false;
        });

        // 写
        $http = new \GuzzleHttp\Client();
        $articles->map(function ($article, $i) use ($http, $post_type) {
            print_r("正在处理第$i 条数据");
            if ($article != false) {
                $data['title'] = $this->text_keyword_replace($article['title']);
                $data['content'] = $this->text_keyword_replace($article['content']);
                $data['image'] = isset($article['image']) ? $article['image'] : '';
                $data['post_type'] = $post_type;
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
                    try{
                        $data = $http->request('get', $url)->getBody()->getContents();
                        file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
                    } catch (\Exception $e){
                        self::log($e,'error');
                    }
                });
            }
        });
    }

    private function text_keyword_replace($text){
        if (!$text){
            return $text;
        }
        $options = $this->wpdb->get_row("select * from $this->table_options limit 1", ARRAY_A);
        $keywords_array = explode("\n", trim($options['keywords_replace_rule']));

        collect($keywords_array)->map(function ($keywords) use (&$text){
            list($string, $replace) = explode('=', $keywords);
            $text = str_replace($string, $replace, $text );
        });

        return $text;
    }

    public static function log($log_info, $log_type = 'info'){
        global $wpdb;
        $wpdb->insert($wpdb->prefix . 'fr_log', [
                'log_type' => $log_type,
                'log_info' => $log_info
        ]);
    }

}

function fatrat_ajax_spider_run()
{
    $crawl = new FatRatCrawl();
    $crawl->crawl_run();

    wp_send_json(['code'=>0, 'msg'=>'正在爬取中']);
    wp_die();
}
add_action( 'wp_ajax_spider_run', 'fatrat_ajax_spider_run' );

//**************** cron *******************
FatRatCrawl::log(date('Y-m-d H:i:s',wp_next_scheduled('wpjam_daily_function_hook')));

if (!wp_next_scheduled('wpjam_daily_function_hook')) {
    wp_schedule_event( time(), 'everytenminutes', 'wpjam_daily_function_hook' );
}

add_action( 'wpjam_daily_function_hook', 'wpjam_daily_function');
function wpjam_daily_function() {

    $crawl = new FatRatCrawl();
    $crawl->crawl_run();
    global $wpdb;
    $wpdb->insert( $wpdb->prefix . 'fr_options', ['remove_outer_link' => '1', 'keywords_replace_rule' => '测1试cron'.date('Y-m-d H:i:s')]);
}
//wp_clear_scheduled_hook('wpjam_daily_function_hook');
//**************** cron *******************

function rat_spider()
{
    $crawl = new FatRatCrawl();
    $crawl->crawl_run();
    ?>
    <div>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
        <input id="spider-run-button" type="button" class="button button-primary" value="点击爬取 17173 叶子猪 冒险岛心情 冒险岛攻略">
    </div>
    <?php
}
