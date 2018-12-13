(function($){

    var option_id               = $('#option_id').val();
    var remove_outer_link       = 'yes';
    var keywords_replace_rule   = '';
    var request_url             = $('#request_url').val();

    $('#save-button').on('click', function(){
        remove_outer_link     = $('input[name="remove_outer_link"]:checked').val();
        keywords_replace_rule = $('textarea[name="keywords_replace_rule"]').val();

        console.log(remove_outer_link, keywords_replace_rule, request_url, option_id);

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'add_options',
                option_id: option_id,
                remove_outer_link: remove_outer_link,
                keywords_replace_rule: keywords_replace_rule,
            },
            success: function(response) {
                console.log(response)
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
