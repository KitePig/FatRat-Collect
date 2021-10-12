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

class FRC_Options
{
    protected $wpdb;
    protected $table_options;


    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_options = $wpdb->prefix . 'frc_options';
    }


    /**
     * @param int $page_number
     * @param int $per_page
     * @param string $customvar
     * @return mixed
     */
    public function options_paging($page_number = 1, $per_page = 10, $customvar = 'total')
    {
        $sql = "SELECT * FROM $this->table_options";

        if (in_array($customvar, array('list', 'single', 'all'))) {
            $sql .= " where `collect_type` = '$customvar'";
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
     * @return array|null|object
     */
    public function options(){
        return $this->wpdb->get_results("select * from $this->table_options",ARRAY_A);
    }


    /**
     * @param $option_id
     * @return array|null|object|void
     */
    public function option($option_id)
    {
        return $this->wpdb->get_row("select * from $this->table_options where `id` = $option_id",ARRAY_A);
    }


    /**
     * @param $id
     * @return false|int
     */
    public function delete($id)
    {
        $re = $this->wpdb->delete(
            $this->table_options, array('id' => $id), array('%d')
        );
        (new FRC_Data())->delete_by_option($id);
        return $re;
    }


    /**
     * @param $name
     * @return array|null|object|void
     */
    public function lazy_person($name){
        $option = $this->option_by_key($name, 'collect_name');
        if (empty($option)){
            // 默认生成基础配置
            $this->insert_option($name);
            $option = $this->option_by_key($name, 'collect_name');
        }

        return $option;
    }

    /**
     * @param $name
     * @param $key
     * @return array|null|object|void
     */
    public function option_by_key($name, $key)
    {
        return  $this->wpdb->get_row("SELECT * FROM {$this->table_options} WHERE `{$key}` = '{$name}'", ARRAY_A );
    }


    /**
     * @param string $customvar
     * @return null|string
     */
    public function record_count($customvar = 'total')
    {
        $sql = "SELECT COUNT(*) FROM $this->table_options";
        if (in_array($customvar, array('list', 'single', 'all', 'keyword'))) {
            $sql .= " where collect_type = '$customvar'";
        }

        return $this->wpdb->get_var($sql);
    }



    /**
     * @param $name
     * @return array|null|object|void
     */
    public function insert_option($name)
    {
        $date = current_time('mysql');
        if ($name == '微信'){
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '微信', `collect_describe` = '胖鼠采集. WordPress 最好用的采集小插件. ', `collect_type` = 'single', `collect_image_attribute` = 'data-src', `collect_content_range` = '#img-content',  `collect_content_rules` = 'title%#activity-name|text|null)(content%#js_content|html|null)(author%#js_author_name|text|null)(name%#js_name|text|null', `created_at` = '{$date}', `updated_at` = '{$date}'";
        } elseif ($name == '简书'){
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '简书', `collect_describe` = '胖鼠采集. WordPress 最好用的采集小插件. ', `collect_type` = 'single', `collect_image_attribute` = 'data-original-src', `collect_content_range` = 'body',  `collect_content_rules` = 'title%h1:first|text|null)(content%article|html|a', `created_at` = '{$date}', `updated_at` = '{$date}'";
        }  elseif ($name == '知乎'){
            $sql = "INSERT INTO `{$this->table_options}` SET `collect_name` = '知乎', `collect_describe` = '胖鼠采集. WordPress 最好用的采集小插件. ', `collect_type` = 'single', `collect_image_attribute` = 'data-actualsrc', `collect_content_range` = '.App-main',  `collect_content_rules` = 'title%.QuestionHeader-title|text|null)(content%.RichContent-inner|html|a -.LinkCard-content', `created_at` = '{$date}', `updated_at` = '{$date}'";
        } else {
            return ;
        }

        return $this->wpdb->query($sql);
    }


    /**
     * @return array
     */
    public function interface_save_option(){

        if (!get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP)){
            if (count($this->options()) >= 5){
                return ['code' => FRC_ApiError::FAIL, 'msg' => FRC_Validation::FRC_HINT_Z];
            }
        }

        $option_id                  = frc_sanitize_text('option_id', null);
        $collect_name               = frc_sanitize_text('collect_name');
        $collect_describe           = frc_sanitize_text('collect_describe', '胖鼠采集, Wordpress最好用的采集神器.');
        $collect_type               = frc_sanitize_text('collect_type', 'list');
        $collect_rendering          = (int) frc_sanitize_text('collect_rendering', 1);
        $collect_image_download     = (int) frc_sanitize_text('collect_image_download', 1);
        $collect_image_path         = (int) frc_sanitize_text('collect_image_path', 1);
        $collect_remove_head        = (int) frc_sanitize_text('collect_remove_head', 1);
        $collect_list_url           = frc_sanitize_text('collect_list_url');
        $collect_list_url_paging    = frc_sanitize_text('collect_list_url_paging');
        $collect_list_range         = frc_sanitize_text('collect_list_range');
        $collect_list_rules         = frc_sanitize_text('collect_list_rules');
        $collect_content_range      = frc_sanitize_text('collect_content_range');
        $collect_content_rules      = frc_sanitize_text('collect_content_rules');
        $collect_image_attribute    = frc_sanitize_text('collect_image_attribute', 'src');
        $collect_custom_content_head = frc_sanitize_textarea('collect_custom_content_head');
        $collect_custom_content_foot = frc_sanitize_textarea('collect_custom_content_foot');
        $collect_keywords_replace_rule = frc_sanitize_text('collect_keywords_replace_rule');
        $collect_keywords = frc_sanitize_textarea('collect_keywords', '');

        if ($collect_name == ''){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '给你的配置写个名字吧, 着啥急'];
        }
        if ($collect_type == 'list'){
            if ($collect_list_url == ''){
                return ['code' => FRC_ApiError::FAIL, 'msg' => '请填写采集地址.'];
            }
            if (empty($collect_list_range) || empty($collect_list_rules)){
                return ['code' => FRC_ApiError::FAIL, 'msg' => '列表采集范围/采集规则为空.'];
            }
        }
        if (empty($collect_content_range) || empty($collect_content_rules)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '详情采集范围/采集规则为空.'];
        }

        if ($collect_keywords != ''){
            $collect_keywords = str_replace('\"', '"', htmlspecialchars_decode($collect_keywords, ENT_QUOTES));
            if (!json_decode($collect_keywords)){
                return ['code' => FRC_ApiError::FAIL, 'msg' => '关键词随机插入Json错误'];
            }
        }

        $params = [
            'collect_name' => $collect_name,
            'collect_describe' => $collect_describe,
            'collect_type' => $collect_type,
            'collect_rendering' => $collect_rendering,
            'collect_image_download' => $collect_image_download,
            'collect_image_path' => $collect_image_path,
            'collect_remove_head' => $collect_remove_head,
            'collect_list_url' => $collect_list_url,
            'collect_list_url_paging' => $collect_list_url_paging,
            'collect_list_range' => $collect_list_range,
            'collect_list_rules' => $collect_list_rules,
            'collect_content_range' => $collect_content_range,
            'collect_content_rules' => $collect_content_rules,
            'collect_image_attribute' => $collect_image_attribute,
            'collect_custom_content' => json_encode(['head' => $collect_custom_content_head, 'foot' => $collect_custom_content_foot]),
            'collect_keywords_replace_rule' => $collect_keywords_replace_rule,
            'collect_keywords' => $collect_keywords,
            'created_at' => current_time('mysql'),
            'updated_at' => current_time('mysql'),
        ];

        // Tips: 优化掉
        if (in_array($collect_name, FRC_ApiError::BUTTON_DISABLED)){
            // add author name variable
            if ($collect_name == '微信'){
                $params['collect_content_rules'] = $params['collect_content_rules'].')(author%#js_author_name|text|null)(name%#js_name|text|null';
            } elseif ($collect_name == '简书'){
                $params['collect_content_rules'] = $params['collect_content_rules'].')(author%span[class=name]|text|null';
            }
        }

        if ($option_id === null){
            if (in_array($collect_name, FRC_ApiError::BUTTON_DISABLED)){
                return ['code' => FRC_ApiError::FAIL, 'msg' => '不可使用这个配置名称！'];
            }
            if ($this->wpdb->insert($this->table_options, $params)) {
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => 'Creating Success.'];
            } else {
                return ['code' => FRC_ApiError::FAIL, 'msg' => 'Creating error.'];
            }
        }
        if (false !== $this->wpdb->update($this->table_options, $params, ['id' => $option_id], ['%s', '%s'], ['%d'])) {
            return ['code' => FRC_ApiError::SUCCESS, 'msg' => ' Update Success.'];
        } else {
            return ['code' => FRC_ApiError::FAIL, 'msg' => 'Update error.'];
        }

    }


    /**
     * @return array
     */
    public function interface_save_option_release(){

        $option_id = frc_sanitize_text('option_id', null);

        if (!$option_id){
            return ['code' => FRC_ApiError::SUCCESS, 'msg' => 'option id error.'];
        }

        $msg = '保存完成.';
        if (get_option(FRC_Validation::FRC_VALIDATION_RELEASE_CONTROL)){
            $params = [
                'category' => frc_sanitize_array('release_category', 'integer'),
                'user' => frc_sanitize_array('release_user', 'integer'),
                'status' => frc_sanitize_text('release_status', 'pending'),
                'type' => frc_sanitize_text('release_type', 'post'),
                'thumbnail' => frc_sanitize_text('release_thumbnail', 'thumbnail1'),
                'release_type' => frc_sanitize_text('release_type', 'WordPress'),
                'extension_field' => frc_sanitize_text('extension_field', 'post'),
            ];

            if (empty($params['category'])){
                $params['category'] = array(1);
            }

            if (empty($params['user'])){
                $params['user'] = [get_current_user_id()];
            }
        } else {
            $msg = FRC_Validation::FRC_HINT_L;
            $params = [
                'category' => array(1),
                'user' => [get_current_user_id()],
                'status' => frc_sanitize_text('release_status', 'pending'),
                'thumbnail' => 'thumbnail2',
                'release_type' => 'WordPress',
                'type' => 'post',
                'extension_field' => 'post',
            ];
        }

        $result = $this->wpdb->update($this->table_options,
            ['collect_release' => json_encode($params)],
            ['id' => $option_id],
            ['%s', '%s'],
            ['%d']
        );

        return ['code' => FRC_ApiError::SUCCESS, 'msg' => $msg, 'data' => $result];
    }


    /**
     * @return array
     */
    public function interface_import_default_configuration(){

        $default_configurations = collect([
            [
                'collect_name' => '胖鼠采集-御龙在天',
                'collect_describe' => '列表采集规则, 页面编码GBK 小提示 如果class有两个属性,选一个唯一的即可 | ul li 中间还可以加空格哦知道什么意思吗?',
                'collect_type' => 'list',
                'collect_list_url' => 'https://yl.qq.com/webplat/info/news_version3/118/430/m279/list_1.shtml',
                'collect_list_url_paging' => 'https://yl.qq.com/webplat/info/news_version3/118/430/m279/list_{page}.shtml',
                'collect_list_range' => '.news_list ul li',
                'collect_list_rules' => 'link%a:eq(1)|href|null',
                'collect_content_range' => '.center_part',
                'collect_content_rules' => 'title%.news_h2|text|null)(content%.news_content|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '2',
                'collect_charset' => 'gbk',
                'created_at' => current_time('mysql'),
                'updated_at' => current_time('mysql'),
            ],
            [
                'collect_name' => '胖鼠采集-寻仙',
                'collect_describe' => '列表采集规则, 页面编码GBK, 曾经玩过这个游戏至今念念不忘. 小提示 仔细看配置 选择元素第二个a标签用 eq 语法',
                'collect_type' => 'list',
                'collect_list_url' => 'https://xx.qq.com/webplat/info/news_version3/154/2233/3889/m2702/list_1.shtml',
                'collect_list_url_paging' => 'https://xx.qq.com/webplat/info/news_version3/154/2233/3889/m2702/list_{page}.shtml',
                'collect_list_range' => '.down-nr>ul>li',
                'collect_list_rules' => 'link%a:eq(1)|href|null',
                'collect_content_range' => '.sub-cont',
                'collect_content_rules' => 'title%.n_title|text|null)(content%.sub-nr|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '2',
                'collect_charset' => 'gbk',
                'created_at' => current_time('mysql'),
                'updated_at' => current_time('mysql'),
            ],
            [
                'collect_name' => '胖鼠采集-虎扑',
                'collect_describe' => '地址: https://voice.hupu.com/sports',
                'collect_type' => 'single',
                'collect_content_range' => '.voice-main',
                'collect_content_rules' => 'title%.artical-title>h1|text|null)(content%.artical-content|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '1',
                'collect_charset' => 'utf-8',
                'created_at' => current_time('mysql'),
                'updated_at' => current_time('mysql'),
            ],
            [
                'collect_name' => '胖鼠采集-直播8',
                'collect_describe' => '地址: https://news.zhibo8.cc/nba/more.htm',
                'collect_type' => 'single',
                'collect_content_range' => '#main',
                'collect_content_rules' => 'title%h1|text|null)(content%div[class=content]|html|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '1',
                'collect_charset' => 'utf-8',
                'created_at' => current_time('mysql'),
                'updated_at' => current_time('mysql'),
            ],
            [
                'collect_name' => '胖鼠采集-小故事',
                'collect_describe' => '内容分页采集例子 http://www.xigushi.com/aqgs/3262.html',
                'collect_type' => 'single',
                'collect_content_range' => '.by',
                'collect_content_rules' => 'title%h1|text|null)(content%dl>dd>p|html|a)(paging%.page a:contains(下一页)|href|null',
                'collect_image_attribute' => 'src',
                'collect_remove_head' => '2',
                'collect_charset' => 'utf-8',
                'created_at' => current_time('mysql'),
                'updated_at' => current_time('mysql'),
            ],
        ]);

        $default_configurations->map(function($default_config){
            if (!$this->wpdb->get_row("SELECT * FROM $this->table_options WHERE `collect_name` = '{$default_config['collect_name']}' limit 1", ARRAY_A)){
                $this->wpdb->insert($this->table_options, $default_config, ['%s', '%s']);
            }
        });

        return ['code' => FRC_ApiError::SUCCESS, 'msg' => '完成, 快来走进胖鼠采集的世界吧. '];
    }


    /**
     * @return array
     */
    public function interface_del_option(){
        $option_id = frc_sanitize_text('option_id', null);
        if (empty($option_id)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => '配置ID错误'];
        }

        return ['code' => FRC_ApiError::SUCCESS, 'msg' => '删除成功', 'data' => $this->delete($option_id)];
    }


    /**
     * @return array
     */
    public function interface_upgrade(){
        if ('upgrade complete' == get_option('frc_mysql_upgrade')){
            return ['code' => FRC_ApiError::SUCCESS, 'msg' => '升级完成'];
        }

        $progress = frc_sanitize_text('progress');
        if ($progress == '1'){
            $former_table_options = $this->wpdb->prefix . 'fr_options';
            $res = $this->wpdb->get_results("SHOW TABLES LIKE '%{$former_table_options}%'");
            if (empty($res)){
                update_option('frc_mysql_upgrade', '2');
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => '配置表升级完成.'];
            }

            $data = $this->wpdb->get_results("select * from $former_table_options", ARRAY_A);
            foreach ($data as $option){

                $params = [
                    'id' => $option['id'],
                    'collect_name' => $option['collect_name'],
                    'collect_describe' => $option['collect_describe'],
                    'collect_type' => $option['collect_type'],
                    'collect_rendering' => 1,
                    'collect_image_download' => $option['collect_image_download'],
                    'collect_image_path' => $option['collect_image_path'],
                    'collect_remove_head' => ($option['collect_remove_head'] == 0) ? 1 : 2,
                    'collect_list_url' => $option['collect_list_url'],
                    'collect_list_url_paging' => '',
                    'collect_list_range' => $option['collect_list_range'],
                    'collect_list_rules' => $option['collect_list_rules'],
                    'collect_content_range' => $option['collect_content_range'],
                    'collect_content_rules' => $option['collect_content_rules'],
                    'collect_image_attribute' => $option['collect_image_attribute'],
                    'collect_custom_content' => $option['collect_custom_content'],
                    'collect_keywords_replace_rule' => $option['collect_keywords_replace_rule'],
                    'collect_charset' => $option['collect_charset'],
                    'created_at' => $option['created'],
                    'updated_at' => $option['created'],
                ];

                $this->wpdb->insert($this->table_options, $params);
            }

            update_option('frc_mysql_upgrade', '2');
            //$this->wpdb->query( "DROP TABLE IF EXISTS $former_table_options" );
            return ['code' => FRC_ApiError::SUCCESS, 'msg' => '配置系统、升级完成.'];
        }
        if ($progress == '2'){
            $former_table_post = $this->wpdb->prefix . 'fr_post';
            $res = $this->wpdb->get_results("SHOW TABLES LIKE '%{$former_table_post}%'");
            if (empty($res)){
                update_option('frc_mysql_upgrade', 'upgrade complete');
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => '升级完成.'];
            }

            try{
                $last_id = get_option('frc_mysql_upgrade_progress', 0);
                $data = $this->wpdb->get_results("select `id`, `title`, `content`, `image`, `post_type`, `link`, `post_id`, `is_post`, `created`  from $former_table_post where id > $last_id limit 500", ARRAY_A);
                if (empty($data)){
                    delete_option('frc_mysql_upgrade_progress');
                    update_option('frc_mysql_upgrade', 'upgrade complete');
                    //$this->wpdb->query( "DROP TABLE IF EXISTS $former_table_post" );
                    return ['code' => FRC_ApiError::SUCCESS, 'msg' => '数据系统，升级完成.'];
                }

                foreach ($data as $post){
                    $params = [
                        'id' => $post['id'],
                        'option_id' => $post['post_type'],
                        'status' => ($post['is_post'] == 0) ? 2 : 3,
                        'title' => $post['title'],
                        'cover' => $post['image'],
                        'content' => $post['content'],
                        'link' => $post['link'],
                        'post_id' => $post['post_id'],
                        'message' => 'migration data.',
                        'created_at' => $post['created'],
                        'updated_at' => $post['created'],
                    ];

                    try{
                        $this->wpdb->replace($this->wpdb->prefix.'frc_post', $params);
                    } catch (Exception $e){
                    }

                }

                $last_id = update_option('frc_mysql_upgrade_progress', end($data)['id']);
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => '数据系统，分段升级进行中, 分段升级市为避免大数据量鼠升级失败提供的, 目前已经升级进度'.$last_id.'条, 请继续点击红色按钮进行下一段升级'];

            } catch (Exception $e) {
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => '异常，数据导入失败.'];
            }
        }

        return ['code' => FRC_ApiError::SUCCESS, 'msg' => '升级完成'];
    }


    /**
     * @return array
     */
    public function interface_update_auto_config(){
        $option = frc_sanitize_text('option');
        $value = frc_sanitize_text('value');

        if (empty($option)){
            return ['code' => FRC_ApiError::FAIL, 'msg' => 'Operation Key Error!'];
        }
        if (!strstr($option, 'frc_')){
            return ['code' => FRC_ApiError::FAIL, 'msg' => 'Off the white list.'];
        }

        $data = update_option($option, $value);
        wp_clear_scheduled_hook($option.'_hook');
        return ['code' => FRC_ApiError::SUCCESS, 'msg' => '设置完成.', 'data' => $data];
    }
}

class FRC_Configuration_List_Table extends WP_List_Table
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
        $result = $model->options_paging($page_number, $per_page, $customvar);
        return collect($result)->map(function ($data){
            $data['collect_auto_collect'] = '完善中';
            $data['collect_auto_release'] = '完善中';
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
        esc_html_e('配置空空的, 请创建采集配置开始旅程吧, 如果你快速认识胖鼠, 可以使用上面一键导入默认配置来学习.', 'Fat Rat Collect');
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
            case 'collect_image_download' :
                switch ($item[$column_name]){
                    case '1':
                        return esc_html('下载到本地');
                        break;
                    case '2':
                        return esc_html('不下载');
                        break;
                    case '3':
                        return esc_html('清除所有图片');
                        break;
                }
                break;
            case 'collect_image_path' :
                switch ($item[$column_name]){
                    case '1':
                        return esc_html('绝对路径');
                        break;
                    case '2':
                        return esc_html('相对路径');
                        break;
                }
            case 'collect_list_url' :
                return sprintf("<a href='%s' target='_blank'>%s</a>", $item[$column_name], $item[$column_name]);
                break;
            case 'collect_describe':
                return esc_html(mb_substr($item[$column_name], 0, 30) . ' ...');
                break;
            case 'collect_type' :
                switch ($item[$column_name]){
                    case 'list':
                        return esc_html('列表采集');
                        break;
                    case 'single':
                        return esc_html('详情采集');
                        break;
                    case 'all':
                        return esc_html('全站采集');
                        break;
                    case 'keyword':
                        return esc_html('关键字采集');
                        break;
                }
                break;
            case 'collect_name':
                $title = '<strong>' . $item['collect_name'] . '</strong>';
                $actions = array(
                    '修改' => sprintf("<a href='%s'>%s</a>", admin_url('admin.php?page=frc-options-add-edit&option_id=' . $item['id']), esc_html__('修改', 'Fat Rat Collect')),
                    '删除' => sprintf("<a href='javascript:;'><span class='delete-option-button' data-value='%s'>%s</span></a>", $item['id'], esc_html__('删除', 'Fat Rat Collect')),
                );
                return $title . $this->row_actions( $actions );
                break;
            case 'collect_keywords_replace_rule' :
                return esc_html('... 点击查看');
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
            'collect_name' => esc_html__('配置名称', 'Fat Rat Collect'),
            'collect_describe' => esc_html__('配置描述', 'Fat Rat Collect'),
            'collect_type' => esc_html__('采集类型', 'Fat Rat Collect'),
            'collect_list_url' => esc_html__('采集地址', 'Fat Rat Collect'),
//            'collect_auto_collect' => esc_html__('自动采集', 'Fat Rat Collect'),
//            'collect_auto_release' => esc_html__('自动发布', 'Fat Rat Collect'),
            'collect_list_url' => esc_html__('采集地址', 'Fat Rat Collect'),
            'collect_image_download' => esc_html__('下载图片', 'Fat Rat Collect'),
            'collect_image_path' => esc_html__('图片使用路径', 'Fat Rat Collect'),
            'collect_image_attribute' => esc_html__('目标图片源属性', 'Fat Rat Collect'),
            'created_at' => esc_html__('创建时间', 'Fat Rat Collect'),
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
            'bulk-todo' => esc_html__('敬请期待', 'Fat Rat Collect'),
//            'bulk-start-collect' => esc_html__('开启自动采集', 'Fat Rat Collect'),
//            'bulk-stop-collect' => esc_html__('关闭自动采集', 'Fat Rat Collect'),
//            'bulk-start-release' => esc_html__('开启自动采集', 'Fat Rat Collect'),
//            'bulk-stop-release' => esc_html__('关闭自动采集', 'Fat Rat Collect'),
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
}


function frc_options()
{
    $snippet_obj = new FRC_Configuration_List_Table();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( '配置中心', 'Fat Rat Collect' ) ?>
            <?php if (!empty(get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP))) { ?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png') ?>" />
            <?php } ?>
            <a href="<?php esc_attr_e(admin_url( 'admin.php?page=frc-options-add-edit' )); ?>" class="page-title-action"><?php _e( '新建采集配置', 'Fat Rat Collect' ) ?></a>
            <a href="javascript:" class="page-title-action import_default_configuration"><?php _e( '演示例子', 'Fat Rat Collect' ) ?></a>
        </h1>
        <div><span style="color: #ff3d00;"><?php _e(((new FRC_Validation())->announcement('notice-options'))); ?></span></div>
        <input type="hidden" hidden id="success_redirect_url"
               value="<?php esc_attr_e(admin_url('admin.php?page=frc-options')); ?>">

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

