<?php
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
            $sql .= " where option_id = ".esc_sql($_REQUEST['option_id']);
        }

        if (in_array($customvar, array('1', '2', '3'))) {
            $sql .= " AND `status` = '$customvar'";
        }

        if (!empty($_REQUEST['orderby'])) {
            $sql .= ' ORDER BY ' . esc_sql($_REQUEST['orderby']);
            $sql .= !empty($_REQUEST['order']) ? ' ' . esc_sql($_REQUEST['order']) : ' ASC';
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
            $sql .= " where option_id = ".esc_sql($_REQUEST['option_id']);
        }

        if (in_array($customvar, array('1', '2', '3'))) {
            $sql .= " AND status = '$customvar'";
        }

        return $this->wpdb->get_var($sql);
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
     * @return array
     */
    public function statistical($option_id){
        $statistical = [];
        $allData = collect($this->wpdb->get_results("select id, status, created_at, updated_at from $this->table_post where `option_id` = $option_id "));

        $statistical['all_count'] = $allData->count();
        $statistical['release_count'] = $allData->where('status', '3')->count();
        $statistical['not_release_count'] = $allData->where('status', '2')->count();
        $statistical['to_day_release'] = $allData->where('updated_at', '>', date('Y-m-d 00:00:00', current_time('timestamp')))->where('status', 3)->count();
        $statistical['to_day_collect'] = $allData->where('created_at', '>', date('Y-m-d 00:00:00', current_time('timestamp')))->whereIn('status', [2, 3])->count();
        return $statistical;
    }


    /**
     * @return array
     */
    public function data_option_publish(){
        $option_id = frc_sanitize_text('option_id', null);
        $count = frc_sanitize_text('count', 1);
        if ($option_id === null) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'option error!'];
        }
        $optionModel = new FRC_Options();
        $option = $optionModel->option($option_id);
        if (empty((array)json_decode($option['collect_release']))){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '失败, 请配置发布配置后, 再使用快捷发布.'];
        }

        $data = $this->getDataByOption($option_id, $count);
        foreach ($data as $item){
            $this->article_to_storage($item);
        }

        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '快捷发布完成.'];
    }


    /**
     * @return array
     */
    public function data_publish_article(){
        $release_id = frc_sanitize_text('release_id', null);
        if ($release_id === null) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '发布的文章ID异常'];
        }

        $article = $this->id($release_id);
        if (empty($article)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '亲, 文章异常!'];
        }

        return $this->article_to_storage($article);
    }


    /**
     * @return array
     */
    public function data_preview_article(){
        $release_id = frc_sanitize_text('release_id', null);
        if ($release_id === null) {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '发布的文章ID异常'];
        }

        $article = $this->id($release_id);
        if (empty($article)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '亲, 文章异常!'];
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
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '发布失败, 文章状态不正确', 'data' => $article];
        }

        $optionModel = new FRC_Options();
        $option = $optionModel->option($article['option_id']);
        if ($release = json_decode($option['collect_release'])) {
            if (isset($release->category) && isset($release->user)) {
                /*
                    'publish' => '发布',
                    'pending' => '待审核',
                    'draft' => '草稿',
                */
                $release_config['post_status'] = $release->status;
                $release_config['post_user'] = $release->user;
                $release_config['post_category'] = $release->category;
                $release_config['post_thumbnail'] = $release->thumbnail;
            } else {
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '发布失败, 请保存一个发布配置', 'data' => $option['collect_release']];
            }
        } else {
            $release_config['post_status'] = 'pending';
            $release_config['post_user'] = [get_current_user_id()];
            $release_config['post_category'] = array(1);
            $release_config['post_thumbnail'] = 'thumbnail1';
        }

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
            'post_author' => $release_config['post_user'][array_rand($release_config['post_user'])],
            'post_category' => $release_config['post_category'],
            'tags_input' => '',
            'post_type' => 'post',
        );

        if ($post_id = wp_insert_post($post)) {
            $this->wpdb->update($this->table_post,
                ['post_id' => $post_id, 'status' => 3, 'updated_at' => current_time('mysql')],
                ['id' => $article['id']], ['%d', '%d', '%s'], ['%d']
            );

            $post['id'] = $post_id;
            $thumbnail = $release_config['post_thumbnail'] == 'thumbnail1';

            if ($option['collect_image_download'] != 1) {
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '发布完成', 'data' => $post];
            }
            $ql = \QL\QueryList::getInstance();
            $ql->setHtml($post['post_content']);
            $ql->find('img')->map(function ($item) use ($ql, $post, &$thumbnail) {
                $imageUrl = $item->attr('src');
                $imagePath = $imageUrl;
                $wpPath = wp_upload_dir();
                if (strstr($imageUrl, '/wp-content')) {
                    $imagePath = str_replace('/wp-content/uploads', $wpPath['basedir'], $imageUrl);
                }
                if (strstr($imageUrl, 'http')) {
                    $imagePath = str_replace($wpPath['baseurl'], $wpPath['basedir'], $imageUrl);
                }

                $attach_id = wp_insert_attachment(array(
                    'post_title' => basename($post['post_title']),
                    'post_mime_type' => getimagesize($imagePath)['mime'],
                ), $imagePath, $post['id']);

                $attachment_data = wp_generate_attachment_metadata($attach_id, $imagePath);
                wp_update_attachment_metadata($attach_id, $attachment_data);
                if ($thumbnail) {
                    set_post_thumbnail($post['id'], $attach_id);
                    $thumbnail = false;
                }
            });

            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '发布完成', 'data' => $post];
        }

        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '发布失败', 'data' => $post];
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
        return $model->article_to_storage($article, ['post_status' => 'publish']);
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
        $customvar = (isset($_REQUEST['customvar']) ? sanitize_text_field($_REQUEST['customvar']) : 'total');
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
        $current = (!empty($_REQUEST['customvar']) ? sanitize_text_field($_REQUEST['customvar']) : 'total');

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
            $delete_ids = frc_sanitize_array('snippets');

            foreach ( $delete_ids as $id ) {
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
        echo "<script type='text/javascript'>window.location.href = '{$url}';</script>";
        return ;
    }
    $optionModel = new FRC_Options();
    $option = $optionModel->option(esc_sql($_REQUEST['option_id']));
    $release = json_decode($option['collect_release']);
    $categorys = get_categories(array('hide_empty' => false, 'order' => 'ASC', 'orderby' => 'id'));
    $users = get_users(array(
        'fields' => array('ID', 'user_nicename', 'display_name')
    ));
    $featured_pic = get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE);
    $category_author = get_option(FRC_Validation::FRC_VALIDATION_CATEGORY_AUTHOR);
    $snippet_obj = new FRC_Data_Detail_Table();
    ?>
    <div class="wrap">
        <h2>
            <img width="20" src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'images/fat-rat-128x128.png' ?>"/>
            <?php esc_html_e(' 数据列表', 'Fat Rat Collect'); ?>
            <a href="<?php echo admin_url( 'admin.php?page=frc-data' ) ?>"><label class="label label-warning pull-right">返回数据桶</label></a>
        </h2>
        <span><?php esc_html_e($option['collect_name'], 'Fat Rat Collect'); ?></span>
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php echo admin_url('admin.php?page=frc-data-detail&option_id='.$option['id']); ?>">
        <input type="hidden" hidden id="current_option_id" value="<?php echo ($option['id']) ?>">
        <div class="row" >
            <div class="col-xs-10">
                <form method="post">
                    <?php
                    $snippet_obj->prepare_items();
                    $snippet_obj->display();
                    ?>
                </form>
            </div>
            <div class="col-xs-2">
                <?php
                if (!get_object_vars($release)){
                    echo '<h3>检测到您未设置配置, 要想发布文章, 点击下方先设置一个发布配置:</h3>';
                }
                echo '<br />';
                echo '<img width="60" src="'.plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'.'" />';
                echo '<img width="60" src="'.plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'.'" />';
                echo '<img width="60" src="'.plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'.'" />';

                ?>
                <br />
                <br />
                <input type="button" class="button button-primary" id="svae-release-option" value="保存发布配置" />
                <p class="p-tips-style">用于快捷发布, 自动发布, 等其他发布时使用的配置, 保存后生效</p>
                <hr />
                <h5>文章发布后状态:</h5>
                <ul>
                    <?php foreach ([
                                       'publish' => '发布',
                                       'pending' => '待审核',
                                       'draft' => '草稿',
                                   ] as $val => $title): ?>
                        <li><input type="radio" value="<?php esc_html_e($val, 'publish') ?>" name="post_status" <?php if (isset($release->status) && $val == $release->status) echo 'checked'; ?>> <?php esc_html_e($title, 'Fat Rat Collect') ?></li>
                    <?php endforeach; ?>
                </ul>
                <hr />
                <h5>文章特色图片(封面图):</h5>
                <?php
                    if(empty($featured_pic)){
                        echo '<p class="p-tips-style">鼠友, 在工具箱中激活喔.</p>';
                    } else {
                ?>
                <ul>
                    <li>
                        <input type="radio" value="thumbnail1" name="post_thumbnail" <?php if (isset($release->thumbnail) && 'thumbnail1' == $release->thumbnail) echo 'checked'; ?> <?php empty($featured_pic) ? esc_html_e('disabled') : '' ?> />
                        <?php esc_html_e('使用正文第一张图', 'Fat Rat Collect') ?>
                    </li>
                    <li>
                        <input type="radio" value="thumbnail2" name="post_thumbnail" <?php if (isset($release->thumbnail) && 'thumbnail2' == $release->thumbnail) echo 'checked'; ?> <?php empty($featured_pic) ? esc_html_e('disabled') : '' ?> />
                        <?php esc_html_e('不需要特色图片', 'Fat Rat Collect') ?>
                    </li>
                </ul>
                    <?php } ?>
                <hr />
                <?php if(empty($category_author)){ ?>
                    <h5>发布分类设置: (多选)</h5>
                    <h5>发布作者设置: (多选随机)</h5>
                    <p class="p-tips-style">鼠友, 分类&作者设置. 需在工具箱中激活使用. 未激活状态点击保存配置, 会使用默认数据哦</p>
                <?php } else {
                    ?>
                    <h5>请设置发布分类:</h5>
                    <ul class="checkbox_post_category">
                        <?php foreach ($categorys as $category): ?>
                            <li><input type="checkbox" name="post_category[]" value="<?php echo $category->cat_ID; ?>" <?php if (isset($release->category) && in_array($category->cat_ID, $release->category)){ echo 'checked'; } ?>>&nbsp;<?php esc_html_e($category->cat_name, 'Fat Rat Collect'); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <hr />
                    <h5>发布使用作者: (多选随机)</h5>
                    <ul class="checkbox_post_user">
                        <?php foreach ($users as $user): ?>
                            <li><input type="checkbox" name="post_user[]" value="<?php echo $user->ID; ?>" <?php if (isset($release->user) && in_array($user->ID, $release->user)){ echo 'checked'; } ?>>&nbsp;<?php esc_html_e($user->user_nicename . '(' . $user->display_name . ')', 'Fat Rat Collect'); ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php } ?>
                <br />
                <br />
                <div class="fixed"><img width="150" src="<?php echo plugin_dir_url(dirname(__FILE__)).'images/fat-rat-256x256.png'  ?>" /></div>
            </div>
        </div>
    </div>
    <?php
}