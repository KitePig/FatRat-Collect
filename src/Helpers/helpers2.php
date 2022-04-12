<?php

if (!function_exists("randomInsertString")) {
    /**
     * @param $txt
     * @param $insert
     * @return string
     */
    function randomInsertString($txt, $insert): string
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
    function insertK($count, $delay): int
    {
        $insertk = rand(0, $count);
        if (in_array($insertk, $delay)) {
            $insertk = insertK($count, $delay);
        }
        return $insertk;
    }
}