# Http
HTTP 请求类, 支持 CURL 和 Socket, 默认使用 CURL , 当手动指定seCurl 或者 curl 扩展没有安装时, 会使用 Socket目前支持 get 和 post 两种请求方式
,修改用于QueryList(http://querylist.cc )

## Install
```
composer require jaeger/http
```
## Examples 
```php
use QL\Ext\Lib\Http;
```
1. 基本 get 请求: 
```php
    $http = new Http();         // 实例化对象
    $result =  $http->get('http://weibo.com/at/comment');
```

2. 基本 post 请求: 
```php
    $http = new Http();         // 实例化对象
    $result = $http->post('http://someurl.com/post-new-article',array('title'=>$title, 'body'=>$body) );
```
    
3. 模拟登录 ( post 和 get 同时使用, 利用 cookie 存储状态 ) : 
```php
    $http = new Http();         // 实例化对象
    $http->setCookiepath(substr(md5($username), 0, 10));        // 设置 cookie, 如果是多个用户请求的话
    // 提交 post 数据
    $loginData = $http->post('http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.3.19)', array('username'=>$username, 'loginPass'=>$password) );
    $result =  $http->get('http://weibo.com/at/comment');
    
```
    
4. 利用 initialize 函数设置多个 config 信息
```php
    $httpConfig['method']     = 'GET';
    $httpConfig['target']     = 'http://www.somedomain.com/index.html';
    $httpConfig['referrer']   = 'http://www.somedomain.com';
    $httpConfig['user_agent'] = 'My Crawler';
    $httpConfig['timeout']    = '30';
    $httpConfig['params']     = array('var1' => 'testvalue', 'var2' => 'somevalue');
    
    $http = new Http();
    $http->initialize($httpConfig);
    $http->execute();
    $result = $http->result;
```

5. 复杂的设置: 
```php
    $http = new Http();
    $http->useCurl(false);      // 不使用 curl
    $http->setMethod('POST');       // 使用 POST method
    
    // 设置 POST 数据
    $http->addParam('user_name' , 'yourusername');
    $http->addParam('password'  , 'yourpassword');
    
    // Referrer
    $http->setReferrer('https://yourproject.projectpath.com/login');
    
    // 开始执行请求
    $http->execute('https://yourproject.projectpath.com/login/authenticate');
    $result = $http->getResult();
```

6. 获取开启了 basic auth 的请求
```php
    $http = new Http();
    
    // Set HTTP basic authentication realms
    $http->setAuth('yourusername', 'yourpassword');
    
    // 获取某个被保护的应用的 feed
    $http->get('http://www.someblog.com/protected/feed.xml');
    
    $result = $http->result;
```



