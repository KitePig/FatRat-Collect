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