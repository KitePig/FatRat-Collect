<?php
if (!defined('WPINC')) { die; }

class FRC_V3_Menu
{
    private $plugin_file;
    private $dev_mode = false;

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

        if ($this->dev_mode) {
            $this->enqueue_dev();
        } else {
            $this->enqueue_prod();
        }

        wp_localize_script('frc-v3-script', 'frcV3Data', [
            'apiUrl'   => rest_url('frc-v3/v1'),
            'nonce'    => wp_create_nonce('wp_rest'),
            'adminUrl' => admin_url(),
            'userId'   => get_current_user_id(),
        ]);
    }

    private function enqueue_dev()
    {
        $dev_url = 'http://localhost:5173';
        wp_enqueue_script('frc-v3-script', $dev_url . '/src/main.js', [], null, true);
        wp_script_add_data('frc-v3-script', 'type', 'module');
    }

    private function enqueue_prod()
    {
        $dist_url  = plugins_url('v3/dist', $this->plugin_file);
        $dist_path = dirname(__DIR__) . '/dist/assets/';
        $version   = '1.1.0';

        $js_file = $this->find_file($dist_path, 'js');
        if ($js_file) {
            wp_enqueue_script('frc-v3-script', $dist_url . '/assets/' . $js_file, [], $version, true);
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
        ?>
        <div class="wrap frc-v3-wrap">
            <?php if ($this->dev_mode): ?>
            <script type="module" src="http://localhost:5173/@vite/client"></script>
            <?php endif; ?>
            <div id="frc-v3-app"></div>
        </div>
        <?php
    }
}
