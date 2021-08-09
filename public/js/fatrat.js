(function($){

    var option_id                       = $('#option_id').val();
    var request_url                     = $('#request_url').val();
    var success_redirect_url            = $('#success_redirect_url').val();
    var collect_name                    = '胖鼠采集';
    var collect_describe                = '';
    var collect_type                    = 'list';
    var collect_list_url                = '';
    var collect_list_url_paging         = '';
    var collect_list_range              = '';
    var collect_list_rules              = '';
    var collect_content_range           = '';
    var collect_content_rules           = '';
    var collect_rendering               = '1';
    var collect_image_download          = '1';
    var collect_image_path              = '1';
    var collect_remove_head             = '1';
    var collect_image_attribute         = 'src';
    var collect_custom_content_head     = '';
    var collect_custom_content_foot     = '';
    var collect_keywords_replace_rule   = '';


    /**
     * Spider Ajax
     */
    // 微信爬虫
    $('.wx-spider-run-button').on('click', function(){
        var collect_urls   = $('textarea[name="collect_wx_urls"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'custom_page',
            collect_urls: collect_urls,
            collect_name: 'wx',
        }, '.spider-progress-bar', '.wx-spider-run-button');
    });

    // 简书爬虫
    $('.js-spider-run-button').on('click', function(){
        var collect_urls   = $('textarea[name="collect_js_urls"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'custom_page',
            collect_urls: collect_urls,
            collect_name: 'js',
        }, '.spider-progress-bar', '.js-spider-run-button');
    });

    // 知乎问答
    $('.zh-spider-run-button').on('click', function(){
        var collect_urls   = $('textarea[name="collect_zh_urls"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'custom_page',
            collect_urls: collect_urls,
            collect_name: 'zh',
        }, '.spider-progress-bar', '.zh-spider-run-button');
    });

    $('.list-spider-run-button').on('click', function(){
        if(!confirm("列表爬取时间会久点, 请耐心等待...")){
            return;
        }

        var option_id = $(this).attr('data-id');

        ajax_collect_request_tool(request_url, {
            action_func: 'list_page',
            option_id: option_id,
        }, '.spider-progress-bar', '.list-spider-run-button');
    });

    $('.history-page-spider-run-button').on('click', function(){
        if(!confirm("请核实输入信息.")){
            return;
        }

        var collect_history_page_number   = $('input[name="collect_history_page_number"]').val();
        var collect_history_relus_id      = $('select[name="collect_history_relus"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'history_page',
            collect_history_page_number: collect_history_page_number,
            collect_history_relus_id: collect_history_relus_id,
        }, '.spider-progress-bar', '.history-page-spider-run-button');

    });

    $('.details-spider-run-button').on('click', function(){
        if(!confirm("请确认..")){
            return;
        }

        var collect_details_urls   = $('textarea[name="collect_details_urls"]').val();
        var collect_details_relus  = $('select[name="collect_details_relus"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'details_page',
            collect_details_urls: collect_details_urls,
            collect_details_relus: collect_details_relus,
        }, '.spider-progress-bar', '.details-spider-run-button');
    });

    $('.all-spider-run-button').on('click', function(){
        if(!confirm("采集马上开始, 请耐心等待...")){
            return;
        }

        var option_id = $(this).attr('data-id');
        ajax_collect_request_tool(request_url, {
            action_func: 'all_page',
            option_id: option_id,
        }, '.spider-progress-bar', '.all-spider-run-button');
    });

    // debug 功能
    $('#debug-option').on('click', function(){
        var debug_rule = new Array();
        debug_rule['a'] = $('input[name="collect_debug_rule_a"]').val() != "" ? $('input[name="collect_debug_rule_a"]').val() : null ;
        debug_rule['b'] = $('input[name="collect_debug_rule_b"]').val() != "" ? $('input[name="collect_debug_rule_b"]').val() : null ;
        debug_rule['c'] = $('input[name="collect_debug_rule_c"]').val() != "" ? $('input[name="collect_debug_rule_c"]').val() : null ;
        debug_rule['d'] = $('input[name="collect_debug_rule_d"]').val() != "" ? $('input[name="collect_debug_rule_d"]').val() : null ;

        var debug_url      = $('input[name="debug_url"]').val();
        var debug_remove_head = $('input[name="debug_remove_head"]:checked').val();
        var debug_rendering = $('input[name="debug_rendering"]:checked').val();
        var debug_range    = $('input[name="debug_range"]').val();
        var debug_rules    = debug_rule['a']+'%'+debug_rule['b']+'|'+debug_rule['c']+'|'+debug_rule['d'];

        ajax_collect_request_tool(request_url, {
            action_func: 'debug',
            debug_url: debug_url,
            debug_remove_head: debug_remove_head,
            debug_rendering: debug_rendering,
            debug_range: debug_range,
            debug_rules: debug_rules,
        }, '', '#debug-option');

    });


    /**
     * Option Ajax
     */
    $('#save-option-button').on('click', function(){
        if(!confirm("请确认输入的配置.")){
            return;
        }

        var tmp_link = new Array();
        var tmp_title = new Array();
        var tmp_content = new Array();
        var tmp_paging = new Array();

        tmp_link['a'] = $('input[name="collect_list_rule_link_a"]').val() != "" ? $('input[name="collect_list_rule_link_a"]').val() : null ;
        tmp_link['b'] = $('input[name="collect_list_rule_link_b"]').val() != "" ? $('input[name="collect_list_rule_link_b"]').val() : null ;
        tmp_link['c'] = $('input[name="collect_list_rule_link_c"]').val() != "" ? $('input[name="collect_list_rule_link_c"]').val() : null ;
        tmp_link['d'] = $('input[name="collect_list_rule_link_d"]').val() != "" ? $('input[name="collect_list_rule_link_d"]').val() : null ;
        tmp_title['a'] = $('input[name="collect_content_rule_title_a"]').val() != "" ? $('input[name="collect_content_rule_title_a"]').val() : null ;
        tmp_title['b'] = $('input[name="collect_content_rule_title_b"]').val() != "" ? $('input[name="collect_content_rule_title_b"]').val() : null ;
        tmp_title['c'] = $('input[name="collect_content_rule_title_c"]').val() != "" ? $('input[name="collect_content_rule_title_c"]').val() : null ;
        tmp_title['d'] = $('input[name="collect_content_rule_title_d"]').val() != "" ? $('input[name="collect_content_rule_title_d"]').val() : null ;
        tmp_content['a'] = $('input[name="collect_content_rule_content_a"]').val() != "" ? $('input[name="collect_content_rule_content_a"]').val() : null ;
        tmp_content['b'] = $('input[name="collect_content_rule_content_b"]').val() != "" ? $('input[name="collect_content_rule_content_b"]').val() : null ;
        tmp_content['c'] = $('input[name="collect_content_rule_content_c"]').val() != "" ? $('input[name="collect_content_rule_content_c"]').val() : null ;
        tmp_content['d'] = $('input[name="collect_content_rule_content_d"]').val() != "" ? $('input[name="collect_content_rule_content_d"]').val() : null ;
        tmp_paging['a'] = $('input[name="collect_content_rule_paging_a"]').val() != "" ? $('input[name="collect_content_rule_paging_a"]').val() : null ;
        tmp_paging['b'] = $('input[name="collect_content_rule_paging_b"]').val() != "" ? $('input[name="collect_content_rule_paging_b"]').val() : null ;
        tmp_paging['c'] = $('input[name="collect_content_rule_paging_c"]').val() != "" ? $('input[name="collect_content_rule_paging_c"]').val() : null ;
        tmp_paging['d'] = $('input[name="collect_content_rule_paging_d"]').val() != "" ? $('input[name="collect_content_rule_paging_d"]').val() : null ;

        var options = {
            action_func: 'save_option',
            option_id: option_id,
            collect_name: $('input[name="collect_name"]').val(),
            collect_describe: $('input[name="collect_describe"]').val(),
            collect_type: $('input[name="collect_type"]:checked').val(),
            collect_rendering: $('input[name="collect_rendering"]:checked').val(),
            collect_image_path: $('input[name="collect_image_path"]:checked').val(),
            collect_image_download: $('input[name="collect_image_download"]:checked').val(),
            collect_remove_head: $('input[name="collect_remove_head"]:checked').val(),
            collect_list_url: $('input[name="collect_list_url"]').val(),
            collect_list_url_paging: $('input[name="collect_list_url_paging"]').val(),
            collect_list_range: $('input[name="collect_list_range"]').val(),
            collect_list_rules: tmp_link['a'] + '%' + tmp_link['b'] + '|' + tmp_link['c'] + '|' + tmp_link['d'],
            collect_content_range: $('input[name="collect_content_range"]').val(),
            collect_content_rules: tmp_title['a'] + '%' + tmp_title['b'] + '|' + tmp_title['c'] + '|' + tmp_title['d'] + ')(' + tmp_content['a'] + '%' + tmp_content['b'] + '|' + tmp_content['c'] + '|' + tmp_content['d'] + ')(' + tmp_paging['a'] + '%' + tmp_paging['b'] + '|' + tmp_paging['c'] + '|' + tmp_paging['d'],
            collect_image_attribute: $('input[name="collect_image_attribute"]').val(),
            collect_custom_content_head: $('textarea[name="collect_custom_content_head"]').val(),
            collect_custom_content_foot: $('textarea[name="collect_custom_content_foot"]').val(),
            collect_keywords_replace_rule: $('textarea[name="collect_keywords_replace_rule"]').val(),
            collect_keywords: $('textarea[name="collect_keywords"]').val(),
        }
        ajax_option_request_tool(request_url, options, success_redirect_url);
    });

    $('.delete-option-button').on('click', function(){
        // if(!confirm("请确认要删除这个规则吗?, 删除后此规则已采集的数据会转移到公共空间.")){
        if(!confirm("请确认要删除这个规则吗?")){
            return;
        }

        option_id = $(this).attr('data-value');

        ajax_option_request_tool(request_url, {
            action_func: 'del_option',
            option_id: option_id,
        }, success_redirect_url);
    });

    $('.import_default_configuration').on('click', function(){
        if(!confirm("鼠友你好, 欢迎你使用一键导入采集规则功能, 它可以让你即刻体验采集的快感, 也可以帮你测试软件是否异常，导入例子后运行默认例子，例子无法采集数据说明插件的使用环境有问题哦。")){
            return;
        }
        if(!confirm("导入完成后, 要多多学习, 达到快速熟练使用胖鼠的目的. 胖鼠采集唯一官网 https://fatrat.cn")){
            return;
        }
        if(!confirm("添加规则时记得使用debugging功能.")){
            return;
        }

        ajax_option_request_tool(request_url, {
            action_func: 'import_default_configuration',
        }, success_redirect_url);
    });

    $('#save-release-option').on('click', function () {

        var option_id   = $('#current_option_id').val();
        var post_category = [];
        var post_user = [];
        var release_type = $('.release_type option:selected').val();
        var extension_field = $('input[name="'+release_type+'_extension_field"]:checked').val();

        $(".checkbox_post_category").find("input[type='checkbox']:checked").each(function (index, item) {
            post_category.push($(this).val());
        });

        $(".checkbox_post_user").find("input[type='checkbox']:checked").each(function (index, item) {
            post_user.push($(this).val());
        });
        var post_status = $('input[name="post_status"]:checked').val();
        var post_thumbnail = $('input[name="post_thumbnail"]:checked').val();

        ajax_option_request_tool(request_url, {
            action_func: 'save_option_release',
            option_id: option_id,
            release_category: post_category,
            release_user: post_user,
            release_status: post_status,
            release_type: release_type,
            extension_field: extension_field,
            release_thumbnail: post_thumbnail,
        }, success_redirect_url);
    });

    $('.frc_cron_button').on('click', function(){
        if(!confirm("请确认您的选择?")){
            return;
        }

        var frc_option = $(this).attr('data-value');
        var frc_value = $('input[name="'+frc_option+'"]:checked').val();

        ajax_option_request_tool(request_url, {
            action_func: 'update_auto_config',
            option: frc_option,
            value: frc_value,
        });
    });

    /**
     * Import Ajax
     */
    // import article
    $('#import-articles-button').on('click', function(){
        if(!confirm("确认一下..")){
            return;
        }
        var collect_count = $('input[name="import-articles-count-button"]').val();

        ajax_import_data_request_tool(request_url, {
            action_func: 'import_article',
            collect_count: collect_count,
        });
    });

    $('#import-articles-button_group').on('click', function(){
        if(!confirm("确认一下..")){
            return;
        }

        ajax_import_data_request_tool(request_url, {
            action_func: 'import_group_article',
        });
    });

    $('.publish-article').on('click', function(){
        if(!confirm("请确认发布信息, 马上为您发布. ")){
            return;
        }

        var release_id   = $(this).attr('data-value');
        var post_category = [];
        var post_user = [];

        $(".checkbox_post_category").find("input[type='checkbox']:checked").each(function (index, item) {
            post_category.push($(this).val());
        });

        $(".checkbox_post_user").find("input[type='checkbox']:checked").each(function (index, item) {
            post_user.push($(this).val());
        });
        var post_status = $('input[name="post_status"]:checked').val();
        var post_thumbnail = $('input[name="post_thumbnail"]:checked').val();

        ajax_import_data_request_tool(request_url, {
            action_func: 'publish_article',
            release_id: release_id,
            post_category: post_category,
            post_user: post_user,
            post_status: post_status,
            post_thumbnail: post_thumbnail,
        }, success_redirect_url);
    });

    $('.preview-article').on('click', function(){
        if(!confirm("预览功能, 文章会发布到文章列表里. 文章状态为: 草稿")){
            return;
        }

        var release_id   = $(this).attr('data-value');
        var post_category = [];
        $("input[type='checkbox']:checked").each(function (index, item) {
            post_category.push($(this).val());
        });
        var post_user = $('select[name="post_user"]').val();
        var post_status = $('input[name="post_status"]:checked').val();

        ajax_import_data_request_tool(request_url, {
            action_func: 'preview_article',
            release_id: release_id,
            post_category: post_category,
            post_user: post_user,
            post_status: post_status,
        }, success_redirect_url, '', 'preview_article');
    });

    function preview_article(response){
        if (response.data.preview_url){
            window.location.href=response.data.preview_url;
        } else {
            alert(response.msg);
        }

    }

    $('.quick-release-option-button').on('click', function(){
        if(!confirm("快速发布这个桶中的一篇可使用的文章.")){
            return;
        }
        var option_id   = $(this).attr('data-value');

        ajax_import_data_request_tool(request_url, {
            action_func: 'option_publish',
            option_id: option_id,
        }, success_redirect_url);
    });


    /**
     * style
     */
    if ($('input[type=radio][name=collect_type]:checked').val() == 'single'){
        $('.collect_type_radio_change').hide();
    }

    $('#todo—more-button').on('click', function(){
        $('.todo-more-show').attr("style","display:block;");
    });

    $('#keywords_default').on('click', function(){
        $('textarea[name="collect_keywords"]').html('[\n' +
            '    {"count":"1", "title":"胖鼠"},\n' +
            '    {"count":"2", "title":"胖鼠采集", "link":"https://www.fatrat.cn"}\n' +
            ']');
    });

    $('input[type=radio][name=collect_type]').change(function () {
        if (this.value == 'list') {
            $('.collect_type_radio_change').show();
            console.log(1);
        }
        else if (this.value == 'single') {
            $('.collect_type_radio_change').hide();
            console.log(2);
        }
    });

    $('.release_type').change(function () {
        var choose = $('.release_type option:checked').val();
        $('.release_type_change').each(function () {
            if ($(this).attr('data-value') == choose){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    /**
     * validation
     */
    $('.frc-activation').on('click', function(){
        var activation_action = $(this).attr('data-value');
        var activation_code = $('input[name="'+activation_action+'"]').val();
        if (activation_code != ''){
            alert('请联系胖鼠激活');
            return;
        }
        ajax_validation_request_tool(request_url, {
            action_func: 'activation',
            activation_action: activation_action,
            activation_code: activation_code,
        }, success_redirect_url);
    });


    $('.frc-function-switch').on('click', function(){
        var switch_action = $(this).attr('data-value');

        ajax_validation_request_tool(request_url, {
            action_func: 'function_switch',
            switch_action: switch_action,
        }, success_redirect_url);
    });


    $('.debugging-click').on('click', function(){
        var debugging_add=$(".debugging-add").show();
        setTimeout(function(){
            debugging_add.hide()
            ajax_validation_request_tool(request_url, {
                action_func: 'debugging_top_up',
            });
        },6000);

    });


    /**
     * tool function
     *
     * request_tool 方法均可以使用回调函数
     */
    $('.frc_mysql_upgrade').on('click', function () {
        var progress = $(this).attr('data-value');

        ajax_option_request_tool(request_url, {
            action_func: 'upgrade',
            progress: progress,
        }, success_redirect_url);
    });

    function ajax_collect_request_tool(request_url, data, progress_bar = '', input_disabled = '') {
        // console.log(request_url, data, progress_bar, input_disabled);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_interface', interface_type: 1}, data),
            beforeSend : function(){
                if (progress_bar != ''){
                    $(progress_bar).css('width', '20%');
                    setTimeout(function() {
                        $(progress_bar).css('width', '40%');
                    }, 1000);
                    setTimeout(function() {
                        $(progress_bar).css('width', '60%');
                    }, 2000);
                    setTimeout(function() {
                        $(progress_bar).css('width', '80%');
                    }, 3000);
                }
                if (input_disabled != ''){
                    $(input_disabled).attr('disabled', 'disabled');
                }
            },
            success: function(response) {
                console.log(response);
                if (progress_bar != ''){
                    $(progress_bar).css('width', '100%');
                }
                setTimeout(function() {
                    if (response.code == 200) {
                        alert(response.msg);
                    } else {
                        alert('错误: '+response.msg);
                    }
                }, 500);
            },
            complete: function() {
                setTimeout(function() {
                    if (progress_bar != ''){
                        $(progress_bar).css('width', '0%');
                    }
                }, 2000);
                setTimeout(function() {
                    if (input_disabled != ''){
                        $(input_disabled).removeAttr('disabled');
                    }
                }, 2000);
            },
            error: function(error) {
                alert('网络超时! 如果你点击后立刻出现此错误那是你的采集规则写错了,请排查规则错误. 如果你已经等待采集了很久, 那就是正常的网络超时哦. 去数据中心看看是不是已经下载好了.');
                if (progress_bar != ''){
                    $(progress_bar).css('width', '0%');
                }
                if (input_disabled != ''){
                    setTimeout(function() {
                        $(input_disabled).removeAttr('disabled');
                    }, 10000);
                }
                console.log('error:', error);
            }
        });
    }

    function ajax_option_request_tool(request_url, data, success_redirect_url = '', error_redirect_url = ''){
        // console.log(request_url, data);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_interface', interface_type: 2}, data),
            success: function(response) {
                // console.log(response);
                if (response.code == 200) {
                    alert(response.msg);
                    if (success_redirect_url != ''){
                        window.location.href=success_redirect_url;
                    }
                } else {
                    alert('错误: '+response.msg);
                    if (error_redirect_url != ''){
                        window.location.href=error_redirect_url;
                    }
                }
            },
            error: function(error) {
                alert('Network Error !');
                console.log('Network Error !:', error)
            }
        })
    }

    function ajax_import_data_request_tool(request_url, data, success_redirect_url = '', error_redirect_url = '', callback = ''){
        // console.log(request_url, data);

        $('.request—loading').addClass('fa-spin');
        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_interface', interface_type: 3}, data),
            success: function(response) {
                // console.log(response);
                $('.request—loading').removeClass('fa-spin');
                if (response.code == 200) {
                    if (callback != ''){
                        eval(callback+"(response)");
                        return ;
                    }
                    alert(response.msg);
                    if (success_redirect_url != ''){
                        window.location.href=success_redirect_url;
                    }
                } else {
                    alert('错误: '+response.msg);
                    if (error_redirect_url != ''){
                        window.location.href=error_redirect_url;
                    }
                }
            },
            error: function(error) {
                $('.request—loading').removeClass('fa-spin');
                alert('Network Error !');
                console.log('Network Error !:', error)
            }
        });
    }

    function ajax_validation_request_tool(request_url, data, success_redirect_url = '', error_redirect_url = ''){
        // console.log(request_url, data);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_interface', interface_type: 4}, data),
            success: function(response) {
                if (response.code == 200) {
                    alert(response.msg);
                    if (success_redirect_url != ''){
                        window.location.href=success_redirect_url;
                    }
                } else {
                    alert('错误: '+response.msg);
                    if (error_redirect_url != ''){
                        window.location.href=error_redirect_url;
                    }
                }
            },
            error: function(error) {
                alert('Network Error !');
                console.log('Network Error !:', error)
            }
        })
    }

})(jQuery);