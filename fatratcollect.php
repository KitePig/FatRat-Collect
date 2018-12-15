<?php
/**
 * Plugin Name: 胖鼠采集
 * Plugin URI: #
 * Description: 胖鼠采集系统
 * Version: 0.0.1
 * Author: Fat Rat
 * Author URI: #
 * Disclaimer: Use at your own risk. No warranty expressed or implied is provided.
 * Text Domain: Fat Rat Collect
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Fire up Composer's autoloader
 */
require_once( __DIR__ . '/vendor/autoload.php' );


// TODO 数据库字段有空再优化
function plugin_install(){
    global $wpdb;
    global $hfcm_db_version;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $table_log      = $wpdb->prefix . 'fr_log';
    $table_options      = $wpdb->prefix . 'fr_options';
    $table_post      = $wpdb->prefix . 'fr_post';
    $charset_collate = $wpdb->get_charset_collate();

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_log(
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `log_type` varchar(20) NOT NULL,
          `log_info` text NOT NULL,
          `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)
        )	$charset_collate; ";
    dbDelta( $sql );

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_options(
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `remove_outer_link` tinyint(3) NOT NULL,
          `keywords_replace_rule` text NOT NULL,
          PRIMARY KEY (`id`)
        )	$charset_collate; ";
    dbDelta( $sql );

    $sql =
        "CREATE TABLE IF NOT EXISTS $table_post(
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `title` varchar(120) NOT NULL DEFAULT '',
          `content` text NOT NULL,
          `image` varchar(255) NOT NULL,
          `post_type` varchar(20) NOT NULL,
          `link` varchar(255) NOT NULL,
          `is_post` tinyint(3) NOT NULL DEFAULT '0',
          `author` varchar(30) NOT NULL,
          `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)
        )	$charset_collate; ";
    dbDelta( $sql );

}
register_activation_hook( __FILE__, 'plugin_install' );

// style
function loading_assets() {
    wp_register_script( 'fat-rat-js', plugins_url( 'js/fatrat.js?v=2', __FILE__ ), array( 'jquery' ), '1.0.0',true );
    wp_enqueue_script( 'fat-rat-js' );
}
add_action( 'admin_enqueue_scripts', 'loading_assets' );

// menu
function loading_menu()
{
    add_menu_page(
        __('胖鼠采集', 'Fat Rat Collect'),
        __('胖鼠采集', 'Fat Rat Collect'),
        'administrator',
        'rat-collent',
        'rat_spider',
        plugins_url('images/', __FILE__) . 'fat-rat.png'
    );

    add_submenu_page(
        'rat-collent',
        __('采集爬虫', 'Fat Rat Collect'),
        __('采集爬虫', 'Fat Rat Collect'),
        'administrator',
        'rat-spider',
        'rat_spider'
    );

    add_submenu_page(
        'rat-collent',
        __('采集配置', 'Fat Rat Collect'),
        __('采集配置', 'Fat Rat Collect'),
        'administrator',
        'rat-options',
        'rat_options'
    );

    add_submenu_page(
        'rat-collent',
        __('导入系统', 'Fat Rat Collect'),
        __('导入系统', 'Fat Rat Collect'),
        'administrator',
        'rat-install-system',
        'rat_install_system'
    );

    add_submenu_page(
        'rat-collent',
        __('添加/修改(配置)', 'Fat Rat Collect'),
        __('添加/修改(配置)', 'Fat Rat Collect'),
        'administrator',
        'rat-options-add-edit',
        'rat_options_add_edit'
    );
    remove_submenu_page('rat-collent', 'rat-collent');

}
add_action('admin_menu', 'loading_menu');

// 增加cron可操作时间
function wpjam_more_reccurences() {
    return array(
        'seconds' => array('interval' => 120, 'display' => '120 seconds'),
        'everytenminutes' => array('interval' => 600, 'display' => 'Every Ten Minutes'),
        'twohourly' => array('interval' => 7200, 'display' => 'Two Hourly'),
    );
}
add_filter('cron_schedules', 'wpjam_more_reccurences');

require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-spider.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options-add-edit.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-install-system.php' );



