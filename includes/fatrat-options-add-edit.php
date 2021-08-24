<?php
/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * 如果你觉得这个项目还不错.可以去Github上 Star 关注我.
 * 您可使用胖鼠采集自行二次开发满足您的个性化需求.
 * 请不要Copy, Rename. OR 修改源代码进行售卖获利.
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2018年12月30日 02:24
 */


function frc_options_add_edit()
{
    $option = null;
    $custom_content = null;
    $rule_link = $rule_title = $rule_content = $rule_paging = [];
    $option_id = frc_sanitize_text('option_id', 0);
    if ($option_id) {
        $options = new FRC_Options();
        $option = $options->option($option_id);

        // 转义数据处理
        $option['collect_keywords_replace_rule'] = str_replace(" ", "\n", $option['collect_keywords_replace_rule']);
        $custom_content = json_decode($option['collect_custom_content'], true);
        $custom_content['head'] = str_replace('\\"', '"', htmlspecialchars_decode($custom_content['head']));
        $custom_content['foot'] = str_replace('\\"', '"', htmlspecialchars_decode($custom_content['foot']));

        // TODO: optimized
        $list_rules = translationRules($option['collect_list_rules']);
        $rule_link = [
            'a' => 'link',
            'b' => $list_rules['link']['selector']??'',
            'c' => $list_rules['link']['attribute']??'',
            'd' => $list_rules['link']['filter']??'',
        ];
        foreach (translationRules($option['collect_content_rules']) as $key => $val){
            $value = [
                'a' => $key,
                'b' => $val['selector'],
                'c' => $val['attribute'],
                'd' => $val['filter'],
            ];

            if ($key == 'title'){
                $rule_title = $value;
            } elseif ($key == 'content'){
                $rule_content = $value;
            } elseif ($key == 'paging'){
                $rule_paging = $value;
            }
        }
    }

    $frc_validation_sponsorship = get_option(FRC_Validation::FRC_VALIDATION_SPONSORSHIP);
    $frc_validation_all_collect = get_option(FRC_Validation::FRC_VALIDATION_ALL_COLLECT);
    ?>

    <div class="wrap frc-option-add-edit">
        <h1>
            <?php _e((isset($option)) ? '修改' : '新建' ) ?>配置规则
            <?php if (!empty($frc_validation_sponsorship)) { ?>
                <img width="20" src="<?php frc_image('fat-rat-nav-v-yellow.png') ?>" />
            <?php } ?>
        </h1>
        <p style="color: #838382">欢迎你使用胖鼠创建自己的规则, 如果第一次遇见认识胖鼠. 点<a href="https://www.fatrat.cn/docs/v2/create-rules" target="_blank">这里</a></p>
        <input type="hidden" hidden id="success_redirect_url"
               value="<?php esc_attr_e(admin_url('admin.php?page=frc-options')); ?>">
        <input type="hidden" hidden id="request_url" value="<?php esc_attr_e(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" hidden id="option_id" value="<?php frc_option_esc_attr_e($option, 'id'); ?>">
        <table class="form-table">
            <tr>
                <th>配置名称:</th>
                <td><input type="text" size="50" name="collect_name"
                        <?php if (isset($option['collect_name']) && in_array($option['collect_name'], FRC_ApiError::BUTTON_DISABLED)){ esc_attr_e('disabled'); } ?>
                           value="<?php frc_option_esc_attr_e($option, 'collect_name'); ?>" placeholder="我的第一个胖鼠采集规则"/>*
                </td>
            </tr>
            <tr>
                <th>一句话的描述:</th>
                <td><input type="text" size="50" name="collect_describe"
                           value="<?php frc_option_esc_attr_e($option, 'collect_describe'); ?>" placeholder="胖鼠采集, WordPress 最好用的文章采集器"/>
                </td>
            </tr>
            <tr>
                <th>配置类型:</th>
                <td>
                    <input type="radio" name="collect_type" checked
                            <?php if (isset($option['collect_name']) && in_array($option['collect_name'], FRC_ApiError::BUTTON_DISABLED)){ esc_attr_e('disabled'); } ?>
                           value="list" <?php esc_attr_e(isset($option) ? ($option['collect_type'] == 'list' ? 'checked' : '') : ''); ?> >
                    列表采集配置
                    <input type="radio" name="collect_type"
                           value="single" <?php esc_attr_e( isset($option) ? ($option['collect_type'] == 'single' ? 'checked' : '') : ''); ?> >
                    详情采集配置
                    <?php if ($frc_validation_all_collect){ ?>
                    <input type="radio" name="collect_type"
                           value="all" <?php esc_attr_e( isset($option) ? ($option['collect_type'] == 'all' ? 'checked' : '') : ''); ?> >
                    全站采集
                    <p>全站采集: 采集范围处写全站正则, <a href="https://www.fatrat.cn/docs/v2/total-station-collect" target="_blank">参考</a></p>
                    <p>全站采集: 采集规则处不填</p>
                    <?php }?>
                    <p>列表可直接写采集地址. 详情只写规则, 采集地址在使用的时候填写即可.</p>
                </td>
            </tr>
            <?php if (get_option(FRC_Validation::FRC_VALIDATION_RENDERING)) { ?>
            <tr>
                <th>采集方式:</th>
                <td>
                    <input type="radio" name="collect_rendering" checked
                           value="1" <?php esc_attr_e( isset($option) ? ($option['collect_rendering'] == '1' ? 'checked' : '') : ''); ?> >
                    静态渲染
                    <input type="radio" name="collect_rendering"
                           value="2" <?php esc_attr_e( isset($option) ? ($option['collect_rendering'] == '2' ? 'checked' : '') : ''); ?> >
                    动态渲染
                    <p>静态渲染: 普通页面, 动态渲染: ajax页面</p>
                </td>
            </tr>
            <?php } ?>
            <tr>
                <th>编码处理:</th>
                <td>
                    <input type="radio" name="collect_remove_head" checked
                           value="1" <?php esc_attr_e( isset($option) ? ($option['collect_remove_head'] == '1' ? 'checked' : '') : ''); ?> >
                    自动识别(推荐)
                    <input type="radio" name="collect_remove_head"
                           value="2" <?php esc_attr_e( isset($option) ? ($option['collect_remove_head'] == '2' ? 'checked' : '') : ''); ?> >
                    删HEAD(非UTF-8编码推荐)
                    <input type="radio" name="collect_remove_head"
                           value="3" <?php esc_attr_e( isset($option) ? ($option['collect_remove_head'] == '3' ? 'checked' : '') : ''); ?> <?php if (!$frc_validation_sponsorship) { esc_attr_e( 'disabled' ); }?> >
                    <span style="color: #db9925">强制转换(终极方案)</span>

                    <p>此功能用于解决乱码问题,自动识别转码失败你可尝试删HEAD,强制转换,选的不对有可能会取不到数据哦.</p>
                </td>
            </tr>
            <tr>
                <th>图片下载:</th>
                <td>
                    <input type="radio"  name="collect_image_download" value="1" <?php esc_attr_e( isset($option) ? ($option['collect_image_download'] == '1' ? 'checked' : '') : 'checked' );?> >
                    下载到本地(推荐)
                    <input type="radio"  name="collect_image_download" value="2" <?php esc_attr_e( isset($option) ? ($option['collect_image_download'] == '2' ? 'checked' : '') : '' );?> >
                    不下载
                    <input type="radio"  name="collect_image_download" value="3" <?php esc_attr_e( isset($option) ? ($option['collect_image_download'] == '3' ? 'checked' : '') : '' );?> >
                    删除图片
                    <input type="radio"  name="collect_image_download" value="4" <?php esc_attr_e( isset($option) ? ($option['collect_image_download'] == '4' ? 'checked' : '') : '' );?> <?php if (!$frc_validation_sponsorship) { esc_attr_e( 'disabled' ); }?> >
                    <span style="color: #db9925">图片下载不入媒体库</span>
                    <p>「经典速度」  下载到本地: 可安装云存储插件对接云存储</p>
                    <p>「高速采集」  不下载:     使用源站图片路径, 如果源站图片路径是相对路径, 会把地址补全</p>
                    <p>「超超高速采集」删除图片:   删除正文所有<\img > </p>
                    <p>「经典速度」  图片下载不入媒体库: 图片已经下载, 但是不上传到媒体库中「发布文章速度: 超快」 </p>
                </td>
            </tr>
            <tr>
                <th>图片路径:</th>
                <td>
                    <input type="radio"  name="collect_image_path" value="1" <?php esc_attr_e( isset($option) ? ($option['collect_image_path'] == '1' ? 'checked' : '') : 'checked' ); ?> >
                    绝对路径(OSS/云存储必选)
                    <input type="radio"  name="collect_image_path" value="2" <?php esc_attr_e( isset($option) ? ($option['collect_image_path'] == '2' ? 'checked' : '') : '' ); ?> >
                    相对路径(本地存储图片)
                    <p>绝对路径格式: https://www.xxx.com/wp-content/uploads/2020/05/A.jpg</p>
                    <p>相对路径格式: /wp-content/uploads/2020/05/A.jpg</p>
                </td>
            </tr>
<!--            <tr>-->
<!--                <th>去除标签中Css样式/注释:</th>-->
<!--                <td>-->
<!--                    <input type="text" size="82"-->
<!--                           value="--><?php //esc_attr_e( isset($option) ? $option['collect_list_url'] : ''); ?><!--"-->
<!--                           name="collect_list_url"  />*-->
<!--                </td>-->
<!--            </tr>-->
            <tr class="collect_type_radio_change">
                <th>采集地址:</th>
                <td><input type="text" size="82"
                           value="<?php frc_option_esc_attr_e($option, 'collect_list_url'); ?>"
                           name="collect_list_url"  />*
                    <p>小提示: 不清楚下面的规则怎么写? 去试试debug功能吧 ~ </p>
                </td>
            </tr>
            <tr class="collect_type_radio_change">
                <th>分页采集地址:</th>
                <td><input type="text" size="82"
                           value="<?php frc_option_esc_attr_e($option, 'collect_list_url_paging'); ?>"
                           name="collect_list_url_paging"  />
                    <p>把页码的码数替换为 {page} 注: 非列表采集不填</p>
                    <p>例子: https://xx.qq.com/webplat/info/news_version3/154/2233/3889/m2702/list_{page}.shtml</p>
                </td>
            </tr>
            <tr class="collect_type_radio_change">
                <th>采集范围:</th>
                <td><input type="text" size="82"
                           value="<?php frc_option_esc_attr_e($option, 'collect_list_range'); ?>"
                           name="collect_list_range" />*
                    <p>填写Html标签的 class 或者 id (Jquery语法) 采集范围<a href="https://www.fatrat.cn/docs/v2/core-rules" target="_blank">参考</a></p>
                </td>
            </tr>
            <tr class="collect_type_radio_change">
                <th>采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="http://jquery.cuishifeng.cn/" target='_blank'>Jquery手册</a><br/>
                    <input type="text" size="6" value="<?php esc_attr_e( isset($option) ? $rule_link['a'] : 'link' ); ?>"
                           disabled name="collect_list_rule_link_a"/>-<input type="text" size="20"
                                                                             value="<?php esc_attr_e( isset($option) ? $rule_link['b'] : ''); ?>"
                                                                             name="collect_list_rule_link_b"/>-<input
                            type="text" size="4" value="<?php esc_attr_e( isset($option) ? $rule_link['c'] : ''); ?>"
                            name="collect_list_rule_link_c"/>-<input type="text" size="40"
                                                                     value="<?php esc_attr_e( isset($option) ? $rule_link['d'] : ''); ?>"
                                                                     name="collect_list_rule_link_d"/>*
                    <p>列表页 我们只取详情页的url链接即可</p>
                </td>
            </tr>
            <tr>
                <th>详情页面采集区域:</th>
                <td><input type="text" size="82"
                           value="<?php frc_option_esc_attr_e($option, 'collect_content_range'); ?>"
                           name="collect_content_range"/>*
                    <p>填写Html标签的 class 或者 id (Jquery语法) <a href="https://www.fatrat.cn/docs/v2/core-rules" target="_blank">参考</a></p>
                </td>
            </tr>
            <tr>
                <th>详情页面采集规则:</th>
                <td>
                    &nbsp;&nbsp;&nbsp;<span style="color: #CC6633">规则名&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery选择器 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;- &nbsp;属性 &nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容过滤: 空格分割</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="http://jquery.cuishifeng.cn/" target='_blank'>Jquery手册</a><br/>
                    <input type="text" size="6"
                           value="<?php esc_attr_e( isset($rule_title['a']) ? $rule_title['a'] : 'title'); ?>" disabled
                           name="collect_content_rule_title_a"/>-<input type="text" size="20"
                                                                        value="<?php esc_attr_e( isset($rule_title['b']) ? $rule_title['b'] : ''); ?>"
                                                                        name="collect_content_rule_title_b"/>-<input
                            type="text" size="4" value="<?php esc_attr_e( isset($rule_title['c']) ? $rule_title['c'] : ''); ?>"
                            name="collect_content_rule_title_c"/>-<input type="text" size="40"
                                                                         value="<?php esc_attr_e( isset($rule_title['d']) ? $rule_title['d'] : ''); ?>"
                                                                         name="collect_content_rule_title_d"/>*
                    <br/>
                    <input type="text" size="6"
                           value="<?php esc_attr_e( isset($rule_content['a']) ? $rule_content['a'] : 'content'); ?>" disabled
                           name="collect_content_rule_content_a"/>-<input type="text" size="20"
                                                                          value="<?php esc_attr_e( isset($rule_content['b']) ? $rule_content['b'] : ''); ?>"
                                                                          name="collect_content_rule_content_b"/>-<input
                            type="text" size="4"
                            value="<?php esc_attr_e( isset($rule_content['c']) ? $rule_content['c'] : ''); ?>"
                            name="collect_content_rule_content_c"/>-<input type="text" size="40"
                                                                           value="<?php esc_attr_e( isset($rule_content['d']) ? $rule_content['d'] : ''); ?>"
                                                                           name="collect_content_rule_content_d"/>*
                    <br/>
                    <input type="text" size="6"
                           value="<?php esc_attr_e( isset($rule_paging['a']) ? $rule_paging['a'] : 'paging'); ?>" disabled
                           name="collect_content_rule_paging_a"/>-<input type="text" size="20" placeholder="a:contains(下一页)"
                                                                          value="<?php esc_attr_e( isset($rule_paging['b']) ? $rule_paging['b'] : ''); ?>"
                                                                          name="collect_content_rule_paging_b"/>-<input
                            type="text" size="4"
                            value="<?php esc_attr_e( isset($rule_paging['c']) ? $rule_paging['c'] : ''); ?>"
                            name="collect_content_rule_paging_c"/>-<input type="text" size="40"
                                                                           value="<?php esc_attr_e( isset($rule_paging['d']) ? $rule_paging['d'] : ''); ?>"
                                                                           name="collect_content_rule_paging_d"/>
                    <p>详情页,我们只拿 Title Content 一片文章岂不是就有了. 其他字段如 日期/作者 回头考虑怎么开放给大家用.. </p>
                    <p>Paging字段为详情页内容分页采集功能, 细节用法参考官网文档</p>
                </td>
            </tr>
            <tr>
                <th>图片源属性:</th>
                <td>
                    <input type="text" size="82"
                           value="<?php esc_attr_e( isset($option) ? $option['collect_image_attribute'] : 'src'); ?>"
                           name="collect_image_attribute"/>
                    <p>默认即可。某些站点图片是使用 Js 异步加载。此选项用来设置真实图片地址的属性。</p>
                </td>
            </tr>
            <tr>
                <th>内容插入:</th>
                <td>
                    <p style="color: #CC6633">插入文章开头</p>
                    <textarea name="collect_custom_content_head" cols="80" rows="3" placeholder=""><?php if (!empty($custom_content)){ esc_html_e($custom_content['head'], 'Far Rat Collect'); } ?></textarea>
                    <br />
                    <p style="color: #CC6633">插入文章结尾</p>
                    <textarea name="collect_custom_content_foot" cols="80" rows="3" placeholder=""><?php if (!empty($custom_content)){ esc_html_e($custom_content['foot'], 'Far Rat Collect'); } else { esc_html_e('文章来源于互联网:{title+link}', 'Far Rat Collect'); } ?></textarea>
                    <p>可使用的变量: {title} | {link} | {title+link} <a href="https://www.fatrat.cn/docs/v2/variable-expansion" target="_blank">参考</a></p>
                </td>
            </tr>
            <tr>
                <th scope="row">关键词替换</th>
                <td>
                    <textarea name="collect_keywords_replace_rule" cols="80" rows="8" placeholder="在此输入关键词替换规则,可以替换替换标题和内容的数据
例:
苹果=橘子
小蝌蚪=蝌蚪宝宝
妻子=老婆"><?php esc_html_e( isset($option) ? $option['collect_keywords_replace_rule'] : ''); ?></textarea><p>注: 阿拉伯数字1 2 3 和 英文字符 a b c 不可以配置替换. 可能会把内容图片URL替换成错误的. 别乱搞哦</p>
                </td>
            </tr>
            <tr>
                <th scope="row">关键词随机插入</th>
                <td>
                    <textarea name="collect_keywords" cols="80" rows="8" placeholder="[
    {'count':'2', 'title':'胖鼠采集', 'link':'https://www.fatrat.cn'}
]"><?php esc_html_e( isset($option) ? $option['collect_keywords'] : ''); ?></textarea>
                    <p><a href="javascript:" id="keywords_default">默认数据</a> | <a href="http://json.cn/" target="_blank">Json格式效验</a></p>
                </td>
            </tr>
            <tr>
                <th colspan="2"><input class="button button-primary" type="button" id="save-option-button" value="保存"/>
                    <p></p><p>带*号必填且不可错误的</p>
                </th>
            </tr>
        </table>
    </div>
    <?php
}