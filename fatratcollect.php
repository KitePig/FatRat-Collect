<?php
/**
 * Plugin Name: Fat Rat Collect
 * Plugin URI: http://www.fatrat.cn
 * Description: 胖鼠采集(Fat Rat Collect) 是一款可以帮助你采集列表页面的免费开源采集小工具。支持自动采集。自动发布文章。图片本地化。如果你会一点Html JQuery知识。那更好了。完美支持你自定义任何采集规则。
 * Version: 1.11.1
 * Author: Fat Rat
 * Author URI: http://www.fatrat.cn/about
 * Disclaimer: Use at your own risk. No warranty expressed or implied is provided.
 * Text Domain: fat-rat-collect
 * License: GPL3
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

global $frc_db_version;
$frc_db_version = '1.11.1';

/**
 * Fire up Composer's autoloader
 */
require_once(__DIR__ . '/vendor/autoload.php');

/**
 * Install
 */
function frc_plugin_install(){
    global $wpdb;
    global $frc_db_version;

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
          `collect_image_download` varchar(10) NOT NULL DEFAULT '1',
          `collect_image_attribute` varchar(20) NOT NULL DEFAULT 'src',
          `collect_remove_outer_link` tinyint(3) NOT NULL DEFAULT '1',
          `collect_custom_content` text NOT NULL DEFAULT '',
          `collect_image_path` tinyint(2) NOT NULL DEFAULT '1',
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
            `pic_attachment` text NOT NULL DEFAULT '',
            `post_type` varchar(20) NOT NULL DEFAULT '',
            `link` varchar(255) NOT NULL DEFAULT '',
            `post_id` int(11) NOT NULL DEFAULT '0',
            `is_post` tinyint(3) NOT NULL DEFAULT '0',
            `author` varchar(30) NOT NULL DEFAULT '',
            `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            KEY `post_type` (`post_type`),
            KEY `link` (`link`),
            KEY `is_post` (`is_post`)
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
    global $wpdb;
    $table_post      = $wpdb->prefix . 'fr_post';
    $table_options   = $wpdb->prefix . 'fr_options';

    if ( get_option( 'frc_db_version' ) != $frc_db_version ) {
        $wpdb->show_errors();
        //Check for Exclude Image Path
        $column_name = 'collect_image_path';
        $checkcolumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table_options, $column_name
        )) ;
        if ( empty( $checkcolumn ) ) {
            $altersql = "ALTER TABLE `$table_options` ADD `{$column_name}` tinyint(2) NOT NULL DEFAULT 1 AFTER `collect_content_rules`";
            $wpdb->query($altersql);
        }
        //Check for Exclude Custom Content
        $column_name = 'collect_custom_content';
        $checkcolumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table_options, $column_name
        )) ;
        if ( empty( $checkcolumn ) ) {
            $altersql = "ALTER TABLE `$table_options` ADD `{$column_name}` text NOT NULL  AFTER `collect_content_rules`";
            $wpdb->query($altersql);
        }
        //Check for Exclude pic_attachment
        $column_name = 'pic_attachment';
        $checkcolumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table_post, $column_name
        )) ;
        if ( empty( $checkcolumn ) ) {
            $altersql = "ALTER TABLE `$table_post` ADD `{$column_name}` text NOT NULL  AFTER `image`";
            $wpdb->query($altersql);
        }
        //Check for Exclude post_id
        $column_name = 'post_id';
        $checkcolumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table_post, $column_name
        )) ;
        if ( empty( $checkcolumn ) ) {
            $altersql = "ALTER TABLE `$table_post` ADD `{$column_name}` int(11) NOT NULL default 0 AFTER `link`";
            $wpdb->query($altersql);
        }
        //Check for Exclude collect_img_attribute
        $column_name = 'collect_image_download';
        $checkcolumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table_options, $column_name
        )) ;
        if ( empty( $checkcolumn ) ) {
            $altersql = "ALTER TABLE `$table_options` ADD `{$column_name}` varchar(20) NOT NULL default '1' AFTER `collect_content_rules`";
            $wpdb->query($altersql);
        }
        //Check for Exclude collect_img_attribute
        $column_name = 'collect_image_attribute';
        $checkcolumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table_options, $column_name
        )) ;
        if ( empty( $checkcolumn ) ) {
            $altersql = "ALTER TABLE `$table_options` ADD `{$column_name}` varchar(20) NOT NULL default 'src' AFTER `collect_content_rules`";
            $wpdb->query($altersql);
        }

        $wpdb->query( "update $table_options set `collect_image_attribute` = 'data-src' where `collect_name` = '微信'" );
        $wpdb->query( "update $table_options set `collect_image_attribute` = 'data-original-src', `collect_content_range` = 'body', `collect_content_rules` = 'title%h1|text|null)(content%article|html|a)(author%span[class=name]|text|null' where `collect_name` = '简书'" );

        frc_plugin_install();
    }

    update_option('frc_db_version', $frc_db_version);
}
add_action( 'plugins_loaded', 'frc_plugin_update' );

/**
 * Uninstall
 */
function frc_plugin_uninstall() {
    global $wpdb;

    $table_post     = $wpdb->prefix . 'fr_post';
    $table_options  = $wpdb->prefix . 'fr_options';

    $wpdb->query( "DROP TABLE IF EXISTS $table_options" );
    $wpdb->query( "DROP TABLE IF EXISTS $table_post" );

}
register_uninstall_hook(__FILE__, 'frc_plugin_uninstall');

/**
 * Style && Script
 */
function frc_loading_assets( $hook ) {
    global $frc_db_version;
    $allowed_pages = array(
        'frc-spider',
        'frc-options',
        'frc-import-data',
        'frc-options-add-edit'
    );

    if (in_array(strstr($hook,"frc-"), $allowed_pages)) {
        // css
        wp_register_style('fat-rat-bootstrap-css', plugins_url('css/bootstrap.min.css', __FILE__));
        wp_enqueue_style('fat-rat-bootstrap-css');
        wp_register_style('fat-rat-css', plugins_url('css/fatrat.css', __FILE__));
        wp_enqueue_style('fat-rat-css');

        // js
        wp_register_script('fat-rat-bootstrap-js', plugins_url('js/bootstrap.min.js', __FILE__));
        wp_enqueue_script('fat-rat-bootstrap-js');
        wp_register_script('fat-rat-js', plugins_url('js/fatrat.js', __FILE__), array('jquery'), $frc_db_version, true);
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
        'publish_posts',
        'frc-collect',
        'frc_spider',
        plugins_url('images/', __FILE__) . 'fat-rat.png'
    );

    add_submenu_page(
        'frc-collect',
        __('采集中心', 'Fat Rat Collect'),
        __('采集中心', 'Fat Rat Collect'),
        'publish_posts',
        'frc-spider',
        'frc_spider'
    );

    add_submenu_page(
        'frc-collect',
        __('配置中心', 'Fat Rat Collect'),
        __('配置中心', 'Fat Rat Collect'),
        'publish_posts',
        'frc-options',
        'frc_options'
    );

    add_submenu_page(
        'frc-collect',
        __('数据中心', 'Fat Rat Collect'),
        __('数据中心', 'Fat Rat Collect'),
        'publish_posts',
        'frc-import-data',
        'frc_import_data'
    );

    add_submenu_page(
        'frc-collect',
        __('添加/修改(配置)', 'Fat Rat Collect'),
        __('添加/修改(配置)', 'Fat Rat Collect'),
        'publish_posts',
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
        'twohourly' => array('interval' => 7200, 'display' => 'Two Hourly'), // 两小时
        'fourhourly' => array('interval' => 14400, 'display' => 'Four Hourly'), // 四小时
        'eighthourly' => array('interval' => 28800, 'display' => 'Eight Hourly'), // 八小时
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
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-validation.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-tool.php' );
