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
        $response = wp_remote_get($url, [
            'timeout' => 10,
            'user-agent' => 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1',
            'user-sslverify' => false,
        ]);
        $encode = mb_detect_encoding($response['body'], array("ASCII", "UTF-8", "GB2312", "GBK", "BIG5"));
        $html = iconv($encode, "utf-8", $response['body']);
        $ql->setHtml($html);
        return $ql;
    }
}