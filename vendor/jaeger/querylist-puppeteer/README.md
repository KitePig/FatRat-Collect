# QueryList-Puppeteer
QueryList插件: 使用Puppeteer采集JavaScript动态渲染的页面。使用此插件需要有一定的Node.js基础知识，并且会配置Node运行环境。

此插件是基于`PuPHPeteer`包的简单封装，支持使用Puppeteer所有的API，非常强大!

> PuPHPeteer: https://github.com/nesk/puphpeteer
>
> Puppeteer: https://github.com/GoogleChrome/puppeteer
>
> QueryList: https://github.com/jae-jae/QueryList

## 环境要求
- PHP >= 7.1
- Node >= 8

## 安装
安装插件
```
composer require jaeger/querylist-puppeteer
```
安装Node依赖（与composer一样在项目根目录下执行）
```
npm install @nesk/puphpeteer
```

## 插件注册选项
QueryList::use(Chrome::class,$opt1)
- **$opt1**: 设置`chrome`函数别名

## API
- chrome($url, $options = []) 使用Chrome打开链接，返回值为设置好HTML的QueryList对象

## 用法

在QueryList中注册插件
```php
use QL\QueryList;
use QL\Ext\Chrome;

$ql = QueryList::getInstance();
// 注册插件，默认注册的方法名为: chrome
$ql->use(Chrome::class);
// 或者自定义注册的方法名
$ql->use(Chrome::class,'chrome');
```

基本用法
```php
// 抓取的目标页面是使用Vue.js动态渲染的页面
$text = $ql->chrome('https://www.iviewui.com/components/button')->find('h1')->text();
print_r($text);
// 输出: Button 按钮
```

```php
$rules = [
 'h1' => ['h1','text']
];
$ql = $ql->chrome('https://www.iviewui.com/components/button');
$data = $ql->rules($rules)->queryData();
```

设置Puppeteer launch选项,选项文档：https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md#puppeteerlaunchoptions
```php
$text = $ql->chrome('https://www.iviewui.com/components/button',[
  'timeout' => 6000,
  'ignoreHTTPSErrors' => true,
  // ...
])->find('h1')->text();
```

更高级的用法,查看Puppeteer文档了解全部API: https://github.com/GoogleChrome/puppeteer
```php
$text = $ql->chrome(function ($page,$browser) {
    $page->setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
    // 设置cookie
    $page->setCookie([
      'name' => 'foo',
      'value' => 'xxx',
      'url' => 'https://www.iviewui.com'
    ],[
       'name' => 'foo2',
       'value' => 'yyy',
       'url' => 'https://www.iviewui.com'
    ]);
    $page->goto('https://www.iviewui.com/components/button');
    // 等待h1元素出现
    $page->waitFor('h1');
    // 获取页面HTML内容
    $html = $page->content();
    // 关闭浏览器
    $browser->close();
    // 返回值一定要是页面的HTML内容
    return $html;
})->find('h1')->text();
```
## 调试
调试有很多种方法，下面演示通过页面截图和启动可视化Chrome浏览器来了解页面加载情况

### 页面截图
运行下面代码后可以在项目根目录下看到`page.png`截图文件。
```php
$text = $ql->chrome(function ($page,$browser) {
    $page->goto('https://www.iviewui.com/components/button');
    // 页面截图
    $page->screenshot([
        'path' => 'page.png',
        'fullPage' => true
    ]);
    $html = $page->content();
    $browser->close();
    return $html;
})->find('h1')->text();
```

#### 启动可视化Chrome浏览器
运行下面代码后会启动一个Chrome浏览器。
```php
$text = $ql->chrome(function ($page,$browser) {
    $page->goto('https://www.iviewui.com/components/button');
    $html = $page->content();
    // 这里故意设置一个很长的延长时间，让你可以看到chrome浏览器的启动
    sleep(10000000);
    $browser->close();
    // 返回值一定要是页面的HTML内容
    return $html;
},[
 'headless' => false, // 启动可视化Chrome浏览器,方便调试
 'devtools' => true, // 打开浏览器的开发者工具
])->find('h1')->text();
```
