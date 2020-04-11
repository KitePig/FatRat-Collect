<?php
/**
 * Created by PhpStorm.
 * User: Jaeger <JaegerCode@gmail.com>
 * Date: 19/1/15
 * Use Puppeteer to crawl Javascript dynamically rendered pages.
 */

namespace QL\Ext;


use Nesk\Rialto\Data\JsFunction;
use QL\Contracts\PluginContract;
use QL\QueryList;
use Nesk\Puphpeteer\Puppeteer;
use Closure;

class Chrome implements PluginContract
{
    public static function install(QueryList $queryList, ...$opt)
    {
        $name = $opt[0] ?? 'chrome';
        $queryList->bind($name,function ($url,$options = []) {
            return Chrome::render($this,$url,$options);
        });
    }

    public static function render(QueryList $queryList,$url,$options)
    {
        $options = self::mergeOptions($options);
        $puppeteer = new Puppeteer;
        $browser = $puppeteer->launch($options);
        $page = $browser->newPage();

        if($url instanceof Closure){
            $html = $url($page,$browser);
        }else{
            $page->setRequestInterception(true);
            $page->on('request',
                JsFunction::createWithParameters(['request'])
                    ->body("if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }")
            );
            $page->goto($url);
            $html = $page->content();
            $browser->close();
        }
        $queryList->setHtml($html);
        return $queryList;
    }

    protected static function mergeOptions($option)
    {
        $defalutOptions = [
            'ignoreHTTPSErrors' => true,
        ];
        return array_merge($defalutOptions,$option);
    }
}