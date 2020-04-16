<?php
/**
 * Copyright (c) 2018-2020 Fat Rat Collect . All rights reserved.
 * 胖鼠采集 WordPress最好用的采集插件.
 * 如果你觉得这个项目还不错.可以去Github上 Star 关注我.
 * 您可使用胖鼠采集自行二次开发满足您的个性化需求.
 * 请不要Copy, Rename. OR 修改源代码进行售卖获利.
 * Github: https://github.com/fbtopcn/fatratcollect
 * @Author: fbtopcn
 * @CreateTime: 2020年4月1日
 */

class FRC_Validation {

    private $url = 'https://www.fatrat.cn';

    const FRC_INSERT_TIME = 'frc_install_time';
    const FRC_VALIDATION_FEATURED_PICTURE = 'frc_validation_featured_picture';
    const FRC_VALIDATION_DYNAMIC_FIELDS = 'frc_validation_dynamic_fields';
    const FRC_VALIDATION_AUTO_TAGS = 'frc_validation_auto_tags';
    const FRC_VALIDATION_INNER_CHAIN = 'frc_validation_inner_chain';
    const FRC_VALIDATION_ALL_COLLECT = 'frc_validation_all_collect';
    const FRC_VALIDATION_RENDERING = 'frc_validation_rendering';
    const FRC_VALIDATION_NOTICE = 'frc_validation_notice';
    const FRC_VALIDATION_SPONSORSHIP = 'frc_validation_sponsorship';
    const FRC_VALIDATION_DEBUG_COUNT = 'frc_validation_debug_count';
    const FRC_DEBUG_INFO_PROMPT = [
        '胖' => '亲爱的鼠友, 你好! 你可继续使用胖鼠采集, 但是debugging功能, 剩余次数已消耗殆尽.',
        '鼠' => '如果您需要继续使用debugging功能，可以有两个选项继续使用胖鼠采集debugging功能',
        '采' => ' ①打开debugging页面滑动到底部,点击其他赞助鼠留下的链接, 浏览一下赞助鼠的站点, 为他踩一踩. 留个下可爱的ip, 之后即可获得5次debug剩余次数.',
        '集' => ' ②真诚的希望您赞助支持一下胖鼠采集, 开源是一种态度, 赞助是一种美德. ',
        'FarRatCollect' => '胖鼠采集的持续发展全靠您的支持. 在此非常感谢. 赞助详细请查看debugging页面底部赞助链接.',
    ];

    private $shutdownJson;

    public function __construct()
    {
        $this->shutdownJson = json_encode(['switch' => 'shutdown', 'created_at' => current_time('mysql'), 'updated_at' => current_time('mysql')]);
    }

    public function validation_activation(){
        $action = frc_sanitize_text('activation_action');
        $code = frc_sanitize_text('activation_code');
        $data = $this->validation_request('/validation/activation.json');

        if (isset($data)){
            $data = json_decode($data);
            if ($data->$action->code == $code){
                switch ($action){
                    case 'auto-tags':
                        add_option(self::FRC_VALIDATION_AUTO_TAGS, $this->shutdownJson );
                        break;
                    case 'inner-chain':
                        add_option(self::FRC_VALIDATION_INNER_CHAIN, $this->shutdownJson );
                        break;
                    case 'featured-picture':
                        add_option(self::FRC_VALIDATION_FEATURED_PICTURE, $this->shutdownJson );
                        break;
                    case 'dynamic-fields':
                        add_option(self::FRC_VALIDATION_DYNAMIC_FIELDS, $this->shutdownJson );
                        break;
                    case 'all-collect':
                        add_option(self::FRC_VALIDATION_ALL_COLLECT, $this->shutdownJson );
                        break;
                    case 'rendering':
                        add_option(self::FRC_VALIDATION_RENDERING, $this->shutdownJson );
                        break;
                    default:
                }
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '恭喜尊贵的小鼠同学, 验证成功le.'];
            } else {
                return ['code' => FRC_Api_Error::KEYWORD_CHECK_FAIL, 'msg' => isset($data->$action->msg) ? $data->$action->msg : '验证失败.'];
            }
        } else {
            return ['code' => FRC_Api_Error::CHECK_SERVER_FAIL, 'msg' => '网络错误, 请重试. '];
        }
    }

    public function validation_function_switch(){
        switch (frc_sanitize_text('switch_action')){
            case 'auto-tags':
                $res = $this->update_switch(self::FRC_VALIDATION_AUTO_TAGS);
                break;
            case 'inner-chain':
                $res = $this->update_switch(self::FRC_VALIDATION_INNER_CHAIN);
                break;
            case 'featured-picture':
                $res = $this->update_switch(self::FRC_VALIDATION_FEATURED_PICTURE);
                break;
            case 'dynamic-fields':
                $res = $this->update_switch(self::FRC_VALIDATION_DYNAMIC_FIELDS);
                break;
            default:
                $res = null;
        }

        if ($res){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '操作状态成功le.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '操作状态失败le.'];
        }
    }

    public function update_switch($action){
        $result = get_option($action);
        if (empty($result)){
            return false;
        }
        $option = json_decode($result, true);
        $option['switch'] = ($option['switch'] == 'open') ? 'shutdown' : 'open';
        return update_option($action, json_encode($option));
    }

    public function validation_auto_tags_switch(){
        $option = get_option(self::FRC_VALIDATION_AUTO_TAGS);
        $option = json_decode($option, true);
        $option['switch'] = ($option['switch'] == 'open') ? 'shutdown' : 'open';
        $option = json_encode($option);
        if (update_option(self::FRC_VALIDATION_AUTO_TAGS, $option)){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '操作成功le.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '操作失败le.'];
        }
    }

    public function validation_dynamic_fields_switch(){

        $option = get_option(self::FRC_VALIDATION_DYNAMIC_FIELDS);
        $option = json_decode($option, true);
        $option['switch'] = ($option['switch'] == 'open') ? 'shutdown' : 'open';
        $option = json_encode($option);
        if (update_option(self::FRC_VALIDATION_DYNAMIC_FIELDS, $option)){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '操作成功le.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '操作失败le.'];
        }
    }

    public function validation_debugging_top_up(){
        if (update_option(self::FRC_VALIDATION_DEBUG_COUNT, get_option(self::FRC_VALIDATION_DEBUG_COUNT, '0')+3)){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => 'debug充值成功3次.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '充值失败.'];
        }
    }

    public function notice(){
        try{
            $notice = $this->validation_request('/validation/notice.json');
            update_option(self::FRC_VALIDATION_NOTICE, $notice);
        } catch (\GuzzleHttp\Exception\RequestException $e){
            delete_option(self::FRC_VALIDATION_NOTICE);
        }
    }

    public function announcement($location = 'notice-home'){
        try{
            $notice = get_option(self::FRC_VALIDATION_NOTICE);
            $notice = json_decode($notice);
            if (isset($notice->$location)){
                if ($notice->$location->type == 'link'){
                    return sprintf($notice->$location->string, '<a href="'.$notice->$location->link.'" target="_blank">'.$notice->$location->title.'</a>');
                } else {
                    return $notice->$location->string;
                }
            }
        } catch (\GuzzleHttp\Exception\RequestException $e){
            return '';
        }

        return '';
    }

    public function appreciates(){
        $notice = get_option(self::FRC_VALIDATION_NOTICE);
        $notice = json_decode($notice);
        if (isset($notice->appreciates)){
            return $notice->appreciates;
        }

        return [];
    }

    private function validation_request($url){
        return (new \GuzzleHttp\Client())->request('get', $this->url.$url, ['verify' => false, 'connect_timeout' => 1])->getBody()->getContents();
    }
}