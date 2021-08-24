<?php

use Illuminate\Support\Str;

/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * 如果你觉得这个项目还不错.可以去Github上 Star 关注我.
 * 您可使用胖鼠采集自行二次开发满足您的个性化需求.
 * 请不要Copy, Rename. OR 修改源代码进行售卖获利.
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2018年12月30日 02:24
 */

class FRC_Data
{
    protected $wpdb;
    protected $table_post;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'frc_post';

    }

    public function id($id){
        return $this->wpdb->get_row(
            "select * from $this->table_post where `id` =  " . $id,
            ARRAY_A
        );
    }

    public function getDataByOption($option_id, $count = 1, $sort = 'ASC'){
        return $this->wpdb->get_results(
            "select * from $this->table_post where `option_id` =  $option_id AND `status` = 2  ORDER BY `id` $sort LIMIT $count",
            ARRAY_A
        );
    }

    public function data_paging($page_number = 1, $per_page = 10, $customvar = 'total') {
        $sql = "SELECT * FROM $this->table_post";

        if (!empty($_REQUEST['option_id'])) {
            $sql .= " where option_id = ".frc_sanitize_text('option_id');
        }

        if (in_array($customvar, array('1', '2', '3'))) {
            $sql .= " AND `status` = '$customvar'";
        }

        if (!empty($_REQUEST['orderby'])) {
            $sql .= ' ORDER BY ' . frc_sanitize_text('orderby');
            $sql .= !empty($_REQUEST['order']) ? ' ' . frc_sanitize_text('order') : ' ASC';
        } else {
            $sql .= ' ORDER BY id DESC';
        }

        $sql .= " LIMIT $per_page";
        $sql .= ' OFFSET ' . ($page_number - 1) * $per_page;

        return $this->wpdb->get_results($sql, 'ARRAY_A');
    }


    /**
     * @param string $customvar
     * @return null|string
     */
    public function record_count($customvar = 'total')
    {
        $sql = "SELECT COUNT(*) FROM $this->table_post";

        if (!empty($_REQUEST['option_id'])) {
            $sql .= " where option_id = ".frc_sanitize_text('option_id');
        }

        if (in_array($customvar, array('1', '2', '3'))) {
            $sql .= " AND status = '$customvar'";
        }

        return $this->wpdb->get_var($sql);
    }

    public function update_successful_status($id, $post){
        return $this->wpdb->update($this->table_post,
            ['post_id' => $post['ID'], 'status' => 3, 'updated_at' => current_time('mysql')],
            ['id' => $id], ['%d', '%d', '%s'], ['%d']
        );
    }


    /**
     * @param $id
     * @return false|int
     */
    public function delete($id)
    {
        return $this->wpdb->delete(
            $this->table_post, array('id' => $id), array('%d')
        );
    }


    /**
     * @param $option_id
     * @return false|int
     */
    public function delete_by_option($option_id)
    {
        return $this->wpdb->delete(
            $this->table_post, array('option_id' => $option_id), array('%d')
        );
    }


    /**
     * @param $option_id
     * @return array
     */
    public function statistical($option_id){
        $statistical = [];
        $allData = collect($this->wpdb->get_results("select id, status, created_at, updated_at from $this->table_post where `option_id` = $option_id "));

        $date = date('Y-m-d 00:00:00', strtotime(current_time('mysql')));
        $statistical['all_count'] = $allData->count();
        $statistical['release_count'] = $allData->where('status', '3')->count();
        $statistical['not_release_count'] = $allData->where('status', '2')->count();
        $statistical['to_day_release'] = $allData->where('updated_at', '>', $date)->where('status', 3)->count();
        $statistical['to_day_collect'] = $allData->where('created_at', '>', $date)->whereIn('status', [2, 3])->count();
        return $statistical;
    }

    public function data_automatic_release(){
        $result = [];
        foreach ((new FRC_Options())->options() as $option){
            $data = $this->getDataByOption($option['id']);
            foreach ($data as $article){
                $re = $this->article_to_storage($article);
                $result[] = $re;
            }
        }

        return $result;
    }


    /**
     * @return array
     */
    public function data_option_publish(){
        $option_id = frc_sanitize_text('option_id', null);
        $count = frc_sanitize_text('count', 1);
        if ($option_id === null) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => 'option error!'];
        }
        $optionModel = new FRC_Options();
        $option = $optionModel->option($option_id);
        if (empty((array)json_decode($option['collect_release']))){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '失败, 请配置发布配置后, 再使用快捷发布.'];
        }

        $data = $this->getDataByOption($option_id, $count);
        foreach ($data as $item){
            $this->article_to_storage($item);
        }

        return ['code' => FRC_ApiError::SUCCESS, 'msg' => '快捷发布完成.'];
    }


    /**
     * @return array
     */
    public function data_publish_article(){
        $release_id = frc_sanitize_text('release_id', null);
        if ($release_id === null) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '发布的文章ID异常'];
        }

        $article = $this->id($release_id);
        if (empty($article)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '亲, 文章异常!'];
        }

        return $this->article_to_storage($article);
    }


    /**
     * @return array
     */
    public function data_preview_article(){
        $release_id = frc_sanitize_text('release_id', null);
        if ($release_id === null) {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '发布的文章ID异常'];
        }

        $article = $this->id($release_id);
        if (empty($article)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '亲, 文章异常!'];
        }

        $result = $this->article_to_storage($article, [
                'post_status' => 'draft'
        ]);

        $result['data']['preview_url'] = get_permalink($result['data']['id']);
        return $result;
    }


    /**
     * @param $article
     * @param array $custom_release_config
     * @return array
     */
    public function article_to_storage($article, $custom_release_config = [])
    {
        if ($article['status'] != 2){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '发布失败, 文章状态不正确', 'data' => $article];
        }

        $optionModel = new FRC_Options();
        $option = $optionModel->option($article['option_id']);

        $release = json_decode($option['collect_release']);
        if (empty($release) || $option['collect_release'] == '{}') {
            return ['code' => FRC_ApiError::FAIL, 'msg' => '请保存发布配置后再发布', 'data' => $option['collect_release']];
        }

        $release_config = [];
        $release_config['post_status'] = $release->status;
        $release_config['post_user'] = $release->user[array_rand($release->user)];
        $release_config['post_category'] = $release->category;

        $release_config['thumbnail'] = $release->thumbnail == 'thumbnail1';
        $release_config['image_download'] = $option['collect_image_download'];
        $release_config['release_type'] = $release->type; //
        $release_config['extension_field'] = $release->extension_field; //

        if (!empty($custom_release_config)){
            foreach ($custom_release_config as $key => $value){
                $release_config[$key] = $value;
            }
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

        $this->post_merge($post, $release_config);
        if ($post_id = wp_insert_post($post)) {
            $kitModel = new FRC_Kit();
            $kitModel->kit_auto_tags($post_id);
            $kitModel->kit_dynamic_fields($post_id);
            $post = get_post($post_id, ARRAY_A);
            $this->update_successful_status($article['id'], $post);
            $this->update_post_meta($post['ID'], $release_config);
            $this->uploadPicAttachment($post, $release_config);

            return ['code' => FRC_ApiError::SUCCESS, 'msg' => '发布完成', 'data' => $post];
        }

        return ['code' => FRC_ApiError::FAIL, 'msg' => '发布失败', 'data' => $post];
    }

    private function post_merge(&$post, $release_config){
        $param = [];
        if ($release_config['release_type'] === 'LightSNS') {
            $param['post_type'] = 'post';
            if ($release_config['extension_field'] === 'normal'){
                $param['post_parent'] = 999999999;
            }
        } elseif ($release_config['release_type'] === '7b2') {
            $param['post_type'] = 'post';
        } else {
            $param['post_type'] = $release_config['extension_field'] ? $release_config['extension_field'] : 'post';
        }

        $post = array_merge($post, $param);
        return $post;
    }

    private function update_post_meta($post_id, $release_config){
        if ($release_config['release_type'] === 'LightSNS') {
            update_post_meta($post_id, 'post_type', $release_config['extension_field']);
            if ($release_config['extension_field'] === 'normal'){
                update_post_meta($post_id, 'last_comment_time', time());
            }
        } elseif ($release_config['release_type'] === '7b2') {
            update_post_meta($post_id, 'b2_single_post_style', $release_config['extension_field']);
        } else {

        }
    }

    private function uploadPicAttachment($post, $release_config){
        if ($release_config['image_download'] != 1) {
            return ;
        }

        if (preg_match_all('/<img.*?src="(.*?)".*?\/?>/i', $post['post_content'],$matches)){
            foreach ( (array)$matches[1] as $imageUrl ){
                $wp_upload_dir = wp_upload_dir();
                // 找到真实图片路径用于上传特色图片
                $wp_upload_local_url_start = str_replace(site_url(), '', $wp_upload_dir['baseurl']);
                $wp_upload_dir_base_dir = $wp_upload_dir['basedir'];
                if (isset($wp_upload_dir['default']['baseurl'])){ // 关闭oss后 没有default
                    $wp_upload_local_url_start = str_replace(site_url(), '', $wp_upload_dir['default']['baseurl']);
                    $wp_upload_dir_base_dir = $wp_upload_dir['default']['basedir'];
                }

                if (Str::startsWith($imageUrl, $wp_upload_local_url_start)) { // image in local
                    $imagePath = str_replace($wp_upload_local_url_start, $wp_upload_dir_base_dir, $imageUrl);
                } elseif (Str::startsWith($imageUrl, $wp_upload_dir['baseurl'])) { // image in web/oss
                    $imagePath = str_replace($wp_upload_dir['baseurl'], $wp_upload_dir['basedir'], $imageUrl);
                } else {
                    return ;
                }

                if (!empty($imagePath) && file_exists($imagePath)){
                    $attachment = array(
                        'guid'           => $imageUrl,
                        'post_mime_type' => getimagesize($imagePath)['mime'],
                        'post_title'     => basename($post['post_title']),
                        'post_status'    => 'inherit'
                    );
                    $attach_id = wp_insert_attachment($attachment, $imagePath, $post['ID']);
                    $attachment_data = wp_generate_attachment_metadata($attach_id, $imagePath);
                    wp_update_attachment_metadata($attach_id, $attachment_data);
                    if ($release_config['thumbnail']) {
                        set_post_thumbnail($post['ID'], $attach_id);
                        $release_config['thumbnail'] = false;
                    }
                }
            }
        }
    }

}

if (!class_exists('WP_List_Table')) {
    require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
}

class FRC_Data_Detail_Table extends WP_List_Table
{
    /**
     * Retrieve snippets data from the database
     *
     * @param int $per_page
     * @param int $page_number
     *
     * @return mixed
     */
    public static function get_snippets($per_page = 10, $page_number = 1, $customvar = 'total')
    {
        $model = new FRC_Data();
        $result = $model->data_paging($page_number, $per_page, $customvar);

        return $result;
    }

    /**
     * Delete a snipppet record.
     * @param $id
     * @return false|int
     */
    public function delete_snippet($id)
    {
        $model = new FRC_Data();
        return $model->delete($id);
    }

    /**
     * @param $id
     * @return array
     */
    public function release_snippet($id)
    {
        $model = new FRC_Data();
        $article = $model->id($id);
        return $model->article_to_storage($article);
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
    public static function record_detail_count($customvar = 'total')
    {
        $model = new FRC_Data();
        return $model->record_count($customvar);
    }

    /** Text displayed when no snippet data is available */
    public function no_items()
    {
        esc_html_e('数据空空的, 请先开始采集之旅吧.', 'Fat Rat Collect');
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
            case 'status' :
                switch ($item[$column_name]){
                    case '1':
                        return '<span class="label label-warning">采集未完成</span>';
                        break;
                    case '2':
                        return '<span class="label label-primary">采集完成</span>';
                        break;
                    case '3':
                        return '<span class="label label-success">已发布</span>';
                        break;
                    case '4':
                        return '<span class="label label-danger">已删除</span>';
                        break;
                }
                break;
            case 'cover' :
                return sprintf("<img src='%s' />", $item[$column_name]);
                break;
            case 'link' :
                return sprintf("<a href='%s' target='_blank'>%s</a>", $item[$column_name], $item[$column_name]);
                break;
            case 'content':
                return esc_html(mb_substr($item[$column_name], 0, 30) . ' ...');
                break;
            case 'post_id':
                return sprintf("<a href='%s' target='_blank'>%s</a>", get_permalink($item[$column_name]), $item[$column_name]);
                break;
            case 'title':
                $title = '<strong>' . $item['title'] . '</strong>';
                if ($item['status'] != 2){
                    return $title;
                }
                $actions = array(
                    '发布' => sprintf("<a href='javascript:;'><span class='publish-article' data-value='%s'>%s</span></a>", $item['id'], esc_html__('发布', 'Fat Rat Collect')),
                    '预览' => sprintf("<a href='javascript:;'><span class='preview-article' data-value='%s'>%s</span></a>", $item['id'], esc_html__('预览', 'Fat Rat Collect')),
                );
                return $title . $this->row_actions( $actions );
                break;
            default:
                return esc_html($item[$column_name]);
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
            'status' => esc_html__('状态', 'Fat Rat Collect'),
            'title' => esc_html__('Title', 'Fat Rat Collect'),
            'link' => esc_html__('原文地址', 'Fat Rat Collect'),
            'content' => esc_html__('内容', 'Fat Rat Collect'),
            'post_id' => esc_html__('发布后wp ID', 'Fat Rat Collect'),
            'message' => esc_html__('Message', 'Fat Rat Collect'),
            'created_at' => esc_html__('采集时间', 'Fat Rat Collect'),
            'updated_at' => esc_html__('最后修改时间', 'Fat Rat Collect'),
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
            'id' => array('id', false),
            'status' => array('status', true),
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
            'bulk-release' => esc_html__('批量发布数据', 'Fat Rat Collect'),
            'bulk-delete' => esc_html__('删除(删除后滤重失效)', 'Fat Rat Collect'),
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
        $customvar = frc_sanitize_text('customvar', 'total');
        $this->_column_headers = array($columns, $hidden, $sortable);

        /** Process bulk action */
        $this->process_bulk_action();
        $this->views();
        $per_page = $this->get_items_per_page('snippets_per_page', 10);
        $current_page = $this->get_pagenum();
        $total_items = self::record_detail_count();

        $this->set_pagination_args(array(
            'total_items' => $total_items,
            'per_page' => $per_page,
        ));

        $this->items = self::get_snippets($per_page, $current_page, $customvar);
    }

    public function get_views()
    {
        $views = array();
        $current = frc_sanitize_text('customvar', 'total');

        $class = 'total' === $current ? ' class="current"' : '';
        $total_url = remove_query_arg('customvar');
        $views['total'] = "<a href='{$total_url }' {$class} >" . esc_html__('所有数据', 'Fat Rat Collect') . ' (' . $this->record_detail_count() . ')</a>';

        $foo_url = add_query_arg('customvar', '1');
        $class = ('1' === $current ? ' class="current"' : '');
        $views['1'] = "<a href='{$foo_url}' {$class} >" . esc_html__('采集中', 'Fat Rat Collect') . ' (' . $this->record_detail_count('1') . ')</a>';

        $bar_url = add_query_arg('customvar', '2');
        $class = ('2' === $current ? ' class="current"' : '');
        $views['2'] = "<a href='{$bar_url}' {$class} >" . esc_html__('采集完成', 'Fat Rat Collect') . ' (' . $this->record_detail_count('2') . ')</a>';

        $all_url = add_query_arg('customvar', '3');
        $class = ('3' === $current ? ' class="current"' : '');
        $views['3'] = "<a href='{$all_url}' {$class} >" . esc_html__('已发布', 'Fat Rat Collect') . ' (' . $this->record_detail_count('3') . ')</a>';

        return $views;
    }

    public function process_bulk_action()
    {
        // If the delete bulk action is triggered
        if (
            ( isset( $_POST['action'] ) && 'bulk-release' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-release' === $_POST['action2'] )
        ) {
            $snippets_ids = frc_sanitize_array('snippets');

            foreach ( $snippets_ids as $id ) {
                $this->release_snippet( $id );
            }

            return;
        }
        if (
            ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] )
        ) {
            $delete_ids = frc_sanitize_array('snippets');

            // loop over the array of record IDs and delete them
            foreach ( $delete_ids as $id ) {
                $this->delete_snippet( $id );
            }

            return;
        }
    }
}

function frc_data_detail()
{
    if (!isset($_REQUEST['option_id'])){
        $url = admin_url('admin.php?page=frc-data');
        _e("<script type='text/javascript'>window.location.href = '{$url}';</script>");
        return ;
    }
    $optionModel = new FRC_Options();
    $option = $optionModel->option(frc_sanitize_text('option_id'));
    $release = json_decode($option['collect_release']);
    $categorys = get_categories(array('hide_empty' => false, 'order' => 'ASC', 'orderby' => 'id'));
    $users = get_users(array(
        'fields' => array('ID', 'user_nicename', 'display_name')
    ));
    $snippet_obj = new FRC_Data_Detail_Table();
    ?>
    <div class="wrap">
        <h2>
            <img width="40" class="request—loading" src="<?php esc_attr_e(plugin_dir_url(dirname(__FILE__)) . 'images/fat-rat-128x128.png'); ?>"/>
            <?php esc_html_e(' 数据列表', 'Fat Rat Collect'); ?>
            <?php if (!empty(get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP))) { ?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png') ?>" />
            <?php } ?>
            <a href="<?php esc_attr_e(admin_url( 'admin.php?page=frc-data' )); ?>"><label class="label label-warning float-end">返回数据桶</label></a>
        </h2>
        <span><?php _e($option['collect_name'], 'Fat Rat Collect'); ?></span>
        <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php esc_attr_e(admin_url('admin.php?page=frc-data-detail&option_id='.$option['id'])); ?>">
        <input type="hidden" hidden id="current_option_id" value="<?php esc_attr_e($option['id']) ?>">
        <div class="row">
                <div class="col-10">
                    <form method="post">
                        <?php
                        $snippet_obj->prepare_items();
                        $snippet_obj->display();
                        ?>
                    </form>
                </div>
                <div class="col-2">
                    <?php
                    if (!get_object_vars($release)){
                        _e('<h4 style="color: #4285f4">第一次来数据桶, 要想发布文章, 点击下方保存发布配置，可快速保存默认发布配置:</h4>');
                    }
                    _e( '<p>' );
                    _e( '<img width="60" src="'.plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'.'" />' );
                    _e( '<img width="60" src="'.plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'.'" />' );
                    _e( '<img width="60" src="'.plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'.'" />' );
                    _e( '</p>' );
                    ?>
                    <br />
                    <p><input type="button" class="button button-primary" id="save-release-option" value="保存发布配置" /></p>
                    <p class="p-tips-style">保存配置生效后, 用于快捷发布, 自动发布, 和其他地方发布</p>
                    <hr />
                    <?php require_once(plugin_dir_path(__DIR__) . 'views/release-type.php'); ?>
                    <h5>设置文章发布状态:</h5>
                    <ul>
                        <?php foreach ([
                                           'publish' => '发布',
                                           'pending' => '待审核',
                                           'draft' => '草稿',
                                       ] as $val => $title): ?>
                            <li><input type="radio" value="<?php esc_attr_e($val, 'publish') ?>" name="post_status" <?php if (isset($release->status) && $val == $release->status) esc_attr_e('checked'); ?>> <?php esc_html_e($title, 'Fat Rat Collect') ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <hr />
                    <h5>设置特色图片(封面图):</h5>
                    <ul>
                        <li>
                            <input type="radio" value="thumbnail1" name="post_thumbnail" <?php if (isset($release->thumbnail) && 'thumbnail1' == $release->thumbnail) esc_attr_e('checked'); ?> />
                            <?php _e('使用正文第一张图', 'Fat Rat Collect') ?>
                        </li>
                        <li>
                            <input type="radio" value="thumbnail2" name="post_thumbnail" <?php if (isset($release->thumbnail) && 'thumbnail2' == $release->thumbnail) esc_attr_e('checked'); ?> />
                            <?php _e('不需要特色图片', 'Fat Rat Collect') ?>
                        </li>
                    </ul>
                    <hr />
                    <h5>设置发布分类:</h5>
                    <ul class="checkbox_post_category">
                        <?php foreach ($categorys as $category): ?>
                            <li>
                                <?php
                                if ($category->parent != 0){
                                    esc_html_e('&nbsp;&nbsp;');
                                } ?>
                                <input type="checkbox" name="post_category[]" value="<?php esc_attr_e($category->cat_ID); ?>" <?php if (isset($release->category) && in_array($category->cat_ID, $release->category)){ esc_attr_e('checked'); } ?>>&nbsp;<?php _e($category->cat_name, 'Fat Rat Collect'); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <hr />
                    <h5>设置发布作者: (多选随机)</h5>
                    <ul class="checkbox_post_user">
                        <?php foreach ($users as $user): ?>
                            <li><input type="checkbox" name="post_user[]" value="<?php esc_attr_e($user->ID); ?>" <?php if (isset($release->user) && in_array($user->ID, $release->user)){ esc_attr_e('checked'); } ?>>&nbsp;<?php _e($user->user_nicename . '(' . $user->display_name . ')', 'Fat Rat Collect'); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <br />
                    <br />
                    <div class="fixed"><img width="150" src="<?php esc_attr_e(plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png');  ?>" /></div>
                </div>
            </div>
    </div>
    <?php
}