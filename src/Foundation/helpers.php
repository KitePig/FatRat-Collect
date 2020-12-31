<?php

if (!function_exists("translationRules")) {
    /**
     * @param $rules
     * @return array
     */
    function translationRules($rules): array
    {
        $array = [];
        if (empty($rules)){
            return $array;
        }
        foreach (explode(')(', $rules) as $item){
            list($key, $val) = explode('%', $item);
            list($selector, $attribute, $filter) = explode('|', $val);
            $array[$key] = [
                'selector' => $selector === 'null' ? null : str_replace('\\', '', $selector),
                'attribute' => $attribute === 'null' ? null : str_replace('\\', '', $attribute),
                'filter' => $filter === 'null' ? null : str_replace('\\', '', $filter),
            ];
        }
        return $array;
    }
}

if (!function_exists("frcAddColumn")) {
    /**
     * @param $column
     * @param $alterColumnSql
     * @param $table
     */
    function frcAddColumn($column, $alterColumnSql, $table): void
    {
        $wpdb = getDb();
        $table = getTable($table);
        //Check for Exclude Image Path
        $checkColumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table, $column
        )) ;
        if ( empty( $checkColumn ) ) {
            $alterSql = "ALTER TABLE `$table` ADD `{$column}` $alterColumnSql";
            $wpdb->query($alterSql);
        }
    }
}

if (!function_exists("frcChangeColumn")) {
    /**
     * @param $sql
     * @param $table
     */
    function frcChangeColumn($sql, $table): void
    {
        $table = getTable($table);
        getDb()->query("ALTER TABLE $table $sql");
    }
}

if (!function_exists("getDb")) {
    /**
     * @return wpdb
     */
    function getDb()
    {
        global $wpdb;

        return $wpdb;
    }
}

if (!function_exists("getTable")) {
    /**
     * @param $table
     * @return string
     */
    function getTable($table)
    {
        global $wpdb;

        if ($table == 'option'){
            return $wpdb->prefix . 'frc_options';
        }

        if ($table == 'post'){
            return $wpdb->prefix . 'frc_post';
        }
    }
}

if (!function_exists("randomInsertString")) {
    /**
     * @param $txt
     * @param $insert
     * @return string
     */
    function randomInsertString($txt, $insert)
    {
        preg_match_all("/[\x01-\x7f]|[\xe0-\xef][\x80-\xbf]{2}/", $txt, $match);

        $delay = array();
        $add = 0;
        foreach ($match[0] as $k => $v) {
            if ($v == '<') $add = 1;
            if ($add == 1) $delay[] = $k;
            if ($v == '>') $add = 0;
        }

        $strArr = $match[0];
        $len = count($strArr);

        if (is_array($insert)) {
            foreach ($insert as $k => $v) {
                $insertk = insertK($len - 1, $delay);
                $strArr[$insertk] .= $insert[$k];
            }
        } else {
            $insertk = insertK($len - 1, $delay);
            $strArr[$insertk] .= $insert;
        }

        return join('', $strArr);
    }
}

if (!function_exists("insertK")) {
    /**
     * @param $count
     * @param $delay
     * @return int
     */
    function insertK($count, $delay)
    {
        $insertk = rand(0, $count);
        if (in_array($insertk, $delay)) {
            $insertk = insertK($count, $delay);
        }
        return $insertk;
    }
}

if (!function_exists("frc_sanitize_text")) {
    /**
     * Function to sanitize $_REQUEST data
     * @param $key
     * @param string $default
     * @param bool $sanitize
     * @return array|mixed|string
     */
    function frc_sanitize_text($key, $default = '', $sanitize = true)
    {

        if (isset($_REQUEST[$key]) && !empty($_REQUEST[$key])) {
            $out = stripslashes_deep($_REQUEST[$key]);
            if ($sanitize) {
                $out = sanitize_text_field($out);
            }
            return $out;
        }

        return $default;
    }
}

if (!function_exists("frc_sanitize_array")) {
    /**
     * Function to sanitize strings within $_REQUEST data arrays
     * @param $key
     * @param string $type
     * @return array
     */
    function frc_sanitize_array( $key, $type = 'integer' ) {
        if ( isset($_REQUEST[ $key ]) && ! empty( $_REQUEST[ $key ] ) ) {

            $arr = $_REQUEST[ $key ];

            if ( ! is_array( $arr ) ) {
                return [];
            }

            if ( 'integer' === $type ) {
                return array_map( 'absint', $arr );
            } else { // strings
                $new_array = array();
                foreach ( $arr as $val ) {
                    $new_array[] = sanitize_text_field( $val );
                }
            }

            return $new_array;
        }

        return [];
    }
}