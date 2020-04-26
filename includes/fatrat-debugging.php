<?php
/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * 如果你觉得这个项目还不错.可以去Github上 Star 关注我.
 * 您可使用胖鼠采集自行二次开发满足您的个性化需求.
 * 请不要Copy, Rename. OR 修改源代码进行售卖获利.
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: FatRat
 * @CreateTime: 2020年04月11日 12:25
 */

function frc_debugging(){
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('胖鼠调试台', 'Fat Rat Collect') ?></h1>
        <p></p>
        <p style="color: #00b300"><?php esc_html_e((new FRC_Validation())->announcement('notice-debug')); ?></p>

        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php echo admin_url('admin.php?page=frc-debugging'); ?>">

        <table class='form-table debug-table'>
            <tr>
                <th>地址:</th>
                <td><input size="50" name="debug_url"/><p>此处可以填写你要爬取的地址.列表页/详情页 地址 均可</p></td>
            </tr>
            <tr>
                <th>编码处理:</th>
                <td>
                    <input type="radio" checked name="debug_remove_head" value="1"> 自动（目标UTF-8推荐）
                    <input type="radio" name="debug_remove_head" value="2"> 删HEAD (目标GBK/GB2312推荐）
                </td>
            </tr>
            <?php if (get_option(FRC_Validation::FRC_VALIDATION_RENDERING)) { ?>
            <tr>
                <th>采集方式:</th>
                <td>
                    <input type="radio" name="debug_rendering" value="1" checked >
                    静态渲染
                    <input type="radio" name="debug_rendering" value="2">
                    动态渲染
                </td>
            </tr>
            <?php } ?>
            <tr>
                <th>范围:</th>
                <td><input size="50" name="debug_range"/>
                    <p>填写Html标签的 class 或者 id (Jquery语法) <a href="https://www.fatrat.cn/fatrat/62.html" target="_blank">参考</a></p></td></td>
            </tr>
            <tr>
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                        href="https://www.fatrat.cn/fatrat/62.html" target='_blank'>参考</a> | <a
                        href="http://jquery.cuishifeng.cn/" target='_blank'>语法</a><br/>
                    <input type="text" size="6" value="" name="collect_debug_rule_a"/>-<input type="text" size="20"
                                                                                              value="<?php echo isset($option) ? $rule_link['b'] : ''; ?>"
                                                                                              name="collect_debug_rule_b"/>-<input
                        type="text" size="4" value="<?php echo isset($option) ? $rule_link['c'] : ''; ?>"
                        name="collect_debug_rule_c"/>-<input type="text" size="40"
                                                             value="<?php echo isset($option) ? $rule_link['d'] : ''; ?>"
                                                             name="collect_debug_rule_d"/>*
                </td>
            </tr>
            <tr>
                <th colspan="2">
                    <input class="button button-primary" type="button" id="debug-option" value="debug"/>
                    <p></p>
                    <p>首先, 打开开发者工具, Chrome浏览器控制台打开方法: 右键->检查->console, 其他浏览器大同小异. </p>
                    <p>点击debugging后请看控制台Console里面的数据, 文字教程, 视频教程中 均有介绍如何使用, 照葫芦画瓢.</p>
                    <p>请大家每次写规则都要测试, link,title,content 三个都要测试哦！</p>
                    <p>感觉我的注释写的相当详细了, 你如果还不会用, 点击插件->选择胖鼠->卸载 = - =! / 或者来骚扰下作者 <a target="_blank" href="https://www.fatrat.cn/fatrat/144.html">一键规则</a></p>
                    <p class="p-tips-style">还没卸载的鼠你好, 如果你使用胖鼠采集1个月以上, 希望支持一下开源作品 <a target="_blank" href="https://www.fatrat.cn/bounty">赞赏</a></p>
                    <p class="p-tips-style">并且请帮忙胖鼠采集插件,点个五星评论一下, <a target="_blank" href="https://wordpress.org/support/plugin/fat-rat-collect/reviews">插件评论</a></p>
                </th>
            </tr>
        </table>
        <?php if (time() - get_option(FRC_Validation::FRC_INSERT_TIME) > 86400) { ?>
        <h5>赞助墙:</h5>
        <p class="p-tips-style">(点击赞助者留下链接增加debugging次数)<span class="debugging-add" style="display: none; color: #7b1fa2"><img width="30" src="<?php frc_image('fat-rat-loading.png'); ?>" class="fa-spin">请鼠友耐心浏览赞助鼠网站, 静静等待充值结果</span></p>
        <ul>
            <?php
            foreach ((new FRC_Validation())->appreciates() as $appreciate) {
                if (isset($appreciate->site) && isset($appreciate->site_url)){
                    echo sprintf('<li style="float: left; width: 200px;">%s: (<a href="%s" class="debugging-click" target="_blank">%s</a>)</li>', $appreciate->people, $appreciate->site_url, $appreciate->site);
                } else {
                    echo sprintf('<li style="float: left; width: 200px;">%s</li>', $appreciate->people);
                }
            }
            ?>
            <li></li>
        </ul>
        <?php } ?>
    </div>
    <?php
}