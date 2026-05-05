<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-panel">
      <div class="modal-header">
        <h3>{{ isEdit ? '编辑配置' : '新建配置' }}</h3>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-scroll">
          <!-- 基本信息 -->
          <fieldset class="form-section">
            <legend>基本信息</legend>
            <div class="form-row">
              <div class="form-group flex-2">
                <label>配置名称 <span class="required">*</span></label>
                <input v-model="form.collect_name" type="text" placeholder="给你的配置起个名字" />
                <span class="form-error" v-if="errors.collect_name">{{ errors.collect_name }}</span>
              </div>
              <div class="form-group">
                <label>采集类型</label>
                <select v-model="form.collect_type">
                  <option value="list">列表采集</option>
                  <option value="single">详情采集</option>
                  <option value="all">全站采集</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>配置描述</label>
              <input v-model="form.collect_describe" type="text" placeholder="可选：简短描述这个配置的用途" />
            </div>
          </fieldset>

          <!-- 列表采集配置（仅列表采集时显示） -->
          <fieldset class="form-section" v-if="form.collect_type === 'list'">
            <legend>列表采集配置</legend>
            <div class="form-group">
              <label>列表采集地址 <span class="required">*</span></label>
              <input v-model="form.collect_list_url" type="text" placeholder="https://example.com/news/list_1.html" />
              <span class="form-error" v-if="errors.collect_list_url">{{ errors.collect_list_url }}</span>
            </div>
            <div class="form-group">
              <label>分页地址模板</label>
              <input v-model="form.collect_list_url_paging" type="text" placeholder="https://example.com/news/list_{page}.html" />
              <span class="form-hint">{page} 会自动替换为页码</span>
            </div>
            <div class="form-group">
              <label>列表采集范围 <span class="required">*</span></label>
              <input v-model="form.collect_list_range" type="text" placeholder=".news-list ul li" />
              <span class="form-hint">CSS选择器，用于定位列表区域中的每一项</span>
              <span class="form-error" v-if="errors.collect_list_range">{{ errors.collect_list_range }}</span>
            </div>
            <div class="form-group">
              <label>列表采集规则 <span class="required">*</span></label>
              <textarea v-model="form.collect_list_rules" rows="2" placeholder="link%a|href|null"></textarea>
              <span class="form-hint">格式：字段名%选择器|属性|过滤规则，多条用)连接</span>
              <span class="form-error" v-if="errors.collect_list_rules">{{ errors.collect_list_rules }}</span>
            </div>
          </fieldset>

          <!-- 内容采集配置 -->
          <fieldset class="form-section">
            <legend>内容采集配置</legend>
            <div class="form-group">
              <label>内容采集范围 <span class="required">*</span></label>
              <input v-model="form.collect_content_range" type="text" placeholder=".article-content" />
              <span class="form-hint">CSS选择器，定位文章内容所在区域</span>
              <span class="form-error" v-if="errors.collect_content_range">{{ errors.collect_content_range }}</span>
            </div>
            <div class="form-group">
              <label>内容采集规则 <span class="required">*</span></label>
              <textarea v-model="form.collect_content_rules" rows="3" placeholder="title%h1|text|null)(content%.content|html|-script"></textarea>
              <span class="form-hint">格式：字段名%选择器|属性|过滤规则，多条用)连接。支持采集 title、content、author、cover 等字段</span>
              <span class="form-error" v-if="errors.collect_content_rules">{{ errors.collect_content_rules }}</span>
            </div>
          </fieldset>

          <!-- 高级选项 -->
          <fieldset class="form-section">
            <legend>高级选项</legend>
            <div class="form-row">
              <div class="form-group">
                <label>图片源属性</label>
                <input v-model="form.collect_image_attribute" type="text" placeholder="src" />
                <span class="form-hint">图片标签的属性名，如 data-src</span>
              </div>
              <div class="form-group">
                <label>图片下载</label>
                <select v-model="form.collect_image_download">
                  <option :value="1">下载到本地</option>
                  <option :value="2">不下载</option>
                  <option :value="3">清除所有图片</option>
                </select>
              </div>
              <div class="form-group">
                <label>图片路径</label>
                <select v-model="form.collect_image_path">
                  <option :value="1">绝对路径</option>
                  <option :value="2">相对路径</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Chrome渲染</label>
                <select v-model="form.collect_rendering">
                  <option :value="1">关闭</option>
                  <option :value="2">开启</option>
                </select>
                <span class="form-hint">需要 JS 渲染的页面请开启</span>
              </div>
              <div class="form-group">
                <label>清除头部</label>
                <select v-model="form.collect_remove_head">
                  <option :value="1">不清理</option>
                  <option :value="2">清除头部标签</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Cookie</label>
              <textarea v-model="form.collect_cookie" rows="2" placeholder="需要登录时才填写"></textarea>
            </div>
          </fieldset>

          <!-- 自定义内容 -->
          <fieldset class="form-section">
            <legend>自定义内容</legend>
            <div class="form-group">
              <label>自定义头部内容</label>
              <textarea v-model="form.collect_custom_content_head" rows="2" placeholder="插入到文章开头的 HTML"></textarea>
            </div>
            <div class="form-group">
              <label>自定义尾部内容</label>
              <textarea v-model="form.collect_custom_content_foot" rows="2" placeholder="插入到文章结尾的 HTML"></textarea>
            </div>
            <div class="form-group">
              <label>关键字替换规则</label>
              <input v-model="form.collect_keywords_replace_rule" type="text" placeholder="选择器替换规则" />
            </div>
          </fieldset>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel" @click="$emit('close')">取消</button>
        <button class="btn btn-primary" @click="handleSave" :disabled="saving">
          {{ saving ? '保存中...' : (isEdit ? '更新配置' : '创建配置') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getConfig, createConfig, updateConfig } from '../api/config.js'

const props = defineProps({
  config: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'saved'])

const isEdit = ref(false)
const saving = ref(false)
const errors = ref({})

const form = reactive({
  collect_name: '',
  collect_describe: '',
  collect_type: 'list',
  collect_cookie: '',
  collect_rendering: 1,
  collect_image_download: 1,
  collect_image_path: 1,
  collect_remove_head: 1,
  collect_list_url: '',
  collect_list_url_paging: '',
  collect_list_range: '',
  collect_list_rules: '',
  collect_content_range: '',
  collect_content_rules: '',
  collect_image_attribute: 'src',
  collect_keywords_replace_rule: '',
  collect_custom_content_head: '',
  collect_custom_content_foot: '',
  collect_keywords: '',
})

function validate() {
  const errs = {}

  if (!form.collect_name.trim()) {
    errs.collect_name = '请输入配置名称'
  }

  if (form.collect_type === 'list') {
    if (!form.collect_list_url.trim()) errs.collect_list_url = '请输入列表采集地址'
    if (!form.collect_list_range.trim()) errs.collect_list_range = '请输入列表采集范围'
    if (!form.collect_list_rules.trim()) errs.collect_list_rules = '请输入列表采集规则'
  }

  if (!form.collect_content_range.trim()) errs.collect_content_range = '请输入内容采集范围'
  if (!form.collect_content_rules.trim()) errs.collect_content_rules = '请输入内容采集规则'

  errors.value = errs
  return Object.keys(errs).length === 0
}

async function handleSave() {
  if (!validate()) return

  saving.value = true
  try {
    const data = {
      collect_name: form.collect_name,
      collect_describe: form.collect_describe,
      collect_type: form.collect_type,
      collect_cookie: form.collect_cookie,
      collect_rendering: Number(form.collect_rendering),
      collect_image_download: Number(form.collect_image_download),
      collect_image_path: Number(form.collect_image_path),
      collect_remove_head: Number(form.collect_remove_head),
      collect_list_url: form.collect_list_url,
      collect_list_url_paging: form.collect_list_url_paging,
      collect_list_range: form.collect_list_range,
      collect_list_rules: form.collect_list_rules,
      collect_content_range: form.collect_content_range,
      collect_content_rules: form.collect_content_rules,
      collect_image_attribute: form.collect_image_attribute,
      collect_keywords_replace_rule: form.collect_keywords_replace_rule,
      collect_custom_content_head: form.collect_custom_content_head,
      collect_custom_content_foot: form.collect_custom_content_foot,
      collect_keywords: form.collect_keywords,
    }

    if (isEdit.value && props.config?.id) {
      await updateConfig(props.config.id, data)
    } else {
      await createConfig(data)
    }

    emit('saved')
  } catch (e) {
    alert('保存失败: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  if (props.config && props.config.id) {
    isEdit.value = true
    try {
      const res = await getConfig(props.config.id)
      const data = res.data
      Object.keys(form).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          form[key] = data[key]
        }
      })
      // 处理 collect_custom_content JSON
      if (data.collect_custom_content && typeof data.collect_custom_content === 'object') {
        form.collect_custom_content_head = data.collect_custom_content.head || ''
        form.collect_custom_content_foot = data.collect_custom_content.foot || ''
      }
    } catch (e) {
      console.error('获取配置详情失败:', e)
    }
  }
})
</script>
