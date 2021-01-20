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

    const FRC_API_CODE = '20';
    const FRC_INSERT_TIME = 'frc_install_time';
    const FRC_VALIDATION_NOTICE = 'frc_validation_notice';
    const FRC_VALIDATION_FEATURED_PICTURE = 'frc_validation_featured_picture';
    const FRC_VALIDATION_DYNAMIC_FIELDS = 'frc_validation_dynamic_fields';
    const FRC_VALIDATION_AUTOMATIC_SAVE_PIC = 'frc_validation_automatic_save_pic';
    const FRC_VALIDATION_RELEASE_CONTROL = 'frc_validation_release_control';
    const FRC_VALIDATION_INSERT_KEYWORD = 'frc_validation_insert_keyword';
    const FRC_VALIDATION_AUTO_TAGS = 'frc_validation_auto_tags';
    const FRC_VALIDATION_INNER_CHAIN = 'frc_validation_inner_chain';
    const FRC_VALIDATION_ALL_COLLECT = 'frc_validation_all_collect';
    const FRC_VALIDATION_RENDERING = 'frc_validation_rendering';
    const FRC_VALIDATION_SPONSORSHIP = 'frc_validation_sponsorship';
    const FRC_VALIDATION_DEBUG_RECHARGE = 'frc_validation_debug_recharge';
    const FRC_API_CODE_PERMISSIONS = '44';
    const FRC_VALIDATION_ABILITY_MAP = [
        'auto-tags' => [self::FRC_VALIDATION_AUTO_TAGS, '2'],
        'inner-chain' => [self::FRC_VALIDATION_INNER_CHAIN, '2'],
        'featured-picture' => [self::FRC_VALIDATION_FEATURED_PICTURE, '2'],
        'dynamic-fields' => [self::FRC_VALIDATION_DYNAMIC_FIELDS, '2'],
        'all-collect' => [self::FRC_VALIDATION_ALL_COLLECT, '1'],
        'rendering' => [self::FRC_VALIDATION_RENDERING, '1'],
        'automatic-save-pic' => [self::FRC_VALIDATION_AUTOMATIC_SAVE_PIC, '1'],
        'sponsorship' => [self::FRC_VALIDATION_SPONSORSHIP, 'sponsorship'],
        'release-control' => [self::FRC_VALIDATION_RELEASE_CONTROL, '1'],
        'insert-keyword' => [self::FRC_VALIDATION_INSERT_KEYWORD, '2'],
    ];
    const FRC_HINT_A = '感谢鼠友%s的赞助, %s为您充值%s次, 您剩余 %s 次';
    const FRC_HINT_B = '咣咣咣, 人品大爆发, 感谢鼠友%s为您带来翻倍奖励, %s本次为您充值%s次, 您剩余 %s 次';
    const FRC_HINT_C = '赞助鼠半小时只能为您支持一次哦.';
    const FRC_HINT_D = '鼠友你好, 感谢您的赞助支持, 胖鼠采集因您更美好.';
    const FRC_HINT_E = 'debugging功能剩余次数(%s)次';
    const FRC_HINT_F = '分页采集占用系统资源, 单次采集页数不可大于3页, 赞助鼠友可以无限制哦';
    const FRC_HINT_G = '操作状态成功le.';
    const FRC_HINT_H = '您的debugging剩余次数太多了, 无需充值.';
    const FRC_HINT_J = '插件的发展需要您的支持, 感谢赞助.';
    const FRC_HINT_K = '网络连接失败, 请求超时, 如异常持续, 请联系胖鼠排查原因!';
    const FRC_HINT_L = '保存完成, 已为您贴心设置默认发布配置, 如需发布到指定的分类 请赞助支持, 开源不易感谢支持.';
    const FRC_HINT_Z = '非赞助鼠友最多可创建5个配置哦, 开源不易感谢支持';

    private $shutdownJson;
    private $openJson;

    public function __construct()
    {
        $this->shutdownJson = json_encode(['switch' => 'shutdown', 'created_at' => current_time('mysql'), 'updated_at' => current_time('mysql')]);
        $this->openJson = json_encode(['switch' => 'open', 'created_at' => current_time('mysql'), 'updated_at' => current_time('mysql')]);
    }


    public function validation_function_switch(){
        if ($this->update_switch(self::FRC_VALIDATION_ABILITY_MAP[frc_sanitize_text('switch_action')][0])){
            return ['code' => FRC_ApiError::SUCCESS, 'msg' => self::FRC_HINT_G];
        } else {
            return ['code' => FRC_ApiError::FAIL, 'msg' => 'Fail.'];
        }
    }


    public function validation_activation(){
        $action = frc_sanitize_text('activation_action');
        $data = $this->validation_request('/validation', ['action' => $action], 5);

        if (isset($data)) {
            $data = json_decode($data);
            if (!$this->checkAccessToken($data)){
                return ['code' => FRC_ApiError::ERR_TOKEN, 'msg' => FRC_ApiError::msg(FRC_ApiError::ERR_TOKEN)];
            }
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
                return ['code' => FRC_ApiError::SUCCESS, 'msg' => $data->msg, 'data' => add_option($config[0], $config[1])];
            } else {
                return ['code' => FRC_ApiError::NO_PERMISSION, 'msg' => isset($data->msg) ? $data->msg : '验证失败.'];
            }
        } else {
            return ['code' => FRC_ApiError::CHECK_SERVER_FAIL, 'msg' => '网络错误, 请重试. '];
        }
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

    public function validation_correction(){
        foreach (self::FRC_VALIDATION_ABILITY_MAP as $item){
            delete_option($item[0]);
        }
        delete_option('frc_cron_release');
        delete_option('frc_cron_spider');
    }

    public function notice(){
        try{
            $notice = $this->validation_request_static('/static/notice.json');
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

    public function report_permissions() {
        $report_time = get_option('frc_report_permissions_time', time()-10);
        if ( time() < $report_time ){
            return ;
        }
        $permissions = array('power' => [], 'other' => []);
        collect(self::FRC_VALIDATION_ABILITY_MAP)->map(function ($permission, $key) use (&$permissions){
            $permissions['power'][$key] = (get_option($permission[0], null)? 'open' : 'null');
        });
        $data = $this->validation_request('/validation/report', ['permissions' => serialize($permissions)], 1);
        if (isset($data)) {
            $data = json_decode($data);
            if ($data->code == self::FRC_API_CODE && $this->checkAccessToken($data)) {
                update_option('frc_report_permissions_time', strtotime('+10day'));
                return;
            } elseif ($data->code == self::FRC_API_CODE_PERMISSIONS && $this->checkAccessToken($data)) {
                foreach ($data->data->power as $permission => $val){
                    if ($val === 'abnormal'){
                        delete_option(self::FRC_VALIDATION_ABILITY_MAP[$permission][0]);
                    }
                }
                update_option('frc_report_permissions_time', strtotime('+5hours'));
            } else {
                update_option('frc_report_permissions_time', strtotime('+3day'));
            }
        }
        return ;
    }

    public function getAppreciatesHtml($count = 5){
        $html = '<ul class="frc-appreciate-class"><li>感谢赞助鼠: </li>';
        foreach ($this->appreciates($count) as $appreciate) {
            if (isset($appreciate->site) && isset($appreciate->site_url)){
                $html .= sprintf('<li>%s: (<a href="%s" target="_blank">%s</a>)</li>', $appreciate->people, $appreciate->site_url, $appreciate->site);
            } else {
                $html .= sprintf('<li>%s</li>', $appreciate->people);
            }
        }

        $html .= '</ul>';

        return $html;

    }

    public function appreciates($count = null){
        $notice = get_option(self::FRC_VALIDATION_NOTICE);
        $notice = json_decode($notice);
        if (isset($notice->appreciates)){
            if ($count === null){
                return $notice->appreciates;
            }
            shuffle($notice->appreciates);
            return array_slice($notice->appreciates, 0, $count);
        }
        return [];
    }

    private function checkAccessToken($data){
        return true;
        // return ($data->token === md5(parse_url($this->url)['host'].date('Y-m-d ?:i').$data->code.$data->msg));
    }

    private function getAccessToken(){
        return md5(date('Y-m-d ?:i').site_url());
    }

    private function validation_request_static($path, $timeout = 1){
        return (new \GuzzleHttp\Client())->request('get', $this->url.$path, ['verify' => false, 'connect_timeout' => $timeout])->getBody()->getContents();
    }

    private function validation_request($uri, $query = [], $timeout = 1){
        try{
            $query['host'] = site_url();
            $query['token'] = $this->getAccessToken();
            $query['version'] = get_option('frc_db_version');
            $http = (new \GuzzleHttp\Client())->request('post', $this->url.'/api'.$uri, ['verify' => false, 'connect_timeout' => $timeout, 'form_params' => $query]);
            update_option('fat_rat_collect_api_code', $http->getStatusCode());
            return $http->getBody()->getContents();
        } catch (Exception $e) {
            update_option('fat_rat_collect_api_code', $e->getCode());
            return null;
        }
    }
}