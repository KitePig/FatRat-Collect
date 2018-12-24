<?php

if (!class_exists('WP_List_Table')) {
    require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
}

class FRC_Install_System extends WP_List_Table
{

    protected $wpdb;
    protected $table_post;
    protected $table_blogs;
    protected $table_options;

    /** Class constructor */
    public function __construct()
    {

        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'fr_post';
        $this->table_options = $wpdb->prefix . 'fr_options';
        $this->table_blogs = $wpdb->blogs;

        parent::__construct(
            array(
                'singular' => esc_html__('采集配置', 'Far Rat Collect'),
                'plural' => esc_html__('采集配置', 'Far Rat Collect'),
                'ajax' => false,
            )
        );
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
        if (!is_multisite()) {
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
            if ($key != 0) {
                $this->wpdb->set_prefix($GLOBALS['table_prefix'] . $blogs[$key]['blog_id'] . '_');
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
            if (wp_insert_post($post)) {
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
        $this->wpdb->set_prefix($GLOBALS['table_prefix']);

        return true;
    }

    public function publish_article($article_id)
    {
        if (empty($article_id)) {
            return false;
        }

        $article = $this->wpdb->get_row(
            "select * from $this->table_post where `id` =  " . $article_id,
            ARRAY_A
        );

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

        if (wp_insert_post($post)) {
            $this->wpdb->update(
                $this->table_post,
                ['is_post' => 1],
                ['id' => $article['id']],
                ['%d'],
                ['%d']
            );
        }

        return true;
    }

    /**
     * Retrieve snippets data from the database
     *
     * @param int $per_page
     * @param int $page_number
     *
     * @return mixed
     */
    public static function get_snippets($per_page = 10, $page_number = 1, $customvar = 'all')
    {

        global $wpdb;
        $table_name = "{$wpdb->prefix}fr_post";
        $sql = "SELECT * FROM $table_name where `is_post` = '0' ";

        if ($customvar != 'all') {
            $sql .= " and `post_type` = '$customvar'";
        }

        if (!empty($_REQUEST['orderby'])) {
            $sql .= ' ORDER BY ' . esc_sql($_REQUEST['orderby']);
            $sql .= !empty($_REQUEST['order']) ? ' ' . esc_sql($_REQUEST['order']) : ' ASC';
        }

        $sql .= " LIMIT $per_page";
        $sql .= ' OFFSET ' . ($page_number - 1) * $per_page;

        $result = $wpdb->get_results($sql, 'ARRAY_A');
        return $result;
    }

    /**
     * Delete a snipppet record.
     *
     * @param int $id snippet ID
     */
    public static function delete_snippet($id)
    {

        global $wpdb;
        $table_name = "{$wpdb->prefix}fr_options";

        $wpdb->delete(
            $table_name, array('id' => $id), array('%d')
        );
    }

    /**
     * Activate a snipppet record.
     *
     * @param int $id snippet ID
     */
    public static function activate_snippet($id)
    {

    }

    /**
     * Deactivate a snipppet record.
     *
     * @param int $id snippet ID
     */
    public static function deactivate_snippet($id)
    {

    }

    /**
     * Returns the count of records in the database.
     *
     * @return null|string
     */
    public static function record_count($customvar = 'all')
    {

        global $wpdb;
        $table_name = "{$wpdb->prefix}fr_post";
        $sql = "SELECT COUNT(*) FROM $table_name where `is_post` = 0 ";

        if ($customvar != 'all') {
            $sql .= " and post_type = '$customvar'";
        }

        return $wpdb->get_var($sql);
    }

    /** Text displayed when no snippet data is available */
    public function no_items()
    {
        esc_html_e('亲爱的，目前暂时没有可以发布的文章。你可以新建一个配置。然后爬取一些文章，或者刚刚你有许多文章。点了全部发布以后。再爬 爬不到了。这是正常的。因为文章滤重过滤掉了', 'Far Rat Collect');
    }

    /**
     * Render a column when no column specific method exist.
     *
     * @param array $item
     * @param string $column_name
     *
     * @return mixed
     */
    public function column_default($item, $column_name)
    {

        switch ($column_name) {
            case 'id':
            case 'image' :
            case 'post_type' :
            case 'link' :
            case 'is_post' :
            case 'author' :
            case 'created' :
                return esc_html($item[$column_name]);
                break;
            case 'title':
                return "<a href='{$item['link']}' target='_blank'>" . esc_html(mb_substr($item[$column_name], 0, 40)) . "</a><br /><span class='publish-articles' value='{$item['id']}'><a href='#'>发布</a></span>";
                break;
            case 'content':
                return esc_html('....');
                break;
        }
    }

    /**
     * Render the bulk edit checkbox
     *
     * @param array $item
     *
     * @return string
     */
    function column_cb($item)
    {
        return sprintf(
            '<input type="checkbox" name="snippets[]" value="%s" />', $item['id']
        );
    }

    /**
     * Method for name column
     *
     * @param array $item an array of DB data
     *
     * @return string
     */
    function column_name($item)
    {

    }

    /**
     *  Associative array of columns
     *
     * @return array
     */
    function get_columns()
    {
        $columns = array(
            'cb' => '<input type="checkbox" />',
            'id' => esc_html__('ID', 'Far Rat Collect'),
            'title' => esc_html__('标题', 'Far Rat Collect'),
            'author' => esc_html__('作者', 'Far Rat Collect'),
            'created' => esc_html__('创建时间', 'Far Rat Collect'),
        );

        return $columns;
    }

    /**
     * Columns to make sortable.
     *
     * @return array
     */
    public function get_sortable_columns()
    {

        return array(
            'id' => array('id', true),
            'collect_type' => array('collect_type', true),
        );
    }

    /**
     * Returns an associative array containing the bulk action
     *
     * @return array
     */
    public function get_bulk_actions()
    {

        return array(
            'bulk-delete' => esc_html__('删除', 'Far Rat Collect'),
        );
    }

    /**
     * Handles data query and filter, sorting, and pagination.
     */
    public function prepare_items()
    {

        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();

        //Retrieve $customvar for use in query to get items.
        $customvar = (isset($_REQUEST['customvar']) ? sanitize_text_field($_REQUEST['customvar']) : 'all');
        $this->_column_headers = array($columns, $hidden, $sortable);

        /** Process bulk action */
        $this->process_bulk_action();
        $this->views();
        $per_page = $this->get_items_per_page('snippets_per_page', 10);
        $current_page = $this->get_pagenum();
        $total_items = self::record_count();

        $this->set_pagination_args(array(
            'total_items' => $total_items,
            'per_page' => $per_page,
        ));

        $this->items = self::get_snippets($per_page, $current_page, $customvar);
    }

    public function get_views()
    {
        $views = array();
        $current = (!empty($_REQUEST['customvar']) ? sanitize_text_field($_REQUEST['customvar']) : 'all');


        $options = $this->wpdb->get_results("select `id`, `collect_name` from $this->table_options", ARRAY_A);

        //All link
        $class = 'all' === $current ? ' class="current"' : '';
        $all_url = remove_query_arg('customvar');
        $views['all'] = "<a href='{$all_url}' {$class} >" . esc_html__('全部', 'Far Rat Collect') . ' (' . $this->record_count() . ')</a>';

        $class = 'wx' === $current ? ' class="current"' : '';
        $wx_url = add_query_arg('customvar', 'wx');
        $views['wx'] = "<a href='{$wx_url}' {$class} >" . esc_html__('微信', 'Far Rat Collect') . ' (' . $this->record_count('wx') . ')</a>';

        if (!empty($options)) {
            foreach ($options as $option) {
                $tmp_url = add_query_arg('customvar', $option['id']);
                $class = ($option['id'] === $current ? ' class="current"' : '');
                $views[$option['id']] = "<a href='{$tmp_url}' {$class} >" . esc_html__($option['collect_name'], 'Far Rat Collect') . ' (' . $this->record_count($option['id']) . ')</a>';

            }
        }

        return $views;
    }

    public function process_bulk_action()
    {

    }
}

/**
 * 发单篇文章
 */
function frc_ajax_frc_publish_article()
{
    $article_id = !empty($_REQUEST['article_id']) ? sanitize_text_field($_REQUEST['article_id']) : 0;
    if ( $article_id === 0 ) {
        wp_send_json(['code' => 0, 'msg' => '文章ID错误']);
        wp_die();
    }
    $article = new FRC_Install_System();
    $article->publish_article($article_id);

    wp_send_json(['code' => 0, 'msg' => '已发布']);
    wp_die();
}

add_action('wp_ajax_frc_publish_article', 'frc_ajax_frc_publish_article');

/**
 * 单站点全部导入
 */
function frc_ajax_frc_import_articles()
{
    $crawl = new FRC_Install_System();
    $crawl->run();

    wp_send_json(['code' => 0, 'msg' => '已发布']);
    wp_die();
}

add_action('wp_ajax_frc_import_articles', 'frc_ajax_frc_import_articles');

/**
 * 站群导入一篇
 */
function frc_ajax_frc_import_articles_group()
{
    $crawl = new FRC_Install_System();
    $crawl->run_group();

    wp_send_json(['code' => 0, 'msg' => '已发布站群']);
    wp_die();
}

add_action('wp_ajax_frc_import_articles_group', 'frc_ajax_frc_import_articles_group');


/**
 * 定时发布 cron
 */
if (!wp_next_scheduled('frc_cron_publish_articles_hook')) {
    wp_schedule_event(time(), 'twohourly', 'frc_cron_publish_articles_hook');
}

function frc_publish_articles_timing_task()
{

    $crawl = new FRC_Install_System();
    $crawl->run_group();

    FatRatCrawl::log(['message' => 'frc_publish_articles_timing_task', 'date' => date('Y-m-d H:i:s')], 'auto');
}

add_action('frc_cron_publish_articles_hook', 'frc_publish_articles_timing_task');
//wp_clear_scheduled_hook('frc_cron_publish_articles_hook');

function frc_install_system()
{
    $snippet_obj = new FRC_Install_System();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('数据发布中心', 'Far Rat Collect') ?></h1>
        <div>
            <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
            <div>Todo: 单站点</div>
            <div>Todo: 如果全部发送。再爬 除非有目标站新发布文章。否则滤重就全部过滤了</div>
            <div><input id="import-articles-button" type="button" class="button button-primary" value="发布全部文章到当前站点">
            </div>
            <hr/>
            <div>Todo: 多站点</div>
            <div>定时发布已经自动开启。每两小时站群中每个站点自动发布一篇文章</div>
            <div>点击下方可手动执行一次站群发布，不影响计时任务</div>
            <div><input id="import-articles-button_group" type="button" class="button button-primary"
                        value="给站群每个站点发布一篇文章"></div>
            <hr/>
        </div>
        <form method="post">
            <?php
            $snippet_obj->prepare_items();
            $snippet_obj->display();
            ?>
        </form>
    </div>
    <?php
}