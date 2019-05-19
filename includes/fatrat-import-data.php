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

if (!class_exists('WP_List_Table')) {
    require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
}

class FRC_Import_Data extends WP_List_Table
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
                'singular' => esc_html__('采集配置', 'Fat Rat Collect'),
                'plural' => esc_html__('采集配置', 'Fat Rat Collect'),
                'ajax' => false,
            )
        );
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
        } else {
            $sql .= ' ORDER BY `id` DESC';
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
    public function delete_snippet($id)
    {
        $this->wpdb->delete(
            $this->table_post, array('id' => $id), array('%d')
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
        esc_html_e('亲. 目前没有可发布的文章。', 'Fat Rat Collect');
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
            case 'created' :
                return esc_html($item[$column_name]);
                break;
            case 'author' :
                if (get_userdata($item[$column_name]))
                    return esc_html(get_userdata($item[$column_name])->data->display_name, 'Fat Rat Collect');
                else
                    return esc_html('未知', 'Fat Rat Collect');
                break;
            case 'title':
                return "<a href='{$item['link']}' target='_blank'>" . esc_html(mb_substr($item[$column_name], 0, 40)) . "</a><br /><span class='preview-article' value='{$item['id']}'><a href='#'>预览</a></span> | <span class='publish-articles' value='{$item['id']}'><a href='#'>发布</a></span>";
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
            'id' => esc_html__('ID', 'Fat Rat Collect'),
            'title' => esc_html__('标题', 'Fat Rat Collect'),
            'author' => esc_html__('作者', 'Fat Rat Collect'),
            'created' => esc_html__('创建时间', 'Fat Rat Collect'),
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
            'bulk-published' => esc_html__('发布', 'Fat Rat Collect'),
            'bulk-delete'    => esc_html__('删除', 'Fat Rat Collect'),
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

        //All link
        $class = 'all' === $current ? ' class="current"' : '';
        $all_url = remove_query_arg('customvar');
        $views['all'] = "<a href='{$all_url}' {$class} >" . esc_html__('全部', 'Fat Rat Collect') . ' (' . $this->record_count() . ')</a>';

        $options = $this->wpdb->get_results("select `id`, `collect_name` from $this->table_options", ARRAY_A);
        if (!empty($options)) {
            foreach ($options as $option) {
                $tmp_url = add_query_arg('customvar', $option['id']);
                $class = ($option['id'] === $current ? ' class="current"' : '');
                $views[$option['id']] = "<a href='{$tmp_url}' {$class} >" . esc_html__($option['collect_name'], 'Fat Rat Collect') . ' (' . $this->record_count($option['id']) . ')</a>';

            }
        }

        return $views;
    }

    public function process_bulk_action()
    {
        // If the delete bulk action is triggered
        if (
            ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] )
        ) {
            $delete_ids = isset($_POST['snippets']) ? esc_sql( $_POST['snippets'] ) : [];

            // loop over the array of record IDs and delete them
            foreach ( $delete_ids as $id ) {
                $this->delete_snippet( $id );
            }

            return;
        } elseif (
            ( isset( $_POST['action'] ) && 'bulk-published' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-published' === $_POST['action2'] )
        ) {

            $activate_ids = isset($_POST['snippets']) ? esc_sql( $_POST['snippets'] ) : [];
            $post_category = !empty($_POST['post_category']) ? esc_sql( $_POST['post_category'] ) : array(1);
            $post_user = !empty($_POST['post_user']) ? esc_sql( $_POST['post_user'] ) : get_current_user_id();
            $post_status = !empty($_POST['post_status']) ? sanitize_text_field( $_POST['post_status'] ) : 'publish';
            $post_thumbnail = !empty($_POST['post_thumbnail']) ? sanitize_text_field( $_POST['post_thumbnail'] ) : 'post_thumbnail1';

            $release_config = [];
            $release_config['post_user'] = $post_user;
            $release_config['post_status'] = $post_status;
            $release_config['post_thumbnail'] = $post_thumbnail;
            $release_config['post_category'] = $post_category;

            // loop over the array of record IDs and activate them
            foreach ( $activate_ids as $id ) {
                $article = $this->wpdb->get_row(
                    "select * from $this->table_post where `id` =  " . $id,
                    ARRAY_A
                );
                self::article_to_storage( $article, $release_config);
            }

            return;
        }
    }


    public function system_publish_article(){
        $article_id = !empty($_REQUEST['article_id']) ? sanitize_text_field($_REQUEST['article_id']) : 0;
        $post_category = !empty($_POST['post_category']) ? esc_sql( $_POST['post_category'] ) : array(1);
        $post_user = !empty($_POST['post_user']) ? esc_sql( $_POST['post_user'] ) : get_current_user_id();
        $post_status = !empty($_POST['post_status']) ? sanitize_text_field( $_POST['post_status'] ) : 'publish';
        $post_thumbnail = !empty($_POST['post_thumbnail']) ? sanitize_text_field( $_POST['post_thumbnail'] ) : 'post_thumbnail2';

        if ($article_id === 0) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '文章ID错误'];
        }

        $article = $this->wpdb->get_row(
            "select * from $this->table_post where `id` =  " . $article_id,
            ARRAY_A
        );
        if (empty($article)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '亲,没找到这篇文章!'];
        }

        $release_config = [];
        $release_config['post_user'] = $post_user;
        $release_config['post_status'] = $post_status;
        $release_config['post_thumbnail'] = $post_thumbnail;
        $release_config['post_category'] = $post_category;

        if ($this->article_to_storage($article, $release_config)) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'Success.'];
        }

        return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
    }


    public function system_preview_article(){
        $article_id = !empty($_REQUEST['article_id']) ? sanitize_text_field($_REQUEST['article_id']) : 0;
        $post_category = !empty($_POST['post_category']) ? esc_sql( $_POST['post_category'] ) : array(1);
        $post_user = !empty($_POST['post_user']) ? esc_sql( $_POST['post_user'] ) : get_current_user_id();
        $post_status = 'draft';

        if ($article_id === 0) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '文章ID错误'];
        }

        $article = $this->wpdb->get_row(
            "select * from $this->table_post where `id` =  " . $article_id,
            ARRAY_A
        );
        if (empty($article)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '亲,没找到这篇文章!'];
        }

        $release_config = [];
        $release_config['post_user'] = $post_user;
        $release_config['post_status'] = $post_status;
        $release_config['post_category'] = $post_category;

        $preview_id = $this->article_to_storage($article, $release_config);

        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.', 'result' => ['preview_url' => get_permalink($preview_id)]];
    }


    public function system_import_article($import_count = null){
        if (empty($import_count)){
            $count = !empty($_REQUEST['collect_count']) ? sanitize_text_field($_REQUEST['collect_count']) : 10;
        } else {
            $count = (int) $import_count ?: 1;
        }

        if ($count > 30){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '数量超了. 回头考虑改改发布数量这个限制.'];
        }

        $articles = $this->wpdb->get_results(
            "select * from $this->table_post where `is_post` = 0 limit $count",
            ARRAY_A
        );
        if (empty($articles)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '没库存文章了, 亲!'];
        }

        collect($articles)->map(function ($article) {
            $this->article_to_storage($article);
        });

        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'Success.'];
    }


    public function system_import_group_article(){
        if (!is_multisite()) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '你的站点不是站群.不能用这个功能. !'];
        }

        $blogs = $this->wpdb->get_results(
            "select `blog_id` from $this->table_blogs",
            ARRAY_A
        );
        if (empty($blogs)) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '你的站群有点毛病! 不能用此功能. '];
        }

        $articles = $this->wpdb->get_results(
            "select * from $this->table_post where `is_post` = 0 limit " . count($blogs),
            ARRAY_A
        );
        if (empty($articles)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '没库存文章了, 亲!'];
        }

        collect($articles)->map(function ($article, $key) use ($blogs) {
            if ($key != 0) {
                $this->wpdb->set_prefix($GLOBALS['table_prefix'] . $blogs[$key]['blog_id'] . '_');
            }
            $this->article_to_storage($article);
        });

        // 恢复表前缀 TODO 不恢复可能会影响什么。。。？？
        $this->wpdb->set_prefix($GLOBALS['table_prefix']);

        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'Success.'];
    }


    private function article_to_storage($article, $release_config = [])
    {
        if (empty($release_config)){
            $release_config['post_status'] = 'publish';
            $release_config['post_user'] = get_current_user_id();
            $release_config['post_category'] = array(1);
            $release_config['post_thumbnail'] = 'thumbnail1';
        }
        $post = array(
            'post_title' => $article['title'],
            'post_name' => $article['title'],
            'post_content' => $article['content'],
            'post_status' => $release_config['post_status'],
            'post_author' => $release_config['post_user'],
            'post_category' => $release_config['post_category'],
            'tags_input' => '',
            'post_type' => 'post',
        );

        if ($post_id = wp_insert_post($post)){
            $thumbnail = $release_config['post_thumbnail'] == 'thumbnail1';
            foreach (json_decode($article['pic_attachment'], true) as $file_name => $origin_name){
                $file_path = wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $file_name;
                if (!file_exists($file_path)){
                    $http = new \GuzzleHttp\Client();
                    try {
                        $data = $http->request('get', $origin_name, ['verify' => false, 'connect_timeout' => 0.3])->getBody()->getContents();
                        if (empty($data)){
                            continue;
                        }
                        file_put_contents($file_path, $data);
                    } catch (\Exception $e) {
                        continue;
                        // ..记日志
                    }
                }
                if (file_exists($file_path)){
                    try {
                        $attach_id = wp_insert_attachment(array(
                            'post_title' => basename($file_name),
                            'post_mime_type' => getimagesize($file_path)['mime'],
                        ), $file_path, $post_id);

                        $attachment_data = wp_generate_attachment_metadata($attach_id, $file_path);
                        wp_update_attachment_metadata($attach_id, $attachment_data);
                        if ($thumbnail) {
                            set_post_thumbnail($post_id, $attach_id);
                            $thumbnail = false;
                        }
                    } catch (\Exception $e) {
                        continue;
                        // ..记日志
                    }
                }
            }

            $this->wpdb->update($this->table_post, ['post_id' => $post_id, 'is_post' => 1], ['id' => $article['id']], ['%d'], ['%d']);
            return $post_id;
        }

        return false;
    }

    public function statistical(){
        $statistical = [];
        $allData = collect($this->wpdb->get_results("select id, is_post, created from $this->table_post"));

        $statistical['to_day_release'] = $allData->where('created', '>', date('Y-m-d 00:00:00'))->where('is_post', 1)->count();
        $statistical['to_day_collect'] = $allData->where('created', '>', date('Y-m-d 00:00:00'))->count();
        $statistical['all_release'] = $allData->where('is_post', 1)->count();
        $statistical['all_collect'] = $allData->count();
        return $statistical;
    }
}

/**
 * FRC_Import_Data (入口)
 */
function frc_import_data_interface() {

    $action_func = !empty($_REQUEST['action_func']) ? sanitize_text_field($_REQUEST['action_func']) : '';
    if (empty($action_func)){
        wp_send_json(['code' => 5001, 'msg' => 'Parameter error!']);
        wp_die();
    }

    $result = null;
    $action_func = 'system_'.$action_func;
    $frc_spider = new FRC_Import_Data();
    method_exists($frc_spider, $action_func) && $result = (new FRC_Import_Data())->$action_func();
    if ($result != null){
        wp_send_json($result);
        wp_die();
    }
    wp_send_json(['code' => 5002, 'result' => $result, 'msg' => 'Action there is no func! or Func is error!']);
    wp_die();
}
add_action( 'wp_ajax_frc_import_data_interface', 'frc_import_data_interface' );


/**
 * 站群定时发布 cron
 */
//if (!wp_next_scheduled('frc_cron_publish_articles_hook')) {
//    wp_schedule_event(time(), 'twohourly', 'frc_cron_publish_articles_hook');
//}
//
//function frc_publish_articles_timing_task()
//{
//    (new FRC_Import_Data())->system_import_group_article();
//}
//add_action('frc_cron_publish_articles_hook', 'frc_publish_articles_timing_task');
//wp_clear_scheduled_hook('frc_cron_publish_articles_hook');

function frc_publish_article_timing_task()
{
    (new FRC_Import_Data())->system_import_article(1);
}
if ($frc_cron_publish_article = get_option('frc_cron_publish_article')){
    if (!wp_next_scheduled('frc_cron_publish_article_hook')) {
        wp_schedule_event(time(), $frc_cron_publish_article, 'frc_cron_publish_article_hook');
    }

    add_action('frc_cron_publish_article_hook', 'frc_publish_article_timing_task');
} else {
    wp_clear_scheduled_hook('frc_cron_publish_article_hook');
}

function frc_import_data()
{
    $snippet_obj = new FRC_Import_Data();
    $statisticalp = $snippet_obj->statistical();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('数据发布中心', 'Fat Rat Collect') ?></h1>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php echo admin_url('admin.php?page=frc-import-data'); ?>">

        <ul class="nav nav-tabs">
            <li class="active"><a href="#home" data-toggle="tab">* _ *</a></li>
            <li><a href="#statistical" data-toggle="tab">数据统计</a></li>
            <li><a href="#singlesite" data-toggle="tab">批量发布</a></li>
            <li><a href="#multiplesites" data-toggle="tab">自动发布</a></li>
            <li><a href="#autotags" data-toggle="tab">Auto Tags</a></li>
            <li><a href="#dynamiccontent" data-toggle="tab">Dynamic Content</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade in active row" id="home">
                <form method="post">
                    <div class="col-xs-10">
                        <?php
                        $snippet_obj->prepare_items();
                        $snippet_obj->display();
                        ?>
                    </div>
                    <div class="col-xs-2">
                        <h5>发布分类:</h5>
                        <ul>
                        <?php foreach (get_categories(array('hide_empty' => false, 'order' => 'ASC', 'orderby' => 'id')) as $category): ?>
                            <li><input type="checkbox" name="post_category[]" value="<?php echo $category->cat_ID; ?>" <?php if ($category->cat_ID == 1){ echo 'checked'; } ?>>&nbsp;<?php esc_html_e($category->cat_name, 'Fat Rat Collect'); ?></li>
                        <?php endforeach; ?>
                        </ul>
                        <hr />
                        <h5>发布作者:</h5>
                        <select name="post_user">
                            <?php
                            foreach (get_users(array(
                                'fields' => array('ID', 'user_nicename', 'display_name')
                            )) as $user):?>
                                <option value="<?php echo $user->ID;?>" <?php if($user->ID == get_current_user_id()) echo 'selected'; ?> ><?php echo $user->user_nicename . '(' . $user->display_name . ')';?></option>
                            <?php endforeach;?>
                        </select>
                        <hr />
                        <h5>文章状态:</h5>
                        <ul>
                            <?php foreach ([
                                    'publish' => '发布',
                                    'pending' => '待审核',
                                    'draft' => '草稿',
                                           ] as $val => $title): ?>
                            <li><input type="radio" value="<?php esc_html_e($val, 'publish') ?>" name="post_status" <?php if ($val == 'publish') echo 'checked'; ?>> <?php esc_html_e($title, 'Fat Rat Collect') ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <hr />
                        <h5>特色图片:<?php if (get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE) != '') { ?>
                                <img width="20" src="<?php frc_image('fat-rat-v-yellow.png'); ?>" />
                            <?php } ?></h5>
                        <ul>
                            <?php if (get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE) == '') { ?>
                                <li>
                                    <input placeholder="输入口令" size="12" name="featured-picture" />
                                    <input type="button" class="button button-primary" id="activation-featured-picture" value="激活" />
                                </li>
                            <?php } ?>
                            <?php foreach ([
                                               'thumbnail1' => '使用文章第一张',
                                               'thumbnail2' => '不需要特色图片',
                                           ] as $val => $title): ?>
                                <li><input type="radio" <?php get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE) == '' ? esc_html_e('disabled') : '' ?> value="<?php get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE) == '' ? 'thumbnail2' : esc_html_e($val, 'thumbnail1') ?>" name="post_thumbnail" <?php if ($val == (get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE) == '' ? 'thumbnail2' : 'thumbnail1')) echo 'checked'; ?>> <?php esc_html_e($title, 'Fat Rat Collect') ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <br />
                        <br />
                        <div class="fixed"><img width="150" src="<?php echo plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'  ?>" /></div>
                    </div>
                </form>
            </div>

            <div class="tab-pane fade" id="statistical"><p></p>

                <h5>今日发布文章数:</h5>
                <p class="btn btn-success"><?php esc_html_e($statisticalp['to_day_release']) ?></p>
                <hr />
                <h5>今日采集文章数:</h5>
                <p class="btn btn-success"><?php esc_html_e($statisticalp['to_day_collect']) ?></p>
                <hr />
                <h5>总发布文章数:</h5>
                <p class="btn btn-success"><?php esc_html_e($statisticalp['all_release']) ?></p>
                <hr />
                <h5>总采集文章数:</h5>
                <p class="btn btn-success"><?php esc_html_e($statisticalp['all_collect']) ?></p>
                <hr />

            </div>

            <div class="tab-pane fade" id="singlesite"><p></p>

                <p>Todo: 批量发布</p>
                <p>Todo: 发布 文章的 ID 正序</p>
                <p>Todo: 目前限制，最多一次发布10篇文章</p>
                发布篇数<input name="import-articles-count-button" type="text" value="3" />
                <input id="import-articles-button" type="button" class="button button-primary" value="发布">
            </div>

            <div class="tab-pane fade" id="multiplesites"><p></p>
                <p></p>
                <p>好用? 请大家给胖鼠<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">打分</a>, 谢了!</p>
                <ul>
                    <li><input type="radio" name="collect_published_time" value="" <?php echo get_option('frc_cron_publish_article') == '' ? 'checked' : ''; ?> ><b>关闭</b></li>
                    <li><input type="radio" name="collect_published_time" value="daily" <?php echo get_option('frc_cron_publish_article') == 'daily' ? 'checked' : ''; ?> ><b>每天自动发布一次</b></li>
                    <li><input type="radio" name="collect_published_time" value="twicedaily" <?php echo get_option('frc_cron_publish_article') == 'twicedaily' ? 'checked' : ''; ?> ><b>每天自动发布两次</b></li>
                    <li><input type="radio" name="collect_published_time" value="eighthourly" <?php echo get_option('frc_cron_publish_article') == 'eighthourly' ? 'checked' : ''; ?> ><b>每间隔八小时发一次</b></li>
                </ul>
                <p>点击启动立刻运行第一次</p>
                <input type="button" class="frc_cron_publish_article btn btn-info" value="启动">
            </div>

            <div class="tab-pane fade" id="autotags"><p></p>
                <p></p>
                <p><h1>自动标签</h1></p>
                <p><a href="http://www.fatrat.cn/fatrat/220.html" target="_blank">Auto Tags</a> （文章自动打标签）</p>
                <p>注: 此功能不依托于胖鼠采集, 属于独立的扩展功能！</p>
                <p>此功能是为文章自动打标签！只给文章正文的第一个关键字打标签。</p>
                <p>你只需要在标签管理里面把, 行业的标签输入进去！</p>
                <p>新采集的文章在发布的同时就会自动把命中的标签追加上去。</p>
                <p>有利于SEO，省时省力还省心！</p>
                <?php if (get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS) == '') { ?>
                        <input placeholder="口令" size="12" name="auto-tags" />
                        <input type="button" class="button button-primary" id="activation-auto-tags" value="激活" />
                <?php } ?>
                <?php if (get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS) != '') { ?>
                    <p class="label label-success">激活成功</p>
                    <p></p>
                    <p>快去发布一篇文章试试吧 ~ </p>
                    <?php
                    $conf_json = json_decode(get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS), true);
                    if ($conf_json['switch'] == 'open'){
                        echo '<p><h3>功能已启动</h3></p>';
                        echo '<input type="button" class="button button-primary activation-auto-tags-switch" value="关闭" />';
                    } else {
                        echo '<p><h3>功能已关闭</h3></p>';
                        echo '<input type="button" class="button button-primary activation-auto-tags-switch" value="启动" />';
                    }
                    ?>
                <?php } ?>
            </div>

            <div class="tab-pane fade" id="dynamiccontent"><p></p>
                <p></p>
                <p><h1>动态内容</h1></p>
                <p><a href="http://www.fatrat.cn/fatrat/229.html" target="_blank">Dynamic Content</a> （文章自动添加动态内容）</p>
                <p>注: 此功能不依托于胖鼠采集, 属于独立的扩展功能！</p>
                <p>此功能是为文章自动添加动态内容！</p>
                <p>指在文章正文开头、结尾各插入一段摘要，插入的摘要内容来自: 同分类下 最近五天的随机文章，后续可支持自定义格式</p>
                <p>文章正文前后插入内容后，对搜索引擎来说，相当于完全不同的文章，有利于收录，并且不影响用户阅读（段落已加了底色区分）。</p>
                <p>动态插入内容胖鼠采集推荐使用！！！，对SEO收录非常有用，省时省力还省心！</p>
                <?php if (get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS) == '') { ?>
                    <input placeholder="口令" size="12" name="dynamic-fields" />
                    <input type="button" class="button button-primary" id="activation-dynamic-fields" value="激活" />
                <?php } ?>
                <?php if (get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS) != '') { ?>
                    <p class="label label-success">激活成功</p>
                    <p></p>
                    <p>快去发布一篇文章试试吧 ~ </p>
                    <?php
                    $conf_json = json_decode(get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS), true);
                    if ($conf_json['switch'] == 'open'){
                        echo '<p><h3>功能已启动</h3></p>';
                        echo '<input type="button" class="button button-primary activation-dynamic-fields-switch" value="关闭" />';
                    } else {
                        echo '<p><h3>功能已关闭</h3></p>';
                        echo '<input type="button" class="button button-primary activation-dynamic-fields-switch" value="启动" />';
                    }
                    ?>
                <?php } ?>
            </div>
        </div>
    </div>
    <?php
}