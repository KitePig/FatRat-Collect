<?php
if (!defined('WPINC')) { die; }

class FRC_V3_Rest
{
    protected $wpdb;
    protected $table_options;
    protected $table_post;
    protected $namespace = 'frc-v3/v1';

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_options = $wpdb->prefix . 'frc_options';
        $this->table_post    = $wpdb->prefix . 'frc_post';
    }

    public function register()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes()
    {
        // ---- 配置中心 ----
        register_rest_route($this->namespace, '/configs', [
            ['methods' => 'GET',    'callback' => [$this, 'get_configs'],   'permission_callback' => [$this, 'check_permission']],
            ['methods' => 'POST',   'callback' => [$this, 'create_config'],  'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/configs/stats', [
            ['methods' => 'GET',    'callback' => [$this, 'get_config_stats'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/configs/import-defaults', [
            ['methods' => 'POST',   'callback' => [$this, 'import_defaults'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/configs/(?P<id>\d+)', [
            ['methods' => 'GET',    'callback' => [$this, 'get_config'],     'permission_callback' => [$this, 'check_permission']],
            ['methods' => 'PUT',    'callback' => [$this, 'update_config'],   'permission_callback' => [$this, 'check_permission']],
            ['methods' => 'DELETE', 'callback' => [$this, 'delete_config'],   'permission_callback' => [$this, 'check_permission']],
        ]);

        // ---- 分类/用户/文章类型 ----
        register_rest_route($this->namespace, '/options/categories', [
            ['methods' => 'GET', 'callback' => [$this, 'get_categories'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/options/users', [
            ['methods' => 'GET', 'callback' => [$this, 'get_users'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/options/post-types', [
            ['methods' => 'GET', 'callback' => [$this, 'get_post_types'], 'permission_callback' => [$this, 'check_permission']],
        ]);

        // ---- 采集中心 ----
        register_rest_route($this->namespace, '/collect/custom', [
            ['methods' => 'POST', 'callback' => [$this, 'collect_custom'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/collect/list', [
            ['methods' => 'POST', 'callback' => [$this, 'collect_list'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/collect/detail', [
            ['methods' => 'POST', 'callback' => [$this, 'collect_detail'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/collect/history', [
            ['methods' => 'POST', 'callback' => [$this, 'collect_history'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/collect/all', [
            ['methods' => 'POST', 'callback' => [$this, 'collect_all'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/collect/wechat-history', [
            ['methods' => 'POST', 'callback' => [$this, 'collect_wechat_history'], 'permission_callback' => [$this, 'check_permission']],
        ]);

        // ---- 数据桶中心 ----
        register_rest_route($this->namespace, '/data/buckets', [
            ['methods' => 'GET', 'callback' => [$this, 'get_data_buckets'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/buckets/stats', [
            ['methods' => 'GET', 'callback' => [$this, 'get_data_buckets_stats'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/buckets/(?P<option_id>\d+)', [
            ['methods' => 'GET', 'callback' => [$this, 'get_data_detail'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/release-config/(?P<option_id>\d+)', [
            ['methods' => 'GET',  'callback' => [$this, 'get_release_config'], 'permission_callback' => [$this, 'check_permission']],
            ['methods' => 'POST', 'callback' => [$this, 'save_release_config'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/(?P<id>\d+)', [
            ['methods' => 'DELETE', 'callback' => [$this, 'delete_data_item'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/(?P<id>\d+)/publish', [
            ['methods' => 'POST', 'callback' => [$this, 'publish_article'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/(?P<id>\d+)/preview', [
            ['methods' => 'POST', 'callback' => [$this, 'preview_article'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/batch-publish', [
            ['methods' => 'POST', 'callback' => [$this, 'batch_publish'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/data/play', [
            ['methods' => 'POST', 'callback' => [$this, 'wechat_history_play'], 'permission_callback' => [$this, 'check_permission']],
        ]);

        // ---- 工具箱 ----
        register_rest_route($this->namespace, '/kit/settings', [
            ['methods' => 'GET', 'callback' => [$this, 'get_kit_settings'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/kit/cron', [
            ['methods' => 'POST', 'callback' => [$this, 'save_kit_cron'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/kit/activation', [
            ['methods' => 'POST', 'callback' => [$this, 'kit_activation'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/kit/function-switch', [
            ['methods' => 'POST', 'callback' => [$this, 'kit_function_switch'], 'permission_callback' => [$this, 'check_permission']],
        ]);
        register_rest_route($this->namespace, '/kit/db-upgrade', [
            ['methods' => 'POST', 'callback' => [$this, 'db_upgrade'], 'permission_callback' => [$this, 'check_permission']],
        ]);

        // ---- 调试台 ----
        register_rest_route($this->namespace, '/debug/run', [
            ['methods' => 'POST', 'callback' => [$this, 'debug_run'], 'permission_callback' => [$this, 'check_permission']],
        ]);
    }

    public function check_permission() {
        return current_user_can('manage_options');
    }

    // ========================
    //  配置中心
    // ========================

    public function get_configs($request) {
        $page     = max(1, (int)($request->get_param('page') ?: 1));
        $per_page = min((int)($request->get_param('per_page') ?: 10), 100);
        $search   = $request->get_param('search');
        $type     = $request->get_param('type');
        $allowed  = ['id','collect_name','collect_type','created_at','updated_at'];
        $orderby  = in_array($request->get_param('orderby'), $allowed) ? $request->get_param('orderby') : 'id';
        $order    = strtoupper($request->get_param('order')) === 'ASC' ? 'ASC' : 'DESC';

        $where = []; $values = [];
        if ($search) {
            $where[] = '(`collect_name` LIKE %s OR `collect_describe` LIKE %s)';
            $like = '%' . $this->wpdb->esc_like($search) . '%';
            $values[] = $like; $values[] = $like;
        }
        if ($type && in_array($type, ['list','single','all','keyword'])) {
            $where[] = '`collect_type` = %s'; $values[] = $type;
        }
        $where_sql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $count_sql = "SELECT COUNT(*) FROM `{$this->table_options}` {$where_sql}";
        if ($values) $count_sql = $this->wpdb->prepare($count_sql, ...$values);
        $total = (int)$this->wpdb->get_var($count_sql);

        $data_sql = "SELECT * FROM `{$this->table_options}` {$where_sql} ORDER BY `{$orderby}` {$order} LIMIT %d OFFSET %d";
        $data_sql = $this->wpdb->prepare($data_sql, ...array_merge($values, [$per_page, ($page-1)*$per_page]));
        $items = $this->wpdb->get_results($data_sql, ARRAY_A) ?: [];

        return rest_ensure_response([
            'code' => 200, 'data' => $items,
            'meta' => ['total' => $total, 'page' => $page, 'per_page' => $per_page, 'total_pages' => (int)ceil($total/max($per_page,1))],
        ]);
    }

    public function get_config($request) {
        $id = (int)$request->get_param('id');
        $row = $this->wpdb->get_row($this->wpdb->prepare("SELECT * FROM `{$this->table_options}` WHERE `id` = %d", $id), ARRAY_A);
        if (!$row) return new WP_REST_Response(['code' => 404, 'msg' => '配置不存在'], 404);
        if ($row['collect_custom_content']) {
            $cc = json_decode($row['collect_custom_content'], true);
            $row['_custom_head'] = is_array($cc) ? ($cc['head'] ?? '') : '';
            $row['_custom_foot'] = is_array($cc) ? ($cc['foot'] ?? '') : '';
        }
        return rest_ensure_response(['code' => 200, 'data' => $row]);
    }

    public function create_config($request)  { return $this->save_config($request); }
    public function update_config($request) { return $this->save_config($request, (int)$request->get_param('id')); }

    protected function save_config($request, $id = null) {
        $data = $this->sanitize_config($request);
        $errors = $this->validate_config($data);
        if ($errors) return new WP_REST_Response(['code' => 400, 'msg' => '验证失败', 'errors' => $errors], 400);

        $data['collect_custom_content'] = json_encode(['head' => $data['_custom_head'], 'foot' => $data['_custom_foot']], JSON_UNESCAPED_UNICODE);
        unset($data['_custom_head'], $data['_custom_foot']);

        if ($id) {
            $data['updated_at'] = current_time('mysql');
            $res = $this->wpdb->update($this->table_options, $data, ['id' => $id]);
            return rest_ensure_response(['code' => $res !== false ? 200 : 500, 'msg' => $res !== false ? '更新成功' : '更新失败']);
        }
        $data['created_at'] = current_time('mysql');
        $data['updated_at'] = current_time('mysql');
        $res = $this->wpdb->insert($this->table_options, $data);
        return rest_ensure_response(['code' => $res ? 200 : 500, 'msg' => $res ? '创建成功' : '创建失败', 'data' => ['id' => $this->wpdb->insert_id]]);
    }

    public function delete_config($request) {
        $id = (int)$request->get_param('id');
        $this->wpdb->delete($this->table_options, ['id' => $id], ['%d']);
        if (class_exists('FRC_Data')) (new FRC_Data())->delete_by_option($id);
        return rest_ensure_response(['code' => 200, 'msg' => '删除成功']);
    }

    public function get_config_stats() {
        $t = $this->table_options;
        return rest_ensure_response(['code' => 200, 'data' => [
            'total'  => (int)$this->wpdb->get_var("SELECT COUNT(*) FROM `$t`"),
            'list'   => (int)$this->wpdb->get_var($this->wpdb->prepare("SELECT COUNT(*) FROM `$t` WHERE collect_type=%s", 'list')),
            'single' => (int)$this->wpdb->get_var($this->wpdb->prepare("SELECT COUNT(*) FROM `$t` WHERE collect_type=%s", 'single')),
            'all'    => (int)$this->wpdb->get_var($this->wpdb->prepare("SELECT COUNT(*) FROM `$t` WHERE collect_type=%s", 'all')),
        ]]);
    }

    public function import_defaults() {
        if (!class_exists('FRC_Options')) return new WP_REST_Response(['code' => 500, 'msg' => '模块未加载'], 500);
        return rest_ensure_response((new FRC_Options())->interface_import_default_configuration());
    }

    protected function sanitize_config($request) {
        return [
            'collect_name'                => sanitize_text_field($request->get_param('collect_name') ?: ''),
            'collect_describe'            => sanitize_text_field($request->get_param('collect_describe') ?: ''),
            'collect_type'                => sanitize_text_field($request->get_param('collect_type') ?: 'list'),
            'collect_cookie'              => sanitize_textarea_field($request->get_param('collect_cookie') ?: ''),
            'collect_rendering'           => (int)($request->get_param('collect_rendering') ?: 1),
            'collect_image_download'      => (int)($request->get_param('collect_image_download') ?: 1),
            'collect_image_path'          => (int)($request->get_param('collect_image_path') ?: 1),
            'collect_remove_head'         => (int)($request->get_param('collect_remove_head') ?: 1),
            'collect_list_url'            => sanitize_text_field($request->get_param('collect_list_url') ?: ''),
            'collect_list_url_paging'     => sanitize_text_field($request->get_param('collect_list_url_paging') ?: ''),
            'collect_list_range'          => sanitize_text_field($request->get_param('collect_list_range') ?: ''),
            'collect_list_rules'          => sanitize_text_field($request->get_param('collect_list_rules') ?: ''),
            'collect_content_range'       => sanitize_text_field($request->get_param('collect_content_range') ?: ''),
            'collect_content_rules'       => sanitize_text_field($request->get_param('collect_content_rules') ?: ''),
            'collect_image_attribute'     => sanitize_text_field($request->get_param('collect_image_attribute') ?: 'src'),
            'collect_keywords_replace_rule' => sanitize_text_field($request->get_param('collect_keywords_replace_rule') ?: ''),
            'collect_keywords'            => sanitize_textarea_field($request->get_param('collect_keywords') ?: ''),
            '_custom_head'                => sanitize_textarea_field($request->get_param('collect_custom_content_head') ?: ''),
            '_custom_foot'                => sanitize_textarea_field($request->get_param('collect_custom_content_foot') ?: ''),
        ];
    }

    protected function validate_config($data) {
        $e = [];
        if (empty(trim($data['collect_name']))) $e['collect_name'] = '请输入配置名称';
        if ($data['collect_type'] === 'list') {
            if (empty(trim($data['collect_list_url']))) $e['collect_list_url'] = '请输入列表采集地址';
            if (empty(trim($data['collect_list_range']))) $e['collect_list_range'] = '请输入列表采集范围';
            if (empty(trim($data['collect_list_rules']))) $e['collect_list_rules'] = '请输入列表采集规则';
        }
        if (empty(trim($data['collect_content_range']))) $e['collect_content_range'] = '请输入内容采集范围';
        if (empty(trim($data['collect_content_rules']))) $e['collect_content_rules'] = '请输入内容采集规则';
        return $e;
    }

    public function get_categories() {
        $cats = get_categories(['hide_empty' => false]);
        $data = array_map(function($c){ return ['id' => $c->term_id, 'name' => $c->name]; }, $cats);
        return rest_ensure_response(['code' => 200, 'data' => $data]);
    }

    public function get_users() {
        $users = get_users(['role__in' => ['administrator','editor','author']]);
        $data = array_map(function($u){ return ['id' => $u->ID, 'name' => $u->display_name]; }, $users);
        return rest_ensure_response(['code' => 200, 'data' => $data]);
    }

    public function get_post_types() {
        $types = get_post_types(['public' => true], 'objects');
        $data = [];
        foreach ($types as $k => $t) {
            if ($k === 'attachment') continue;
            $data[] = ['id' => $k, 'name' => $t->label];
        }
        return rest_ensure_response(['code' => 200, 'data' => $data]);
    }

    // ========================
    //  采集中心（直接调用 V2 FRC_Spider）
    // ========================

    protected function call_spider($method) {
        $s = new FRC_Spider();
        $result = method_exists($s, $method) ? $s->$method() : ['code' => 500, 'msg' => '采集方法不存在'];
        return rest_ensure_response($result);
    }

    public function collect_custom($request)          { $_REQUEST['collect_urls'] = $request->get_param('collect_urls'); $_REQUEST['collect_name'] = $request->get_param('collect_name'); return $this->call_spider('grab_custom_page'); }
    public function collect_list($request)            { $_REQUEST['option_id'] = $request->get_param('option_id'); return $this->call_spider('grab_list_page'); }
    public function collect_detail($request)          { $_REQUEST['collect_details_urls'] = $request->get_param('collect_urls'); $_REQUEST['collect_details_relus'] = $request->get_param('option_rules') ?: $request->get_param('option_id'); return $this->call_spider('grab_details_page'); }
    public function collect_history($request)         { $_REQUEST['collect_list_url_paging'] = $request->get_param('paging'); $_REQUEST['option_id'] = $request->get_param('option_id'); return $this->call_spider('grab_history_page'); }
    public function collect_all($request)             { $_REQUEST['option_id'] = $request->get_param('option_id'); return $this->call_spider('grab_all_page'); }
    public function collect_wechat_history($request)  { $_REQUEST['collect_wechat_app_name'] = $request->get_param('app_name'); $_REQUEST['collect_wechat_app_start_number'] = $request->get_param('start_number'); $_REQUEST['collect_wechat_app_number'] = $request->get_param('number'); $_REQUEST['collect_wx_app_cookie'] = $request->get_param('cookie'); $_REQUEST['collect_wx_app_token'] = $request->get_param('token'); return $this->call_spider('grab_wechat_history'); }

    // ========================
    //  数据桶中心
    // ========================

    public function get_data_buckets($request) {
        $page     = max(1, (int)($request->get_param('page') ?: 1));
        $per_page = min((int)($request->get_param('per_page') ?: 10), 100);
        $type     = $request->get_param('type');
        $search   = $request->get_param('search');

        $where = []; $values = [];
        if ($type && in_array($type, ['list','single','all','keyword'])) {
            $where[] = 'o.`collect_type` = %s'; $values[] = $type;
        }
        if ($search) {
            $where[] = 'o.`collect_name` LIKE %s'; $values[] = '%' . $this->wpdb->esc_like($search) . '%';
        }
        $where_sql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $count_sql = "SELECT COUNT(*) FROM `{$this->table_options}` o {$where_sql}";
        if ($values) $count_sql = $this->wpdb->prepare($count_sql, ...$values);
        $total = (int)$this->wpdb->get_var($count_sql);

        $sql = "SELECT o.*,
                (SELECT COUNT(*) FROM `{$this->table_post}` WHERE option_id = o.id) as all_count,
                (SELECT COUNT(*) FROM `{$this->table_post}` WHERE option_id = o.id AND status = 2) as release_count,
                (SELECT COUNT(*) FROM `{$this->table_post}` WHERE option_id = o.id AND status IN(2,3)) as not_release_count,
                (SELECT COUNT(*) FROM `{$this->table_post}` WHERE option_id = o.id AND status = 3 AND DATE(updated_at) = CURDATE()) as to_day_release,
                (SELECT COUNT(*) FROM `{$this->table_post}` WHERE option_id = o.id AND DATE(created_at) = CURDATE()) as to_day_collect
                FROM `{$this->table_options}` o {$where_sql} ORDER BY o.id DESC LIMIT %d OFFSET %d";
        $sql = $this->wpdb->prepare($sql, ...array_merge($values, [$per_page, ($page-1)*$per_page]));
        $items = $this->wpdb->get_results($sql, ARRAY_A) ?: [];

        return rest_ensure_response([
            'code' => 200, 'data' => $items,
            'meta' => ['total' => $total, 'page' => $page, 'per_page' => $per_page, 'total_pages' => (int)ceil($total/max($per_page,1))],
        ]);
    }

    public function get_data_buckets_stats() {
        $t = $this->table_options;
        return rest_ensure_response(['code' => 200, 'data' => [
            'total'  => (int)$this->wpdb->get_var("SELECT COUNT(*) FROM `$t`"),
            'list'   => (int)$this->wpdb->get_var($this->wpdb->prepare("SELECT COUNT(*) FROM `$t` WHERE collect_type=%s", 'list')),
            'single' => (int)$this->wpdb->get_var($this->wpdb->prepare("SELECT COUNT(*) FROM `$t` WHERE collect_type=%s", 'single')),
            'all'    => (int)$this->wpdb->get_var($this->wpdb->prepare("SELECT COUNT(*) FROM `$t` WHERE collect_type=%s", 'all')),
        ]]);
    }

    public function get_data_detail($request) {
        $option_id = (int)$request->get_param('option_id');
        $page      = max(1, (int)($request->get_param('page') ?: 1));
        $per_page  = min((int)($request->get_param('per_page') ?: 10), 100);
        $status    = $request->get_param('status');

        $where = ['`option_id` = %d']; $values = [$option_id];
        if ($status && in_array($status, ['1','2','3','5'])) {
            $where[] = '`status` = %d'; $values[] = (int)$status;
        }
        $where_sql = 'WHERE ' . implode(' AND ', $where);

        $count_sql = "SELECT COUNT(*) FROM `{$this->table_post}` {$where_sql}";
        $count_sql = $this->wpdb->prepare($count_sql, ...$values);
        $total = (int)$this->wpdb->get_var($count_sql);

        $data_sql = "SELECT * FROM `{$this->table_post}` {$where_sql} ORDER BY id DESC LIMIT %d OFFSET %d";
        $data_sql = $this->wpdb->prepare($data_sql, ...array_merge($values, [$per_page, ($page-1)*$per_page]));
        $items = $this->wpdb->get_results($data_sql, ARRAY_A) ?: [];

        $status_sql = $this->wpdb->prepare("SELECT `status`, COUNT(*) as cnt FROM `{$this->table_post}` WHERE `option_id` = %d GROUP BY `status`", $option_id);
        $status_rows = $this->wpdb->get_results($status_sql, ARRAY_A) ?: [];
        $sc = ['all' => 0, '1' => 0, '2' => 0, '3' => 0, '5' => 0];
        foreach ($status_rows as $r) { $sc[$r['status']] = (int)$r['cnt']; $sc['all'] += (int)$r['cnt']; }

        return rest_ensure_response([
            'code' => 200, 'data' => $items,
            'meta' => ['total' => $total, 'page' => $page, 'per_page' => $per_page, 'total_pages' => (int)ceil($total/max($per_page,1)), 'status_counts' => $sc],
        ]);
    }

    public function delete_data_item($request) {
        $id = (int)$request->get_param('id');
        $this->wpdb->delete($this->table_post, ['id' => $id], ['%d']);
        return rest_ensure_response(['code' => 200, 'msg' => '删除成功']);
    }

    public function get_release_config($request) {
        $option_id = (int)$request->get_param('option_id');
        $row = $this->wpdb->get_row($this->wpdb->prepare("SELECT collect_release FROM `{$this->table_options}` WHERE id=%d", $option_id), ARRAY_A);
        $config = ['category' => [1], 'user' => [get_current_user_id()], 'status' => 'pending', 'thumbnail' => 'thumbnail1', 'release_type' => 'WordPress', 'type' => 'post', 'extension_field' => 'post'];
        if ($row && $row['collect_release']) {
            $saved = json_decode($row['collect_release'], true);
            if (is_array($saved)) $config = array_merge($config, $saved);
        }
        return rest_ensure_response(['code' => 200, 'data' => $config]);
    }

    public function save_release_config($request) {
        $option_id = (int)$request->get_param('option_id');
        $config = [
            'category'        => array_map('absint', (array)($request->get_param('category') ?: [1])),
            'user'            => array_map('absint', (array)($request->get_param('user') ?: [get_current_user_id()])),
            'status'          => sanitize_text_field($request->get_param('status') ?: 'pending'),
            'thumbnail'       => sanitize_text_field($request->get_param('thumbnail') ?: 'thumbnail1'),
            'release_type'    => sanitize_text_field($request->get_param('release_type') ?: 'WordPress'),
            'type'            => sanitize_text_field($request->get_param('type') ?: 'post'),
            'extension_field' => sanitize_text_field($request->get_param('extension_field') ?: 'post'),
        ];
        $this->wpdb->update($this->table_options, ['collect_release' => json_encode($config)], ['id' => $option_id]);
        return rest_ensure_response(['code' => 200, 'msg' => '发布配置保存成功']);
    }

    public function publish_article($request) {
        $id = (int)$request->get_param('id');
        $article = $this->wpdb->get_row($this->wpdb->prepare("SELECT * FROM `{$this->table_post}` WHERE id = %d", $id), ARRAY_A);
        if (!$article) return new WP_REST_Response(['code' => 404, 'msg' => '数据不存在'], 404);
        $result = (new FRC_Data())->article_to_storage($article);
        return rest_ensure_response($result);
    }

    public function preview_article($request) {
        $id = (int)$request->get_param('id');
        $article = $this->wpdb->get_row($this->wpdb->prepare("SELECT * FROM `{$this->table_post}` WHERE id = %d", $id), ARRAY_A);
        if (!$article) return new WP_REST_Response(['code' => 404, 'msg' => '数据不存在'], 404);
        $result = (new FRC_Data())->article_to_storage($article, ['status' => 'draft']);
        return rest_ensure_response($result);
    }

    public function batch_publish($request) {
        $option_id = (int)$request->get_param('option_id');
        $count     = min((int)($request->get_param('count') ?: 1), 100);
        $articles  = (new FRC_Data())->getDataByOption($option_id, $count);
        $results   = [];
        foreach ($articles as $article) {
            $results[] = (new FRC_Data())->article_to_storage($article);
        }
        return rest_ensure_response(['code' => 200, 'msg' => sprintf('批量发布完成，共处理 %d 篇', count($articles)), 'data' => $results]);
    }

    public function wechat_history_play($request) {
        $result = (new FRC_Data())->data_history_wait_play();
        return rest_ensure_response($result);
    }

    // ========================
    //  工具箱
    // ========================

    public function get_kit_settings() {
        $data = [
            'cron_spider'       => get_option('frc_cron_spider', ''),
            'cron_release'      => get_option('frc_cron_release', ''),
            'sponsorship'       => get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP, ''),
            'all_collect'       => get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT, ''),
            'rendering'         => get_option(FRC_Validation::FRC_VALIDATION_RENDERING, ''),
            'auto_tags'         => get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS, ''),
            'dynamic_fields'    => get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS, ''),
            'inner_chain'       => get_option(FRC_Validation::FRC_VALIDATION_INNER_CHAIN, ''),
            'release_control'   => get_option(FRC_Validation::FRC_VALIDATION_RELEASE_CONTROL, ''),
            'insert_keyword'    => get_option(FRC_Validation::FRC_VALIDATION_INSERT_KEYWORD, ''),
            'wechat_history'    => get_option(FRC_Validation::FRC_VALIDATION_WECHAT_HISTORY, ''),
            'featured_picture'  => get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE, ''),
            'ability_map'       => FRC_Validation::FRC_VALIDATION_ABILITY_MAP,
            'mysql_upgrade'     => get_option('frc_mysql_upgrade', ''),
        ];
        return rest_ensure_response(['code' => 200, 'data' => $data]);
    }

    public function save_kit_cron($request) {
        $type  = sanitize_text_field($request->get_param('type'));
        $value = sanitize_text_field($request->get_param('value'));
        $key   = $type === 'spider' ? 'frc_cron_spider' : 'frc_cron_release';
        update_option($key, $value);
        if ($type === 'spider') {
            wp_clear_scheduled_hook('frc_cron_spider_hook');
            if ($value) wp_schedule_event(time(), $value, 'frc_cron_spider_hook');
        } else {
            wp_clear_scheduled_hook('frc_cron_release_hook');
            if ($value) wp_schedule_event(time(), $value, 'frc_cron_release_hook');
        }
        return rest_ensure_response(['code' => 200, 'msg' => '定时任务设置成功']);
    }

    public function kit_activation($request) {
        $code = sanitize_text_field($request->get_param('code') ?: '');
        $v = new FRC_Validation();
        if (!method_exists($v, 'validation_activation')) return new WP_REST_Response(['code' => 500, 'msg' => '验证服务不可用'], 500);
        $_REQUEST['activation_action'] = $code;
        $result = $v->validation_activation();
        return rest_ensure_response($result);
    }

    public function kit_function_switch($request) {
        $key = sanitize_text_field($request->get_param('key'));
        if (!$key) return new WP_REST_Response(['code' => 400, 'msg' => '参数错误'], 400);
        $v = new FRC_Validation();
        $_REQUEST['switch_action'] = array_search($key, array_column(FRC_Validation::FRC_VALIDATION_ABILITY_MAP, 0));
        if ($_REQUEST['switch_action'] === false) {
            $_REQUEST['switch_action'] = $key;
        }
        $result = $v->validation_function_switch();
        return rest_ensure_response($result);
    }

    public function db_upgrade($request) {
        $progress = sanitize_text_field($request->get_param('progress') ?: '1');
        $_REQUEST['progress'] = $progress;
        $result = (new FRC_Options())->interface_upgrade();
        return rest_ensure_response($result);
    }

    // ========================
    //  调试台
    // ========================

    public function debug_run($request) {
        $_REQUEST['collect_url']           = $request->get_param('url');
        $_REQUEST['debug_remove_head']     = $request->get_param('remove_head');
        $_REQUEST['debug_rendering']       = $request->get_param('rendering');
        $_REQUEST['debug_range']           = $request->get_param('range');
        $_REQUEST['collect_debug_rule_a']  = $request->get_param('rule_a');
        $_REQUEST['collect_debug_rule_b']  = $request->get_param('rule_b');
        $_REQUEST['collect_debug_rule_c']  = $request->get_param('rule_c');
        $_REQUEST['collect_debug_rule_d']  = $request->get_param('rule_d');
        return $this->call_spider('grab_debug');
    }
}
