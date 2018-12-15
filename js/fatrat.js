(function($){

    var option_id                       = $('#option_id').val();
    var request_url                     = $('#request_url').val();
    var success_redirect_url            = $('#success_redirect_url').val();
    var collect_name                    = '默认代号-全军出击';
    var collect_type                    = 'list';
    var collect_remove_outer_link       = '1';
    var collect_list_url                = '';
    var collect_list_range              = '';
    var collect_list_rules              = '';
    var collect_content_range           = '';
    var collect_content_rules           = '';
    var collect_keywords_replace_rule   = '';

    // 配置文件
    $('#save-option-button').on('click', function(){
        collect_name                    = $('input[name="collect_name"]').val();
        collect_type                    = $('input[name="collect_type"]:checked').val();
        collect_remove_outer_link       = $('input[name="collect_remove_outer_link"]:checked').val();
        collect_list_url                = $('input[name="collect_list_url"]').val();
        collect_list_range              = $('input[name="collect_list_range"]').val();
        collect_list_rules              = $('input[name="collect_list_rules"]').val();
        collect_content_range           = $('input[name="collect_content_range"]').val();
        collect_content_rules           = $('input[name="collect_content_rules"]').val();
        collect_keywords_replace_rule   = $('textarea[name="collect_keywords_replace_rule"]').val();

        console.log(option_id, request_url, collect_name, collect_type, collect_remove_outer_link, collect_list_url, collect_list_range, collect_list_rules, collect_content_range, collect_content_rules, collect_keywords_replace_rule);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'save_options',
                option_id: option_id,
                collect_name: collect_name,
                collect_type: collect_type,
                collect_remove_outer_link: collect_remove_outer_link,
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

    // 爬虫run
    $('#spider-run-button').on('click', function(){

        $.ajax(request_url, {
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'spider_run',
            },
            success: function(response) {
                alert('正在爬取中。请稍后');
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
