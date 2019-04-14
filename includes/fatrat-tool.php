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

