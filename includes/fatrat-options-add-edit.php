<?php

function frc_options_add_edit()
{
    $option = null;
    $option_id = isset($_REQUEST['option_id']) ? sanitize_text_field($_REQUEST['option_id']): 0;
    if ($option_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'fr_options';
        $option = $wpdb->get_row("select * from $table where `id` = $option_id limit 1", ARRAY_A);
        // 转义数据处理
        $option['collect_keywords_replace_rule'] = str_replace(" ", "\n", $option['collect_keywords_replace_rule']);

        $rule_link = $rule_title = $rule_content = [];
        list($rule_link['a'], $item) = explode('%', $option['collect_list_rules']);
        list($rule_link['b'], $rule_link['c'], $rule_link['d'],) = explode('|', $item);
        list($tmp_title, $tmp_content) = explode(')(', $option['collect_content_rules']);
        list($rule_title['a'], $item) = explode('%', $tmp_title);
        list($rule_title['b'], $rule_title['c'], $rule_title['d'],) = explode('|', $item);
        list($rule_content['a'], $item) = explode('%', $tmp_content);
        list($rule_content['b'], $rule_content['c'], $rule_content['d'],) = explode('|', $item);

        $rule_link['d'] == 'null' && $rule_link['d'] = null;
        $rule_title['d'] == 'null' && $rule_title['d'] = null;
        $rule_content['d'] == 'null' && $rule_content['d'] = null;

    }
    ?>

    <div class="wrap">
        <h1><?php echo (isset($option)) ? '修改' : '新建' ?>配置规则</h1>
        <input type="hidden" hidden id="success_redirect_url"
               value="<?php echo admin_url('admin.php?page=frc-options'); ?>">
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url('admin-ajax.php'); ?>">
        <input type="hidden" hidden id="option_id" value="<?php echo isset($option['id']) ? $option['id'] : '' ?>">
        <table class="form-table">
            <tr>
                <th>配置名称:</th>
                <td><input type="text" size="40" name="collect_name"
                           <?php if (in_array($option['collect_name'], ['微信'])){ echo 'disabled'; } ?>
                           value="<?php esc_html_e($option['collect_name'], 'Fat Rat Collect'); ?>" placeholder="我的第一个爬虫"/>
                </td>
            </tr>
            <tr>
                <th>配置类型:</th>
                <td>
                    <input type="radio" name="collect_type"
                           value="list" <?php echo isset($option) ? ($option['collect_type'] == 'list' ? 'checked' : '') : '' ?> >
                    列表配置
                    <input type="radio" name="collect_type"
                           value="single" <?php echo isset($option) ? ($option['collect_type'] == 'single' ? 'checked' : '') : '' ?> >
                    单篇配置
                </td>
            </tr>
            <tr>
                <th>是否去除内容A标签:</th>
                <td>
                    <input type="radio" name="collect_remove_outer_link"
                           value="1" <?php echo isset($option) ? ($option['collect_remove_outer_link'] == '1' ? 'checked' : '') : '' ?> >
                    是
                    <input type="radio" disabled name="collect_remove_outer_link"
                           value="2" <?php echo isset($option) ? ($option['collect_remove_outer_link'] == '2' ? 'checked' : '') : '' ?> >
                    否
                    (在下方标签过滤中填写 a 即可)
                </td>
            </tr>
            <tr>
                <th>删除HEAD头信息:</th>
                <td>
                    <input type="radio" name="collect_remove_head"
                           value="1" <?php echo isset($option) ? ($option['collect_remove_head'] == '1' ? 'checked' : '') : '' ?> >
                    是 (目标GBK/GB2312推荐）
                    <input type="radio" name="collect_remove_head"
                           value="0" <?php echo isset($option) ? ($option['collect_remove_head'] == '0' ? 'checked' : '') : '' ?> >
                    否（目标UTF-8推荐）
                    <br/>此功能用于解决乱码问题 自动识别转码失败你可以尝试这个暴力方法 乱选有可能会取不到数据。
                </td>
            </tr>
            <tr>
                <th>目标列表地址:</th>
                <td><input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_list_url'] : ''; ?>"
                           name="collect_list_url"/>*
                </td>
            </tr>
            <tr>
                <th>采集区域:</th>
                <td><input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_list_range'] : ''; ?>"
                           name="collect_list_range"/>*
                </td>
            </tr>
            <tr>
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签过滤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="https://www.querylist.cc/docs/guide/v4/scraper-list" target='_blank'>必填规则参考</a><br/>
                    <input type="text" size="6" value="<?php echo isset($option) ? $rule_link['a'] : 'link'; ?>"
                           disabled name="collect_list_rule_link_a"/>-<input type="text" size="20"
                                                                             value="<?php echo isset($option) ? $rule_link['b'] : ''; ?>"
                                                                             name="collect_list_rule_link_b"/>-<input
                            type="text" size="4" value="<?php echo isset($option) ? $rule_link['c'] : ''; ?>"
                            name="collect_list_rule_link_c"/>-<input type="text" size="40"
                                                                     value="<?php echo isset($option) ? $rule_link['d'] : ''; ?>"
                                                                     name="collect_list_rule_link_d"/>*
                </td>
            </tr>
            <tr>
                <th>详情页面采集区域:</th>
                <td><input type="text" size="82"
                           value="<?php echo isset($option) ? $option['collect_content_range'] : ''; ?>"
                           name="collect_content_range"/>*
                </td>
            </tr>
            <tr>
                <th>详情页面采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签过滤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="https://www.querylist.cc/docs/guide/v4/scraper-list" target='_blank'>必填规则参考</a><br/>
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
                </td>
            </tr>
            <tr>
                <th scope="row">关键词替换</th>
                <td>
                    <textarea name="collect_keywords_replace_rule" cols="80" rows="8" placeholder="在此输入关键词替换规则，替换 title content 里面的内容
例子：
叶子猪=游戏
天赋=种族天赋"><?php echo isset($option) ? $option['collect_keywords_replace_rule'] : ''; ?></textarea><br>
                    注: 阿拉伯数字 和 英文字符 不可以配置替换。 可能会把内容图片URL替换成错误的。<br>
                </td>
            </tr>
            <tr>
                <th colspan="2"><input class="button button-primary" type="button" id="save-option-button" value="保存"/>
                    带 * 号都是必填且不可错误的
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
        <table class='debug-table' style="display:none;">
            <tr>
                <th>地址:</th>
                <td><input size="50" name="debug_url"/></td>
            </tr>
            <tr>
                <th>范围:</th>
                <td><input size="50" name="debug_range"/></td>
            </tr>
            <tr>
                <th>编码:</th>
                <td>
                    <input type="radio" name="debug_remove_head" value="1"> 是 (目标GBK/GB2312推荐）
                    <input type="radio" name="debug_remove_head" value="0"> 否（目标UTF-8推荐）
                </td>
            </tr>
            <tr>
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签过滤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="https://www.querylist.cc/docs/guide/v4/scraper-list" target='_blank'>必填规则参考</a><br/>
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
                <th colspan="2"><input class="button button-primary" type="button" id="debug-option" value="debug"/>
                </th>
            </tr>
        </table>

    </div>
    <?php
}