<?php
namespace QL\Ext;

/**
 * @Author: Jaeger <hj.q@qq.com>
 * @Date:   2015-07-15 23:27:52
 * @Last Modified by:   Jaeger
 * @Last Modified time: 2016-07-09 00:45:08
 * @version         1.1.1
 * 图片下载扩展
 */

use phpQuery;

class DImage extends AQuery
{
    private $attr;

    public function run(array $args)
    {
        $args = array_merge(array(
            'image_path' => '/images',
            'base_url' => '',
            'attr' => array('src'),
            'callback' => null
            ),$args);
        $doc = phpQuery::newDocumentHTML($args['content']);
        $http = $this->getInstance('QL\Ext\Lib\Http');
        $imgs = pq($doc)->find('img');
        foreach ($imgs as $img) {
            $src = $this->getSrc($img,$args);
            $localSrc = rtrim($args['image_path'],'/').'/'.$this->makeFileName($src);
            $savePath = rtrim($args['www_root'],'/').'/'.ltrim($localSrc,'/');
            $this->mkdirs(dirname($savePath));
            $stream = $http->get($src);
            file_put_contents($savePath,$stream);
            pq($img)->attr($this->attr,$localSrc);
            $args['callback'] && $args['callback'](pq($img));
        }
        return $doc->htmlOuter();
    }

    function mkdirs($dir)
    {
        if(!is_dir($dir))
        {
            if(!$this->mkdirs(dirname($dir))){
                return false;
            }
            if(!mkdir($dir,0777)){
                return false;
            }
        }
        return true;
    }

    public function makeFileName($src)
    {
        return md5($src).'.'.pathinfo($src, PATHINFO_EXTENSION);
    }

    public function getSrc($img,$args)
    {
        $src = $args['base_url'];
        is_string($args['attr']) && $args['attr'] = array($args['attr']);
        foreach ($args['attr'] as $attr) {
            $val = pq($img)->attr($attr);
            if(!empty($val)){
                $this->attr = $attr;
                $src .= $val;
                break;
            }
        }
        return $src;
    }
}