<?php

//class FRC_Validation {
//
//    const FRC_VALIDATION_FEATURED_PICTURE = 'frc_validation_featured_picture';
//
//    private $url = 'http://www.fatrat.cn';
//
//    public function validation_featured_picture(){
//        $keyword = !empty($_REQUEST['featured_picture']) ? sanitize_text_field($_REQUEST['featured_picture']) : '';
//
//        $data = $this->validation_request('/validation/featured-picture.json');
//        if (isset($data)){
//            if (json_decode($data)->keyword == $keyword){
//                add_option(self::FRC_VALIDATION_FEATURED_PICTURE, time() );
//                return ['code' => FRC_Api_Error::SUCCESS, 'msg' => '恭喜尊贵的小鼠同学, 验证成功le.'];
//            } else {
//                return ['code' => FRC_Api_Error::KEYWORD_CHECK_FAIL];
//            }
//        } else {
//            return ['code' => FRC_Api_Error::CHECK_SERVER_FAIL];
//        }
//    }
//
//    public function validation_request($url){
//        $http = new \GuzzleHttp\Client();
//        return $http->request('get', $this->url.$url, ['verify' => false])->getBody()->getContents();
//    }
//}

if (!function_exists("frc_image")) {
    /**
     * @param $file
     * @return string
     */
    function frc_image($file){
        echo plugin_dir_url(dirname(__FILE__)).'images/' . $file;
    }
}

