<?php
/**
 * Plugin Name: Fat Rat Collect
 * Plugin URI: https://github.com/fbtopcn/fatratcollect
 * Description: 胖鼠采集(Fat Rat Collect) 是一款可以帮助你采集列表页面的免费采集小工具。任何可以看到的信息都可以采集。支持自动采集。自动发布文章。图片本地化。如果你会一点Html JQuery知识。那更好了。支持你自定义编写任何采集规则。 注:本插件仅供学习参考，作者不承担任何法律责任。不同意不要用。
 * Version: 1.0.0
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

global $frc_version;
$frc_version = '1.0.0';

/**
 * Fire up Composer's autoloader
 */
require_once( __DIR__ . '/vendor/autoload.php' );

/**
 * Install
 * TODO 数据库字段小版本再优化
 * TODO 有一些写法问题小版本再优化
 */
function frc_plugin_install(){
    global $wpdb;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $table_log       = $wpdb->prefix . 'fr_log';
    $table_post      = $wpdb->prefix . 'fr_post';
    $table_options   = $wpdb->prefix . 'fr_options';
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
          `collect_name` varchar(30) NOT NULL DEFAULT '',
          `collect_type` varchar(20) NOT NULL DEFAULT '',
          `collect_list_url` varchar(255) NOT NULL DEFAULT '',
          `collect_list_range` varchar(255) NOT NULL DEFAULT '',
          `collect_list_rules` varchar(255) NOT NULL DEFAULT '',
          `collect_content_range` varchar(255) NOT NULL DEFAULT '',
          `collect_content_rules` varchar(255) NOT NULL DEFAULT '',
          `collect_remove_outer_link` tinyint(3) NOT NULL DEFAULT '1',
          `collect_keywords_replace_rule` text NOT NULL,
          `collect_remove_head` varchar(2) NOT NULL DEFAULT '0',
          `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

    // 初始化数据
    $sql = "INSERT INTO " . $table_options . " VALUES (NULL, '王者荣耀17173最新新闻', 'list', 'http://news.17173.com/z/pvp/list/zxwz.shtml', '.list-item', 'link%a|href|null', '.col-l', 'title%.gb-final-tit-article|text|null)(content%.gb-final-mod-article|html|a -.include-style3 -.loltag -div:last -#content_end -style:gt(-1)', '1', '17173=游戏', '0', '2018-12-14 17:53:30'), (NULL, '叶子猪大话西游修炼心得', 'list', 'http://xy2.yzz.cn/guide/skill/', '#getMaxHeight>ul>li', 'link%a|href', '#article', 'title%h1|text)(content%table|html|a -.editor -p:last -div[class=tag]', '1', '17173=游戏', '1', '2018-12-14 17:53:30'), (NULL, '52冒险岛攻略', 'list', 'http://mxd.52pk.com/zhiye/list_2186_1.html', '.mb1>ul>li', 'link%a|href', '#main>div[class=content]', 'title%h2|text)(content%div[class=article_show]|html|a', '1', '17173=游戏', '1', '2018-12-14 18:07:21'), (NULL, '52冒险岛心情', 'list', 'http://mxd.52pk.com/xinq/', '.mb1>ul>li', 'link%a|href', '#main>div[class=content]', 'title%h2|text)(content%div[class=article_show]|html|a', '1', '17173=游戏', '1', '2018-12-17 15:40:29'), (NULL, '24直播网皇马TAG标签页', 'list', 'https://www.24zbw.com/news/tag/huangma/', '.news_list>div[class=block_img]', 'link%a|href|null', '.content_block_left', 'title%div[class=title]>h1|text|null)(content%div[class=articles_text]|html|-div:first', '1', '17173=游戏', '0', '2018-12-17 17:17:28')";
    dbDelta($sql);

}
register_activation_hook( __FILE__, 'frc_plugin_install' );

/**
 * Uninstall
 */
function frc_plugin_uninstall() {
    global $wpdb;

    $table_log      = $wpdb->prefix . 'fr_log';
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
        __('采集爬虫', 'Fat Rat Collect'),
        __('采集爬虫', 'Fat Rat Collect'),
        'administrator',
        'frc-spider',
        'frc_spider'
    );

    add_submenu_page(
        'frc-collect',
        __('采集配置', 'Fat Rat Collect'),
        __('采集配置', 'Fat Rat Collect'),
        'administrator',
        'frc-options',
        'frc_options'
    );

    add_submenu_page(
        'frc-collect',
        __('导入系统', 'Fat Rat Collect'),
        __('导入系统', 'Fat Rat Collect'),
        'administrator',
        'frc-install-system',
        'frc_install_system'
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
 * 献给看源码的朋友。
 * 秉承开源精神、可以借鉴代码。请不要赤裸裸的copy。谢谢~
 * 如果你觉得我这个小工具写的还不错，或者你觉得加入一些东西可以做的更好。
 * 欢迎你在Github和我一起搞。做一个好用且让大家喜欢的采集小工具
 * 欢迎Q我: 1056418053
 */
/**
 * Require ...
 */
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-spider.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-options-add-edit.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/fatrat-install-system.php' );