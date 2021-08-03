<?php

namespace QL\Ext;

use Illuminate\Support\Str;
use QL\Contracts\PluginContract;
use QL\QueryList;

class AbsoluteUrl implements PluginContract
{
    public static function install(QueryList $queryList, ...$opt)
    {
        $queryList->bind('absoluteUrl',function ($config) use ($queryList){
            return AbsoluteUrl::convertAll($queryList, $config);
        });

    }

    public static function convertAll($ql, $config)
    {
        $ql->find('a')->map(function($item) use ($ql, $config){
            $relativeUrl = $item->attr('href');
            $item->attr('href', AbsoluteUrl::urlFormat($relativeUrl, $config->url));
        });

        $ql->setHtml(htmlspecialchars_decode($ql->find('')->html()));
        return $ql;
    }

    public static function urlFormat($url, $domain){

        if (empty($url) || empty($domain)){
            return $url;
        }

        if (Str::startsWith($url, "http://") ||
            Str::startsWith($url, "https://")){
            return $url;
        }

        if (Str::startsWith($url, "//")){
            $domainFormat = parse_url($domain);

            return isset($domainFormat['scheme']) ? $domainFormat['scheme'].':'.$url : 'http:'.$url;
        }

        if (Str::startsWith($url, "#")){
            return '';
        }

        if (Str::startsWith($url, "./")){
	        return substr($domain, 0, strripos($domain, '/')) . ltrim($url, '.');
        }

        if (Str::startsWith($url, "../")){
            $base = substr($domain, 0, strripos($domain, '/'));
            $base = substr($base, 0, strripos($base, '/'));
            return $base . '/' . ltrim($url, '\.\./');
        }

        if (Str::startsWith($url, "/")){
            $domainFormat = parse_url($domain);

            return $domainFormat['scheme'].'://'.$domainFormat['host'].'/'.ltrim($url, '/');
        }

        return substr($domain, 0, strripos($domain, '/')) . '/' . ltrim($url, '/');
    }
}
