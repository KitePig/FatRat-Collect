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

    // 配置文件
    $('#save-option-button').on('click', function(){
        tmp_link = new Array();
        tmp_title = new Array();
        tmp_content = new Array();

        tmp_link['a'] = $('input[name="collect_list_range_link_a"]').val() != "" ? $('input[name="collect_list_range_link_a"]').val() : null ;
        tmp_link['b'] = $('input[name="collect_list_range_link_b"]').val() != "" ? $('input[name="collect_list_range_link_b"]').val() : null ;
        tmp_link['c'] = $('input[name="collect_list_range_link_c"]').val() != "" ? $('input[name="collect_list_range_link_c"]').val() : null ;
        tmp_link['d'] = $('input[name="collect_list_range_link_d"]').val() != "" ? $('input[name="collect_list_range_link_d"]').val() : null ;
        tmp_title['a'] = $('input[name="collect_content_range_title_a"]').val() != "" ? $('input[name="collect_content_range_title_a"]').val() : null ;
        tmp_title['b'] = $('input[name="collect_content_range_title_b"]').val() != "" ? $('input[name="collect_content_range_title_b"]').val() : null ;
        tmp_title['c'] = $('input[name="collect_content_range_title_c"]').val() != "" ? $('input[name="collect_content_range_title_c"]').val() : null ;
        tmp_title['d'] = $('input[name="collect_content_range_title_d"]').val() != "" ? $('input[name="collect_content_range_title_d"]').val() : null ;
        tmp_content['a'] = $('input[name="collect_content_range_content_a"]').val() != "" ? $('input[name="collect_content_range_content_a"]').val() : null ;
        tmp_content['b'] = $('input[name="collect_content_range_content_b"]').val() != "" ? $('input[name="collect_content_range_content_b"]').val() : null ;
        tmp_content['c'] = $('input[name="collect_content_range_content_c"]').val() != "" ? $('input[name="collect_content_range_content_c"]').val() : null ;
        tmp_content['d'] = $('input[name="collect_content_range_content_d"]').val() != "" ? $('input[name="collect_content_range_content_d"]').val() : null ;

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
                action: 'save_options',
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
                console.log('error:', error)
            }
        })
    });

    $('#debug-option').on('click', function(){
        debug_range = new Array();
// 变量名字更换
        debug_range['a'] = $('input[name="collect_debug_range_a"]').val() != "" ? $('input[name="collect_debug_range_a"]').val() : null ;
        debug_range['b'] = $('input[name="collect_debug_range_b"]').val() != "" ? $('input[name="collect_debug_range_b"]').val() : null ;
        debug_range['c'] = $('input[name="collect_debug_range_c"]').val() != "" ? $('input[name="collect_debug_range_c"]').val() : null ;
        debug_range['d'] = $('input[name="collect_debug_range_d"]').val() != "" ? $('input[name="collect_debug_range_d"]').val() : null ;

        debug_url      = $('input[name="debug_url"]').val();
        debug_range    = debug_range['a']+'%'+debug_range['b']+'|'+debug_range['c']+'|'+debug_range['d'];
        debug_rules    = $('textarea[name="debug_rules"]').val();

        console.log('Request Params: ',debug_url, debug_range, debug_rules);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'debug_option',
                debug_url: debug_url,
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
                console.log('error:', error)
            }
        })
    });

    // 爬虫run
    $('.spider-run-button').on('click', function(){

        option_id   = $(this).attr('data-id');

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'spider_run',
                option_id: option_id,
            },
            success: function(response) {
                alert(response['msg']);
                console.log(response);
            },
            error: function(error) {
                console.log('error:', error);
            }
        })
    });

    // import article
    $('#import-articles-button').on('click', function(){

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'import_articles',
            },
            success: function(response) {
                alert(response['msg']);
                console.log(response);
            },
            error: function(error) {
                console.log('error:', error);
            }
        })
    });


    $('#import-articles-button_group').on('click', function(){

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'import_articles_group',
            },
            success: function(response) {
                alert(response['msg']);
                console.log(response);
            },
            error: function(error) {
                console.log('error:', error);
            }
        })
    });
})(jQuery);
