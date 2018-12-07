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
    }

    protected $crawl = [
        '17173' => 'http://news.17173.com/z/pvp/list/zxwz.shtml',
    ];

    public function crawl_run()
    {
        collect($this->crawl)->map(function ($url, $platform) {
            switch ($platform) {
                case '17173':
                    $this->crawl_17173($url);
                    break;
                default:
                    break;
            }
        });
    }

    protected function crawl_17173($url)
    {
        // 读
        $articles = QueryList::get($url)
            ->rules([
                'janeTitle' => ['h3>a', 'text'],
                'link' => ['a', 'href'],
                'image' => ['a>img', 'src'],
            ])
            ->range('.list-item')
            ->query(function ($item) {
                // 新闻详情
                if (parse_url($item['link'])['host'] == 'news.17173.com'){
                    // 阅读全文
                    if ($string = strstr($item['link'], '1.shtml')){
                        $item['link'] = str_replace($string, 'all.shtml', $item['link']);
                    }
                    $ql = QueryList::get($item['link'])
                        ->range('.col-l')
                        ->rules([
                            'title' => ['.gb-final-tit-article', 'text'],
                            'content' => ['.gb-final-mod-article', 'html'],
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

        print_r('爬取数据完成..');

        // 过滤

        $sign = $this->wpdb->get_results(
            "select md5(`link`) as `sign` from $this->table_post order by id desc limit 30",
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
        $articles->map(function ($article, $i) use ($http) {
            print_r("正在处理第$i 条数据");
            if ($article != false) {
                $data['title'] = $article['title'];
                $data['content'] = $article['content'];
                $data['image'] = $article['image'];
                $data['post_type'] = '1';
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
                    $data = $http->request('get', $url)->getBody()->getContents();
                    file_put_contents(wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $imgName, $data);
                });
            }
        });

        echo '处理完成';
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


function rat_spider()
{
    ?>
    <div>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
        <input id="spider-run-button" type="button" class="button button-primary" value="点击爬取 17173">
    </div>
    <?php
}
