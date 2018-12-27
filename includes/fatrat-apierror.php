<?php

/**
 * Class FRC_Api_Error
 * 没时间有空再整把
 */
class FRC_Api_Error
{

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
