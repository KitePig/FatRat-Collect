<?php

use QL\QueryList;


class FatRatCrawl
{
    protected $crawl = [
        '17173' => 'http://news.17173.com/z/pvp/list/zxwz.shtml',
    ];

    public function crawl_run()
    {
        $data = $this->crawl_article_content('http://news.17173.com/z/pvp/content/12052018/144302767_1.shtml', 17173);
        var_dump($data);
        exit();

        foreach ($this->crawl as $platform => $url) {
            // 第一页列表
            $rt = $this->crawl_article_list($url, $platform);
            // 滤重

            // 详情
            foreach ($rt as $value){
                $rs = $this->crawl_article_content($value['link'], $platform);
                var_dump($rs);
                exit();
            }

        }
    }

    // 爬列表页
    public function crawl_article_list($url, $platform)
    {
        $rules = $range = null;
        switch ($platform) {
            case 17173:
                list($rules, $range) = $this->crawl_17173_list_rules();
                break;
            default:
                break;
        }

        if (!isset($rules) && !isset($range) && empty($url)){
            return false;
        }

        return QueryList::get($url)->rules($rules)->range($range)->queryData();
    }

    // 爬列内容
    public function crawl_article_content($url, $platform)
    {
        $rules = $range = null;
        switch ($platform) {
            case 17173:
                $rules = [
                    'title' => ['.gb-final-pn-article>h1', 'text'],
                    'content' => ['.gb-final-mod-article', 'html'],
                    'img' => ['.gb-final-mod-article>p>a>img', 'src'],
                ];
                break;
            default:
                break;
        }

        if (!isset($rules) && empty($url)){
            return false;
        }

        return QueryList::get($url)->rules($rules)->queryData();
    }

    private function crawl_17173_list_rules()
    {
        // 规则
        $rules = [
            'title' => ['h3>a', 'text'],
            'link' => ['a', 'href'],
            'image' => ['a>img', 'src'],
        ];
        // 切片选择器
        $range = '.list-item';

        return [$rules, $range];
    }

    private function crawl_17173_content($url)
    {
        $rules = [
            'title' => ['h3>a', 'text'],
            'link' => ['a', 'href'],
            'image' => ['a>img', 'src'],
        ];
        // 切片选择器
        $range = '.list-item';

        return [$rules, $range];
    }
}

function rat_spider()
{
    $crawl = new FatRatCrawl();
    $crawl->crawl_run();
}
