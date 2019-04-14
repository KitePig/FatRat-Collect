<?php
/**
 * Copyright (c) 2018 Fat Rat Collect . All rights reserved.
 * 胖鼠采集要做wordpress最好用的采集器.
 * 如果你觉得我写的还不错.可以去Github上 Star
 * 现在架子已经有了.欢迎大牛加入开发.一起丰富胖鼠的功能
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2018年12月30日 02:24
 */

/**
 * Class FRC_Api_Error
 * 没时间有空再整把
 */
class FRC_Api_Error
{
    // TODO 目前只用了 SUCCESS FAIL  抽空完善

    /**
     * 业务常量
     */
    const BUTTON_DISABLED     = ['微信', '简书'];
    const FRC_TIPS     = [
        '小提示: 写采集规则的时候, 如果页面最后一个div是广告,你可以这么写 -div:last 即可删除内容中最后一个 div 删除第一个 -div:first 同样适用于其他标签哦 =_=!',
        '小提示: 列表采集 是通过列表页拿到一批详情的地址, 然后批量采集详情页面数据。详情采集是直接采集文章详情页面喔 =_=!',
        '小提示: 大家可在胖鼠Q群联系作者, 提出更好的胖鼠改进计划, 好思路有奖喔 =_=!',
        '小提示: 规则配置页采集区域? 是指你具体要采集这个页面的哪一块内容, 你要采集的内容必须包含在采集区域内哦 =_=!',
        '小提示: 规则详情配置为什么没有采集地址这一栏? 答:因为详情配置是单篇文章配置, 把采集地址拎出来更有效帮助你批量采集哦 =_=!',
        '小提示: 使用DEBUG的时候, 大家一定要把 Link Title Content 三个字段全部debug成功之后再保存哦, 有助于提高成功率 =_=!',
    ];

    /**
     * 基本错误类型
     */
    const SUCCESS       = 200;
    const FAIL          = 0;
    const ERR_PARAM     = -100;

    /**
     * Validation
     * @var array
     */
    const CHECK_SERVER_FAIL = -4000;
    const KEYWORD_CHECK_FAIL = -4001;


    private static $_errMsg = [
        // 基础错误
        self::SUCCESS       => ['成功', 'success'],
        self::FAIL          => ['失败', 'fail'],
        self::ERR_PARAM     => ['参数错误', 'parameter is error'],

        // Validation
        self::CHECK_SERVER_FAIL => ['验证服务器异常', 'check server is error'],
        self::KEYWORD_CHECK_FAIL => ['口令错误', 'keyword is error'],
    ];


    public static function msg($errno, $lang = 'en')
    {
        $lang = 'zh' === $lang ? 0 : 1;
        return self::$_errMsg[$errno][$lang];
    }

}
