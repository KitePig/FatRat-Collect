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

if (!class_exists('WP_List_Table')) {
    require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
}

class FRC_Data_List_Table extends WP_List_Table
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
        $model = new FRC_Options();
        $dataModel = new FRC_Data();
        $result = $model->options_paging($page_number, $per_page, $customvar);

        return collect($result)->map(function ($data) use ($model, $dataModel) {
            $option = $model->option($data['id']);

            $category = '未设置';
            if ($release = json_decode($option['collect_release'])){
                if (isset($release->category)){
                    $category = '';
                    foreach ($release->category as $item) {
                        $category .= get_cat_name($item).',';
                    }
                    $category = rtrim($category, ',');
                }
            }

            $data['collect_release_categories'] = $category;
            $statistical = $dataModel->statistical($data['id']);
            $data['data_all_count'] = $statistical['all_count'];
            $data['data_release_count'] = $statistical['release_count'];
            $data['data_not_release_count'] = $statistical['not_release_count'];
            $data['data_to_day_release'] = $statistical['to_day_release'];
            $data['data_to_day_collect'] = $statistical['to_day_collect'];
            return $data;
        });

    }

    /**
     * Delete a snipppet record.
     * @param $id
     * @return false|int
     */
    public function delete_snippet($id)
    {
        $model = new FRC_Options();
        return $model->delete($id);
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
    public static function record_count($customvar = 'total')
    {
        $model = new FRC_Options();
        return $model->record_count($customvar);
    }

    /** Text displayed when no snippet data is available */
    public function no_items()
    {
        esc_html_e('配置空空的, 请创建采集配置开始旅程吧', 'Fat Rat Collect');
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
//            case 'data_to_day_collect':
//                return '<span class="label label-info">'.$item[$column_name].'</span>';
//                break;
//            case 'data_not_release_count':
//                return '<span class="label label-default">'.$item[$column_name].'</span>';
//                break;
//            case 'data_release_count':
//                return '<span class="label label-warning">'.$item[$column_name].'</span>';
//                break;
//            case 'data_all_count':
//                return '<span class="label label-primary">'.$item[$column_name].'</span>';
//                break;
            case 'collect_name':
                $title = '<strong>' . $item['collect_name'] . '</strong>';
                $actions = array(
                    '进入桶' => sprintf("<a href='%s'>%s</a>", admin_url('admin.php?page=frc-data-detail&option_id=' . $item['id']), esc_html__('进入桶', 'Fat Rat Collect')),
                    '快捷发布' => sprintf("<a href='javascript:;'><span class='quick-release-option-button' data-value='%s'>%s</span></a>", $item['id'], esc_html__('快捷发布', 'Fat Rat Collect')),
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
            'collect_name' => esc_html__('数据桶名称', 'Fat Rat Collect'),
            'collect_release_categories' => esc_html__('发布分类', 'Fat Rat Collect'),
            'data_to_day_release' => esc_html__('今日发布', 'Fat Rat Collect'),
            'data_to_day_collect' => esc_html__('今日采集', 'Fat Rat Collect'),
            'data_not_release_count' => esc_html__('未发布总量', 'Fat Rat Collect'),
            'data_release_count' => esc_html__('已发布总量', 'Fat Rat Collect'),
            'data_all_count' => esc_html__('桶数据总量', 'Fat Rat Collect'),
            'created_at' => esc_html__('桶创建时间', 'Fat Rat Collect'),
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
            'bulk-quick-release' => esc_html__('批量快捷发布(待开发)', 'Fat Rat Collect'),
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
        $current = frc_sanitize_text('customvar', 'total');

        $class = 'total' === $current ? ' class="current"' : '';
        $total_url = remove_query_arg('customvar');
        $views['total'] = "<a href='{$total_url }' {$class} >" . esc_html__('全部配置', 'Fat Rat Collect') . ' (' . $this->record_count() . ')</a>';

        $foo_url = add_query_arg('customvar', 'list');
        $class = ('list' === $current ? ' class="current"' : '');
        $views['list'] = "<a href='{$foo_url}' {$class} >" . esc_html__('列表采集', 'Fat Rat Collect') . ' (' . $this->record_count('list') . ')</a>';

        $bar_url = add_query_arg('customvar', 'single');
        $class = ('single' === $current ? ' class="current"' : '');
        $views['single'] = "<a href='{$bar_url}' {$class} >" . esc_html__('详情采集', 'Fat Rat Collect') . ' (' . $this->record_count('single') . ')</a>';

        if (get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT)){
            $all_url = add_query_arg('customvar', 'all');
            $class = ('all' === $current ? ' class="current"' : '');
            $views['all'] = "<a href='{$all_url}' {$class} >" . esc_html__('全站采集', 'Fat Rat Collect') . ' (' . $this->record_count('all') . ')</a>';
        }

        return $views;
    }

    public function process_bulk_action()
    {
        // If the delete bulk action is triggered
//        if (
//            ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) ||
//            ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] )
//        ) {
//            $delete_ids = esc_sql( $_POST['snippets'] );
//
//            // loop over the array of record IDs and delete them
//            foreach ( $delete_ids as $id ) {
//                $this->delete_snippet( $id );
//            }
//
//            return;
//        }
    }
}

function frc_data_list()
{
    $snippet_obj = new FRC_Data_List_Table();
    ?>
    <div class="wrap">
        <h1>
            <?php esc_html_e('数据桶控制中心', 'Fat Rat Collect') ?>
            <?php if (!empty(get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP))) { ?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png') ?>" />
            <?php } ?>
        </h1>
        <div><span style="color: #4285f4;"><?php _e((new FRC_Validation())->announcement('notice-data')); ?></span></div>
        <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php esc_attr_e(admin_url('admin.php?page=frc-data')); ?>">

        <form method="post">
            <?php
            $snippet_obj->prepare_items();
            $snippet_obj->display();
            ?>
        </form>
    </div>
    <?php
}
