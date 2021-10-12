<?php
/**
 * Plugin Name: Fat Rat Collect
 * Plugin URI: https://www.fatrat.cn
 * Description: 胖鼠采集(Fat Rat Collect) 是一款可以帮助你批量采集文章数据的开源插件，采集含括微信采集、简书采集、知乎采集、列表采集、详情采集。完美支持自动采集、自动发布文章。图片本地化、关键字替换、自动标签、动态内容、等其他黑科技。是您建站好帮手！如果你还会一点Html JQuery知识。那就太棒了。
 * Version: 2.5.2
 * Author: Fat Rat
 * Author URI: https://www.fatrat.cn/about
 * Disclaimer: Use at your own risk. No warranty expressed or implied is provided.
 * Text Domain: fat-rat-collect
 * License: GPL3
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

global $frc_db_version;
$frc_db_version = '2.5.2';

/**
 * Fire up Composer's autoloader
 */
require (__DIR__ . '/vendor/autoload.php');

/**
 * Install
 */
function frc_plugin_install(){
    global $wpdb;
    global $frc_db_version;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $table_post      = $wpdb->prefix . 'frc_post';
    $table_options   = $wpdb->prefix . 'frc_options';
    $charset_collate = $wpdb->get_charset_collate();

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_options(
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `collect_name` varchar(30) NOT NULL DEFAULT '',
          `collect_describe` varchar(200) NOT NULL DEFAULT '',
          `collect_type` varchar(20) NOT NULL DEFAULT '',
          `collect_list_url` varchar(191) NOT NULL DEFAULT '',
          `collect_list_url_paging` varchar(191) NOT NULL DEFAULT '',
          `collect_list_range` varchar(191) NOT NULL DEFAULT '',
          `collect_list_rules` varchar(1000) NOT NULL DEFAULT '',
          `collect_content_range` varchar(191) NOT NULL DEFAULT '',
          `collect_content_rules` varchar(1000) NOT NULL DEFAULT '',
          `collect_charset` varchar(20) NOT NULL DEFAULT 'utf-8',
          `collect_image_download` tinyint(10) NOT NULL DEFAULT '1',
          `collect_image_path` tinyint(2) NOT NULL DEFAULT '1',
          `collect_image_attribute` varchar(20) NOT NULL DEFAULT 'src',
          `collect_rendering` tinyint(2) NOT NULL DEFAULT '1',
          `collect_remove_head` tinyint(2) NOT NULL DEFAULT '1',
          `collect_auto_collect` tinyint(2) NOT NULL DEFAULT '2',
          `collect_auto_release` tinyint(2) NOT NULL DEFAULT '2',
          `collect_release` varchar(191) NOT NULL DEFAULT '{}',
          `collect_keywords_replace_rule` mediumtext NOT NULL,
          `collect_custom_content` mediumtext NOT NULL,
          `collect_keywords` text NOT NULL DEFAULT '',
          `created_at` timestamp NULL DEFAULT NULL,
          `updated_at` timestamp NULL DEFAULT NULL,
          PRIMARY KEY (`id`)
        )	$charset_collate; ";
    dbDelta( $sql );

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_post(
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `option_id` int(11) NOT NULL,
            `status` tinyint(5) NOT NULL DEFAULT '1',
            `title` varchar(120) NOT NULL DEFAULT '',
            `cover` varchar(191) NOT NULL DEFAULT '',
            `content` mediumtext NOT NULL,
            `link` varchar(191) NOT NULL DEFAULT '',
            `post_id` int(11) NOT NULL DEFAULT '0',
            `message` varchar(191) NOT NULL DEFAULT '',
            `created_at` timestamp NULL DEFAULT NULL,
            `updated_at` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (`id`),
            KEY `option_id` (`option_id`),
            KEY `status` (`status`),
            UNIQUE KEY `link` (`link`)
        )	$charset_collate; ";
    dbDelta( $sql );

    add_option( 'frc_db_version', $frc_db_version );
    add_option( 'frc_install_time', time() );
}
register_activation_hook( __FILE__, 'frc_plugin_install' );

/**
 * Update
 */
function frc_plugin_update() {
    global $frc_db_version;

    if ( get_option( 'frc_db_version' ) != $frc_db_version ) {
        global $wpdb;
        $wpdb->show_errors();

        frcAddColumn('collect_keywords', 'text NOT NULL DEFAULT "" AFTER `collect_custom_content`', 'option');
        frcChangeColumn('MODIFY COLUMN `collect_list_rules` varchar(1000) not null default ""','option');
        frcChangeColumn('MODIFY COLUMN `collect_content_rules` varchar(1000) not null default ""','option');

        if (!get_option('frc_mysql_upgrade')){
            $former_table_options = $wpdb->prefix . 'fr_options';
            $res = $wpdb->get_results("SHOW TABLES LIKE '%{$former_table_options}%'");
            if (!empty($res)){
                update_option('frc_mysql_upgrade', '1');
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => '配置表升级完成.'];
            } else {
                $former_table_post = $wpdb->prefix . 'fr_post';
                $res = $wpdb->get_results("SHOW TABLES LIKE '%{$former_table_post}%'");
                if (!empty($res)){
                    add_option('frc_mysql_upgrade', '2');
                } else {
                    add_option('frc_mysql_upgrade', 'upgrade complete');
                }
            }

            $config = json_encode(['switch' => 'shutdown', 'created_at' => current_time('mysql'), 'updated_at' => current_time('mysql')]);
            if (get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE)){
                update_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE, $config);
            }
            if (get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS)){
                update_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS, $config);
            }
            if (get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS)){
                update_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS, $config);
            }
        }

        frc_plugin_install();
    }

    update_option('frc_db_version', $frc_db_version);
}
add_action( 'plugins_loaded', 'frc_plugin_update' );

/**
 * Style && Script
 */
function frc_loading_assets( $hook ) {
    global $frc_db_version;
    $allowed_pages = array(
        'frc-collect',
        'frc-spider',
        'frc-options',
        'frc-data',
        'frc-options-add-edit',
        'frc-kit',
        'frc-data-detail',
        'frc-debugging'
    );

    if (in_array(strstr($hook,"frc-"), $allowed_pages)) {
        // css
        wp_register_style('fat-rat-bootstrap-css', plugins_url('public/css/bootstrap.min.css', __FILE__));
        wp_enqueue_style('fat-rat-bootstrap-css');
        wp_register_style('fat-rat-css', plugins_url('public/css/fatrat.css', __FILE__));
        wp_enqueue_style('fat-rat-css');

        // js
        wp_register_script('fat-rat-bootstrap-js', plugins_url('public/js/bootstrap.min.js', __FILE__));
        wp_enqueue_script('fat-rat-bootstrap-js');
        wp_register_script('fat-rat-js', plugins_url('public/js/fatrat.js', __FILE__), array('jquery'), $frc_db_version, true);
        wp_enqueue_script('fat-rat-js');
    }
}
add_action( 'admin_enqueue_scripts', 'frc_loading_assets' );

/**
 * Menu
 */
function frc_loading_menu()
{
    add_menu_page(
        __('胖鼠采集', 'Fat Rat Collect'),
        __('胖鼠采集', 'Fat Rat Collect'),
        'manage_options',
        'frc-collect',
        'frc_spider',
        plugins_url('images/', __FILE__) . 'fat-rat.png'
    );

    add_submenu_page(
        'frc-collect',
        __('采集中心', 'Fat Rat Collect'),
        __('采集中心', 'Fat Rat Collect'),
        'manage_options',
        'frc-spider',
        'frc_spider'
    );

    add_submenu_page(
        'frc-collect',
        __('配置中心', 'Fat Rat Collect'),
        __('配置中心', 'Fat Rat Collect'),
        'manage_options',
        'frc-options',
        'frc_options'
    );

    add_submenu_page(
        'frc-collect',
        __('数据桶中心', 'Fat Rat Collect'),
        __('数据桶中心', 'Fat Rat Collect'),
        'manage_options',
        'frc-data',
        'frc_data_list'
    );

    add_submenu_page(
        'frc-collect',
        __('添加/修改(配置)', 'Fat Rat Collect'),
        __('添加/修改(配置)', 'Fat Rat Collect'),
        'manage_options',
        'frc-options-add-edit',
        'frc_options_add_edit'
    );

    add_submenu_page(
        'frc-collect',
        __('Debugging', 'Fat Rat Collect'),
        __('Debugging', 'Fat Rat Collect'),
        'manage_options',
        'frc-debugging',
        'frc_debugging'
    );

    add_submenu_page(
        '',
        __('数据列表', 'Fat Rat Collect'),
        __('数据列表', 'Fat Rat Collect'),
        'manage_options',
        'frc-data-detail',
        'frc_data_detail'
    );


    add_submenu_page(
        'frc-collect',
        __('胖鼠工具箱', 'Fat Rat Collect'),
        __('胖鼠工具箱', 'Fat Rat Collect'),
        'manage_options',
        'frc-kit',
        'frc_kit'
    );

    remove_submenu_page('frc-collect', 'frc-collect');
//    remove_submenu_page('frc-collect', 'frc-data-detail');
}
add_action('admin_menu', 'frc_loading_menu');


if (!function_exists('frc_write_log')){
    function frc_write_log($string, $file_name = '')
    {
        if (is_array($string)){
            $string = json_encode($string);
        }
        $time = current_time('timestamp');
        $file_name = 'frc.log'.'-'.date('Ymd').($file_name!=''?'-'.$file_name:'');
        $content = sprintf('[%s] %s '."\n", date('Y-m-d H:i:s', $time), $string);
        file_put_contents(plugin_dir_path( __FILE__ ).'logs/'.$file_name, $content,FILE_APPEND);
    }
}
/**
 * Require ..
 * 开发者您好，您可修改源码自行使用
 * 但请不要修改胖鼠采集代码后用于其他组织/商业行为
 */
require_once( plugin_dir_path( __FILE__ ) . 'src/Foundation/helpers.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-apierror.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-spider.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options-add-edit.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-data.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-data-detail.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-validation.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-kit.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-debugging.php' );


add_action( 'wp_ajax_frc_interface', function (){
    $s_time = microtime(true);
    if(version_compare(PHP_VERSION,'7.1.0', '<')){
        wp_send_json(['code' => 5003, 'msg' => '鼠友你好, 胖鼠采集目前要求php版本 > 7.1, 检测到你当前PHP版本为'.phpversion().'. 建议升级php版本, 或者请去胖鼠采集的Github下载使用胖鼠v5.6版本 分支名: based_php_5.6!']);
        wp_die();
    }
    $interface_type = frc_sanitize_text('interface_type', null);
    if (empty($interface_type)){
        wp_send_json(['code' => 5004, 'msg' => 'interface type not found error!']);
        wp_die();
    }

    $action_func = frc_sanitize_text('action_func');
    if (empty($action_func)){
        wp_send_json(['code' => 5001, 'msg' => 'Parameter error!']);
        wp_die();
    }

    if(get_option('fat_rat_collect_api_code') === "4"."03"){
        (new FRC_Validation())->validation_correction();
        (new FRC_Validation())->report_permissions();
        sleep(5);
        wp_send_json(['code' => 5005, 'msg' => FRC_Validation::FRC_HINT_K]);
        wp_die();
    }

    $result = null;
    if ($interface_type == '1'){
        $action_func = 'grab_'.$action_func;
        $model = new FRC_Spider();
    } elseif($interface_type == '2'){
        $action_func = 'interface_'.$action_func;
        $model = new FRC_Options();
    } elseif($interface_type == '3'){
        $action_func = 'data_'.$action_func;
        $model = new FRC_Data();
    } elseif($interface_type == '4'){
        $action_func = 'validation_'.$action_func;
        $model = new FRC_Validation();
    } else {
        $model = null;
    }

    method_exists($model, $action_func) && $result = $model->$action_func();
    if ($result != null){
        $result['cost'] = round(microtime(true ) - $s_time, 2).'秒';
        wp_send_json($result);
        wp_die();
    }
    wp_send_json(['code' => 5002, 'result' => $result, 'msg' => 'Action there is no func! or Func is error!']);
    wp_die();
});

/**
 * add cron operating time
 * @return array
 */
function frc_more_schedules() {
    return array(
        'fifteenminutes' => array('interval' => 900, 'display' => '每隔十五分钟'),
        'halfhour' => array('interval' => 1800, 'display' => '每隔半小时'),
        'twohourly' => array('interval' => 7200, 'display' => '每隔两小时'),
        'threehours' => array('interval' => 10800, 'display' => '每隔三小时'),
        'fourhourly' => array('interval' => 14400, 'display' => '每隔四小时'),
        'eighthourly' => array('interval' => 28800, 'display' => '每隔八小时'),
    );
}
add_filter('cron_schedules', 'frc_more_schedules');

function frc_spider_timing_task()
{
    return (new FRC_Spider())->timing_spider();
}

if ($frc_cron_spider = get_option('frc_cron_spider')){
    if (!wp_next_scheduled('frc_cron_spider_hook')) {
        wp_schedule_event(time(), $frc_cron_spider, 'frc_cron_spider_hook');
    }
    add_action('frc_cron_spider_hook', 'frc_spider_timing_task');
} else {
    wp_clear_scheduled_hook('frc_cron_spider_hook');
}

if ($frc_cron_release = get_option('frc_cron_release')){
    if (!wp_next_scheduled('frc_cron_release_hook')) {
        wp_schedule_event(time(), $frc_cron_release, 'frc_cron_release_hook');
    }

    add_action('frc_cron_release_hook', 'frc_cron_release_task');
    function frc_cron_release_task()
    {
        return (new FRC_Data())->data_automatic_release();
    }
} else {
    wp_clear_scheduled_hook('frc_cron_release_hook');
}

/**
 * Uninstall
 */
function frc_plugin_uninstall() {
    global $wpdb;
    $table_o_post     = $wpdb->prefix . 'fr_post';
    $table_o_options  = $wpdb->prefix . 'fr_options';
    $wpdb->query( "DROP TABLE IF EXISTS $table_o_options" );
    $wpdb->query( "DROP TABLE IF EXISTS $table_o_post" );

    delete_option( 'frc_db_version' );
    delete_option( 'frc_mysql_upgrade_progress' );

    foreach (FRC_Validation::FRC_VALIDATION_ABILITY_MAP as $value){
        delete_option( $value[0] );
    }

    $table_post     = $wpdb->prefix . 'frc_post';
    $table_options  = $wpdb->prefix . 'frc_options';

    $wpdb->query( "DROP TABLE IF EXISTS $table_options" );
    $wpdb->query( "DROP TABLE IF EXISTS $table_post" );

}
register_uninstall_hook(__FILE__, 'frc_plugin_uninstall');
