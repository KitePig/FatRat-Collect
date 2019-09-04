<?php
/**
 * Copyright (c) 2018 Fat Rat Collect . All rights reserved.
 * 胖鼠采集要做wordpress最好用的采集器.
 * 如果你觉得我写的还不错.可以去Github上 Star
 * 现在架子已经有了.欢迎大牛加入开发.一起丰富胖鼠的功能
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2018年12月30日 02:24
 */


function frc_options_add_edit()
{
    $option = null;
    $custom_content = null;
    $rule_link = $rule_title = $rule_content = [];
    $option_id = isset($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']): 0;
    if ($option_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'fr_options';
        $option = $wpdb->get_row("select * from $table where `id` = $option_id limit 1", ARRAY_A);
        // 转义数据处理
        $option['collect_keywords_replace_rule'] = str_replace(" ", "\n", $option['collect_keywords_replace_rule']);
        list($rule_link['a'], $item) = $option['collect_type'] == 'list' ? explode('%', $option['collect_list_rules']) : ['link', ''];
        list($rule_link['b'], $rule_link['c'], $rule_link['d'],) = $option['collect_type'] == 'list' ? explode('|', $item) : ['', '', ''];
        list($tmp_title, $tmp_content) = explode(')(', $option['collect_content_rules']);
        list($rule_title['a'], $item) = explode('%', $tmp_title);
        list($rule_title['b'], $rule_title['c'], $rule_title['d'],) = explode('|', $item);
        list($rule_content['a'], $item) = explode('%', $tmp_content);
        list($rule_content['b'], $rule_content['c'], $rule_content['d'],) = explode('|', $item);

        $rule_link['d'] == 'null' && $rule_link['d'] = null;
        $rule_title['d'] == 'null' && $rule_title['d'] = null;
        $rule_content['d'] == 'null' && $rule_content['d'] = null;
        $custom_content = json_decode($option['collect_custom_content'], true);
    }
    ?>

    <div class="wrap fatrat-option-add-edit">
        <h1><?php echo (isset($option)) ? '修改' : '新建' ?>配置规则</h1>
        <p style="color: #838382">特别欢迎你使用胖鼠创建自己的规则 不会写? 点<a href="http://www.fatrat.cn/fatrat/8.html" target="_blank">这里</a></p>
        <input type="hidden" hidden id="success_redirect_url"
               value="<?php echo admin_url('admin.php?page=frc-options'); ?>">
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="option_id" value="<?php echo isset($option['id']) ? $option['id'] : '' ?>">
        <table class="form-table">
            <tr>
                <th>配置名称:</th>
                <td><input type="text" size="50" name="collect_name"
                        <?php if (in_array($option['collect_name'], FRC_Api_Error::BUTTON_DISABLED)){ echo 'disabled'; } ?>
                           value="<?php esc_html_e($option['collect_name'], 'Fat Rat Collect'); ?>" placeholder="我的第一个胖鼠采集规则"/>*
                </td>
            </tr>
            <tr>
                <th>一句话的描述:</th>
                <td><input type="text" size="50" name="collect_describe"
                           value="<?php esc_html_e($option['collect_describe'], 'Fat Rat Collect'); ?>" placeholder="胖鼠采集, WordPress 一款很好用的Jquery采集器"/>*
                </td>
            </tr>
            <tr>
                <th>配置类型:</th>
                <td>
                    <input type="radio" name="collect_type" checked
                            <?php if (in_array($option['collect_name'], FRC_Api_Error::BUTTON_DISABLED)){ echo 'disabled'; } ?>
                           value="list" <?php echo isset($option) ? ($option['collect_type'] == 'list' ? 'checked' : '') : '' ?> >
                    列表配置
                    <input type="radio" name="collect_type"
                           value="single" <?php echo isset($option) ? ($option['collect_type'] == 'single' ? 'checked' : '') : '' ?> >
                    详情配置
                    <p>列表可直接写采集地址. 详情只写规则, 采集地址在使用的时候填写即可.</p>
                </td>
            </tr>
            <tr>
                <th>图片本地化:</th>
                <td>
                    <input type="radio"  name="collect_image_download" value="1" <?php echo isset($option) ? ($option['collect_image_download'] == '1' ? 'checked' : '') : 'checked' ?> >
                    本地
                    <input type="radio"  name="collect_image_download" value="2" <?php echo isset($option) ? ($option['collect_image_download'] == '2' ? 'checked' : '') : '' ?> >
                    不本地
                    <p></p>
                </td>
            </tr>
            <tr>
                <th>图片路径:</th>
                <td>
                    <input type="radio"  name="collect_image_path" value="1" <?php echo isset($option) ? ($option['collect_image_path'] == '1' ? 'checked' : '') : 'checked' ?> >
                    绝对路径
                    <input type="radio"  name="collect_image_path" value="2" <?php echo isset($option) ? ($option['collect_image_path'] == '2' ? 'checked' : '') : '' ?> >
                    相对路径
                    <p>(单站点推荐)绝对路径: https://image.xxx.com/wp-content/uploads/2019/A.jpg</p>
                    <p>(多站群使用)相对路径: /wp-content/uploads/2019/A.jpg</p>
                </td>
            </tr>
            <tr>
                <th>删除Head头:</th>
                <td>
                    <input type="radio" name="collect_remove_head" checked
                           value="0" <?php echo isset($option) ? ($option['collect_remove_head'] == '0' ? 'checked' : '') : '' ?> >
                    不删（目标UTF-8推荐）
                    <input type="radio" name="collect_remove_head"
                           value="1" <?php echo isset($option) ? ($option['collect_remove_head'] == '1' ? 'checked' : '') : '' ?> >
                    删 (目标GBK/GB2312推荐）
                    <p>此功能用于解决乱码问题 自动识别转码失败你可以尝试这个暴力方法 乱选有可能会取不到数据。</p>
                </td>
            </tr>
            <tr class="collect_type_radio_change">
                <th>采集地址:</th>
                <td><input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_list_url'] : ''; ?>"
                           name="collect_list_url"  />*
                    <p>小提示: 不清楚下面的规则怎么写? 去页尾试试debug功能吧 ~ </p>
                </td>
            </tr>
            <tr class="collect_type_radio_change">
                <th>采集范围:</th>
                <td><input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_list_range'] : ''; ?>"
                           name="collect_list_range" />*
                    <p>填写Html标签的 class 或者 id (Jquery语法) <a href="http://www.fatrat.cn/fatrat/62.html" target="_blank">参考</a></p>
                </td>
            </tr>
            <tr class="collect_type_radio_change">
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="http://www.fatrat.cn/fatrat/62.html" target='_blank'>必填规则参考</a><br/>
                    <input type="text" size="6" value="<?php echo isset($option) ? $rule_link['a'] : 'link'; ?>"
                           disabled name="collect_list_rule_link_a"/>-<input type="text" size="20"
                                                                             value="<?php echo isset($option) ? $rule_link['b'] : ''; ?>"
                                                                             name="collect_list_rule_link_b"/>-<input
                            type="text" size="4" value="<?php echo isset($option) ? $rule_link['c'] : ''; ?>"
                            name="collect_list_rule_link_c"/>-<input type="text" size="40"
                                                                     value="<?php echo isset($option) ? $rule_link['d'] : ''; ?>"
                                                                     name="collect_list_rule_link_d"/>*
                    <p>通过列表页 我们只取详情页的url链接即可</p>
                </td>
            </tr>
            <tr>
                <th>详情页面采集区域:</th>
                <td><input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_content_range'] : ''; ?>"
                           name="collect_content_range"/>*
                    <p>填写Html标签的 class 或者 id (Jquery语法) <a href="http://www.fatrat.cn/fatrat/62.html" target="_blank">参考</a></p>
                </td>
            </tr>
            <tr>
                <th>详情页面采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="https://www.querylist.cc/docs/api/v4/rules" target='_blank'>必填规则参考</a><br/>
                    <input type="text" size="6"
                           value="<?php echo isset($rule_title['a']) ? $rule_title['a'] : 'title'; ?>" disabled
                           name="collect_content_rule_title_a"/>-<input type="text" size="20"
                                                                        value="<?php echo isset($rule_title['b']) ? $rule_title['b'] : ''; ?>"
                                                                        name="collect_content_rule_title_b"/>-<input
                            type="text" size="4" value="<?php echo isset($rule_title['c']) ? $rule_title['c'] : ''; ?>"
                            name="collect_content_rule_title_c"/>-<input type="text" size="40"
                                                                         value="<?php echo isset($rule_title['d']) ? $rule_title['d'] : ''; ?>"
                                                                         name="collect_content_rule_title_d"/>*
                    <br/>
                    <input type="text" size="6"
                           value="<?php echo isset($rule_content['a']) ? $rule_content['a'] : 'content'; ?>" disabled
                           name="collect_content_rule_content_a"/>-<input type="text" size="20"
                                                                          value="<?php echo isset($rule_content['b']) ? $rule_content['b'] : ''; ?>"
                                                                          name="collect_content_rule_content_b"/>-<input
                            type="text" size="4"
                            value="<?php echo isset($rule_content['c']) ? $rule_content['c'] : ''; ?>"
                            name="collect_content_rule_content_c"/>-<input type="text" size="40"
                                                                           value="<?php echo isset($rule_content['d']) ? $rule_content['d'] : ''; ?>"
                                                                           name="collect_content_rule_content_d"/>*
                    <p>详情页,我们只拿 Title Content 一片文章岂不是就有了. 其他字段如 日期/作者 回头考虑怎么开放给大家用.. </p>
                </td>
            </tr>
            <tr>
                <th>图片源属性:</th>
                <td>
                    <input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_image_attribute'] : 'src'; ?>"
                           name="collect_image_attribute"/>
                    <p>默认即可。某些站点图片是使用 Js 异步加载。此选项用来设置真实图片地址的属性。</p>
                </td>
            </tr>
            <tr>
                <th>内容插入:</th>
                <td>
                    <p style="color: #CC6633">插入文章开头</p>
                    <textarea name="collect_custom_content_head" cols="80" rows="3" placeholder=""><?php if (!empty($custom_content)){ esc_html_e(str_replace("\\", '', $custom_content['head']), 'Far Rat Collect'); } ?></textarea>
                    <br />
                    <p style="color: #CC6633">插入文章结尾</p>
                    <textarea name="collect_custom_content_foot" cols="80" rows="3" placeholder=""><?php if (!empty($custom_content)){ esc_html_e(str_replace("\\", '', $custom_content['foot']), 'Far Rat Collect'); } else { esc_html_e('本文来源于互联网:{title+link}', 'Far Rat Collect'); } ?></textarea>
                    <p>可使用的变量: {title} | {link} | {title+link} <a href="http://www.fatrat.cn/fatrat/42.html" target="_blank">参考</a></p>
                </td>
            </tr>
            <tr>
                <th scope="row">关键词替换</th>
                <td>
                    <textarea name="collect_keywords_replace_rule" cols="80" rows="8" placeholder="在此输入关键词替换规则,可以替换替换标题和内容里面的内容
例：
叶子猪=游戏
天赋=种族天赋"><?php echo isset($option) ? $option['collect_keywords_replace_rule'] : ''; ?></textarea><p>注: 阿拉伯数字1 2 3 和 英文字符 a b c 不可以配置替换. 可能会把内容图片URL替换成错误的. 别乱搞哦</p>
                </td>
            </tr>
            <tr>
                <th colspan="2"><input class="button button-primary" type="button" id="save-option-button" value="保存"/>
                    <p></p>
                    <p>带*号必填且不可错误的</p>
                </th>
            </tr>
        </table>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div><label class="debug-button">Debug 调试使用-控制台显示调试信息</label></div>
        <table class='form-table debug-table' style="display:none;">
            <tr>
                <td colspan="2"><p>Chrome浏览器控制台打开方法: 右键->检查->console</p></td>
            </tr>
            <tr>
                <td colspan="2"><p>看<a href="http://www.fatrat.cn/fatrat/8.html" target="_blank">参考</a>, 照葫芦画瓢. </p></td>
            </tr>
            <tr>
                <th>地址:</th>
                <td><input size="50" name="debug_url"/><p>此处可以填写你要爬取的地址.列表页/详情页 地址 均可</p></td>
            </tr>
            <tr>
                <th>范围:</th>
                <td><input size="50" name="debug_range"/>
                    <p>填写Html标签的 class 或者 id (Jquery语法) <a href="http://www.fatrat.cn/fatrat/62.html" target="_blank">参考</a></p></td></td>
            </tr>
            <tr>
                <th>剔除HEADER:</th>
                <td>
                    <input type="radio" checked name="debug_remove_head" value="0"> 不删（目标UTF-8推荐）
                    <input type="radio" name="debug_remove_head" value="1"> 删除 (目标GBK/GB2312推荐）
                </td>
            </tr>
            <tr>
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="http://www.fatrat.cn/fatrat/62.html" target='_blank'>必填规则参考</a><br/>
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
                    <p>Debug 是一个方便大家调试的功能,我自己每次也要用. 不用此功能, 注定会失败！</p>
                    <p>感觉我的注释写的相当详细了, 你如果还不会用, 点击插件->选择胖鼠->卸载 = - =! / 或者来骚扰下作者</p>
                </th>
            </tr>
        </table>

    </div>
    <?php
}