<?php

class FRC_Validation {

    const FRC_INSERT_TIME = 'frc_install_time';
    const FRC_VALIDATION_FEATURED_PICTURE = 'frc_validation_featured_picture';
    const FRC_VALIDATION_DYNAMIC_FIELDS = 'frc_validation_dynamic_fields';
    const FRC_VALIDATION_AUTO_TAGS = 'frc_validation_auto_tags';

    private $url = 'http://www.fatrat.cn';

    public function validation_featured_picture(){
        $keyword = !empty($_REQUEST['featured_picture']) ? sanitize_text_field($_REQUEST['featured_picture']) : '';

        $data = $this->validation_request('/validation/featured-picture.json');
        if (isset($data)){
            $data = json_decode($data);
            if ($data->keyword == $keyword){
                add_option(self::FRC_VALIDATION_FEATURED_PICTURE, time() );
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '恭喜尊贵的小鼠同学, 验证成功le.'];
            } else {
                return ['code' => FRC_Api_Error::KEYWORD_CHECK_FAIL, 'msg' => isset($data->msg) ? $data->msg : ''];
            }
        } else {
            return ['code' => FRC_Api_Error::CHECK_SERVER_FAIL];
        }
    }

    public function validation_auto_tags(){
        $keyword = !empty($_REQUEST['auto_tags']) ? sanitize_text_field($_REQUEST['auto_tags']) : '';

        $data = $this->validation_request('/validation/auto-tags.json');
        if (isset($data)){
            $data = json_decode($data);
            if ($data->keyword == $keyword){
                add_option(self::FRC_VALIDATION_AUTO_TAGS, time() );
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '恭喜尊贵的小鼠同学, 验证成功le.'];
            } else {
                return ['code' => FRC_Api_Error::KEYWORD_CHECK_FAIL, 'msg' => isset($data->msg) ? $data->msg : ''];
            }
        } else {
            return ['code' => FRC_Api_Error::CHECK_SERVER_FAIL];
        }
    }

    public function validation_auto_tags_switch(){
        $keyword = !empty($_REQUEST['auto_tags']) ? sanitize_text_field($_REQUEST['auto_tags']) : '';

        $option = get_option(self::FRC_VALIDATION_AUTO_TAGS);
        if(strtotime(date('Y-m-d H:i:s',$option)) == $option) {
            $json = [];
            $json['switch'] = 'open';
            $json['created_at'] = $option;
        } else{
            $json = json_decode($option, true);
            $json['switch'] = $keyword;
        }
        $json = json_encode($json);
        if (update_option(self::FRC_VALIDATION_AUTO_TAGS, $json)){
            return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '操作成功le.'];
        } else {
            return ['code' => FRC_Api_Error::FAIL, 'msg' => '操作失败le.'];
        }
    }

    public function validation_dynamic_fields(){
        $keyword = !empty($_REQUEST['dynamic_fields']) ? sanitize_text_field($_REQUEST['dynamic_fields']) : '';

        $data = $this->validation_request('/validation/dynamic-fields.json');
        if (isset($data)){
            $data = json_decode($data);
            if ($data->keyword == $keyword){
                add_option(self::FRC_VALIDATION_DYNAMIC_FIELDS, '{"switch":"open","created_at":"'.time().'"}' );
                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '恭喜尊贵的小鼠同学, 验证成功le.'];
            } else {
                return ['code' => FRC_Api_Error::KEYWORD_CHECK_FAIL, 'msg' => isset($data->msg) ? $data->msg : ''];
            }
        } else {
            return ['code' => FRC_Api_Error::CHECK_SERVER_FAIL];
        }
    }

    public function validation_dynamic_fields_switch(){
        $keyword = !empty($_REQUEST['dynamic_fields']) ? sanitize_text_field($_REQUEST['dynamic_fields']) : '';

        $option = get_option(self::FRC_VALIDATION_DYNAMIC_FIELDS);
        $option = json_decode($option, true);
        $option['switch'] = $keyword;
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

    public function validation_request($url){
        $http = new \GuzzleHttp\Client();
        return $http->request('get', $this->url.$url, ['verify' => false, 'connect_timeout' => 1])->getBody()->getContents();
    }
}

/**
 * FRC_Spider (入口)
 * TODO code => msg 单独提出来
 * TODO 抽空合并其他入口
 */
function frc_validation_interface()
{
    $action_func = !empty($_REQUEST['action_func']) ? sanitize_text_field($_REQUEST['action_func']) : '';
    if (empty($action_func)){
        wp_send_json(['code' => 5001, 'msg' => 'Parameter error!']);
        wp_die();
    }

    $result = null;
    $action_func = 'validation_'.$action_func;
    $frc_spider = new FRC_Validation();
    method_exists($frc_spider, $action_func) && $result = (new FRC_Validation())->$action_func();
    if ($result != null){
        if (empty($result['msg'])){
            $result['msg'] = FRC_Api_Error::msg($result['code'], 'zh');
        }
        wp_send_json($result);
        wp_die();
    }
    wp_send_json(['code' => 5002, 'result' => $result, 'msg' => 'Action there is no func! or Func is error!']);
    wp_die();
}
add_action('wp_ajax_frc_validation_interface', 'frc_validation_interface');