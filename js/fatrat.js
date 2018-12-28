(function($){

    var option_id                       = $('#option_id').val();
    var request_url                     = $('#request_url').val();
    var success_redirect_url            = $('#success_redirect_url').val();
    var collect_name                    = '默认代号-全军出击';
    var collect_type                    = 'list';
    var collect_remove_outer_link       = '1';
    var collect_remove_head             = '0';
    var collect_list_url                = '';
    var collect_list_range              = '';
    var collect_list_rules              = '';
    var collect_content_range           = '';
    var collect_content_rules           = '';
    var collect_keywords_replace_rule   = '';

    /**
     * Spider Ajax
     */

    //微信爬虫
    $('.wx-spider-run-button').on('click', function(){
        var collect_wx_urls   = $('textarea[name="collect_wx_urls"]').val();

        ajax_collect_request_tool(request_url, {
            action_func: 'wx_page',
            collect_wx_urls: collect_wx_urls,
        }, '.wx-spider-progress-bar', '.wx-spider-run-button');
    });

    // 爬虫列表
    $('.list-spider-run-button').on('click', function(){
        var option_id = $(this).attr('data-id');

        ajax_collect_request_tool(request_url, {
            action_func: 'list_page',
            option_id: option_id,
        }, '.list-spider-progress-bar', '.list-spider-run-button');
    });

    // 历史文章
    $('.history-page-spider-run-button').on('click', function(){
        if(!confirm("请再次核实输入信息。")){
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



    /**
     * Option Ajax
     */
    /**
     * Import Ajax
     */


    /**
     * tool function
     */
    function ajax_collect_request_tool(request_url, data, progress_bar = '', input_disabled = '')
    {
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
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
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



// ****分割线

    // 配置文件
    $('#save-option-button').on('click', function(){
        tmp_link = new Array();
        tmp_title = new Array();
        tmp_content = new Array();

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
        collect_type                    = $('input[name="collect_type"]:checked').val();
        collect_remove_outer_link       = $('input[name="collect_remove_outer_link"]:checked').val();
        collect_remove_head             = $('input[name="collect_remove_head"]:checked').val();
        collect_list_url                = $('input[name="collect_list_url"]').val();
        collect_list_range              = $('input[name="collect_list_range"]').val();
        collect_list_rules              = tmp_link['a']+'%'+tmp_link['b']+'|'+tmp_link['c']+'|'+tmp_link['d'];
        collect_content_range           = $('input[name="collect_content_range"]').val();
        collect_content_rules           = tmp_title['a']+'%'+tmp_title['b']+'|'+tmp_title['c']+'|'+tmp_title['d']+')('+tmp_content['a']+'%'+tmp_content['b']+'|'+tmp_content['c']+'|'+tmp_content['d'];
        collect_keywords_replace_rule   = $('textarea[name="collect_keywords_replace_rule"]').val();

        console.log(option_id, request_url, collect_name, collect_type, collect_remove_outer_link, collect_remove_head, collect_list_url, collect_list_range, collect_list_rules, collect_content_range, collect_content_rules, collect_keywords_replace_rule);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'frc_save_options',
                option_id: option_id,
                collect_name: collect_name,
                collect_type: collect_type,
                collect_remove_outer_link: collect_remove_outer_link,
                collect_remove_head: collect_remove_head,
                collect_list_url: collect_list_url,
                collect_list_range: collect_list_range,
                collect_list_rules: collect_list_rules,
                collect_content_range: collect_content_range,
                collect_content_rules: collect_content_rules,
                collect_keywords_replace_rule: collect_keywords_replace_rule,
            },
            success: function(response) {
                if (response.code == 0){
                    window.location.href=success_redirect_url;
                }
            },
            error: function(error) {
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
                console.log('error:', error)
            }
        })
    });

    $('.delete-option-button').on('click', function(){
        option_id = $(this).attr('data-value');

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'frc_delete_option',
                option_id: option_id,
            },
            success: function(response) {
                console.log(response);
                if (response.code == 0){
                    alert(response.msg);
                }
            },
            error: function(error) {
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
                console.log('error:', error)
            }
        })
    });

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
                // if (response.code == 0){
                //     window.location.href=success_redirect_url;
                // }
            },
            error: function(error) {
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
                console.log('error:', error)
            }
        })
    });







    // import article
    $('#import-articles-button').on('click', function(){

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'frc_import_articles',
            },
            success: function(response) {
                alert(response['msg']);
                console.log(response);
            },
            error: function(error) {
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
                console.log('error:', error);
            }
        })
    });


    $('#import-articles-button_group').on('click', function(){

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'frc_import_articles_group',
            },
            success: function(response) {
                alert(response['msg']);
                console.log(response);
            },
            error: function(error) {
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
                console.log('error:', error);
            }
        })
    });


    $('.publish-articles').on('click', function(){

        article_id   = $(this).attr('value');

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'frc_publish_article',
                article_id: article_id,
            },
            success: function(response) {
                alert(response['msg']);
                console.log(response);
            },
            error: function(error) {
                alert('error!,  出现这个错误不必惊慌. 可能是你的网络太差或服务器带宽小或 采集的时间太久超时了。你可以 数据中心看一下。是不是已经采集好了?  ');
                console.log('error:', error);
            }
        })
    });


    $(".debug-button").on('click', function(){
        $(".debug-table").show();
    })

    $({property: 0}).animate({property: 100}, {
        duration: 3000,
        step: function() {
            var percentage = Math.round(this.property);
            $('#progress').css('width',  percentage+"%");
            if(percentage == 100) {
                $("#progress").addClass("done");//完成，隐藏进度条
            }
        }
    });

})(jQuery);
