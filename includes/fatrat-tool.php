<?php

if (!function_exists("frc_image")) {
    /**
     * @param $file
     * @return string
     */
    function frc_image($file){
        echo plugin_dir_url(dirname(__FILE__)).'images/' . $file;
    }
}

if (get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS) != '' && json_decode(get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS), true)['switch'] === 'open'){
    function frc_auto_tags($postID){
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            || (!current_user_can('edit_post', $postID))) {
            return;
        }
        remove_action('save_post', 'frc_auto_tags');
        $post_content = get_post($postID)->post_content;

        $add_tag_link = get_the_tags($postID);
        if (!$add_tag_link){
            collect(get_tags( array('hide_empty' => false) ))->map(function ($tag) use ($postID, &$post_content){
                if ( strpos($post_content, $tag->name) !== false) {
                    wp_set_post_tags( $postID, $tag->name, true );
//                    $tag_link = get_tag_link($tag->term_id);
//                    $post_content = preg_replace("/(\<p\>)+($tag->name)+(?![\<\/a\>]\<\/p\>)+/", "$1<a href='{$tag_link}' target='_blank'>$2</a>$3", $post_content);
                }
            });

//            wp_update_post(array('ID' => $postID, 'post_content' => $post_content));
        }

        add_action('save_post', 'frc_auto_tags');
    }
    add_action('save_post', 'frc_auto_tags');
}

if (get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS) != '' && json_decode(get_option(FRC_Validation::FRC_VALIDATION_DYNAMIC_FIELDS), true)['switch'] === 'open'){
    function frc_add_dynamic_fields( $postID ) {
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            || (!current_user_can('edit_post', $postID))) {
            return;
        }
        remove_action('save_post', 'frc_add_dynamic_fields');
        $content = get_post($postID)->post_content;
        if (strpos( $content, '<blockquote' ) !== false){
            return;
        }

        $cat = get_the_category();
        foreach($cat as $key=>$category){
            $cat_id = $category->term_id;
        }
        $args = array('orderby' => 'rand','showposts' => 2,'cat' => $cat_id, 'date_query' => array(
            'column' => 'post_date',
            'before' => date('Y-m-d H:i',time()),
            'after' => date('Y-m-d H:i',time()-3600*24*5)
        ));
        $query_posts = new WP_Query();
        $posts_data = $query_posts->query($args);

        if (isset($posts_data[0]) && $previous_post = $posts_data[0]){
            if (strstr($previous_post->post_content, '<blockquote') && strstr($previous_post->post_content, '</blockquote>')){
                $str_star = strpos($previous_post->post_content, '</blockquote>')+13;
                $str_stop = strripos($previous_post->post_content, '<blockquote');
                $previous_post->post_content = substr($previous_post->post_content, $str_star, $str_stop-$str_star);
            }

            $link = get_permalink($previous_post->ID);
            $previous_post_abstract = "<blockquote style='background: #F5F5F5;'><span style='color: #929292;font-size: 10px;'><a style='text-decoration:none;color:#929292;' href='{$link}'>".$previous_post->post_title."</a></span>";
            $previous_post_abstract .= "<p style='color: #929292;font-size: 10px;'><a style='text-decoration:none;color:#929292;' href='{$link}'>".wp_trim_words($previous_post->post_content, 130)."</a></p></blockquote>";
            $content = $previous_post_abstract.$content;
        }

        if (isset($posts_data[1]) && $next_post = $posts_data[1]){
            if (strstr($next_post->post_content, '<blockquote') && strstr($next_post->post_content, '</blockquote>')){
                $str_star = strpos($next_post->post_content, '</blockquote>')+13;
                $str_stop = strripos($next_post->post_content, '<blockquote');
                $next_post->post_content = substr($next_post->post_content, $str_star, $str_stop-$str_star);
            }

            $link = get_permalink($next_post->ID);
            $next_post_abstract = "<blockquote style='background: #F5F5F5;'><span style='color: #929292;font-size: 10px;'><a style='text-decoration:none;color:#929292;' href='{$link}'>".$next_post->post_title."</a></span>";
            $next_post_abstract .= "<p style='color: #929292;font-size: 10px;'><a style='text-decoration:none;color:#929292;' href='{$link}'>".wp_trim_words($next_post->post_content, 130)."</a></p></blockquote>";

            $content = $content.$next_post_abstract;
        }

        wp_update_post(array('ID' => $postID, 'post_content' => $content));
        add_action('save_post', 'frc_add_dynamic_fields');
    }
    add_action( 'save_post', 'frc_add_dynamic_fields' );
}