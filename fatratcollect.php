<?php
/**
 * Plugin Name: Fat Rat Collect
 * Plugin URI: https://github.com/fbtopcn/fatratcollect
 * Description: 胖鼠采集(Fat Rat Collect) 是一款可以帮助你采集列表页面的免费采集小工具。任何可以看到的信息都可以采集。支持自动采集。自动发布文章。图片本地化。如果你会一点Html JQuery知识。那更好了。支持你自定义编写任何采集规则。 注:本插件仅供学习参考，作者不承担任何法律责任。不同意不要用。
 * Version: 1.4.3
 * Author: Fat Rat
 * Author URI: https://fbtop.cn
 * Disclaimer: Use at your own risk. No warranty expressed or implied is provided.
 * Text Domain: Fat Rat Collect
 * Domain Path: /languages
 * License: GPL
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// 回头优化掉
global $frc_version;
$frc_version = '1.4.3';

/**
 * Fire up Composer's autoloader
 */
require_once(__DIR__ . '/vendor/autoload.php');

/**
 * Install
 */
function frc_plugin_install(){
    global $wpdb;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $table_post      = $wpdb->prefix . 'fr_post';
    $table_options   = $wpdb->prefix . 'fr_options';
    $charset_collate = $wpdb->get_charset_collate();

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_options(
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `collect_name` varchar(30) NOT NULL DEFAULT '',
          `collect_describe` varchar(200) NOT NULL DEFAULT '',
          `collect_type` varchar(20) NOT NULL DEFAULT '',
          `collect_list_url` varchar(255) NOT NULL DEFAULT '',
          `collect_list_range` varchar(255) NOT NULL DEFAULT '',
          `collect_list_rules` varchar(255) NOT NULL DEFAULT '',
          `collect_content_range` varchar(255) NOT NULL DEFAULT '',
          `collect_content_rules` varchar(255) NOT NULL DEFAULT '',
          `collect_remove_outer_link` tinyint(3) NOT NULL DEFAULT '1',
          `collect_keywords_replace_rule` text NOT NULL,
          `collect_charset` varchar(20) NOT NULL DEFAULT '',
          `collect_remove_head` varchar(2) NOT NULL DEFAULT '0',
          `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`),
          KEY `collect_type` (`collect_type`)
        )	$charset_collate; ";
    dbDelta( $sql );

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_post(
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `title` varchar(120) NOT NULL DEFAULT '',
            `content` mediumtext NOT NULL DEFAULT '',
            `image` varchar(255) NOT NULL DEFAULT '',
            `post_type` varchar(20) NOT NULL DEFAULT '',
            `link` varchar(255) NOT NULL DEFAULT '',
            `is_post` tinyint(3) NOT NULL DEFAULT '0',
            `author` varchar(30) NOT NULL DEFAULT '',
            `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            KEY `post_type` (`post_type`),
            KEY `link` (`link`),
            KEY `is_post` (`is_post`)
        )	$charset_collate; ";
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'frc_plugin_install' );

/**
 * Uninstall
 */
function frc_plugin_uninstall() {
    global $wpdb;

    $table_log      = $wpdb->prefix . 'fr_log'; // 过两天去掉
    $table_post     = $wpdb->prefix . 'fr_post';
    $table_options  = $wpdb->prefix . 'fr_options';

    $wpdb->query( "DROP TABLE IF EXISTS $table_log" );
    $wpdb->query( "DROP TABLE IF EXISTS $table_options" );
    $wpdb->query( "DROP TABLE IF EXISTS $table_post" );

}
register_uninstall_hook(__FILE__, 'frc_plugin_uninstall');

/**
 * Style && Script
 */
function frc_loading_assets() {
    // css
    wp_register_style( 'fat-rat-bootstrap-css', plugins_url( 'css/bootstrap.min.css', __FILE__ ));
    wp_enqueue_style( 'fat-rat-bootstrap-css' );
    wp_register_style( 'fat-rat-css', plugins_url( 'css/fatrat.css', __FILE__ ));
    wp_enqueue_style( 'fat-rat-css' );

    // js
    wp_register_script( 'fat-rat-bootstrap-js', plugins_url( 'js/bootstrap.min.js', __FILE__ ));
    wp_enqueue_script( 'fat-rat-bootstrap-js' );
    wp_register_script( 'fat-rat-js', plugins_url( 'js/fatrat.js', __FILE__ ), array( 'jquery' ), '1.0.0',true );
    wp_enqueue_script( 'fat-rat-js' );
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
        'administrator',
        'frc-collect',
        'frc_spider',
        plugins_url('images/', __FILE__) . 'fat-rat.png'
    );

    add_submenu_page(
        'frc-collect',
        __('采集中心', 'Fat Rat Collect'),
        __('采集中心', 'Fat Rat Collect'),
        'administrator',
        'frc-spider',
        'frc_spider'
    );

    add_submenu_page(
        'frc-collect',
        __('配置中心', 'Fat Rat Collect'),
        __('配置中心', 'Fat Rat Collect'),
        'administrator',
        'frc-options',
        'frc_options'
    );

    add_submenu_page(
        'frc-collect',
        __('数据中心', 'Fat Rat Collect'),
        __('数据中心', 'Fat Rat Collect'),
        'administrator',
        'frc-import-data',
        'frc_import_data'
    );

    add_submenu_page(
        'frc-collect',
        __('添加/修改(配置)', 'Fat Rat Collect'),
        __('添加/修改(配置)', 'Fat Rat Collect'),
        'administrator',
        'frc-options-add-edit',
        'frc_options_add_edit'
    );
    remove_submenu_page('frc-collect', 'frc-collect');

}
add_action('admin_menu', 'frc_loading_menu');

/**
 * add cron operating time
 * @return array
 */
function frc_more_schedules() {
    return array(
        'seconds' => array('interval' => 120, 'display' => '120 seconds'),
        'everytenminutes' => array('interval' => 600, 'display' => 'Every Ten Minutes'),
        'twohourly' => array('interval' => 7200, 'display' => 'Two Hourly'),
    );
}
add_filter('cron_schedules', 'frc_more_schedules');

/**
 * Require ...
 * TODO 提取基类...
 */
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-apierror.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-spider.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options-add-edit.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-import-data.php' );