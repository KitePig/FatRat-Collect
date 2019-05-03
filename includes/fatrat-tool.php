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
            $tag_link = get_tag_link($tag->term_id);
            $content = str_replace($tag->name, "<a href='$tag_link' target='_blank'>$tag->name</a>", $content);
        });

        return $content;
    }
    add_action( 'the_content', 'frc_show_tag_link' );
}