<?php
/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * 如果你觉得这个项目还不错.可以去Github上 Star 关注我.
 * 您可使用胖鼠采集自行二次开发满足您的个性化需求.
 * 请不要Copy, Rename. OR 修改源代码进行售卖获利.
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2020年4月1日
 */

class FRC_Kit{

    public function kit_image_path($file){
        return plugin_dir_url(dirname(__FILE__)).'images/' . $file;
    }

    public function kit_automatic_save_pic($postID){
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            || (!current_user_can('edit_post', $postID))) {
            return;
        }
        remove_action('publish_post', 'frc_automatic_save_pic');
        $post_content = get_post($postID)->post_content;
        // 逻辑

        add_action('publish_post', 'frc_automatic_save_pic');
    }

    public function kit_auto_tags($postID){
        $result = get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS);
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || empty($result) || json_decode($result)->switch != 'open') {
            return;
        }

        $post_content = get_post($postID)->post_content;
        $add_tag_link = get_the_tags($postID);
        if (!$add_tag_link){
            collect(get_tags( array('hide_empty' => false) ))->map(function ($tag) use ($postID, &$post_content){
                if ( stristr($post_content,$tag->name) !== false) {
                    wp_set_post_tags( $postID, $tag->name, true );
                }
            });
        }
    }


    public function kit_dynamic_fields($postID){
        $result = get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS);
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || empty($result) || json_decode($result)->switch != 'open') {
            return;
        }

        $content = get_post($postID)->post_content;

        if (strpos( $content, '<blockquote' ) !== false || strpos( $content, '</blockquote>' ) !== false){
            return;
        }

        $cats = collect(get_the_category($postID));
        if ($cats->isEmpty()) {
            return ;
        }
        $cat_ids = $cats->pluck('term_id');
        $args = array('orderby' => 'rand','showposts' => 1,'cat' => $cat_ids->implode(','), 'date_query' => array(
            'column' => 'post_date',
            'after' => date('Y-m-d H:i:s', strtotime(current_time('mysql'))-(3600*24*57)),
            'before' => current_time('mysql')
        ));

        $query_posts = new WP_Query();
        $posts_data = $query_posts->query($args);

        if (empty($posts_data)) {
            return ;
        }

        /*
        if (isset($posts_data[0]) && $previous_post = $posts_data[0]){
            $link = get_permalink($previous_post->ID);
            $pre_string = sprintf('<blockquote style="background: #F5F5F5; font-size: 10px;"><a href="%s" style="text-decoration: none"><span style="color: #929292;">%s</span><p>%s</p></a></blockquote>', $link, $previous_post->post_title, wp_trim_words($previous_post->post_content, 130));
            $content = $pre_string.$content;
        }
         */

        if (isset($posts_data[0]) && $next_post = $posts_data[0]){
            $link = get_permalink($next_post->ID);
            $next_string = sprintf('<blockquote style="background: #F5F5F5; font-size: 10px;"><a href="%s" style="text-decoration: none"><span style="color: #929292;">相关推荐: %s</span><p>%s</p></a></blockquote>', $link, $next_post->post_title, wp_trim_words($next_post->post_content, 130));
            $content = $content.$next_string;
        }

        wp_update_post(array('ID' => $postID, 'post_content' => $content));
    }
}

if (!function_exists("frc_image")) {
    /**
     * @param $file
     * @return string
     */
    function frc_image($file){
        $model = new FRC_Kit();
        esc_html_e($model->kit_image_path($file));
    }
}

function frc_auto_task($postID){
    $model = new FRC_Kit();
    $model->kit_auto_tags($postID);
    $model->kit_dynamic_fields($postID);
}
add_action('publish_post', 'frc_auto_task');

$result = get_option(FRC_Validation::FRC_VALIDATION_INNER_CHAIN);
if ($result && json_decode($result)->switch === 'open'){
    function frc_inner_chain( $post_content ) {
        $config = json_decode(get_option(FRC_Validation::FRC_VALIDATION_INNER_CHAIN));
        $limit = isset($config->limit) ? $config->limit : 1;

        collect(get_tags( array('hide_empty' => false) ))->map(function ($tag) use (&$post_content, $limit){
            if ( stristr($post_content,$tag->name) !== false) {

                $link = get_tag_link($tag->term_id);
                $keyword = stripslashes($tag->name);
                $url = sprintf('<a href="%s" target="_blank" title="%s">%s</a>', $link, $keyword, $keyword);
                $regEx = '\'(?!((<.*?)|(<a.*?)))('. $keyword . ')(?!(([^<>]*?)>)|([^>]*?</a>))\'s';
                $post_content = preg_replace($regEx, $url, $post_content, $limit);
            }
        });

        return $post_content;

    }
    add_filter('the_content','frc_inner_chain');
}

function frc_kit(){
    $frc_validation_tags = get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS);
    $frc_validation_chain = get_option(FRC_Validation::FRC_VALIDATION_INNER_CHAIN);
    $frc_validation_dynamic = get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS);
    $frc_validation_automatic_save_pic = get_option(FRC_Validation::FRC_VALIDATION_AUTOMATIC_SAVE_PIC);
    $frc_validation_release_control = get_option(FRC_Validation::FRC_VALIDATION_RELEASE_CONTROL);
    $frc_validation_insert_keyword = get_option(FRC_Validation::FRC_VALIDATION_INSERT_KEYWORD);
    $frc_validation_sponsorship = get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP);
    $frc_wp_schedules = wp_get_schedules();
    array_multisort(array_column($frc_wp_schedules, 'interval'), SORT_ASC, $frc_wp_schedules);
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('胖鼠工具箱', 'Fat Rat Collect') ?>
            <img width="80" class="float-end" src="<?php frc_image('fat-rat-kit-256x256.png') ?>">
        </h1>
        <p></p>

        <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php esc_attr_e(admin_url('admin.php?page=frc-kit')); ?>">

<!--        增加删除采集文章是否删除图片-->
<!--        增加删除已发布的文章是否删除附件-->
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <?php foreach([
                        ['title' => '胖鼠工具箱', 'anchor' => '#kit', 'permissions' => $frc_validation_sponsorship],
                        ['title' => '自动采集', 'anchor' => '#autospider', 'permissions' => $frc_validation_sponsorship],
                        ['title' => '自动发布', 'anchor' => '#autorelease', 'permissions' => $frc_validation_sponsorship],
                        ['title' => '自动标签', 'anchor' => '#autotags', 'permissions' => $frc_validation_tags],
                        ['title' => '标签内链', 'anchor' => '#innerchain', 'permissions' => $frc_validation_chain],
                        ['title' => '动态内容', 'anchor' => '#dynamiccontent', 'permissions' => $frc_validation_dynamic],
                        ['title' => '数据发布控制', 'anchor' => '#release-control', 'permissions' => $frc_validation_release_control],
                        ['title' => '关键词随机插入', 'anchor' => '#insert-keyword', 'permissions' => $frc_validation_insert_keyword],
//                        ['title' => '自动存图', 'anchor' => '#autosavepic', 'permissions' => $frc_validation_automatic_save_pic],
                        ['title' => '赞助鼠', 'anchor' => '#activation', 'permissions' => $frc_validation_sponsorship],
                  ] as $i => $element) { ?>
                <button class="nav-link <?php $i == 0 ? _e('active') : ''; ?>" data-bs-toggle="tab" data-bs-target="<?php _e($element['anchor']); ?>" type="button">
                    <?php _e($element['title']) ?>
                    <?php if (!empty($element['permissions'])) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" />
                    <?php }?>
                </button>
                <?php } ?>
            </div>
        </nav>

        <p></p>
        <div class="tab-content">
<!--            首页-->
            <div class="tab-pane fade show active" id="kit">
                <p>欢迎来到胖鼠工具箱</p>
                <h2 style="color: #4a148c">胖鼠采集定时任务列表</h2>
                <?php $crons = _get_cron_array();
                $frc_cron_release_boolean = false;
                $frc_cron_spider_boolean = false;
                foreach ((array)$crons as $time => $cron){
                    if (!is_array($cron)){
                        continue;
                    }
                    foreach ($cron as $key => $value){
                        if ($key == 'frc_cron_release_hook'){
                            $frc_cron_release_boolean = true;
                            _e(sprintf('<p><label class="label label-info">胖鼠采集自动发布:下次执行时间 / %s</label></p>', date('Y-m-d h:i:s', strtotime("+8 hours", $time))));
                        }
                        if ($key == 'frc_cron_spider_hook'){
                            $frc_cron_spider_boolean = true;
                            _e(sprintf('<p><label class="label label-info">胖鼠采集自动采集:下次执行时间 / %s</label></p>', date('Y-m-d h:i:s', strtotime("+8 hours", $time))));
                        }
                    }
                }
                if (!$frc_cron_release_boolean){
                    _e('<p><label class="label label-warning">胖鼠采集自动发布:未启动</label></p>');
                }
                if (!$frc_cron_spider_boolean){
                    _e('<p><label class="label label-warning">胖鼠采集自动采集:未启动</label></p>');
                }
                ?>
                <hr />
                <h6>鼠友你好, 如果您遇到定时任务不起作用, 是因为WP-Cron无法连续运行，这是一个wp问题。</h6>
                <p>有一个简单的解决方案。只需将系统的任务计划程序设置为在所需的时间间隔（或在所需的特定时间）运行。最简单的解决方案是使用工具向wp-cron.php文件发出Web请求。</p>
                <p>在系统上安排任务之后，还有一个步骤要完成。WordPress将在每次加载页面时继续运行WP-Cron。这不再是必需的，它将导致服务器上额外的资源使用。可以在wp-config.php文件中禁用WP-Cron</p>

                <h6>1, 打开/wp-config.php文件进行编辑，并添加以下行:  </h6>
                <h6><code>define('DISABLE_WP_CRON', true);</code></h6>
                <h6>2, 添加系统定时任务 你要使用的命令是:</h6>
                    <h6><code>wget -qO- <?php esc_html_e(site_url( '/wp-cron.php' )); ?> &> /dev/null</code></h6>
                2选1即可
                    <h6><code>curl <?php esc_html_e(site_url( '/wp-cron.php' )); ?>  &> /dev/null</code></h6>
                <p><?php esc_html_e( '合理的时间间隔是 5-15 分钟. 这是 */5 * * * * 或 */15 * * * * 的时间间隔设置', 'Fat Rat Collect' ); ?>.</p>
                <p>1, 第一步可优化节省服务器资源, 避免用户每次访问都查询cron, 优化服务速度 </p>
                <p>2, 第二步是执行一个定时的请求, 每隔 5 - 15 分钟(推荐五分钟), 请求站点的/wp-cron.php文件</p>
                <h6>linux OR ubuntu window 宝塔 都可以配置, 具体操作咨询服务商或百度</h6>
                <h6>设置完成之后, 自动采集, 自动发布. 时间很准</h6>
                <?php
                if (isset($_REQUEST['all_collect'])){
                    $frc_validation_all_collect = get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT);
                    if ($frc_validation_all_collect === false) { ?>
                        <h5>全站采集</h5>
                        <input placeholder="请输入激活口令" name="all-collect"/>
                        <input type="button" class="frc-activation button button-primary" data-value="all-collect"
                               value="激活"/>
                    <?php } else { ?>
                        <h5>全站采集</h5>
                        <img width="60" src="<?php frc_image('fat-rat-success.png') ?>">
                        <label class="label label-success label-lg">您于 <?php _e(json_decode($frc_validation_all_collect)->created_at); ?> 已激活成功</label>
                        <label class="label label-success label-lg"></label>
                        <p><label class="label label-info">快去使用吧~</label></p>
                        <?php
                    }
                }
                if (isset($_REQUEST['rendering'])){
                    $frc_validation_rendering = get_option(FRC_Validation::FRC_VALIDATION_RENDERING);
                    if ($frc_validation_rendering === false) { ?>
                        <h5>动态渲染</h5>
                        <input placeholder="请输入激活口令" name="rendering"/>
                        <input type="button" class="frc-activation button button-primary" data-value="rendering"
                               value="激活"/>
                    <?php } else { ?>
                        <h5>全站采集</h5>
                        <img width="60" src="<?php frc_image('fat-rat-success.png') ?>">
                        <label class="label label-success label-lg">您于 <?php _e(json_decode($frc_validation_rendering)->created_at); ?> 已激活成功</label>
                        <label class="label label-success label-lg"></label>
                        <p><label class="label label-info">快去使用吧~</label></p>
                        <?php
                    }
                }
                ?>
            </div>
<!--            自动爬虫-->
            <div class="tab-pane fade" id="autospider">
                <h5>自动采集</h5>
                <ul>
                    <?php $cron_spider = get_option('frc_cron_spider'); ?>
                    <li><input type="radio" name="frc_cron_spider" value="" <?php esc_attr_e(empty($cron_spider) ? 'checked' : ''); ?>> 关闭此功能</li>
                    <?php foreach ($frc_wp_schedules as $key => $info){
                        $disabled = '';
                        if (empty($frc_validation_sponsorship) && $info['interval']<43200){
                            $disabled = 'disabled';
                        }
                        _e(sprintf('<li><input type="radio" name="frc_cron_spider" value="%s" %s %s> %s(%s秒)</li>', $key, (!empty($cron_spider) && $cron_spider == $key ? esc_attr_e('checked') : ''), $disabled, $info['display'], $info['interval']));
                    } ?>
                </ul>
                <p>胖鼠工具箱首页可看到爬虫目前的简单状态哦, 后续慢慢优化哦</p>
                <p>或者下载安装插件 Advanced Cron Manager 里面 frc_ 开头的就是咱们的定时自动任务, 其他类似插件均可</p>
                <input type="button" class="frc_cron_button button button-primary" data-value="frc_cron_spider" value="设置" />
            </div>
<!--            自动发布-->
            <div class="tab-pane fade" id="autorelease">
                <h5>自动发布</h5>
                <p>请鼠友给胖鼠<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">五星评分</a>, 感谢!</p>
                <ul>
                    <?php $cron_release = get_option('frc_cron_release'); ?>
                    <li><input type="radio" name="frc_cron_release" value="" <?php esc_attr_e(empty($cron_release) ? 'checked' : ''); ?>> 关闭此功能</li>
                    <?php foreach ($frc_wp_schedules as $key => $info){
                        $disabled = '';
                        if (empty($frc_validation_sponsorship) && $info['interval']<43200){
                            $disabled = 'disabled';
                        }
                        _e(sprintf('<li><input type="radio" name="frc_cron_release" value="%s" %s %s> %s(%s秒)</li>', $key, (!empty($cron_release) && $cron_release == $key ? esc_html('checked') : ''), $disabled, $info['display'], $info['interval']));
                    } ?>
                </ul>
                <input type="button" class="frc_cron_button button button-primary" data-value="frc_cron_release" value="设置" />
            </div>
<!--            自动标签-->
            <div class="tab-pane fade" id="autotags">
                <h5>自动标签</h5>
                <?php
                if ($frc_validation_tags != false){
                    _e('<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_tags)->created_at.' 已激活成功</label></p>');
                }
                ?>
                <p><a href="https://www.fatrat.cn/docs/v2/auto-tags" target="_blank">Auto Tags</a> （文章自动打标签）</p>
                <p>此功能不依赖胖鼠采集, 属可独立运行功能！</p>
                <p>自动标签意指为文章自动打标签！</p>
                <p>第一步把你的标签输入进标签库！</p>
                <p>新发布的文章会在发布的同时, 会自动匹配标签库标签.</p>
                <p>关键词命中就会自动打标签, 升级后英文不区分大小写.</p>
                <p>省时省力还省心！</p>
                <?php
                if ($frc_validation_tags === false) { ?>
                    <input placeholder="请输入激活口令" name="auto-tags"/>
                    <input type="button" class="frc-activation button button-primary" data-value="auto-tags"
                           value="激活"/>
                <?php } else { ?>
                    <?php
                    $conf_json = json_decode($frc_validation_tags);
                    $switch_text = $conf_json->switch == 'open' ? '此功能目前是启动状态' : '此功能目前是关闭状态';
                    $subsequent_text = $conf_json->switch == 'open' ? '点击关闭' : '点击启动';
                    _e(sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text));
                    _e(sprintf('<p><input type="button" class="frc-function-switch button button-primary" data-value="auto-tags" value="%s" /></p>', $subsequent_text));
                } ?>
            </div>
<!--            标签内链-->
            <div class="tab-pane fade" id="innerchain">
                <p><h5>标签内链</h5></p>
                <?php
                if ($frc_validation_chain != false){
                    _e('<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_chain)->created_at.' 已激活成功</label></p>');
                }
                ?>
                <p>开启后会给文章中的标签增加标签列表页的链接</p>
                <p>每个标签目前只增加一次链接</p>
                <p>配合自动标签更完美, 省时省力还省心.</p>
                <?php
                if ($frc_validation_chain === false) { ?>
                    <input placeholder="请输入激活口令" name="inner-chain"/>
                    <input type="button" class="frc-activation button button-primary" data-value="inner-chain"
                           value="激活"/>
                <?php } else { ?>
                    <?php
                    $conf_json = json_decode($frc_validation_chain);
                    $switch_text = $conf_json->switch == 'open' ? '此功能目前是启动状态' : '此功能目前是关闭状态';
                    $subsequent_text = $conf_json->switch == 'open' ? '点击关闭' : '点击启动';
                    _e(sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text));
                    _e(sprintf('<input type="button" class="frc-function-switch button button-primary" data-value="inner-chain" value="%s" />', $subsequent_text));
                } ?>
            </div>
<!--            动态内容-->
            <div class="tab-pane fade" id="dynamiccontent">
                <p><h5>动态内容</h5></p>
                <?php
                if ($frc_validation_dynamic != false){
                    _e('<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_dynamic)->created_at.' 已激活成功</label></p>');
                }
                ?>
                <p><a href="https://www.fatrat.cn/docs/v2/dynamic-content" target="_blank">Dynamic Content</a> （文章自动添加动态内容）</p>
                <p>动态内容不依赖胖鼠采集, 属可独立运行功能！</p>
                <p>动态内容是为文章自动添加一段动态内容！</p>
                <p>指在文章正文开头、结尾各插入一段其他文章内容 (新版本去掉开头的内容)</p>
                <p>插入的内容来自: 同分类下,最近七天的随机文章，如果没有找到七天内文章, 就不添加</p>
                <p>文章正文前后插入内容后, 有利于收录, 并且不影响用户阅读.</p>
                <p>动态内容胖鼠推荐使用!!! 省时省力还省心!</p>
                <?php
                if ($frc_validation_dynamic === false) { ?>
                    <input placeholder="请输入激活口令" name="dynamic-fields"/>
                    <input type="button" class="frc-activation button button-primary" data-value="dynamic-fields"
                           value="激活"/>
                <?php } else { ?>
                    <p class="label label-success">您已激活成功</p>
                    <?php
                    $conf_json = json_decode($frc_validation_dynamic);
                    $switch_text = $conf_json->switch == 'open' ? '此功能目前是启动状态' : '此功能目前是关闭状态';
                    $subsequent_text = $conf_json->switch == 'open' ? '点击关闭' : '点击启动';
                    _e(sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text));
                    _e(sprintf('<input type="button" class="frc-function-switch button button-primary" data-value="dynamic-fields" value="%s" />', $subsequent_text));
                } ?>
            </div>
<!--            数据发布控制-->
            <div class="tab-pane fade" id="release-control">
                <p><h5>数据发布控制</h5></p>
                <?php
                if ($frc_validation_release_control != false){
                    _e('<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_release_control)->created_at.' 已激活成功</label></p>');
                }
                ?>
                <p>此功能激活后: 可操作发布页面所有选项。</p>
                <?php
                if ($frc_validation_release_control === false) { ?>
                    <input placeholder="请输入激活口令" name="release-control"/>
                    <input type="button" class="frc-activation button button-primary" data-value="release-control"
                           value="激活"/>
                <?php } else { ?>
                    <p class="label label-success">您已激活成功</p>
                <?php } ?>
            </div>
<!--            关键词随机插入-->
            <div class="tab-pane fade" id="insert-keyword">
                <p><h5>关键词随机插入</h5></p>
                <?php
                if ($frc_validation_insert_keyword != false){
                    _e('<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_insert_keyword)->created_at.' 已激活成功</label></p>');
                }
                ?>
                <?php
                if ($frc_validation_insert_keyword === false) { ?>
                    <input placeholder="请输入激活口令" name="insert-keyword"/>
                    <input type="button" class="frc-activation button button-primary" data-value="insert-keyword"
                           value="激活"/>
                <?php } else { ?>
                    <?php
                    $conf_json = json_decode($frc_validation_insert_keyword);
                    $switch_text = $conf_json->switch == 'open' ? '此功能目前是启动状态' : '此功能目前是关闭状态';
                    $subsequent_text = $conf_json->switch == 'open' ? '点击关闭' : '点击启动';
                    _e(sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text));
                    _e(sprintf('<input type="button" class="frc-function-switch button button-primary" data-value="insert-keyword" value="%s" />', $subsequent_text));
                } ?>
            </div>
<!--            自动保存图片-->
            <div class="tab-pane fade" id="autosavepic">
                <p><h5>从其他站点手动复制过来的文章，点击保存后，所有远程图片自动本地化</h5></p>
                <p><h5>待开发</h5></p>
                <?php
                if ($frc_validation_automatic_save_pic != false){
                    _e('<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_automatic_save_pic)->created_at.' 已激活成功</label></p>');
                }
                ?>
                <p>开启后会给文章中的标签增加标签列表页的链接</p>
                <p>每个标签目前只增加一次链接</p>
                <p>配合自动标签更完美, 省时省力还省心.</p>
                <?php
                if ($frc_validation_automatic_save_pic === false) { ?>
                    <input placeholder="请输入激活口令" name="automatic-save-pic"/>
                    <input type="button" class="frc-activation button button-primary" data-value="automatic-save-pic"
                           value="激活"/>
                <?php } else { ?>
                    <?php
                    $conf_json = json_decode($frc_validation_automatic_save_pic);
                    $switch_text = $conf_json->switch == 'open' ? '此功能目前是启动状态' : '此功能目前是关闭状态';
                    $subsequent_text = $conf_json->switch == 'open' ? '点击关闭' : '点击启动';
                    _e(sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text));
                    _e(sprintf('<input type="button" class="frc-function-switch button button-primary" data-value="automatic-save-pic" value="%s" />', $subsequent_text));
                } ?>
            </div>
<!--            赞助鼠-->
            <div class="tab-pane fade" id="activation">
                <?php
                if (get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP) === false) { ?>
                    <h5>赞助鼠</h5>
                    <p><a href="https://www.fatrat.cn/docs/v2/sponsorship" target="_blank">https://www.fatrat.cn/docs/v2/sponsorship</a></p>
                    <input placeholder="请输入激活口令" name="sponsorship"/>
                    <input type="button" class="frc-activation button button-primary" data-value="sponsorship"
                           value="赞助激活"/>
                <?php } else { ?>
                    <h2 style="color: #00b300">感谢赞助支持. 您享有胖鼠采集所有功能</h2>
                <?php } ?>


            </div>
        </div>
    </div>
    <?php
}