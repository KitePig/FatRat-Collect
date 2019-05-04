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

if (get_option(FRC_Validation::FRC_VALIDATION_AUTO_TAGS) != ''){
    function frc_auto_tags($postID){
        if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            || (!current_user_can('edit_post', $postID))) {
            return;
        }
        remove_action('save_post', 'frc_auto_tags');
        $post_content = get_post($postID)->post_content;
        collect(get_tags( array('hide_empty' => false) ))->map(function ($tag) use ($postID, $post_content){
            if ( strpos($post_content, $tag->name) !== false) {
                wp_set_post_tags( $postID, $tag->name, true );
            }
        });
        add_action('save_post', 'frc_auto_tags');
    }
    add_action('save_post', 'frc_auto_tags');


    function frc_show_tag_link( $content ) {

        collect(get_the_tags())->map(function($tag) use (&$content){
            if ($tag == false)
                return;

            $tag_link = get_tag_link($tag->term_id);
            $content = str_replace($tag->name, "<a href='$tag_link' target='_blank'>$tag->name</a>", $content);
        });

        return $content;
    }
    add_action( 'the_content', 'frc_show_tag_link' );
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
            'after' =>date('Y-m-d H:i',time()-3600*24*5)
        ));
        $query_posts = new WP_Query();
        $posts_data = $query_posts->query($args);

        if (isset($posts_data[0]) && $previous_post = $posts_data[0]){
            $link = get_permalink($previous_post->ID);
            $previous_post_abstract = "<blockquote style='background: #F5F5F5;'><p style='color: #929292;font-size: 10px;'>猜你喜欢: <a style='text-decoration:none;color:#929292;' href='{$link}'>".$previous_post->post_title."</a></p>";
            $previous_post->post_content = preg_replace('/<img.*?>/','', $previous_post->post_content);
            $previous_post->post_content = preg_replace("@<script(.*?)</script>@is", "", $previous_post->post_content);
            $previous_post->post_content = preg_replace("@<iframe(.*?)</iframe>@is", "", $previous_post->post_content);
            $previous_post->post_content = preg_replace("@<style(.*?)</style>@is", "", $previous_post->post_content);
            $previous_post->post_content = preg_replace("@<(.*?)>@is", "", $previous_post->post_content);
            $previous_post->post_content = str_replace(PHP_EOL, '', $previous_post->post_content);
            $space = array(" ", "　", "  ", " ", " ");
            $go_away = array("", "", "", "", "");
            $previous_post->post_content = str_replace($space, $go_away, $previous_post->post_content);
            $previous_post_abstract .= "<p style='color: #929292;font-size: 10px;'><a style='text-decoration:none;color:#929292;' href='{$link}'>".mb_substr($previous_post->post_content, 0, 130)." ...</a></p></blockquote>";
            $content = $previous_post_abstract.$content;
        }

        if (isset($posts_data[1]) && $next_post = $posts_data[1]){
            $link = get_permalink($next_post->ID);
            $next_post_abstract = "<blockquote style='background: #F5F5F5;'><p style='color: #929292;font-size: 10px;'>相关阅读: <a style='text-decoration:none;color:#929292;' href='{$link}'>".$next_post->post_title."</a></p>";
            $next_post->post_content = preg_replace('/<img.*?>/','', $next_post->post_content);
            $next_post->post_content = preg_replace("@<script(.*?)</script>@is", "", $next_post->post_content);
            $next_post->post_content = preg_replace("@<iframe(.*?)</iframe>@is", "", $next_post->post_content);
            $next_post->post_content = preg_replace("@<style(.*?)</style>@is", "", $next_post->post_content);
            $next_post->post_content = preg_replace("@<(.*?)>@is", "", $next_post->post_content);
            $next_post->post_content = str_replace(PHP_EOL, '', $next_post->post_content);
            $space = array(" ", "　", "  ", " ", " ");
            $go_away = array("", "", "", "", "");
            $next_post->post_content = str_replace($space, $go_away, $next_post->post_content);
            $next_post_abstract .= "<p style='color: #929292;font-size: 10px;'><a style='text-decoration:none;color:#929292;' href='{$link}'>".mb_substr($next_post->post_content, 0, 130)." ...</a></p></blockquote>";
            $content = $content.$next_post_abstract;
        }

        wp_update_post(array('ID' => $postID, 'post_content' => $content));
        add_action('save_post', 'frc_add_dynamic_fields');
    }
    add_action( 'save_post', 'frc_add_dynamic_fields' );
}