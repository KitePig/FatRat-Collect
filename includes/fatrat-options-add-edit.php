<?php

function rat_options_add_edit()
{
    $option = null;
    $option_id = esc_sql($_REQUEST['option_id']) ? : 0;
    if ($option_id){
        global $wpdb;
        $table = $wpdb->prefix.'fr_options';
        $option = $wpdb->get_row("select * from $table where `id` = $option_id limit 1", ARRAY_A);
    }
    ?>

    <div class="wrap">
        <h1><?php echo (isset($option)) ? '修改' : '新建' ?>小爬规则</h1>
        <input type="hidden" hidden id="success_redirect_url" value="<?php echo admin_url( 'admin.php?page=rat-options' );?>">
        <input type="hidden" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
        <input type="hidden" hidden id="option_id" value="<?php echo isset($option['id'])? $option['id'] : ''?>">
        <table class="form-table">
            <tr>
                <th>小爬代号:</th>
                <td><input type="text" size="40" name="collect_name" value="<?php echo isset($option) ? $option['collect_name'] : ''; ?>" /></td>
            </tr>
            <tr>
                <th>小爬类型:</th>
                <td>
                    <input type="radio" name="collect_type" value="list" <?php echo isset($option) ? ($option['collect_type'] == 'list' ? 'checked' : '') : '' ?> > 爬取列表
                    <input type="radio" name="collect_type" value="single" <?php echo isset($option) ? ($option['collect_type'] == 'single' ? 'checked' : '') : '' ?> > 爬取单个
                </td>
            </tr>
            <tr>
                <th>是否去除内容A标签:</th>
                <td>
                    <input type="radio" name="collect_remove_outer_link" value="1" <?php echo isset($option) ? ($option['collect_remove_outer_link'] == '1' ? 'checked' : '') : '' ?> > 是
                    <input type="radio" name="collect_remove_outer_link" value="2" <?php echo isset($option) ? ($option['collect_remove_outer_link'] == '2' ? 'checked' : '') : '' ?> > 否
                </td>
            </tr>
            <tr>
                <th>删除HEAD头信息:</th>
                <td>
                    <input type="radio" name="collect_remove_head" value="1" <?php echo isset($option) ? ($option['collect_remove_head'] == '1' ? 'checked' : '') : '' ?> > 是
                    <input type="radio" name="collect_remove_head" value="0" <?php echo isset($option) ? ($option['collect_remove_head'] == '0' ? 'checked' : '') : '' ?> > 否（推荐）
                    <br />此功能用于解决乱码问题 自动识别转码失败你可以尝试这个暴力方法
                </td>
            </tr>
            <tr>
                <th>需要采集的地址:</th>
                <td><input type="text" size="40" value="<?php echo isset($option) ? $option['collect_list_url'] : ''; ?>" name="collect_list_url" />*</td>
            </tr>
            <tr>
                <th>采集列表的区域:</th>
                <td><input type="text" size="40" value="<?php echo isset($option) ? $option['collect_list_range'] : ''; ?>" name="collect_list_range" />*</td>
            </tr>
            <tr>
                <th>采集列表的规则:</th>
                <td><textarea cols="39" name="collect_list_rules" rows="3"><?php echo isset($option) ? $option['collect_list_rules'] : "link=(必填规则)\nimage=(可删除不写)"; ?></textarea>*格式   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title%jQuery选择器|要采集的属性|标签过滤列表  注：% 等于 = &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 等于 分隔符</td>
            </tr>
            <tr>
                <th>采集内容的区域:</th>
                <td><input type="text" size="40" value="<?php echo isset($option) ? $option['collect_content_range'] : ''; ?>" name ="collect_content_range" />*</td>
            </tr>
            <tr>
                <th>采集内容的规则:</th>
                <td><textarea cols="39" name="collect_content_rules" rows="4"><?php echo isset($option) ? $option['collect_content_rules'] : "title=(必填规则)\ncontent=(必填规则)"; ?></textarea>*</td>
            </tr>
            <tr>
                <th scope="row">关键词替换</th>
                <td>
                    <textarea name="collect_keywords_replace_rule" cols="80" rows="8" placeholder="在此输入关键词替换规则，替换 title content 里面的内容
例子：
叶子猪=游戏
天赋=种族天赋"><?php echo isset($option) ? $option['collect_keywords_replace_rule'] : ''; ?></textarea><br>
                    注意。阿拉伯数字 英文字符 不可以配置替换。 因为会把 内容图片URL替换成错误的：<br>
                </td>
            </tr>
            <tr><th colspan="2">带 * 号都是必填 且不可错误的 <a href="https://www.querylist.cc/docs/guide/v4/scraper-list" target='_blank'>必填规则参考</a> 书写格式 title%a|href</tr>
            <tr><th colspan="2"><input class="button button-primary" type="button" id="save-option-button" value="保存" />  请不要重复点击</th></tr>
        </table>

<!-- 测试 -->
        控制台显示调试信息
        <table>
            <tr>
                <th>地址:</th>
                <td><input size="50" name="debug_url" /></td>
            </tr>
            <tr>
                <th>类型</th>
                <td>
                    <input type="radio" name="type" value="1" > 列表
                    <input type="radio" name="type" value="2" > 详情
                </td>
            </tr>
            <tr>
                <th>范围:</th>
                <td><input size="50" name="debug_range" /></td>
            </tr>
            <tr>
                <th>规则:</th>
                <td><textarea cols="50" name="debug_rules" rows="4"></textarea></td>
            </tr>
            <tr><th colspan="2"><input class="button button-primary" type="button" id="debug-option" value="debug" /></th></tr>
        </table>

    </div>

    <?php
}