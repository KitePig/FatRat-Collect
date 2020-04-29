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

    public function kit_auto_tags($postID){
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            || (!current_user_can('edit_post', $postID))) {
            return;
        }
        remove_action('publish_post', 'frc_auto_tags');
        $post_content = get_post($postID)->post_content;
        $add_tag_link = get_the_tags($postID);
        if (!$add_tag_link){
            collect(get_tags( array('hide_empty' => false) ))->map(function ($tag) use ($postID, &$post_content){
                if ( stristr($post_content,$tag->name) !== false) {
                    wp_set_post_tags( $postID, $tag->name, true );
                }
            });
        }

        add_action('publish_post', 'frc_auto_tags');
    }


    public function kit_dynamic_fields($postID){
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            || (!current_user_can('edit_post', $postID))) {
            return;
        }

        remove_action('publish_post', 'frc_dynamic_fields');
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
            'after' => date('Y-m-d H:i:s', current_time('timestamp')-(3600*24*57)),
            'before' => current_time('mysql')
        ));

        $query_posts = new WP_Query();
        $posts_data = $query_posts->query($args);

        if (empty($posts_data)) {
            return ;
        }

//        if (isset($posts_data[0]) && $previous_post = $posts_data[0]){
//            $link = get_permalink($previous_post->ID);
//            $pre_string = sprintf('<blockquote style="background: #F5F5F5; font-size: 10px;"><a href="%s" style="text-decoration: none"><span style="color: #929292;">%s</span><p>%s</p></a></blockquote>', $link, $previous_post->post_title, wp_trim_words($previous_post->post_content, 130));
//            $content = $pre_string.$content;
//        }

        if (isset($posts_data[0]) && $next_post = $posts_data[0]){
            $link = get_permalink($next_post->ID);
            $next_string = sprintf('<blockquote style="background: #F5F5F5; font-size: 10px;"><a href="%s" style="text-decoration: none"><span style="color: #929292;">相关推荐: %s</span><p>%s</p></a></blockquote>', $link, $next_post->post_title, wp_trim_words($next_post->post_content, 130));
            $content = $content.$next_string;
        }

        wp_update_post(array('ID' => $postID, 'post_content' => $content));
        add_action('publish_post', 'frc_dynamic_fields');
    }

}

if (!function_exists("frc_image")) {
    /**
     * @param $file
     * @return string
     */
    function frc_image($file){
        $model = new FRC_Kit();
        echo $model->kit_image_path($file);
    }
}

$result = get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS);
if ($result && json_decode($result)->switch === 'open'){
    function frc_auto_tags($postID){
        $model = new FRC_Kit();
        $model->kit_auto_tags($postID);
    }
    add_action('publish_post', 'frc_auto_tags');
}

$result = get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS);
if ($result && json_decode($result)->switch === 'open'){
    function frc_dynamic_fields( $postID ) {
        $model = new FRC_Kit();
        $model->kit_dynamic_fields($postID);
    }
    add_action( 'publish_post', 'frc_dynamic_fields', 11);
}

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
    $frc_validation_pic = get_option(FRC_Validation::FRC_VALIDATION_FEATURED_PICTURE);
    $frc_validation_tags = get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS);
    $frc_validation_chain = get_option(FRC_Validation::FRC_VALIDATION_INNER_CHAIN);
    $frc_validation_dynamic = get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS);
    $frc_validation_category_author = get_option(FRC_Validation::FRC_VALIDATION_CATEGORY_AUTHOR);
    $frc_validation_sponsorship = get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP);
    $frc_wp_schedules = wp_get_schedules();
    array_rand(range(1,20)) == 0 && (new FRC_Validation())->validation_correction();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('胖鼠工具箱', 'Fat Rat Collect') ?>
            <img width="80" class="pull-right" src="<?php frc_image('fat-rat-kit-256x256.png') ?>">
        </h1>
        <p></p>

        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php echo admin_url('admin.php?page=frc-kit'); ?>">

<!--        增加删除采集文章是否删除图片-->
<!--        增加删除已发布的文章是否删除附件-->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#kit" data-toggle="tab">胖鼠工具箱<?php if (!empty($frc_validation_sponsorship)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#autospider" data-toggle="tab">自动采集<?php if (!empty($frc_validation_sponsorship)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#autorelease" data-toggle="tab">自动发布<?php if (!empty($frc_validation_sponsorship)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#cover" data-toggle="tab">特色图片<?php if (!empty($frc_validation_pic)) {?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#autotags" data-toggle="tab">自动标签<?php if (!empty($frc_validation_tags)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#innerchain" data-toggle="tab">标签内链<?php if (!empty($frc_validation_chain)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#dynamiccontent" data-toggle="tab">动态内容<?php if (!empty($frc_validation_dynamic)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#categoryauthor" data-toggle="tab">分类&作者<?php if (!empty($frc_validation_category_author)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
            <li><a href="#activation" data-toggle="tab">赞助鼠<?php if (!empty($frc_validation_sponsorship)) {?>
                        <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png'); ?>" /> <?php }?></a></li>
        </ul>
        <p></p>
        <div class="tab-content">
<!--            首页-->
            <div class="tab-pane fade in active" id="kit">
                <p>欢迎来到胖鼠工具箱</p>
                <h2 style="color: #4a148c">胖鼠采集定时任务列表</h2>
                <ul>
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
                                echo sprintf('<li><label class="label label-info">胖鼠采集自动发布:下次执行时间 / %s</label></li>', date('Y-m-d h:i:s', strtotime("+8 hours", $time)));
                            }
                            if ($key == 'frc_cron_spider_hook'){
                                $frc_cron_spider_boolean = true;
                                echo sprintf('<li><label class="label label-info">胖鼠采集自动采集:下次执行时间 / %s</label></li>', date('Y-m-d h:i:s', strtotime("+8 hours", $time)));
                            }
                        }
                    }
                    if (!$frc_cron_release_boolean){
                        echo '<li><label class="label label-warning">胖鼠采集自动发布:未启动</label></li>';
                    }
                    if (!$frc_cron_spider_boolean){
                        echo '<li><label class="label label-warning">胖鼠采集自动采集:未启动</label></li>';
                    }
                    ?>
                </ul>
                <hr />
                <h4>鼠友你好, 如果您遇到定时任务不起作用, 是因为WP-Cron无法连续运行，这是一个wp问题。</h4>
                <p>有一个简单的解决方案。只需将系统的任务计划程序设置为在所需的时间间隔（或在所需的特定时间）运行。最简单的解决方案是使用工具向wp-cron.php文件发出Web请求。</p>
                <p>在系统上安排任务之后，还有一个步骤要完成。WordPress将在每次加载页面时继续运行WP-Cron。这不再是必需的，它将导致服务器上额外的资源使用。可以在wp-config.php文件中禁用WP-Cron</p>

                <h5>1, 打开/wp-config.php文件进行编辑，并添加以下行:  </h5>
                <h6><code>define('DISABLE_WP_CRON', true);</code></h6>
                <h5>2, 添加系统定时任务 你要使用的命令是:</h5>
                    <h6><code>wget -qO- <?php echo site_url( '/wp-cron.php' ); ?> &> /dev/null</code></h6>
                2选1即可
                    <h6><code>curl <?php echo site_url( '/wp-cron.php' ); ?>  &> /dev/null</code></h6>
                <p><?php esc_html_e( '合理的时间间隔是 5-15 分钟. 这是 */5 * * * * 或 */15 * * * * 的时间间隔设置', 'Fat Rat Collect' ); ?>.</p>
                <p>1, 第一步可优化节省服务器资源, 避免用户每次访问都查询cron, 优化服务速度 </p>
                <p>2, 第二步是执行一个定时的请求, 每隔 5 - 15 分钟(推荐五分钟), 请求站点的/wp-cron.php文件</p>
                <h5>linux OR ubuntu window 宝塔 都可以配置, 具体操作咨询服务商或百度</h5>
                <h5>设置完成之后, 自动采集, 自动发布. 时间很准</h5>
                <?php
                if (isset($_REQUEST['all_collect'])){
                    $frc_validation_all_collect = get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT);
                    if ($frc_validation_all_collect === false) { ?>
                        <h4>全站采集</h4>
                        <input placeholder="请输入激活口令" name="all-collect"/>
                        <input type="button" class="frc-activation button button-primary" data-value="all-collect"
                               value="激活"/>
                    <?php } else { ?>
                        <h4>全站采集</h4>
                        <img width="60" src="<?php frc_image('fat-rat-success.png') ?>">
                        <label class="label label-success label-lg">您于 <?php echo json_decode($frc_validation_all_collect)->created_at ?> 已激活成功</label>
                        <label class="label label-success label-lg"></label>
                        <p><label class="label label-info">快去使用吧~</label></p>
                        <?php
                    }
                }
                if (isset($_REQUEST['rendering'])){
                    $frc_validation_rendering = get_option(FRC_Validation::FRC_VALIDATION_RENDERING);
                    if ($frc_validation_rendering === false) { ?>
                        <h4>动态渲染</h4>
                        <input placeholder="请输入激活口令" name="rendering"/>
                        <input type="button" class="frc-activation button button-primary" data-value="rendering"
                               value="激活"/>
                    <?php } else { ?>
                        <h4>全站采集</h4>
                        <img width="60" src="<?php frc_image('fat-rat-success.png') ?>">
                        <label class="label label-success label-lg">您于 <?php echo json_decode($frc_validation_rendering)->created_at ?> 已激活成功</label>
                        <label class="label label-success label-lg"></label>
                        <p><label class="label label-info">快去使用吧~</label></p>
                        <?php
                    }
                }
                ?>
            </div>
<!--            自动爬虫-->
            <div class="tab-pane fade" id="autospider">
                <h4>自动采集</h4>
                <ul>
                    <?php $cron_spider = get_option('frc_cron_spider'); ?>
                    <li><input type="radio" name="frc_cron_spider" value="" <?php echo empty($cron_spider) ? 'checked' : '' ?>> 关闭此功能</li>
                    <?php foreach ($frc_wp_schedules as $key => $info){
                        if (empty($frc_validation_sponsorship)) {
                            if ($info['interval']<28800){
                                continue;
                            }
                        }
                        echo (sprintf('<li><input type="radio" name="frc_cron_spider" value="%s" %s> %s(%s秒)</li>', $key, (!empty($cron_spider) && $cron_spider == $key ? esc_html('checked') : ''), $info['display'], $info['interval']));
                    } ?>
                </ul>
                <p>胖鼠工具箱首页可看到爬虫目前的简单状态哦, 后续慢慢优化哦</p>
                <p>或者下载安装插件 Advanced Cron Manager 里面 frc_ 开头的就是咱们的定时自动任务, 其他类似插件均可</p>
                <input type="button" class="frc_cron_button button button-primary" data-value="frc_cron_spider" value="设置" />
            </div>
<!--            自动发布-->
            <div class="tab-pane fade" id="autorelease">
                <h4>自动发布</h4>
                <p>请鼠友给胖鼠<a href="https://wordpress.org/support/plugin/fat-rat-collect/reviews" target="_blank">五星评分</a>, 感谢!</p>
                <ul>
                    <?php $cron_release = get_option('frc_cron_release'); ?>
                    <li><input type="radio" name="frc_cron_release" value="" <?php echo empty($cron_release) ? 'checked' : '' ?>> 关闭此功能</li>
                    <?php foreach ($frc_wp_schedules as $key => $info){
                        if (empty($frc_validation_sponsorship)) {
                            if ($info['interval']<28800){
                                continue;
                            }
                        }
                        echo (sprintf('<li><input type="radio" name="frc_cron_release" value="%s" %s> %s(%s秒)</li>', $key, (!empty($cron_release) && $cron_release == $key ? esc_html('checked') : ''), $info['display'], $info['interval']));
                    } ?>
                </ul>
                <input type="button" class="frc_cron_button button button-primary" data-value="frc_cron_release" value="设置" />
            </div>
<!--            特色图-->
            <div class="tab-pane fade" id="cover">
                <h4>特色图片(封面图)</h4>
                <?php
                if ($frc_validation_pic === false) { ?>
                    <input placeholder="请输入激活口令" name="featured-picture"/>
                    <input type="button" class="frc-activation button button-primary" data-value="featured-picture"
                           value="激活"/>
                <?php } else { ?>
                    <img width="60" src="<?php frc_image('fat-rat-success.png') ?>">
                    <label class="label label-success label-lg">您于 <?php echo json_decode($frc_validation_pic)->created_at ?> 已激活成功</label>
                    <label class="label label-success label-lg"></label>
                    <p><label class="label label-info">快去使用吧~</label></p>
                <?php
                } ?>
            </div>
<!--            自动标签-->
            <div class="tab-pane fade" id="autotags">
                <h4>自动标签</h4>
                <?php
                if ($frc_validation_tags != false){
                    echo '<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_tags)->created_at.' 已激活成功</label></p>';
                }
                ?>
                <p><a href="http://www.fatrat.cn/fatrat/220.html" target="_blank">Auto Tags</a> （文章自动打标签）</p>
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
                    echo sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text);
                    echo sprintf('<p><input type="button" class="frc-function-switch button button-primary" data-value="auto-tags" value="%s" /></p>', $subsequent_text);
                } ?>
            </div>
<!--            标签内链-->
            <div class="tab-pane fade" id="innerchain">
                <p><h4>标签内链</h4></p>
                <?php
                if ($frc_validation_chain != false){
                    echo '<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_chain)->created_at.' 已激活成功</label></p>';
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
                    echo sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text);
                    echo sprintf('<input type="button" class="frc-function-switch button button-primary" data-value="inner-chain" value="%s" />', $subsequent_text);
                } ?>
            </div>
<!--            动态内容-->
            <div class="tab-pane fade" id="dynamiccontent">
                <p><h4>动态内容</h4></p>
                <?php
                if ($frc_validation_dynamic != false){
                    echo '<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_dynamic)->created_at.' 已激活成功</label></p>';
                }
                ?>
                <p><a href="http://www.fatrat.cn/fatrat/229.html" target="_blank">Dynamic Content</a> （文章自动添加动态内容）</p>
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
                    echo sprintf('<h3><p class="label label-info">%s</p></h3>', $switch_text);
                    echo sprintf('<input type="button" class="frc-function-switch button button-primary" data-value="dynamic-fields" value="%s" />', $subsequent_text);
                } ?>
            </div>
<!--            分类&作者-->
            <div class="tab-pane fade" id="categoryauthor">
                <p><h4>分类&作者</h4></p>
                <?php
                if ($frc_validation_category_author != false){
                    echo '<p><label class="label label-success label-lg">您于 '.json_decode($frc_validation_dynamic)->created_at.' 已激活成功</label></p>';
                }
                ?>
                <p>①设置自动发布分类</p>
                <p>②设置发布使用作者,多选作者随机使用喔</p>
                <?php
                if ($frc_validation_category_author === false) { ?>
                    <input placeholder="请输入激活口令" name="category-author"/>
                    <input type="button" class="frc-activation button button-primary" data-value="category-author"
                           value="激活"/>
                <?php } else { ?>
                    <p class="label label-success">您已激活成功</p>
                <?php } ?>
            </div>
<!--            激活专区-->
            <div class="tab-pane fade" id="activation">
                <?php
                if (get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP) === false) { ?>
                    <p><h4>赞助激活专区</h4></p>
                    <p><a href="https://www.fatrat.cn/fatrat/695.html" target="_blank">https://www.fatrat.cn/fatrat/695.html</a></p>
                    <input placeholder="请输入激活口令" name="debugging"/>
                    <input type="button" class="frc-activation button button-primary" data-value="debugging"
                           value="赞助激活"/>
                <?php } else { ?>
                    <h3><p class="label label-success">感谢赞助鼠.</p></h3>
                    <h5><p class="label label-info">您享有debugging不限次哦.</p></h5>
                    <h5><p class="label label-info">您享有QQ群个性头衔特权.</p></h5>
                    <h5><p class="label label-info">胖鼠QQ好友, 赞助鼠分组, 第一时间解答需求.</p></h5>
                    <h5><p class="label label-info">可有一次技术咨询，知无不言.</p></h5>
                    <h5><p class="label label-info">分页采集无限制</p></h5>
                    <h5><p class="label label-info">数据桶中心统计功能升级</p></h5>
                    <h5><p class="label label-info">定时发布, 定时采集更多的时间选项</p></h5>
                    <h5><p class="label label-info">赞赏链接加持.彰显身份</p></h5>
                    <h5><p class="label label-info">优先尝鲜最新黑科技.彰显身份</p></h5>
                <?php } ?>


            </div>
        </div>
    </div>
    <?php
}