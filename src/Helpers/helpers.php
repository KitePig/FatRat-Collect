<?php

if (!function_exists("startsWith")) {
    /**
     * Determine if a given string starts with a given substring.
     *
     * @param string $haystack
     * @param string|string[] $needles
     * @return bool
     */
    function startsWith(string $haystack, $needles): bool
    {
        foreach ((array)$needles as $needle) {
            if ((string)$needle !== '' && str_starts_with($haystack, $needle)) {
                return true;
            }
        }

        return false;
    }
}

if (!function_exists("frc_sanitize_text")) {
    /**
     * Function to sanitize $_REQUEST data
     * @param string $key
     * @param ?string $default
     * @return ?string
     */
    function frc_sanitize_text(string $key, ?string $default = ''): ?string
    {
        if (isset($_REQUEST[$key]) && !empty($_REQUEST[$key])) {
            return sanitize_text_field($_REQUEST[$key]);
        }

        return $default;
    }
}

if (!function_exists("frc_sanitize_textarea")) {
    /**
     * Function to sanitize $_REQUEST data
     * @param string $key
     * @param ?string $default
     * @return ?string
     */
    function frc_sanitize_textarea(string $key, ?string $default = ''): ?string
    {
        if (isset($_REQUEST[$key]) && !empty($_REQUEST[$key])) {
            return sanitize_textarea_field(htmlspecialchars($_REQUEST[$key]));
        }

        return $default;
    }
}

if (!function_exists("frc_sanitize_array")) {
    /**
     * Function to sanitize strings within $_REQUEST data arrays
     * @param string $key
     * @param string $type
     * @return array
     */
    function frc_sanitize_array(string $key, string $type = 'integer' ): array
    {
        if ( isset($_REQUEST[ $key ]) && ! empty( $_REQUEST[ $key ] ) ) {

            if ( ! is_array( $_REQUEST[ $key ] ) ) {
                return [];
            }

            if ( 'integer' === $type ) {
                return array_map( 'absint', $_REQUEST[ $key ] );
            } else { // strings
                $array = array();
                foreach ( $_REQUEST[ $key ] as $val ) {
                    $array[] = sanitize_text_field( $val );
                }
                return $array;
            }
        }

        return [];
    }
}

if (!function_exists("frc_option_esc_attr_e")) {
    /**
     * @param $option
     * @param $key
     * @param string $default
     */
    function frc_option_esc_attr_e($option, $key, string $default = '')
    {
        if (isset($option) && isset($option[$key])) {
            esc_attr_e($option[$key]);
            return;
        }

        _e($default);
    }
}

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
    function getTable($table): string
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