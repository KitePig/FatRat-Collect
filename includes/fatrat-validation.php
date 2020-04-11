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

    const FRC_INSERT_TIME = 'frc_install_time';
    const FRC_VALIDATION_FEATURED_PICTURE = 'frc_validation_featured_picture';
    const FRC_VALIDATION_DYNAMIC_FIELDS = 'frc_validation_dynamic_fields';
    const FRC_VALIDATION_AUTO_TAGS = 'frc_validation_auto_tags';
    const FRC_VALIDATION_INNER_CHAIN = 'frc_validation_inner_chain';

    private $url = 'https://www.fatrat.cn';

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

    public function announcement(){
        try{
            $data = $this->validation_request('/validation/announcement.json');
            if ($data = json_decode($data)) {
                return $data->announcement;
            }
        } catch (\GuzzleHttp\Exception\RequestException $e){
            return '';
        }
        return '';
    }

    private function validation_request($url){
        return (new \GuzzleHttp\Client())->request('get', $this->url.$url, ['verify' => false, 'connect_timeout' => 2])->getBody()->getContents();
    }
}