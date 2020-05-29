<?php

namespace QL\Ext;

use QL\Contracts\PluginContract;
use QL\QueryList;

class GetTransCoding implements PluginContract
{
    public static function install(QueryList $queryList, ...$opt)
    {
        $queryList->bind('getTransCoding',function ($url) use ($queryList){
            return GetTransCoding::getTransCoding($queryList, $url);
        });

    }

    public static function getTransCoding(QueryList $ql, $url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT,10);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $html = curl_exec($ch);
        curl_close($ch);
        $encode = mb_detect_encoding($html, array("ASCII","UTF-8","GB2312","GBK","BIG5"));
        $html = iconv($encode,"utf-8", $html);
        $ql->setHtml($html);
        return $ql;
    }
}