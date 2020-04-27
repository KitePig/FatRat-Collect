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

    private $url = 'https://api.fatrat.cn';

    const FRC_API_CODE = '20';
    const FRC_INSERT_TIME = 'frc_install_time';
    const FRC_VALIDATION_NOTICE = 'frc_validation_notice';
    const FRC_VALIDATION_FEATURED_PICTURE = 'frc_validation_featured_picture';
    const FRC_VALIDATION_DYNAMIC_FIELDS = 'frc_validation_dynamic_fields';
    const FRC_VALIDATION_CATEGORY_AUTHOR = 'frc_validation_category_author';
    const FRC_VALIDATION_AUTO_TAGS = 'frc_validation_auto_tags';
    const FRC_VALIDATION_INNER_CHAIN = 'frc_validation_inner_chain';
    const FRC_VALIDATION_ALL_COLLECT = 'frc_validation_all_collect';
    const FRC_VALIDATION_RENDERING = 'frc_validation_rendering';
    const FRC_VALIDATION_SPONSORSHIP = 'frc_validation_sponsorship';
    const FRC_VALIDATION_DEBUG_COUNT = 'frc_validation_debug_count';
    const FRC_VALIDATION_DEBUG_RECHARGE = 'frc_validation_debug_recharge';
    const FRC_VALIDATION_ABILITY_MAP = [
        'auto-tags' => [self::FRC_VALIDATION_AUTO_TAGS, '2'],
        'inner-chain' => [self::FRC_VALIDATION_INNER_CHAIN, '2'],
        'featured-picture' => [self::FRC_VALIDATION_FEATURED_PICTURE, '2'],
        'dynamic-fields' => [self::FRC_VALIDATION_DYNAMIC_FIELDS, '2'],
        'all-collect' => [self::FRC_VALIDATION_ALL_COLLECT, '1'],
        'rendering' => [self::FRC_VALIDATION_RENDERING, '1'],
        'debugging' => [self::FRC_VALIDATION_SPONSORSHIP, 'sponsorship'],
        'category-author' => [self::FRC_VALIDATION_CATEGORY_AUTHOR, '1'],
    ];
    const FRC_DEBUG_INFO_PROMPT = [
        '胖' => '鼠友好! 你可继续使用胖鼠采集, 您的debugging调试功能剩余次数已消耗殆尽.',
        '鼠' => '如果您需要继续使用调试功能，可以有两个选项继续使用。',
        '采' => ' ①点击debugging页面滑动到底部, 点击其他赞助鼠留下的链接, 浏览一下赞助鼠的站点, 为他踩一踩. 留个下可爱的ip, 即可获得1次debugging剩余次数.',
        '集' => ' ②真诚的希望赞助支持一下胖鼠采集, 开源是一种态度, 赞助是一种美德. ',
        'FarRatCollect' => '插件持续发展需要您的帮助. 在此非常感谢. .',
    ];
    const FRC_HINT_A = '感谢鼠友%s的赞助, %s为您充值%s次, 您剩余 %s 次';
    const FRC_HINT_B = '咣咣咣, 人品大爆发, 感谢鼠友%s为您带来翻倍奖励, %s本次为您充值%s次, 您剩余 %s 次';
    const FRC_HINT_C = '赞助鼠半小时只能为您支持一次哦.';
    const FRC_HINT_D = '鼠友你好, 感谢您的赞助支持, 胖鼠采集因您更美好.';
    const FRC_HINT_E = 'debugging功能剩余次数(%s)次';
    const FRC_HINT_F = '避免占用鼠们系统资源, 特设置采集页码不可大于两页, 赞助鼠可无视限制';
    const FRC_HINT_G = '操作状态成功le.';

    private $shutdownJson;
    private $openJson;


    public function __construct()
    {
        $this->shutdownJson = json_encode(['switch' => 'shutdown', 'created_at' => current_time('mysql'), 'updated_at' => current_time('mysql')]);
        $this->openJson = json_encode(['switch' => 'open', 'created_at' => current_time('mysql'), 'updated_at' => current_time('mysql')]);
    }


    public function validation_function_switch(){
        if ($this->update_switch(self::FRC_VALIDATION_ABILITY_MAP[frc_sanitize_text('switch_action')][0])){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => self::FRC_HINT_G];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => 'Fail.'];
        }
    }


    public function validation_activation(){
        $action = frc_sanitize_text('activation_action');
        $data = $this->validation_request('/validation', ['action' => $action], 5);

        if (isset($data)) {
            $data = json_decode($data);
            if ($data->code == self::FRC_API_CODE) {
                $config = self::FRC_VALIDATION_ABILITY_MAP[$action];
                switch ($config[1]){
                    case '1':
                        $config[1] = $this->openJson;
                        break;
                    case '2':
                        $config[1] = $this->shutdownJson;
                        break;
                }
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => $data->msg, 'data' => add_option($config[0], $config[1])];
            } else {
                return ['code' => FRC_Api_Error::NO_PERMISSION, 'msg' => isset($data->msg) ? $data->msg : '验证失败.'];
            }
        } else {
            return ['code' => FRC_Api_Error::CHECK_SERVER_FAIL, 'msg' => '网络错误, 请重试. '];
        }
    }


    public function validation_correction(){
        $data = $this->validation_request('/validation/ability', ['ability' => array_keys(self::FRC_VALIDATION_ABILITY_MAP)], 1);
        if (isset($data)) {
            $data = json_decode($data);
            if ($data->code == self::FRC_API_CODE) {
                foreach ($data->data as $ability => $val){
                    if ($val === false){
                        delete_option(self::FRC_VALIDATION_ABILITY_MAP[$ability][0]);
                    }
                }
            }
        }
        return ;
    }


    protected function update_switch($action){
        $result = get_option($action);
        if (empty($result)){
            return false;
        }
        $option = json_decode($result, true);
        $option['switch'] = ($option['switch'] == 'open') ? 'shutdown' : 'open';
        return update_option($action, json_encode($option));
    }


    public function validation_debugging_top_up(){
        $recharge_time = get_option(self::FRC_VALIDATION_DEBUG_RECHARGE, '');
        if (empty($recharge_time) || (time() - $recharge_time) > 1800){
            $debug_count = get_option(self::FRC_VALIDATION_DEBUG_COUNT, '0');
            $count = 1;
            $good_fortune = substr($recharge_time, -1);
            if ($good_fortune === '6') {$count = 6;}
            $debug_count = $debug_count+$count;
            if (update_option(self::FRC_VALIDATION_DEBUG_COUNT, $debug_count)){
                update_option(self::FRC_VALIDATION_DEBUG_RECHARGE, time());
                $appreciates = $this->appreciates();
                $people = $appreciates[array_rand($appreciates)];
                $msg = sprintf(self::FRC_HINT_A, $people->people, $people->people, $count, $debug_count);
                if ($count != 1){
                    $msg = sprintf(self::FRC_HINT_B, $people->people, $people->people, $count, $debug_count);
                }
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => $msg];
            } else {
                return ['code' => FRC_Api_Error::FAIL, 'msg' => '失败.'];
            }
        }

        return ['code' => FRC_Api_Error::FAIL, 'msg' => self::FRC_HINT_C];
    }

    public function notice(){
        try{
            $notice = $this->validation_request_static('/static/notice.json');
            update_option(self::FRC_VALIDATION_NOTICE, $notice);
        } catch (\GuzzleHttp\Exception\RequestException $e){
            delete_option(self::FRC_VALIDATION_NOTICE);
        }
    }

    public static function increase_balance($balance = '10'){
        add_option( FRC_Validation::FRC_VALIDATION_DEBUG_COUNT, $balance );
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

    private function validation_request_static($path, $timeout = 1){
        return (new \GuzzleHttp\Client())->request('get', $this->url.$path, ['verify' => false, 'connect_timeout' => $timeout])->getBody()->getContents();
    }

    private function validation_request($uri, $query = [], $timeout = 1){
        try{
            $query['host'] = site_url();
            return (new \GuzzleHttp\Client())->request('post', $this->url.$uri, ['verify' => false, 'connect_timeout' => $timeout, 'form_params' => $query])->getBody()->getContents();
        } catch (\Exception $e) {
            return false;
        }
    }
}