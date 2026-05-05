<?php
if (!defined('WPINC')) { die; }

class FRC_V3_Menu
{
    private $plugin_file;

    public function __construct()
    {
        $this->plugin_file = dirname(__DIR__, 2) . '/fatratcollect.php';
    }

    public function register()
    {
        add_action('admin_menu', [$this, 'register_menu'], 20);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    public function register_menu()
    {
        add_menu_page(
            '胖鼠采集 V3',
            '胖鼠采集 V3',
            'manage_options',
            'frc-v3',
            [$this, 'render_page'],
            plugins_url('images/fat-rat.png', $this->plugin_file),
            100
        );
    }

    public function enqueue_assets($hook)
    {
        if (strpos($hook, 'frc-v3') === false) {
            return;
        }

        $dist_url  = plugins_url('v3/dist', $this->plugin_file);
        $dist_path = dirname(__DIR__) . '/dist/assets/';
        $version   = '1.0.0';

        $css_file = $this->find_file($dist_path, 'css');
        $js_file  = $this->find_file($dist_path, 'js');

        if ($css_file) {
            wp_enqueue_style('frc-v3-app', $dist_url . '/assets/' . $css_file, [], $version);
        }

        if ($js_file) {
            wp_enqueue_script('frc-v3-app', $dist_url . '/assets/' . $js_file, [], $version, true);
            wp_localize_script('frc-v3-app', 'frcV3Data', [
                'apiUrl'   => rest_url('frc-v3/v1'),
                'nonce'    => wp_create_nonce('wp_rest'),
                'adminUrl' => admin_url(),
                'userId'   => get_current_user_id(),
            ]);
        }
    }

    private function find_file($dir, $ext)
    {
        $files = glob($dir . 'index*.' . $ext);
        if (!empty($files)) {
            return basename($files[0]);
        }

        if (is_dir($dir)) {
            $scan = scandir($dir);
            foreach ($scan as $f) {
                if (strpos($f, 'index') === 0 && substr($f, -strlen($ext)-1) === '.' . $ext) {
                    return $f;
                }
            }
        }

        return '';
    }

    public function render_page()
    {
        echo '<div class="wrap frc-v3-wrap"><div id="frc-v3-app"></div></div>';
    }
}
