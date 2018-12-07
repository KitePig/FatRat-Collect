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

}


function fatrat_ajax_import_articles()
{
    $crawl = new FatRatInstallSystem();
    $crawl->run();

    wp_send_json(['code'=>0, 'msg'=>'已发布']);
    wp_die();
}
add_action( 'wp_ajax_import_articles', 'fatrat_ajax_import_articles' );


function rat_install_system()
{
    ?>
    <div>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
        <input id="import-articles-button" type="button" class="button button-primary" value="点击发布爬取到的文章">
    </div>
    <?php
}