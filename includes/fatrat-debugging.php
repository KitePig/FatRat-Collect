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
        <h1><?php _e('胖鼠调试台', 'Fat Rat Collect') ?></h1>
        <p></p>
        <p style="color: #00b300"><?php _e((new FRC_Validation())->announcement('notice-debug')); ?></p>

        <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" hidden id="success_redirect_url" value="<?php esc_attr_e(admin_url('admin.php?page=frc-debugging')); ?>">

        <table class='form-table debug-table'>
            <tr>
                <th>地址:</th>
                <td><input size="50" name="debug_url"/><p style="font-size: 12px; color: #cca154">此处可以填写你要爬取的地址. 列表页/详情页 地址 均可</p></td>
            </tr>
            <tr>
                <th>编码处理:</th>
                <td>
                    <input type="radio" checked name="debug_remove_head" value="1"> 自动识别(推荐)
                    <input type="radio" name="debug_remove_head" value="2"> 删HEAD(非UTF-8编码推荐)
                    <input type="radio" name="debug_remove_head" value="3" <?php if (!get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP)) { esc_attr_e('disabled'); }?> > <span style="color: #db9925">强制转换(终方)</span>
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
                    <p style="font-size: 12px; color: #cca154">填写Html标签的 class 或者 id (Jquery语法) <a href="https://www.fatrat.cn/docs/v2/core-rules" target="_blank">参考</a></p></td></td>
            </tr>
            <tr>
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                        href="https://www.fatrat.cn/docs/v2/core-rules" target='_blank'>参考</a> | <a
                        href="http://jquery.cuishifeng.cn/" target='_blank'>语法</a><br/>
                    <input type="text" size="6" value="" name="collect_debug_rule_a"/>-<input type="text" size="20"
                                                                                              value="<?php esc_attr_e(isset($option) ? $rule_link['b'] : ''); ?>"
                                                                                              name="collect_debug_rule_b"/>-<input
                        type="text" size="4" value="<?php esc_attr_e(isset($option) ? $rule_link['c'] : ''); ?>"
                        name="collect_debug_rule_c"/>-<input type="text" size="40"
                                                             value="<?php esc_attr_e(isset($option) ? $rule_link['d'] : ''); ?>"
                                                             name="collect_debug_rule_d"/>*
                    <p style="color: #838383;font-size: 12px;">内容过滤Jquery常用语法: :eq(等于) :gt(大于) :lt(小于) :first(第一个) :last(最后一个) :even(偶数) :odd(奇数) <a href="http://jquery.cuishifeng.cn/element.html" target="_blank">更多</a></p>
                </td>
            </tr>
            <tr>
                <th colspan="2">
                    <input class="button button-primary" type="button" id="debug-option" value="请求调试"/>
                    <p></p>
                    <p>首先, 打开开发者工具, Chrome浏览器控制台打开方法: 右键->检查->console, 其他浏览器大同小异. </p>
                    <p>点击debugging后请看控制台Console里面的数据, 文字教程, 视频教程中 均有介绍如何使用, 照葫芦画瓢.</p>
                    <p>视频教程, 文字教程已经写的很详细了, 如果你没有耐心花30分钟熟悉胖鼠、可在插件管理->选择胖鼠->卸载 = - =! / 或者来骚扰下作者 <a target="_blank" href="https://www.fatrat.cn/docs/v2/write-rules">代写</a></p>
                    <p class="p-tips-style">采集中心所有采集均支持debugging模式哦、最后如果胖鼠采集帮助到你, 请支持一下开源作品 插件<a target="_blank" href="https://wordpress.org/support/plugin/fat-rat-collect/reviews">五星好评支持</a></p>
                </th>
            </tr>
            <tr>
                <td colspan="2"><?php _e((new FRC_Validation())->getAppreciatesHtml(7)); ?></td>
            </tr>
        </table>
    </div>
    <?php
}