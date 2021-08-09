<?php

$release_type = [
    'WordPress' => 'WordPress',
    'LightSNS' => 'lightSNS主题',
    '7b2' => '7b2主题',
];

$type_map = ['post' => '文章', 'page' => '页面', 'attachment' => '附件'];
$post_type = collect(get_post_types(array(
    'public' => true,
)))->map(function ($type) use ($type_map){
    return $type_map[$type]??$type;
})->filter(function ($type){
    return $type !== '附件';
})->toArray();

$extension_field = collect();
$extension_field = $extension_field
    ->merge(['WordPress' => $post_type])
    ->merge(['LightSNS' => [
        'words' => '动态',
        'music' => '音乐',
        'single' => '文章',
        'video' => '视频',
        'normal'=> '帖子',]])
    ->merge(['7b2' => [
        'post-style-1' => '样式一',
        'post-style-2' => '样式二',
        'post-style-3' => '样式三',
        'post-style-4' => '样式四',
        'post-style-5' => '样式五',
    ]]);

if (!isset($release->release_type)){
    $release->release_type = 'WordPress';
}

?>
<h5>支持发布选项:</h5>
<select class="release_type">
    <?php foreach ($release_type as $val => $title){ ?>
        <option <?php if (isset($release->release_type) && $val == $release->release_type) esc_attr_e('selected'); ?> value="<?php esc_attr_e($val); ?>"><?php _e($title); ?></option>
    <?php } ?>
    <option disabled>更多联系我..</option>
</select>
<hr />

<div class="release_type_change" data-value="WordPress" <?php if (isset($release->release_type) && $release->release_type != 'WordPress'){ esc_attr_e('style="display: none;"'); } ?>>
    <h5>设置发布类型:</h5>
    <ul>
        <?php foreach ($extension_field['WordPress'] as $type => $title){ ?>
            <li><input type="radio" name="WordPress_extension_field" value="<?php esc_attr_e($type); ?>" <?php if (isset($release->extension_field) && $type == $release->extension_field) esc_attr_e('checked'); ?>><?php _e($title); ?></li>
        <?php } ?>
    </ul>
    <hr />
</div>

<div class="release_type_change" data-value="LightSNS" <?php if (isset($release->release_type) && $release->release_type != 'LightSNS'){ esc_attr_e('style="display: none;"'); } ?>>
    <h5>设置发布类型:</h5>
    <ul>
        <?php foreach ($extension_field['LightSNS'] as $type => $title){ ?>
            <li><input type="radio" name="LightSNS_extension_field" value="<?php esc_attr_e($type); ?>" <?php if (isset($release->extension_field) && $type == $release->extension_field) esc_attr_e('checked'); ?>><?php _e($title); ?></li>
        <?php } ?>
    </ul>
    <hr />
</div>

<div class="release_type_change" data-value="7b2" <?php if (isset($release->release_type) && $release->release_type != '7b2'){ esc_attr_e('style="display: none;"'); } ?>>
    <h5>设置发布样式:</h5>
    <p style="color: #CCCCCC">设置7b2文章页显示样式</p>
    <ul>
        <?php foreach ($extension_field['7b2'] as $type => $title){ ?>
            <li><input type="radio" name="7b2_extension_field" value="<?php esc_attr_e($type); ?>" <?php if (isset($release->extension_field) && $type == $release->extension_field) esc_attr_e('checked'); ?>><?php _e($title); ?></li>
        <?php } ?>
    </ul>
    <hr />
</div>