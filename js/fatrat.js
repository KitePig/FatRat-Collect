(function($){

    var remove_outer_link       = 'yes';
    var keywords_replace_rule   = '';
    var request_url          = $('#request_url').val();

    $('#save-button').on('click', function(){
        remove_outer_link     = $('input[name="remove_outer_link"]:checked').val();
        keywords_replace_rule = $('textarea[name="keywords_replace_rule"]').val();

        console.log(remove_outer_link, keywords_replace_rule, request_url)

        $.ajax(request_url, {
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'add_options',
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
})(jQuery);
