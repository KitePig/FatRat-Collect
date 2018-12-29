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
    const BUTTON_DISABLED     = ['微信'];

    /**
     * 基本错误类型
     */
    const SUCCESS       = 200;
    const FAIL          = 0;
    const ERR_PARAM     = -100;


    private static $_errMsg = [
        // 基础错误
        self::SUCCESS       => ['成功', 'success'],
        self::FAIL          => ['失败', 'fail'],
        self::ERR_PARAM     => ['参数错误', 'parameter is error'],
    ];


    public static function msg($errno, $lang = 'en')
    {
        $lang = 'zh' === $lang ? 0 : 1;
        return self::$_errMsg[$errno][$lang];
    }

}
