<?php

namespace QL\Ext;

use QL\Contracts\PluginContract;
use QL\QueryList;

class DownloadImage implements PluginContract
{
    public static function install(QueryList $queryList, ...$opt)
    {
        $queryList->bind('downloadImage',function ($config) use ($queryList){
            return DownloadImage::downloadAll($queryList, $config);
        });

    }

    public static function downloadAll($ql, $config)
    {
        if ($config->image_download == 3){
             $ql->find('img')->remove();
             return $ql;
        }

        $ql->find('img')->map(function($item) use ($ql, $config){
            $imageUrl = $item->attr($config->src);
            if (empty($imageUrl)){ return $item; }
            $imageUrl = AbsoluteUrl::urlFormat($imageUrl, $config->url);

            if ($config->image_download == 2){
                $item->removeAttr('*');;
                $item->attr('src', $imageUrl);
            } else {
                try {
                    $name = 'frc-' . md5($imageUrl) . DownloadImage::suffix($imageUrl);
                    $imageUrlPath = wp_upload_dir()['path'] . DIRECTORY_SEPARATOR . $name; // 实际路径用 DIRECTORY_SEPARATOR
                    if (!file_exists($imageUrlPath)){
                        $http = new \GuzzleHttp\Client();
                        $data = $http->request('get', $imageUrl, ['verify' => false])->getBody()->getContents();
                        file_put_contents($imageUrlPath, $data);
                    }

                    if ($config->image_path == 1){
                        $imageUrlWeb = wp_upload_dir()['url'] . '/' . $name; // 拼接必须用 /
                    } else {
                        $imageUrlWeb = '/wp-content/uploads' . wp_upload_dir()['subdir'] . '/' . $name;
                    }

                    $item->removeAttr('*');
                    $item->attr('src', $imageUrlWeb);
                    $item->attr('class', 'aligncenter'); // 晋中
                } catch (\Exception $e) {

                }
            }

            return $item;
        });

        return $ql;
    }

    public static function suffix($path){

        $suffix = '.jpg'; // 默认一个值
        if (in_array(strtolower(strrchr($path, '.')), ['.jpg', '.png', '.jpeg', '.gif', '.swf'])) {
            $suffix = strrchr($path, '.');
        } else {
            switch (getimagesize($path)[2]) {
                case IMAGETYPE_GIF:
                    $suffix = '.gif';
                    break;
                case IMAGETYPE_JPEG:
                    $suffix = '.jpeg';
                    break;
                case IMAGETYPE_PNG:
                    $suffix = '.png';
                    break;
                case IMAGETYPE_SWF:
                    $suffix = '.swf';
                    break;
            }
        }

        return $suffix;
    }

}