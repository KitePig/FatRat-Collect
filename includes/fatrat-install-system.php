<?php
if ( ! class_exists( 'WP_List_Table' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class FatRatInstallSystem extends WP_List_Table {

    protected $wpdb;
    protected $table_post;
    protected $table_blogs;
    protected $table_options;

    /** Class constructor */
    public function __construct() {

        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'fr_post';
        $this->table_options = $wpdb->prefix . 'fr_options';
        $this->table_blogs = $wpdb->blogs;

        parent::__construct(
            array(
                'singular' => esc_html__( '采集配置', 'Far Rat Collect' ),
                'plural' => esc_html__( '采集配置', 'Far Rat Collect' ),
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

    public function publish_article($article_id)
    {
        if (empty($article_id)){
            return false;
        }

        $article = $this->wpdb->get_row(
            "select * from $this->table_post where `id` =  ".$article_id,
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

        if (wp_insert_post($post)){
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
    public static function get_snippets( $per_page = 10, $page_number = 1, $customvar = 'all' ) {

        global $wpdb;
        $table_name = "{$wpdb->prefix}fr_post";
        $sql = "SELECT * FROM $table_name where `is_post` = '0' ";

        if ( $customvar != 'all' ) {
            $sql .= " and `post_type` = '$customvar'";
        }

        if ( ! empty( $_REQUEST['orderby'] ) ) {
            $sql .= ' ORDER BY ' . esc_sql( $_REQUEST['orderby'] );
            $sql .= ! empty( $_REQUEST['order'] ) ? ' ' . esc_sql( $_REQUEST['order'] ) : ' ASC';
        }

        $sql .= " LIMIT $per_page";
        $sql .= ' OFFSET ' . ( $page_number - 1 ) * $per_page;

        $result = $wpdb->get_results( $sql, 'ARRAY_A' );
        return $result;
    }

    /**
     * Delete a snipppet record.
     *
     * @param int $id snippet ID
     */
    public static function delete_snippet( $id ) {

        global $wpdb;
        $table_name = "{$wpdb->prefix}fr_options";

        $wpdb->delete(
            $table_name, array( 'id' => $id ), array( '%d' )
        );
    }

    /**
     * Activate a snipppet record.
     *
     * @param int $id snippet ID
     */
    public static function activate_snippet( $id ) {

        global $wpdb;
        $table_name = "{$wpdb->prefix}hfcm_scripts";

        $wpdb->update(
            $table_name, array(
            'status' => 'active',
        ), array( 'script_id' => $id ), array( '%s' ), array( '%d' )
        );
    }

    /**
     * Deactivate a snipppet record.
     *
     * @param int $id snippet ID
     */
    public static function deactivate_snippet( $id ) {

        global $wpdb;
        $table_name = "{$wpdb->prefix}hfcm_scripts";

        $wpdb->update(
            $table_name, array(
            'status' => 'inactive',
        ), array( 'script_id' => $id ), array( '%s' ), array( '%d' )
        );
    }

    /**
     * Returns the count of records in the database.
     *
     * @return null|string
     */
    public static function record_count( $customvar = 'all' ) {

        global $wpdb;
        $table_name = "{$wpdb->prefix}fr_post";
        $sql = "SELECT COUNT(*) FROM $table_name where `is_post` = 0 ";

        if ( $customvar != 'all' ) {
            $sql .= " and post_type = '$customvar'";
        }

        return $wpdb->get_var( $sql );
    }

    /** Text displayed when no snippet data is available */
    public function no_items() {
        esc_html_e( 'No Snippets avaliable.', 'Far Rat Collect' );
    }

    /**
     * Render a column when no column specific method exist.
     *
     * @param array $item
     * @param string $column_name
     *
     * @return mixed
     */
    public function column_default( $item, $column_name ) {

        switch ( $column_name ) {
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
                $edit_url = admin_url( 'admin.php?page=rat-options-add-edit&option_id='. $item['id']);
                return "<a href='{$item['link']}' target='_blank'>".esc_html( mb_substr($item[$column_name], 0, 40) )."</a><br /><span class='publish-articles' value='{$item['id']}'><a href='#'>发布</a></span>";
                break;
            case 'content':
                return esc_html( '....' );
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
    function column_cb( $item ) {
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
    function column_name( $item ) {

//        $delete_nonce = wp_create_nonce( 'hfcm_delete_snippet' );
        $edit_nonce = wp_create_nonce( 'rat-install-system' );

        $title = '<strong>' . $item['title'] . '</strong>';

        $actions = array(
            'title' => sprintf( '<a href="?page=%s&action=%s&id=%s&_wpnonce=%s">' . esc_html__( 'Edit', 'Far Rat Collect' ) . '</a>', esc_attr( 'fat-add-update' ), 'edit', absint( $item['id'] ), $edit_nonce ),
//            'delete' => sprintf( '<a href="?page=%s&action=%s&snippet=%s&_wpnonce=%s">' . esc_html__( 'Delete', 'Far Rat Collect' ) . '</a>', esc_attr( $_REQUEST['page'] ), 'delete', absint( $item['script_id'] ), $delete_nonce ),
        );

        return $title . $this->row_actions( $actions );
    }

    /**
     *  Associative array of columns
     *
     * @return array
     */
    function get_columns() {
        $columns = array(
            'cb'            => '<input type="checkbox" />',
            'id'            => esc_html__( 'ID', 'Far Rat Collect' ),
            'title'         => esc_html__( '标题', 'Far Rat Collect' ),
            'author'        => esc_html__( '作者', 'Far Rat Collect' ),
            'created'       => esc_html__( '创建时间', 'Far Rat Collect' ),
        );

        return $columns;
    }

    /**
     * Columns to make sortable.
     *
     * @return array
     */
    public function get_sortable_columns() {

        return array(
            'id' => array( 'id', true ),
            'collect_type' => array( 'collect_type', true ),
        );
    }

    /**
     * Returns an associative array containing the bulk action
     *
     * @return array
     */
    public function get_bulk_actions() {

        return array(
            'bulk-delete'     => esc_html__( '删除', 'Far Rat Collect' ),
        );
    }

    /**
     * Handles data query and filter, sorting, and pagination.
     */
    public function prepare_items() {

        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();

        //Retrieve $customvar for use in query to get items.
        $customvar = ( isset( $_REQUEST['customvar'] ) ? $_REQUEST['customvar'] : 'all');
        $this->_column_headers = array( $columns, $hidden, $sortable );

        /** Process bulk action */
        $this->process_bulk_action();
        $this->views();
        $per_page = $this->get_items_per_page( 'snippets_per_page', 10 );
        $current_page = $this->get_pagenum();
        $total_items = self::record_count();

        $this->set_pagination_args(array(
            'total_items' => $total_items,
            'per_page'    => $per_page,
        ));

        $this->items = self::get_snippets( $per_page, $current_page, $customvar );
    }

    public function get_views() {
        $views = array();
        $current = ( ! empty( $_REQUEST['customvar'] ) ? $_REQUEST['customvar'] : 'all');


        $options = $this->wpdb->get_results("select `id`, `collect_name` from $this->table_options",ARRAY_A);

        //All link
        $class = 'all' === $current ? ' class="current"' : '';
        $all_url = remove_query_arg( 'customvar' );
        $views['all'] = "<a href='{$all_url }' {$class} >" . esc_html__( '全部', 'Far Rat Collect' ) . ' (' . $this->record_count() . ')</a>';

        if (!empty($options)){
            foreach ($options as $option){
                $foo_url = add_query_arg( 'customvar', $option['id'] );
                $class = ( $option['id'] === $current ? ' class="current"' : '');
                $views[$option['id']] = "<a href='{$foo_url}' {$class} >" . esc_html__( $option['collect_name'], 'Far Rat Collect' ) . ' (' . $this->record_count( $option['id'] ) . ')</a>';

            }
        }

        return $views;
    }

    public function process_bulk_action() {

        //Detect when a bulk action is being triggered...
        if ( 'delete' === $this->current_action() ) {

            // In our file that handles the request, verify the nonce.
            $nonce = esc_attr( $_REQUEST['_wpnonce'] );

            if ( ! wp_verify_nonce( $nonce, 'hfcm_delete_snippet' ) ) {
                die( 'Go get a life script kiddies' );
            } else {
                self::delete_snippet( absint( $_GET['snippet'] ) );

                hfcm_redirect( admin_url( 'admin.php?page=hfcm-list' ) );
                return;
            }
        }

        // If the delete bulk action is triggered
        if (
            ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] )
        ) {
            $delete_ids = esc_sql( $_POST['snippets'] );

            // loop over the array of record IDs and delete them
            foreach ( $delete_ids as $id ) {
                self::delete_snippet( $id );
            }

            hfcm_redirect( admin_url( 'admin.php?page=hfcm-list' ) );
            return;
        } elseif (
            ( isset( $_POST['action'] ) && 'bulk-activate' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-activate' === $_POST['action2'] )
        ) {

            $activate_ids = esc_sql( $_POST['snippets'] );

            // loop over the array of record IDs and activate them
            foreach ( $activate_ids as $id ) {
                self::activate_snippet( $id );
            }

            hfcm_redirect( admin_url( 'admin.php?page=hfcm-list' ) );
            return;
        } elseif (
            ( isset( $_POST['action'] ) && 'bulk-deactivate' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-deactivate' === $_POST['action2'] )
        ) {

            $delete_ids = esc_sql( $_POST['snippets'] );

            // loop over the array of record IDs and deactivate them
            foreach ( $delete_ids as $id ) {
                self::deactivate_snippet( $id );
            }

            hfcm_redirect( admin_url( 'admin.php?page=hfcm-list' ) );

            return;
        }
    }
}

// 发布一篇文章
function fatrat_ajax_publish_article()
{
    $article = new FatRatInstallSystem();
    $article->publish_article($_REQUEST['article_id']);

    wp_send_json(['code'=>0, 'msg'=>'已发布']);
    wp_die();
}
add_action( 'wp_ajax_publish_article', 'fatrat_ajax_publish_article' );

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
//wp_clear_scheduled_hook('wpjam_daily_function_hook_a');
//**************** cron *******************

function rat_install_system()
{
    $snippet_obj = new FatRatInstallSystem();

    ?>
    <div class="wrap">
        <h1><?php esc_html_e( '数据发布中心', 'Far Rat Collect' ) ?></h1>
        <div>
            <input type="hidden" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
            <div>Todo: 单站点</div>
            <div>Todo: 如果全部发送。再爬 除非有目标站新发布文章。否则滤重就全部过滤了</div>
            <div><input id="import-articles-button" type="button" class="button button-primary" value="发布全部文章到当前站点"></div>
            <hr />
            <div>Todo: 多站点</div>
            <div>定时发布已经自动开启。每两小时站群中每个站点自动发布一篇文章</div>
            <div>点击下方可手动执行一次站群发布，不影响计时任务</div>
            <div><input id="import-articles-button_group" type="button" class="button button-primary" value="给站群每个站点发布一篇文章"></div>
            <hr />
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