<?php

// 设置配置
function fatrat_ajax_add_options() {
    wp_send_json($_REQUEST);
    wp_die();
}
add_action( 'wp_ajax_add_options', 'fatrat_ajax_add_options' );


function rat_options()
{
    ?>
    <div>
        <div>
            <h3>采集规则配置</h3>
        </div>
        <table class="form-table">
            <input type="text" hidden id="request_url" value="<?php echo admin_url( 'admin-ajax.php' );?>">
            <tr>
                <th>是否移除内容链接</th>
                <td>
                    <input type="radio" name="remove_outer_link" value="yes" checked> 是
                    <input type="radio" name="remove_outer_link" value="no" > 否
                </td>
            </tr>
            <tr>
                <th scope="row">关键词替换</th>
                <td>
                    <textarea name="keywords_replace_rule" cols="100" rows="8" placeholder="在此输入关键词替换规则，替换 title content 里面的内容"></textarea><br>
                    如：<br>
                    windows=mac<br>
                    乔布斯=盖茨<br>
                </td>
            </tr>
        </table>
        <input id="save-button" type="button" class="button button-primary" value="保存配置">
    </div>
    <?php
}

