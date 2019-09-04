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

class FRC_Configuration_List_Table extends WP_List_Table
{
    protected $wpdb;
    protected $table_post;
    protected $table_options;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_post = $wpdb->prefix . 'fr_post';
        $this->table_options = $wpdb->prefix . 'fr_options';
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
        $table_name = "{$wpdb->prefix}fr_options";
        $sql = "SELECT * FROM $table_name";

        if (in_array($customvar, array('list', 'single'))) {
            $sql .= " where `collect_type` = '$customvar'";
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
    public function delete_snippet($id)
    {
        $this->wpdb->delete(
            $this->table_options, array('id' => $id), array('%d')
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
        $table_name = "{$wpdb->prefix}fr_options";
        $sql = "SELECT COUNT(*) FROM $table_name";

        if (in_array($customvar, array('list', 'single'))) {
            $sql .= " where collect_type = '$customvar'";
        }

        return $wpdb->get_var($sql);
    }

    /** Text displayed when no snippet data is available */
    public function no_items()
    {
        esc_html_e('配置空空如也 ~ 请去创建一个采集配置 如果你是第一次认识胖鼠, 可以使用上面一键导入默认配置学习, 里面有作者和其他胖友写的默认配置。大家可以直接使用学习哦。', 'Fat Rat Collect');
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
            case 'collect_describe':
            case 'collect_list_url' :
            case 'collect_list_range' :
            case 'collect_list_rules' :
            case 'collect_content_range' :
            case 'collect_content_rules' :
            case 'collect_remove_outer_link' :
            case 'created' :
                return esc_html($item[$column_name]);
                break;
            case 'collect_type' :
                return $item[$column_name] == 'list' ? esc_html('列表') : esc_html('详情') ;
                break;
            case 'collect_name':
                $edit_url = admin_url('admin.php?page=frc-options-add-edit&option_id=' . $item['id']);
                return esc_html($item[$column_name]) . "<br /><a href='{$edit_url}'>编</a> | <a><span class='delete-option-button' data-value='{$item['id']}'>删</span></a> ";
            case 'collect_keywords_replace_rule' :
                return esc_html('... 点击查看');
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
            'collect_name' => esc_html__('爬虫代号', 'Fat Rat Collect'),
            'collect_describe' => esc_html__('描述', 'Fat Rat Collect'),
            'collect_type' => esc_html__('采集类型', 'Fat Rat Collect'),
            'collect_list_url' => esc_html__('采集地址', 'Fat Rat Collect'),
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
            'bulk-delete' => esc_html__('删除', 'Fat Rat Collect'),
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

        //All link
        $class = 'all' === $current ? ' class="current"' : '';
        $all_url = remove_query_arg('customvar');
        $views['all'] = "<a href='{$all_url }' {$class} >" . esc_html__('全部', 'Fat Rat Collect') . ' (' . $this->record_count() . ')</a>';

        //列表 link
        $foo_url = add_query_arg('customvar', 'list');
        $class = ('list' === $current ? ' class="current"' : '');
        $views['list'] = "<a href='{$foo_url}' {$class} >" . esc_html__('列表爬虫', 'Fat Rat Collect') . ' (' . $this->record_count('list') . ')</a>';

        //单个 link
        $bar_url = add_query_arg('customvar', 'single');
        $class = ('single' === $current ? ' class="current"' : '');
        $views['single'] = "<a href='{$bar_url}' {$class} >" . esc_html__('详情爬虫', 'Fat Rat Collect') . ' (' . $this->record_count('single') . ')</a>';

        return $views;
    }

    public function process_bulk_action()
    {
        // If the delete bulk action is triggered
        if (
            ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) ||
            ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] )
        ) {
            $delete_ids = esc_sql( $_POST['snippets'] );

            // loop over the array of record IDs and delete them
            foreach ( $delete_ids as $id ) {
                $this->delete_snippet( $id );
            }

            return;
        }
    }



    public function conf_interface_save_option(){

        $option_id                  = !empty($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']) : null;
        $collect_name               = !empty($_REQUEST['collect_name']) ? sanitize_text_field($_REQUEST['collect_name']) : '';
        $collect_describe           = !empty($_REQUEST['collect_describe']) ? sanitize_text_field($_REQUEST['collect_describe']) : '胖鼠: 此配置天下无敌';
        $collect_type               = !empty($_REQUEST['collect_type']) ? (in_array(sanitize_text_field($_REQUEST['collect_type']), ['list', 'single']) ? sanitize_text_field($_REQUEST['collect_type']) : 'list') : '';
        $collect_image_download     = !empty($_REQUEST['collect_image_download']) ? (sanitize_text_field($_REQUEST['collect_image_download']) == 1 ? 1 : 2) : 1;
        $collect_image_path         = !empty($_REQUEST['collect_image_path']) ? (sanitize_text_field($_REQUEST['collect_image_path']) == 1 ? 1 : 2) : 1;
        $collect_remove_outer_link  = !empty($_REQUEST['collect_remove_outer_link']) ? (sanitize_text_field($_REQUEST['collect_remove_outer_link']) == 1 ? 1 : 0) : 1;
        $collect_remove_head        = !empty($_REQUEST['collect_remove_head']) ? ( sanitize_text_field($_REQUEST['collect_remove_head']) == 1 ? 1 : 0 ) : 0;
        $collect_list_url           = !empty($_REQUEST['collect_list_url']) ? sanitize_text_field( $_REQUEST['collect_list_url'] ) : '';
        $collect_list_range         = !empty($_REQUEST['collect_list_range']) ? sanitize_text_field($_REQUEST['collect_list_range']) : '';
        $collect_list_rules         = !empty($_REQUEST['collect_list_rules']) ? sanitize_text_field($_REQUEST['collect_list_rules'])  : '';
        $collect_content_range      = !empty($_REQUEST['collect_content_range']) ? sanitize_text_field($_REQUEST['collect_content_range']) : '';
        $collect_content_rules      = !empty($_REQUEST['collect_content_rules']) ? sanitize_text_field($_REQUEST['collect_content_rules']) : '';
        $collect_image_attribute      = !empty($_REQUEST['collect_image_attribute']) ? sanitize_text_field($_REQUEST['collect_image_attribute']) : 'src';
        $collect_custom_content_head  = !empty($_REQUEST['collect_custom_content_head']) ? esc_html($_REQUEST['collect_custom_content_head']) : '';
        $collect_custom_content_foot  = !empty($_REQUEST['collect_custom_content_foot']) ? esc_html($_REQUEST['collect_custom_content_foot']) : '';
        $collect_keywords_replace_rule  = !empty($_REQUEST['collect_keywords_replace_rule']) ? sanitize_text_field($_REQUEST['collect_keywords_replace_rule']) : '';

        if ($collect_name == ''){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '给你的配置写个名字吧。着啥急'];
        }
        if ($collect_type == ''){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '类型错误.'];
        }
        if ($collect_type == 'list'){
            if ($collect_list_url == ''){
                return ['code' => FRC_Api_Error::FAIL, 'msg' => '采集地址填一下.'];
            }
            if (empty($collect_list_range) || empty($collect_list_rules)){
                return ['code' => FRC_Api_Error::FAIL, 'msg' => '采集范围 或者 采集规则没填吧.'];
            }
        }
        if (empty($collect_content_range) || empty($collect_content_rules)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '采集范围 或者 采集规则没填吧.'];
        }

        $params = [
            'collect_name' => $collect_name,
            'collect_describe' => $collect_describe,
            'collect_type' => $collect_type,
            'collect_image_download' => $collect_image_download,
            'collect_image_path' => $collect_image_path,
            'collect_remove_outer_link' => $collect_remove_outer_link,
            'collect_remove_head' => $collect_remove_head,
            'collect_list_url' => $collect_list_url,
            'collect_list_range' => $collect_list_range,
            'collect_list_rules' => $collect_list_rules,
            'collect_content_range' => $collect_content_range,
            'collect_content_rules' => $collect_content_rules,
            'collect_image_attribute' => $collect_image_attribute,
            'collect_custom_content' => json_encode(['head' => $collect_custom_content_head, 'foot' => $collect_custom_content_foot]),
            'collect_keywords_replace_rule' => $collect_keywords_replace_rule,
        ];

        if (in_array($collect_name, FRC_Api_Error::BUTTON_DISABLED)){
            if ($collect_name == '微信'){
                $params['collect_content_rules'] = $params['collect_content_rules'].')(author%#js_author_name|text|null)(name%#js_name|text|null';
            } elseif ($collect_name == '简书'){
                $params['collect_content_rules'] = $params['collect_content_rules'].')(author%span[class=name]|text|null';
            }
        }

        if ($option_id === null){
            if (in_array($collect_name, FRC_Api_Error::BUTTON_DISABLED)){
                return ['code' => FRC_Api_Error::FAIL, 'msg' => '新配置不能用这个配置名称！'];
            }
            if ($this->wpdb->insert($this->table_options, $params)) {
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'Creating Success.'];
            } else {
                return ['code' => FRC_Api_Error::FAIL, 'msg' => 'Creating error.'];
            }
        }
        if (false !== $this->wpdb->update($this->table_options, $params, ['id' => $option_id], ['%s', '%s'], ['%d'])) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => ' Update Success.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'Update error.'];
        }

    }


    public function conf_interface_import_default_configuration(){

        $default_configurations = collect([
//            [
//                'collect_name' => '胖鼠-17173-王者荣耀-最新新闻列表页',
//                'collect_describe' => '胖鼠说: 这个采集的是列表页面, 目前这个页面有10篇(文章+帖子),目前是只采集文章。所以采集会不满10篇。页面编码UTF-8',
//                'collect_type' => 'list',
//                'collect_list_url' => 'http://news.17173.com/z/pvp/list/zxwz.shtml',
//                'collect_list_range' => '.list-item',
//                'collect_list_rules' => 'link%a|href|null',
//                'collect_content_range' => '.col-l',
//                'collect_content_rules' => 'title%.gb-final-tit-article|text|null)(content%.gb-final-mod-article|html|a -.include-style3 -.loltag -div:last -#content_end -style:gt(-1)',
//                'collect_remove_head' => '0',
//            ],
//            [
//                'collect_name' => '胖鼠-叶子猪-大话西游-修炼心得-列表页',
//                'collect_describe' => '胖鼠说: 这个采集的是列表页面, 页面编码GB2312',
//                'collect_type' => 'list',
//                'collect_list_url' => 'http://xy2.yzz.cn/guide/skill/',
//                'collect_list_range' => '#getMaxHeight>ul>li',
//                'collect_list_rules' => 'link%a|href',
//                'collect_content_range' => '#article',
//                'collect_content_rules' => 'title%h1|text)(content%table|html|a -.editor -p:last -div[class=tag]',
//                'collect_remove_head' => '1',
//            ],
//            [
//                'collect_name' => '胖鼠-52pk-冒险岛-心情-列表页',
//                'collect_describe' => '胖鼠说: 这个采集的是列表页面, 页面编码GB2312',
//                'collect_type' => 'list',
//                'collect_list_url' => 'http://mxd.52pk.com/xinq/',
//                'collect_list_range' => '.mb1>ul>li',
//                'collect_list_rules' => 'link%a|href|null',
//                'collect_content_range' => '#main>div[class=content]',
//                'collect_content_rules' => 'title%h2|text|null)(content%div[class=article_show]|html|a',
//                'collect_remove_head' => '1',
//            ],
//            [
//                'collect_name' => '胖鼠-24直播网-皇马新闻-列表页',
//                'collect_describe' => '胖鼠说: 这个采集的是列表页面, 页面编码UTF-8',
//                'collect_type' => 'list',
//                'collect_list_url' => 'https://www.24zbw.com/news/tag/huangma/',
//                'collect_list_range' => '.news_list>div[class=block_img]',
//                'collect_list_rules' => 'link%a|href|null',
//                'collect_content_range' => '.content_block_left',
//                'collect_content_rules' => 'title%div[class=title]>h1|text|null)(content%div[class=articles_text]|html|-div:first',
//                'collect_remove_head' => '0',
//            ],
//            [
//                'collect_name' => '胖鼠-24直播网-新闻-详情页',
//                'collect_describe' => '胖鼠说: 这个采集的是详情页面, 页面编码UTF-8 列表地址: https://www.24zbw.com/news/tag/nba/',
//                'collect_type' => 'single',
//                'collect_content_range' => '.content_block_left',
//                'collect_content_rules' => 'title%div[class=title]>h1|text|null)(content%div[class=articles_text]|html|-div:first',
//                'collect_remove_head' => '0',
//            ],
            [
                'collect_name' => '胖鼠-御龙在天-最新新闻-综合新闻-列表页',
                'collect_describe' => '胖鼠: 采集-列表页面, 页面编码GBK 小提示 如果class有两个属性,选一个唯一的即可 | ul li 中间还可以加空格哦知道什么意思吗?',
                'collect_type' => 'list',
                'collect_list_url' => 'https://yl.qq.com/webplat/info/news_version3/118/430/m279/list_1.shtml',
                'collect_list_range' => '.news_list ul li',
                'collect_list_rules' => 'link%a:eq(1)|href|null',
                'collect_content_range' => '.center_part',
                'collect_content_rules' => 'title%.news_h2|text|null)(content%.news_content|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '1',
                'collect_charset' => 'gbk',
            ],
            [
                'collect_name' => '胖鼠-寻仙新闻中心-最新新闻-列表页',
                'collect_describe' => '胖鼠: 采集-列表页面, 页面编码GBK 曾经玩过这个游戏有感情了 小提示 仔细看配置 选择第二个a标签用 eq 语法',
                'collect_type' => 'list',
                'collect_list_url' => 'https://xx.qq.com/webplat/info/news_version3/154/2233/3889/m2702/list_1.shtml',
                'collect_list_range' => '.down-nr>ul>li',
                'collect_list_rules' => 'link%a:eq(1)|href|null',
                'collect_content_range' => '.sub-cont',
                'collect_content_rules' => 'title%.n_title|text|null)(content%.sub-nr|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '0',
                'collect_charset' => 'gbk',
            ],
            [
                'collect_name' => '胖鼠-心理咨询师-列表页',
                'collect_describe' => '胖鼠: 这个采集的是列表页面, 页面编码UTF-8 文章中有些图片碎了，因他的图片名字是中文的。真傻。',
                'collect_type' => 'list',
                'collect_list_url' => 'http://www.1879club.com/index.php?r=zixun',
                'collect_list_range' => '.con_r>div[class=jiaowu]>ul>li',
                'collect_list_rules' => 'link%span[class=txt1]>a|href|null',
                'collect_content_range' => '.con_r',
                'collect_content_rules' => 'title%.jiaowu>span[class=c_title1]|text|null)(content%.jiaowu|html|a -.c_title1',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '0',
                'collect_charset' => 'utf-8',
            ],
            [
                'collect_name' => '胖鼠-虎扑-体育新闻-详情页',
                'collect_describe' => '胖鼠: 这采集是虎扑新闻详情页面, 页面编码UTF-8 这个列表也很棒,你可以自己去配置哦. 列表地址: https://voice.hupu.com/sports',
                'collect_type' => 'single',
                'collect_content_range' => '.voice-main',
                'collect_content_rules' => 'title%.artical-title>h1|text|null)(content%.artical-content|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '0',
                'collect_charset' => 'utf-8',
            ],
            [
                'collect_name' => '胖鼠-直播吧-NBA新闻篮球-详情页',
                'collect_describe' => '胖鼠: 这采集是直播8新闻详情页面, 页面编码UTF-8 列表地址: https://news.zhibo8.cc/nba/more.htm',
                'collect_type' => 'single',
                'collect_content_range' => '#main',
                'collect_content_rules' => 'title%h1|text|null)(content%div[class=content]|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '0',
                'collect_charset' => 'utf-8',
            ],
        ]);

        $default_configurations->map(function($default_config){
            if (!$this->wpdb->get_row("SELECT * FROM $this->table_options WHERE `collect_name` = '{$default_config['collect_name']}' limit 1", ARRAY_A)){
                $this->wpdb->insert($this->table_options, $default_config, ['%s', '%s']);
            }
        });

        return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok. 已经导入成功。请刷新! 如果你已经导入过了，并不会重复导入！ 如果你有更好的列子,欢迎提交给作者,作者帮你加入默认配置中,让大家一起参考学习！'];

    }


    public function conf_interface_del_option(){
        $option_id = !empty($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']) : null;

        if (empty($option_id)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '配置ID错误'];
        }

        if ($this->wpdb->delete($this->table_options, ['id' => $option_id], ['%d'])) {
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
        }

    }


    public function conf_interface_operation_wp_option(){
        $wp_option_key = !empty($_REQUEST['wp_option_key']) ? sanitize_text_field($_REQUEST['wp_option_key']) : '';
        $wp_option_val = !empty($_REQUEST['wp_option_val']) ? sanitize_text_field($_REQUEST['wp_option_val']) : '';

        if (empty($wp_option_key)){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'Operation Key Error!'];
        }
        if (!strstr($wp_option_key, 'frc_')){
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'Off the white list.'];
        }

        if (update_option($wp_option_key, $wp_option_val)){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'ok.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'System Error.'];
        }

    }
}


/**
 * FRC_Configuration_List_Table (入口)
 */
function frc_option_interface() {

    $action_func = !empty($_REQUEST['action_func']) ? sanitize_text_field($_REQUEST['action_func']) : '';
    if (empty($action_func)){
        wp_send_json(['code' => 5001, 'msg' => 'Parameter error!']);
        wp_die();
    }

    $result = null;
    $action_func = 'conf_interface_'.$action_func;
    $frc_spider = new FRC_Configuration_List_Table();
    method_exists($frc_spider, $action_func) && $result = (new FRC_Configuration_List_Table())->$action_func();
    if ($result != null){
        wp_send_json($result);
        wp_die();
    }
    wp_send_json(['code' => 5002, 'result' => $result, 'msg' => 'Action there is no func! or Func is error!']);
    wp_die();
}
add_action( 'wp_ajax_frc_option_interface', 'frc_option_interface' );


function frc_options()
{
    $snippet_obj = new FRC_Configuration_List_Table();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( '配置中心', 'Fat Rat Collect' ) ?>
            <a href="<?php echo admin_url( 'admin.php?page=frc-options-add-edit' ) ?>" class="page-title-action"><?php esc_html_e( '新建采集配置', 'Fat Rat Collect' ) ?></a>
            <a href="#" class="page-title-action import_default_configuration"><?php esc_html_e( '点击导入几个默认配置', 'Fat Rat Collect' ) ?></a>
        </h1>
        <input type="hidden" hidden id="success_redirect_url"
               value="<?php echo admin_url('admin.php?page=frc-options'); ?>">

        <form method="post">
            <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
            <?php
            $snippet_obj->prepare_items();
            $snippet_obj->display();
            ?>
        </form>

    </div>
    <?php
}

