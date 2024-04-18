<?php
/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * GitHub: https://github.com/KitePig/FatRat-Collect
 * @Author KitePig
 * @CreateTime: 2022年04月11日 03:05
 */

if (!class_exists('WP_List_Table')) {
    require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
}
class TaskController extends WP_List_Table
{
    protected $wpdb;
    protected $table_post;

    public function __construct()
    {
        parent::__construct();
        $this->wpdb = getDb();
        $this->table_post = $this->wpdb->prefix . 'frc_post';
    }

    public function prepare_items()
    {
        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();

        //Retrieve $customvar for use in query to get items.
        $customvar = frc_sanitize_text('customvar', 'total');
        $this->_column_headers = array($columns, $hidden, $sortable);

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

    public function process_bulk_action()
    {
        // If the delete bulk action is triggered
        if (
            ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] )
        ) {
//            $delete_ids = esc_sql( $_POST['snippets'] );
//
//            // loop over the array of record IDs and delete them
//            foreach ( $delete_ids as $id ) {
//                $this->delete_snippet( $id );
//            }
//
//            return;
        }
    }

    public function get_columns(): array
    {
        return array(
            'cb' => /** @lang text */ '<input type="checkbox" />',
            'id' => esc_html__('ID', 'Fat Rat Collect'),
            'collect_name' => esc_html__('配置名称', 'Fat Rat Collect'),
            'collect_describe' => esc_html__('配置描述', 'Fat Rat Collect'),
            'collect_type' => esc_html__('采集类型', 'Fat Rat Collect'),
            'collect_list_url' => esc_html__('采集地址', 'Fat Rat Collect'),
            'collect_image_download' => esc_html__('下载图片', 'Fat Rat Collect'),
            'collect_image_path' => esc_html__('图片使用路径', 'Fat Rat Collect'),
            'collect_image_attribute' => esc_html__('目标图片源属性', 'Fat Rat Collect'),
            'created_at' => esc_html__('创建时间', 'Fat Rat Collect'),
        );
    }

    public function get_sortable_columns(): array
    {
        return array(
            'id' => array('id', false),
        );
    }

    public static function get_snippets($per_page = 10, $page_number = 1, $customvar = 'total')
    {
        $model = new FRC_Options();
        $result = $model->options_paging($page_number, $per_page, $customvar);
        return collect($result)->map(function ($data){
            $data['collect_auto_collect'] = '完善中';
            $data['collect_auto_release'] = '完善中';
            return $data;
        });
    }

    public static function record_count($customvar = 'total')
    {
        $model = new FRC_Options();
        return $model->record_count($customvar);
    }

    public function view()
    {
        $snippet_obj = new self();
        ?>

            <div class="wrap">
                <h1><?php esc_html_e( '任务中心', 'Fat Rat Collect' ) ?>
                    <?php if (!empty(get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP))) { ?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png') ?>" />
                    <?php } ?>
                    <a href="<?php esc_attr_e(admin_url( 'admin.php?page=frc-tasks' )); ?>" class="page-title-action"><?php _e( '新建采集任务', 'Fat Rat Collect' ) ?></a>
                </h1>
                <div><span style="color: #ff3d00;"><?php _e(((new FRC_Validation())->announcement('notice-tasks'))); ?></span></div>
                <input type="hidden" hidden id="success_redirect_url"
                       value="<?php esc_attr_e(admin_url('admin.php?page=frc-tasks')); ?>">
	            <?php require_once(plugin_dir_path(__DIR__) . 'views/csrf.php'); ?>
                <form method="post">
                    <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
                    <?php
                    $snippet_obj->prepare_items();
                    $snippet_obj->display();
                    ?>
                </form>
            </div>
        <?php
    }
}