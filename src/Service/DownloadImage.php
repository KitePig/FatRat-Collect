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
                // image_download = 1/4
                try {
                    $name = 'frc-' . md5($imageUrl) . DownloadImage::suffix($imageUrl);
                    $wp_upload_dir = wp_upload_dir();
                    $wp_upload_dir_path = $wp_upload_dir['path'];
                    if ($config->image_path == 1){
                        $imageUrlPath = $wp_upload_dir_path . DIRECTORY_SEPARATOR . $name; // 实际路径用 DIRECTORY_SEPARATOR
                        $imageUrlWeb = $wp_upload_dir['url'] . '/' . $name; // 拼接必须用 /
                    } else {
                        // 本地存储图片，开启oss会覆盖配置, 需要用default
                        $wp_upload_web_url = $wp_upload_dir['url'];
                        if (isset($wp_upload_dir['default']['path'])){
                            $wp_upload_dir_path = $wp_upload_dir['default']['path'];
                            $wp_upload_web_url = $wp_upload_dir['default']['url'];
                        }
                        $imageUrlPath = $wp_upload_dir_path . DIRECTORY_SEPARATOR . $name; // 实际路径用 DIRECTORY_SEPARATOR
                        $imageUrlWeb = str_replace(site_url(), '', $wp_upload_web_url) . '/' . $name;
                        // $imageUrlWeb = strstr($wp_upload_dir_path, '/wp-content/') . '/' . $name; 解决目录非 wp-admin 使用本地图片问题
                    }

                    if (!file_exists($imageUrlPath)){
                        $http = new \GuzzleHttp\Client();
                        $data = $http->request('get', $imageUrl, ['verify' => false])->getBody()->getContents();
                        file_put_contents($imageUrlPath, $data);
                    }

                    $item->removeAttr('*');
                    $item->attr('src', $imageUrlWeb);
                } catch (\Exception $e) {
                    // 失败掠过.
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