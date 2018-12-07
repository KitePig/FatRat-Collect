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


function plugin_install(){

}
register_activation_hook( __FILE__, 'plugin_install' );

// style
function loading_assets() {

//    wp_register_style( 'fat-rat-css', plugins_url( 'css/style-admin.css', __FILE__ ) );
//    wp_enqueue_style( 'fatr-at-css' );

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
    remove_submenu_page('rat-collent', 'rat-collent');

}
add_action('admin_menu', 'loading_menu');


require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-spider.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-install-system.php' );



