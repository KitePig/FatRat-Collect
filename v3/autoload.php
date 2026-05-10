<?php
/**
 * Fat Rat Collect V3 - Autoloader & Bootstrap
 *
 * V3 版本入口：加载 REST API 和菜单控制器
 * 不依赖 Composer autoload，独立加载
 */

if (!defined('WPINC')) {
    die;
}

// 确保 WP_List_Table 可用
if (!class_exists('WP_List_Table')) {
    require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
}

// 确保 V2 核心类已加载（V3 部分功能依赖 V2 的已有逻辑）
$v2_includes = [
    'fatrat-apierror.php',
    'fatrat-validation.php',
    'fatrat-options.php',
    'fatrat-data.php',
    'fatrat-spider.php',
];

foreach ($v2_includes as $file) {
    $path = dirname(__DIR__) . '/includes/' . $file;
    if (file_exists($path)) {
        require_once $path;
    }
}

// 加载 V3 控制器
require_once __DIR__ . '/includes/class-frc-v3-rest.php';
require_once __DIR__ . '/includes/class-frc-v3-menu.php';

// 注册 REST API 路由（在插件加载时直接注册，确保 rest_api_init 时路由已就绪）
$rest = new FRC_V3_Rest();
$rest->register();

// V3 菜单依赖于 admin_menu hook，需要通过 init 注册
add_action('init', function () {
    $menu = new FRC_V3_Menu();
    $menu->register();
});
