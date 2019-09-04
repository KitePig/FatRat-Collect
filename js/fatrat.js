(function($){

    var option_id                       = $('#option_id').val();
    var request_url                     = $('#request_url').val();
    var success_redirect_url            = $('#success_redirect_url').val();
    var collect_name                    = '默认代号-全军出击';
    var collect_describe                = '';
    var collect_type                    = 'list';
    var collect_image_download          = '1';
    var collect_image_path              = '1';
    var collect_remove_outer_link       = '1';
    var collect_remove_head             = '0';
    var collect_list_url                = '';
    var collect_list_range              = '';
    var collect_list_rules              = '';
    var collect_content_range           = '';
    var collect_content_rules           = '';
    var collect_image_attribute         = 'src';
    var collect_custom_content_head     = '';
    var collect_custom_content_foot     = '';
    var collect_keywords_replace_rule   = '';

    /**
     * Spider Ajax
     */

    // 微信爬虫
    $('.wx-spider-run-button').on('click', function(){
        var collect_wx_urls   = $('textarea[name="collect_wx_urls"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'wx_page',
            collect_wx_urls: collect_wx_urls,
        }, '.wx-spider-progress-bar', '.wx-spider-run-button');
    });

    // 简书爬虫
    $('.js-spider-run-button').on('click', function(){
        var collect_js_urls   = $('textarea[name="collect_js_urls"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'js_page',
            collect_js_urls: collect_js_urls,
        }, '.js-spider-progress-bar', '.js-spider-run-button');
    });

    // 列表爬虫
    $('.list-spider-run-button').on('click', function(){
        if(!confirm("列表爬取时间会久点, 请耐心等待...")){
            return;
        }

        var option_id = $(this).attr('data-id');

        ajax_collect_request_tool(request_url, {
            action_func: 'list_page',
            option_id: option_id,
        }, '.list-spider-progress-bar', '.list-spider-run-button');
    });

    // 历史文章
    $('.history-page-spider-run-button').on('click', function(){
        if(!confirm("请核实输入信息.")){
            return;
        }

        var collect_history_url           = $('input[name="collect_history_url"]').val();
        var collect_history_page_number   = $('input[name="collect_history_page_number"]').val();
        var collect_history_relus_id      = $('select[name="collect_history_relus"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'history_page',
            collect_history_url: collect_history_url,
            collect_history_page_number: collect_history_page_number,
            collect_history_relus_id: collect_history_relus_id,
        }, '.history-page-spider-progress-bar', '.history-page-spider-run-button');

    });

    // 详情爬虫
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
        }, '.details-spider-progress-bar', '.details-spider-run-button');
    });



    /**
     * Option Ajax
     */

    $('#save-option-button').on('click', function(){
        if(!confirm("好好检查一下配置别错了..")){
            return;
        }

        var tmp_link = new Array();
        var tmp_title = new Array();
        var tmp_content = new Array();

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

        collect_name                    = $('input[name="collect_name"]').val();
        collect_describe                = $('input[name="collect_describe"]').val();
        collect_type                    = $('input[name="collect_type"]:checked').val();
        collect_remove_outer_link       = $('input[name="collect_remove_outer_link"]:checked').val();
        collect_image_download          = $('input[name="collect_image_download"]:checked').val();
        collect_image_path              = $('input[name="collect_image_path"]:checked').val();
        collect_remove_head             = $('input[name="collect_remove_head"]:checked').val();
        collect_list_url                = $('input[name="collect_list_url"]').val();
        collect_list_range              = $('input[name="collect_list_range"]').val();
        collect_list_rules              = tmp_link['a']+'%'+tmp_link['b']+'|'+tmp_link['c']+'|'+tmp_link['d'];
        collect_content_range           = $('input[name="collect_content_range"]').val();
        collect_content_rules           = tmp_title['a']+'%'+tmp_title['b']+'|'+tmp_title['c']+'|'+tmp_title['d']+')('+tmp_content['a']+'%'+tmp_content['b']+'|'+tmp_content['c']+'|'+tmp_content['d'];
        collect_image_attribute         = $('input[name="collect_image_attribute"]').val();
        collect_custom_content_head     = $('textarea[name="collect_custom_content_head"]').val();
        collect_custom_content_foot     = $('textarea[name="collect_custom_content_foot"]').val();
        collect_keywords_replace_rule   = $('textarea[name="collect_keywords_replace_rule"]').val();

        ajax_option_request_tool(request_url, {
            action_func: 'save_option',
            option_id: option_id,
            collect_name: collect_name,
            collect_describe: collect_describe,
            collect_type: collect_type,
            collect_image_download: collect_image_download,
            collect_image_path: collect_image_path,
            collect_remove_outer_link: collect_remove_outer_link,
            collect_remove_head: collect_remove_head,
            collect_list_url: collect_list_url,
            collect_list_range: collect_list_range,
            collect_list_rules: collect_list_rules,
            collect_content_range: collect_content_range,
            collect_content_rules: collect_content_rules,
            collect_image_attribute: collect_image_attribute,
            collect_custom_content_head: collect_custom_content_head,
            collect_custom_content_foot: collect_custom_content_foot,
            collect_keywords_replace_rule: collect_keywords_replace_rule,
        }, success_redirect_url);
    });

    $('.frc_cron_spider').on('click', function(){
        if(!confirm("启动自动爬取引擎 * _ * ?")){
            return;
        }
        var wp_option_val = $('input[name="collect_spider_time"]:checked').val();

        ajax_option_request_tool(request_url, {
            action_func: 'operation_wp_option',
            wp_option_key: 'frc_cron_spider',
            wp_option_val: wp_option_val,
        });
    });

    $('.frc_cron_publish_article').on('click', function(){
        if(!confirm("启动自动发布引擎?")){
            return;
        }
        var wp_option_val = $('input[name="collect_published_time"]:checked').val();

        ajax_option_request_tool(request_url, {
            action_func: 'operation_wp_option',
            wp_option_key: 'frc_cron_publish_article',
            wp_option_val: wp_option_val,
        });
    });

    $('.delete-option-button').on('click', function(){
        if(!confirm("删除就彻底没了..")){
            return;
        }

        option_id = $(this).attr('data-value');

        ajax_option_request_tool(request_url, {
            action_func: 'del_option',
            option_id: option_id,
        }, success_redirect_url);
    });

    $('.import_default_configuration').on('click', function(){
        if(!confirm("亲, 此功能会创建几个默认的 爬取列表的配置和爬取详情 的配置.. 供你参考学习")){
            return;
        }
        if(!confirm("创建成功后， 你要注意。配置是怎么写的, 然后用debug模式多测试一下。 争取早日熟练使用胖鼠")){
            return;
        }
        if(!confirm("重要的事情再说一下，看看例子 配合Debug功能。去享受吧!")){
            return;
        }

        ajax_option_request_tool(request_url, {
            action_func: 'import_default_configuration',
        }, success_redirect_url);
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


    $('.publish-articles').on('click', function(){
        if(!confirm("请确定发布, 发布时间可能会过长, 请耐心等待. 切记, 勿重复点击. ")){
            return;
        }

        var article_id   = $(this).attr('value');
        var post_category = [];
        $("input[type='checkbox']:checked").each(function (index, item) {
            post_category.push($(this).val());
        });
        var post_user = $('select[name="post_user"]').val();
        var post_status = $('input[name="post_status"]:checked').val();
        var post_thumbnail = $('input[name="post_thumbnail"]:checked').val();

        ajax_import_data_request_tool(request_url, {
            action_func: 'publish_article',
            article_id: article_id,
            post_category: post_category,
            post_user: post_user,
            post_status: post_status,
            post_thumbnail: post_thumbnail,
        }, success_redirect_url);
    });

    $('.preview-article').on('click', function(){
        if(!confirm("注意 *_* !, 点击确定 会把这篇文章发送到到你的文章列表里面 文章状态是: 草稿")){
            return;
        }

        var article_id   = $(this).attr('value');
        var post_category = [];
        $("input[type='checkbox']:checked").each(function (index, item) {
            post_category.push($(this).val());
        });
        var post_user = $('select[name="post_user"]').val();
        var post_status = $('input[name="post_status"]:checked').val();

        ajax_import_data_request_tool(request_url, {
            action_func: 'preview_article',
            article_id: article_id,
            post_category: post_category,
            post_user: post_user,
            post_status: post_status,
        }, success_redirect_url, '', 'preview_article');
    });

    function preview_article(response){
        window.location.href=response.result.preview_url;
    }



    /**
     * style
     */
    if ($('input[type=radio][name=collect_type]:checked').val() == 'single'){
        $('.collect_type_radio_change').hide();
    }

    $('#todo—more-button').on('click', function(){
        $('.todo—more-show').attr("style","display:block;");
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

    /**
     * validation
     */
    $('#activation-featured-picture').on('click', function(){
        var featured_picture = $('input[name="featured-picture"]').val();

        ajax_validation_request_tool(request_url, {
            action_func: 'featured_picture',
            featured_picture: featured_picture,
        }, success_redirect_url);
    });

    $('#activation-auto-tags').on('click', function(){
        var auto_tags = $('input[name="auto-tags"]').val();

        ajax_validation_request_tool(request_url, {
            action_func: 'auto_tags',
            auto_tags: auto_tags,
        }, success_redirect_url);
    });

    $('.activation-auto-tags-switch').on('click', function(){
        var auto_tags = $(this).attr('value');
        if (auto_tags == '启动') {
            auto_tags = 'open';
        } else {
            auto_tags = 'shutdown';
        }

        ajax_validation_request_tool(request_url, {
            action_func: 'auto_tags_switch',
            auto_tags: auto_tags,
        }, success_redirect_url);
    });

    $('#activation-dynamic-fields').on('click', function(){
        var dynamic_fields = $('input[name="dynamic-fields"]').val();

        ajax_validation_request_tool(request_url, {
            action_func: 'dynamic_fields',
            dynamic_fields: dynamic_fields,
        }, success_redirect_url);
    });

    $('.activation-dynamic-fields-switch').on('click', function(){
        var dynamic_fields = $(this).attr('value');
        if (dynamic_fields == '启动') {
            dynamic_fields = 'open';
        } else {
            dynamic_fields = 'shutdown';
        }

        ajax_validation_request_tool(request_url, {
            action_func: 'dynamic_fields_switch',
            dynamic_fields: dynamic_fields,
        }, success_redirect_url);
    });

    /**
     * tool function
     *
     * request_tool 方法均可以使用回调函数
     */
    $(".debug-button").on('click', function(){
        $(".debug-table").show();
    })

    function ajax_collect_request_tool(request_url, data, progress_bar = '', input_disabled = '') {
        // console.log(request_url, data, progress_bar, input_disabled);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_spider_interface'}, data),
            beforeSend : function(){
                if (progress_bar != ''){
                    $(progress_bar).css('width', '20%');
                }
                if (input_disabled != ''){
                    $(input_disabled).attr('disabled', 'disabled');
                }
            },
            success: function(response) {
                // console.log(response);
                if (progress_bar != ''){
                    $(progress_bar).css('width', '100%');
                }
                setTimeout(function() {
                    if (response.code == 200) {
                        alert(response.msg);
                    } else {
                        alert('错误码:'+response.code+' '+response.msg);
                    }
                }, 500);
            },
            complete: function() {
                setTimeout(function() {
                    if (progress_bar != ''){
                        $(progress_bar).css('width', '0%');
                    }
                    if (input_disabled != ''){
                        $(input_disabled).removeAttr('disabled');
                    }
                }, 2000);
            },
            error: function(error) {
                alert('超时! 亲不必惊慌, 胖鼠为你保驾护航. 此异常一般是你的网络太差或服务器带宽小,文章中图片过多,下载图片太慢,时间久了就超时了(但是采集任务仍在后台运行哦), 你可以新开窗口去数据中心看一下. 是不是已经采集成功一部分了? 可以修改(php.ini)请求超时时间选项可优化。或者重新点击一次运行即可(推荐)，但是多等一会再点哦(30秒左右吧), 因为上一个后台任务还没结束, 又点了一次 文章滤重功能可能会失效造成文章重复采集哦, 没有其他影响 = - =!');
                if (progress_bar != ''){
                    $(progress_bar).css('width', '0%');
                }
                if (input_disabled != ''){
                    $(input_disabled).removeAttr('disabled');
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
            data: $.extend({action: 'frc_option_interface'}, data),
            success: function(response) {
                // console.log(response);
                if (response.code == 200) {
                    alert(response.msg);
                    if (success_redirect_url != ''){
                        window.location.href=success_redirect_url;
                    }
                } else {
                    alert('错误码:'+response.code+' '+response.msg);
                    if (error_redirect_url != ''){
                        window.location.href=error_redirect_url;
                    }
                }
            },
            error: function(error) {
                alert('error!');
                console.log('error:', error)
            }
        })
    }

    function ajax_import_data_request_tool(request_url, data, success_redirect_url = '', error_redirect_url = '', callback = ''){
        // console.log(request_url, data);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_import_data_interface'}, data),
            success: function(response) {
                // console.log(response);
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
                    alert('错误码:'+response.code+' '+response.msg);
                    if (error_redirect_url != ''){
                        window.location.href=error_redirect_url;
                    }
                }
            },
            error: function(error) {
                alert('error!, 鼠不慌, 发送文章个别情况是会有失败的. 此异常一般是文章中图片过多上传媒体库时候出的问题, 你可以,所有文章中看一下. 是不是已经发布成功了!  如果没有的话请不要再尝试了. 放弃这篇文章吧! ');
                console.log('error:', error)
            }
        })
    }

    function ajax_validation_request_tool(request_url, data, success_redirect_url = '', error_redirect_url = ''){
        // console.log(request_url, data);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: $.extend({action: 'frc_validation_interface'}, data),
            success: function(response) {
                console.log(response);
                if (response.code == 200) {
                    alert(response.msg);
                    if (success_redirect_url != ''){
                        window.location.href=success_redirect_url;
                    }
                } else {
                    alert('错误码:'+response.code+' '+response.msg);
                    if (error_redirect_url != ''){
                        window.location.href=error_redirect_url;
                    }
                }
            },
            error: function(error) {
                alert('error!');
                console.log('error:', error)
            }
        })
    }



// ****分割线

    // debug
    $('#debug-option').on('click', function(){
        debug_rule = new Array();

        debug_rule['a'] = $('input[name="collect_debug_rule_a"]').val() != "" ? $('input[name="collect_debug_rule_a"]').val() : null ;
        debug_rule['b'] = $('input[name="collect_debug_rule_b"]').val() != "" ? $('input[name="collect_debug_rule_b"]').val() : null ;
        debug_rule['c'] = $('input[name="collect_debug_rule_c"]').val() != "" ? $('input[name="collect_debug_rule_c"]').val() : null ;
        debug_rule['d'] = $('input[name="collect_debug_rule_d"]').val() != "" ? $('input[name="collect_debug_rule_d"]').val() : null ;

        debug_url      = $('input[name="debug_url"]').val();
        debug_range    = $('input[name="debug_range"]').val();
        debug_remove_head    = $('input[name="debug_remove_head"]:checked').val();
        debug_rules    = debug_rule['a']+'%'+debug_rule['b']+'|'+debug_rule['c']+'|'+debug_rule['d'];

        console.log('Request Params: ',debug_url, debug_remove_head, debug_range, debug_rules);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'frc_debug_option',
                debug_url: debug_url,
                debug_remove_head: debug_remove_head,
                debug_range: debug_range,
                debug_rules: debug_rules,
            },
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                alert('超时! 亲不必惊慌, 胖鼠为你保驾护航. 此异常一般是你的网络太差或服务器带宽小,文章中图片过多,下载图片太慢,时间久了就超时了(但是采集任务仍在后台运行哦), 你可以新开窗口去数据中心看一下. 是不是已经采集成功一部分了? 可以修改(php.ini)请求超时时间选项可优化。或者重新点击一次运行即可(推荐)，但是多等一会再点哦(30秒左右吧), 因为上一个后台任务还没结束, 又点了一次 文章滤重功能可能会失效造成文章重复采集哦, 没有其他影响 = - =!');
                console.log('error:', error)
            }
        })
    });

})(jQuery);
