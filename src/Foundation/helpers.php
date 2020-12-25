<?php

if (!function_exists("translationRules")) {
    /**
     * @param $rules
     * @return array
     */
    function translationRules($rules): array
    {
        $array = [];
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
     * @param $afterColumn
     * @param $table
     */
    function frcAddColumn($column, $afterColumn, $table): void
    {
        dd(getDb());
        global $wpdb;
        //Check for Exclude Image Path
        $checkColumn = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = %s ",
            DB_NAME, $table, $column
        )) ;
        if ( empty( $checkColumn ) ) {
            $alterSql = "ALTER TABLE `$table` ADD `{$column}` tinyint(2) NOT NULL DEFAULT 1 AFTER `{$afterColumn}`";
            $wpdb->query($alterSql);
        }
    }
}

if (!function_exists("getDb")) {
    /**
     *
     */
    function getDb()
    {
        global $wpdb;

        return $wpdb;
    }
}