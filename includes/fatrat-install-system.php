<?php

class FatRatInstallSystem
{

    protected $wpdb;
    protected $table_post;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'fr_post';
        $this->table_blogs = $wpdb->blogs;
    }

    public function run()
    {

        $articles = $this->wpdb->get_results(
            "select * from $this->table_post where `is_post` = 0",
            ARRAY_A
        );
        collect($articles)->map(function ($article) {
            $post = array(
                'post_title' => $article['title'],
                'post_name' => md5($article['title']),
                'post_content' => $article['content'],
                'post_status' => 'publish',
                'post_author' => get_current_user_id(),
                'post_category' => array(1),
                'tags_input' => '',
                'post_type' => 'post',
            );
            wp_insert_post($post);
            $this->wpdb->update(
                $this->table_post,
                ['is_post' => 1],
                ['id' => $article['id']],
                ['%d'],
                ['%d']
            );
        });
    }

    public function run_group()
    {
        if (!is_multisite()){
            return false;
        }

        $blogs = $this->wpdb->get_results(
            "select `blog_id` from $this->table_blogs",
            ARRAY_A
        );

        $articles = $this->wpdb->get_results(
            "select * from $this->table_post where `is_post` = 0 limit " . count($blogs),
            ARRAY_A
        );

        collect($articles)->map(function ($article, $key) use ($blogs) {
            if ($key != 0){
                $this->wpdb->set_prefix($GLOBALS['table_prefix']. $blogs[$key]['blog_id'].'_' );
            }

            $post = array(
                'post_title' => $article['title'],
                'post_name' => md5($article['title']),
                'post_content' => $article['content'],
                'post_status' => 'publish',
                'post_author' => get_current_user_id(),
                'post_category' => array(1),
                'tags_input' => '',
                'post_type' => 'post',
            );
            if (wp_insert_post($post)){
                $this->wpdb->update(
                    $this->table_post,
                    ['is_post' => 1],
                    ['id' => $article['id']],
                    ['%d'],
                    ['%d']
                );
            }
        });
        // 恢复表前缀 todo 不恢复可能会影响什么。。。？？
        $this->wpdb->set_prefix($GLOBALS['table_prefix'] );

        return true;
    }

}

// 单站点发布
function fatrat_ajax_import_articles()
{
    $crawl = new FatRatInstallSystem();
    $crawl->run();

    wp_send_json(['code'=>0, 'msg'=>'已发布']);
    wp_die();
}
add_action( 'wp_ajax_import_articles', 'fatrat_ajax_import_articles' );

// 站群发布
function fatrat_ajax_import_articles_group()
{
    $crawl = new FatRatInstallSystem();
    $crawl->run_group();

    wp_send_json(['code'=>0, 'msg'=>'已发布站群']);
    wp_die();
}
add_action( 'wp_ajax_import_articles_group', 'fatrat_ajax_import_articles_group' );


//**************** 自动发布 cron *******************

if (!wp_next_scheduled('wpjam_daily_function_hook_a')) {
    wp_schedule_event(time(), 'twohourly', 'wpjam_daily_function_hook_a');
}

add_action('wpjam_daily_function_hook_a', 'auto_install_article_to_system');
function auto_install_article_to_system()
{

    $crawl = new FatRatInstallSystem();
    $crawl->run_group();

    FatRatCrawl::log(['message' => '我在这个时间自动发布了一次', 'date' => date('Y-m-d H:i:s')] , 'auto');
}

// 清除钩子
wp_clear_scheduled_hook('wpjam_daily_function_hook_a');
//**************** cron *******************

function rat_install_system()
{
    global $wpdb;
    $table = $wpdb->prefix.'fr_post';
    $posts = $wpdb->get_results("select `title`, `link`, `post_type` from $table where `is_post` = '0' ", ARRAY_A);

//    $crawl = new FatRatInstallSystem();
//    $crawl->run_group();
    ?>
    <div>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
        单站点 <input id="import-articles-button" type="button" class="button button-primary" value="点击发布全部文章到主站">按钮点击后请不要重复点击，反应慢点
        <br />
        <hr />
        <br />
        多站点
        <div>计时任务已经自动开启。每两小时多站点发布一次 点击下方可手动执行一次，不影响计时任务</div>
        <input id="import-articles-button_group" type="button" class="button button-primary" value="点击给站群的每个站点发布一篇文章">按钮点击后请不要重复点击，反应慢点
        <br />
        <hr />
        <br />
        <div>剩余可发布数据为<?php echo count($posts) ?>条</div>
        <div>剩余文章title列表（点击跳转原文地址）</div>
        <div>@1=???  这个对应着采集配置里面的ID</div>
        <div>
            <ul><?php
            foreach ($posts as $post){
                echo "<li>@{$post['post_type']} :<a href='{$post['link']}' target='_blank'>" . $post['title'] . "</a></li>";
            }
            ?></ul>
        </div>
    </div>
    <?php
}