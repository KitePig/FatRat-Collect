<template>
  <el-dialog
    :model-value="true"
    :title="isEdit ? $t('configForm.editTitle') : $t('configForm.createTitle')"
    width="900px"
    :close-on-click-modal="false"
    @close="$emit('close')"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="top" size="small">
      <!-- ========== 基础信息 ========== -->
      <el-row :gutter="16">
        <el-col :span="14">
          <el-form-item :label="$t('configForm.name')" prop="collect_name"><!-- 配置名称 -->
            <el-input v-model="form.collect_name" :placeholder="$t('configForm.namePlaceholder')" /><!-- 给你的配置起个名字 -->
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item :label="$t('configForm.type')" prop="collect_type"><!-- 采集类型 -->
            <el-radio-group v-model="form.collect_type">
              <el-radio value="list">列表采集</el-radio>
              <el-radio value="single">详情采集</el-radio>
              <el-radio value="all">全站采集</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('configForm.describe')"><!-- 配置描述 -->
        <el-input v-model="form.collect_describe" :placeholder="$t('configForm.descPlaceholder')" /><!-- 可选：简短描述这个配置的用途 -->
      </el-form-item>

      <!-- ========== 采集设置 ========== -->
      <el-divider content-position="left">{{ $t('configForm.collectSetting') }}<!-- 采集设置 --></el-divider>
      <el-row :gutter="16">
        <el-col :span="8">
          <el-form-item :label="$t('configForm.renderMode')"><!-- 采集方式 -->
            <el-radio-group v-model="form.collect_rendering">
              <el-radio :value="1">{{ $t('configForm.staticRender') }}<!-- 静态渲染 --></el-radio>
              <el-radio disabled :value="2">{{ $t('configForm.dynamicRender') }}<!-- 动态渲染 --></el-radio>
            </el-radio-group>
            <span class="form-hint">{{ $t('configForm.renderModeHint') }}<!-- 静态渲染：普通页面 | 动态渲染：AJAX 页面 --></span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item :label="$t('configForm.encoding')"><!-- 编码处理 -->
            <el-radio-group v-model="form.collect_remove_head">
              <el-radio :value="1">{{ $t('configForm.autoDetect') }}<!-- 自动识别(推荐) --></el-radio>
              <el-radio :value="2">{{ $t('configForm.removeHead') }}<!-- 删HEAD(非UTF-8推荐) --></el-radio>
              <el-radio :value="3">{{ $t('configForm.forceConvert') }}<!-- 强制转换(终极方案) --></el-radio>
            </el-radio-group>
            <span class="form-hint">{{ $t('configForm.encodingHint') }}<!-- 解决乱码问题，自动识别失败可尝试删HEAD或强制转换 --></span>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- ========== 图片设置 ========== -->
      <el-divider content-position="left">{{ $t('configForm.imageSetting') }}<!-- 图片设置 --></el-divider>
      <el-row :gutter="16">
        <el-col :span="14">
          <el-form-item :label="$t('configForm.imageDownload')"><!-- 图片下载 -->
            <el-radio-group v-model="form.collect_image_download">
              <el-radio :value="1">{{ $t('configForm.downloadLocal') }}<!-- 下载到本地 --></el-radio>
              <el-radio :value="2">{{ $t('configForm.noDownload') }}<!-- 不下载 --></el-radio>
              <el-radio :value="3">{{ $t('configForm.clearImages') }}<!-- 清除图片 --></el-radio>
              <el-radio :value="4">{{ $t('configForm.noMediaLib') }}<!-- 不入媒体库 --></el-radio>
            </el-radio-group>
            <span class="form-hint">{{ $t('configForm.imageDownloadHint') }}<!-- 下载到本地：可对接云存储 | 不下载：使用源站图片 | 删除图片：清除所有img标签 | 不入媒体库：图片已下载但不入媒体库 --></span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item :label="$t('configForm.imagePath')"><!-- 图片路径 -->
            <el-radio-group v-model="form.collect_image_path">
              <el-radio :value="1">{{ $t('configForm.absolutePath') }}<!-- 绝对路径 --></el-radio>
              <el-radio :value="2">{{ $t('configForm.relativePath') }}<!-- 相对路径 --></el-radio>
            </el-radio-group>
            <span class="form-hint">{{ $t('configForm.imagePathHint') }}<!-- 绝对路径：适用于OSS/云存储 | 相对路径：适用于本地存储 --></span>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- ========== 列表采集配置 ========== -->
      <template v-if="form.collect_type === 'list'">
        <el-divider content-position="left">{{ $t('configForm.listSection') }}<!-- 列表采集配置 --></el-divider>
        <el-form-item :label="$t('configForm.listUrl')" prop="collect_list_url"><!-- 列表采集地址 -->
          <el-input v-model="form.collect_list_url" :placeholder="$t('configForm.listUrlPlaceholder')" /><!-- https://example.com/news/list_1.html -->
        </el-form-item>
        <el-form-item :label="$t('configForm.pagingUrl')"><!-- 分页地址模板 -->
          <el-input v-model="form.collect_list_url_paging" :placeholder="$t('configForm.pagingUrlPlaceholder')" /><!-- https://example.com/news/list_{page}.html -->
          <span class="form-hint">{{ $t('configForm.pagingHint') }}<!-- {page} 会自动替换为页码 --></span>
        </el-form-item>
        <el-form-item :label="$t('configForm.listRange')" prop="collect_list_range"><!-- 列表采集范围 -->
          <el-input v-model="form.collect_list_range" :placeholder="$t('configForm.listRangePlaceholder')" /><!-- .news-list ul li -->
          <span class="form-hint">{{ $t('configForm.listRangeHint') }}<!-- CSS选择器，定位列表每一项 --></span>
        </el-form-item>

        <!-- 列表采集规则 - 结构化输入 -->
        <el-form-item :label="$t('configForm.listRules')" prop="collect_list_rules" class="rules-form-item"><!-- 列表采集规则 -->
          <div class="rule-header">
            <span class="rule-header-col rule-col-name">{{ $t('configForm.ruleName') }}<!-- 规则名 --></span>
            <span class="rule-header-col rule-col-selector">{{ $t('configForm.selector') }}<!-- JQuery选择器 --></span>
            <span class="rule-header-col rule-col-attr">{{ $t('configForm.attribute') }}<!-- 属性 --></span>
            <span class="rule-header-col rule-col-filter">{{ $t('configForm.filter') }}<!-- 过滤 --></span>
          </div>
          <div class="rule-row">
            <el-input :model-value="listRule.name" disabled class="rule-col-name" />
            <el-input v-model="listRule.selector" :placeholder="$t('configForm.selectorPlaceholder')" class="rule-col-selector" /><!-- .title -->
            <el-input v-model="listRule.attribute" :placeholder="$t('configForm.attrPlaceholder')" class="rule-col-attr" /><!-- text -->
            <el-input v-model="listRule.filter" :placeholder="$t('configForm.filterPlaceholder')" class="rule-col-filter" /><!-- -script -style -->
          </div>
        </el-form-item>
      </template>

      <!-- ========== 内容采集配置 ========== -->
      <el-divider content-position="left">{{ $t('configForm.contentSection') }}<!-- 内容采集配置 --></el-divider>
      <el-form-item :label="$t('configForm.contentRange')" prop="collect_content_range"><!-- 内容采集范围 -->
        <el-input v-model="form.collect_content_range" :placeholder="$t('configForm.contentRangePlaceholder')" /><!-- .article-content -->
        <span class="form-hint">{{ $t('configForm.contentRangeHint') }}<!-- CSS选择器，定位文章内容区域 --></span>
      </el-form-item>

      <el-form-item :label="$t('configForm.contentRules')" prop="collect_content_rules" class="rules-form-item"><!-- 内容采集规则 -->
        <div class="rule-header">
          <span class="rule-header-col rule-col-name">{{ $t('configForm.ruleName') }}</span>
          <span class="rule-header-col rule-col-selector">{{ $t('configForm.selector') }}</span>
          <span class="rule-header-col rule-col-attr">{{ $t('configForm.attribute') }}</span>
          <span class="rule-header-col rule-col-filter">{{ $t('configForm.filter') }}</span>
        </div>
        <div v-for="rule in contentRules" :key="rule.name" class="rule-row">
          <el-input :model-value="rule.name" disabled class="rule-col-name" />
          <el-input v-model="rule.selector" :placeholder="$t('configForm.selectorPlaceholder')" class="rule-col-selector" /><!-- .title -->
          <el-input v-model="rule.attribute" :placeholder="$t('configForm.attrPlaceholder')" class="rule-col-attr" /><!-- text -->
          <el-input v-model="rule.filter" :placeholder="$t('configForm.filterPlaceholder')" class="rule-col-filter" /><!-- -script -style -->
        </div>
      </el-form-item>

      <!-- ========== 高级选项 ========== -->
      <el-divider content-position="left">{{ $t('configForm.advancedSection') }}<!-- 高级选项 --></el-divider>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('configForm.imageAttr')"><!-- 图片源属性 -->
            <el-input v-model="form.collect_image_attribute" placeholder="src" />
            <span class="form-hint">{{ $t('configForm.imageAttrHint') }}<!-- 部分站点图片用JS异步加载，设置真实图片地址属性 --></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('configForm.cookie')"><!-- Cookie -->
            <el-input v-model="form.collect_cookie" type="textarea" :rows="2" :placeholder="$t('configForm.cookiePlaceholder')" /><!-- 需要登录时才填写 -->
          </el-form-item>
        </el-col>
      </el-row>

      <!-- ========== 自定义内容 ========== -->
      <el-divider content-position="left">{{ $t('configForm.customSection') }}<!-- 自定义内容 --></el-divider>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('configForm.customHead')"><!-- 自定义头部 -->
            <el-input v-model="form.collect_custom_content_head" type="textarea" :rows="2" :placeholder="$t('configForm.customHeadPlaceholder')" /><!-- 插入到文章开头的 HTML -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('configForm.customFoot')"><!-- 自定义尾部 -->
            <el-input v-model="form.collect_custom_content_foot" type="textarea" :rows="2" :placeholder="$t('configForm.customFootPlaceholder')" /><!-- 插入到文章结尾的 HTML -->
          </el-form-item>
        </el-col>
      </el-row>

      <!-- ========== 关键词处理 ========== -->
      <el-divider content-position="left">{{ $t('configForm.keywordSection') }}<!-- 关键词处理 --></el-divider>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('configForm.keywordReplace')"><!-- 关键词替换 -->
            <el-input v-model="form.collect_keywords_replace_rule" type="textarea" :rows="4" :placeholder="$t('configForm.keywordReplacePlaceholder')" /><!-- 苹果=橘子 小蝌蚪=蝌蚪宝宝 妻子=老婆 -->
            <span class="form-hint">{{ $t('configForm.keywordReplaceHint') }}<!-- 注：阿拉伯数字和英文字符不宜替换，可能影响图片URL --></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('configForm.keywordInsert')"><!-- 关键词随机插入 -->
            <el-input v-model="form.collect_keywords" type="textarea" :rows="4" :placeholder="$t('configForm.keywordInsertPlaceholder')" /><!-- JSON格式，count为插入次数 -->
            <span class="form-hint">{{ $t('configForm.keywordInsertHint') }}<!-- JSON格式，count为插入次数 --></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="$emit('close')">{{ $t('configForm.cancel') }}<!-- 取消 --></el-button>
      <el-button type="primary" :loading="saving" @click="handleSave">{{ isEdit ? $t('configForm.saveUpdate') : $t('configForm.saveCreate') }}<!-- 更新配置 / 创建配置 --></el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getConfig, createConfig, updateConfig } from '../api/config.js'

const { t } = useI18n()

const props = defineProps({ config: { type: Object, default: null } })
const emit = defineEmits(['close', 'saved'])

const isEdit = ref(false)
const saving = ref(false)
const formRef = ref(null)

const form = reactive({
  collect_name: '',
  collect_describe: '',
  collect_type: 'list',
  collect_rendering: 1,
  collect_remove_head: 1,
  collect_image_download: 1,
  collect_image_path: 1,
  collect_list_url: '',
  collect_list_url_paging: '',
  collect_list_range: '',
  collect_list_rules: '',
  collect_content_range: '',
  collect_content_rules: '',
  collect_image_attribute: 'src',
  collect_cookie: '',
  collect_custom_content_head: '',
  collect_custom_content_foot: '',
  collect_keywords_replace_rule: '',
  collect_keywords: '',
})

const listRule = reactive({ name: 'link', selector: '', attribute: '', filter: '' })
const contentRules = reactive([
  { name: 'title', selector: '', attribute: '', filter: '' },
  { name: 'content', selector: '', attribute: '', filter: '' },
  { name: 'paging', selector: '', attribute: '', filter: '' },
])

function parseRule(str) {
  if (!str || !str.includes('%')) return { selector: '', attribute: '', filter: '' }
  const idx = str.indexOf('%')
  const rest = str.slice(idx + 1)
  const parts = rest.split('|')
  return {
    selector: parts[0] || '',
    attribute: parts[1] || '',
    filter: parts.slice(2).join('|') || '',
  }
}

function parseRules(str) {
  if (!str) return []
  return str.split(')(').map(s => {
    const idx = s.indexOf('%')
    if (idx === -1) return null
    return { name: s.slice(0, idx), ...parseRule(s) }
  }).filter(Boolean)
}

function serializeRule(rule) {
  const parts = [rule.selector, rule.attribute]
  if (rule.filter) parts.push(rule.filter)
  return `${rule.name}%${parts.join('|')}`
}

function serializeRules(rules) {
  return rules.map(serializeRule).join(')(')
}

function syncRulesToForm() {
  form.collect_list_rules = serializeRule(listRule)
  form.collect_content_rules = serializeRules(contentRules)
}

function loadRulesFromForm() {
  const listParsed = parseRule(form.collect_list_rules)
  listRule.selector = listParsed.selector
  listRule.attribute = listParsed.attribute
  listRule.filter = listParsed.filter

  const contentParsed = parseRules(form.collect_content_rules)
  const nameMap = { title: 0, content: 1, paging: 2 }
  contentParsed.forEach(r => {
    const idx = nameMap[r.name]
    if (idx !== undefined) {
      contentRules[idx].selector = r.selector
      contentRules[idx].attribute = r.attribute
      contentRules[idx].filter = r.filter
    }
  })
}

const rules = computed(() => ({
  collect_name: [{ required: true, message: t('configForm.ruleRequired.name'), trigger: 'blur' }], // 请输入配置名称
  collect_list_url: [{ required: true, message: t('configForm.ruleRequired.listUrl'), trigger: 'blur' }], // 列表采集需要填写采集地址
  collect_list_range: [{ required: true, message: t('configForm.ruleRequired.listRange'), trigger: 'blur' }], // 请填写列表采集范围
  collect_content_range: [{ required: true, message: t('configForm.ruleRequired.contentRange'), trigger: 'blur' }], // 请填写内容采集范围
}))

function validateRulesNotEmpty() {
  syncRulesToForm()
  let ok = true
  const listEmpty = !listRule.selector.trim()
  const contentEmpty = contentRules.every(r => !r.selector.trim())

  if (form.collect_type === 'list' && listEmpty) {
    ElMessage.warning({ message: t('configForm.ruleRequired.listRules'), offset: 60 }) // 请填写列表采集规则
    ok = false
  }
  if (contentEmpty) {
    ElMessage.warning({ message: t('configForm.ruleRequired.contentRules'), offset: 60 }) // 请填写内容采集规则
    ok = false
  }
  return ok
}

async function handleSave() {
  if (!validateRulesNotEmpty()) return
  if (!(await formRef.value.validate().catch(() => false))) return
  saving.value = true
  try {
    const data = {
      collect_name: form.collect_name,
      collect_describe: form.collect_describe,
      collect_type: form.collect_type,
      collect_rendering: form.collect_rendering,
      collect_remove_head: form.collect_remove_head,
      collect_image_download: form.collect_image_download,
      collect_image_path: form.collect_image_path,
      collect_list_url: form.collect_list_url,
      collect_list_url_paging: form.collect_list_url_paging,
      collect_list_range: form.collect_list_range,
      collect_list_rules: form.collect_list_rules,
      collect_content_range: form.collect_content_range,
      collect_content_rules: form.collect_content_rules,
      collect_image_attribute: form.collect_image_attribute,
      collect_cookie: form.collect_cookie,
      collect_custom_content_head: form.collect_custom_content_head,
      collect_custom_content_foot: form.collect_custom_content_foot,
      collect_keywords_replace_rule: form.collect_keywords_replace_rule,
      collect_keywords: form.collect_keywords,
    }
    if (isEdit.value && props.config?.id) {
      await updateConfig(props.config.id, data)
    } else {
      await createConfig(data)
    }
    ElMessage.success({ message: isEdit.value ? t('config.updated') : t('config.created'), offset: 60 }) // 更新成功 / 创建成功
    emit('saved')
  } catch (e) {
    ElMessage.error({ message: e.message, offset: 60 })
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  if (props.config?.id) {
    isEdit.value = true
    try {
      const r = await getConfig(props.config.id)
      const d = r.data || {}
      Object.keys(form).forEach(k => { if (d[k] !== undefined && d[k] !== null) form[k] = d[k] })
      console.log('form',form);
      if (d._custom_head) form.collect_custom_content_head = d._custom_head
      if (d._custom_foot) form.collect_custom_content_foot = d._custom_foot
      loadRulesFromForm()
    } catch {}
  }
})
</script>

<style scoped>
.form-hint {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
  display: block;
  line-height: 1.4;
}

.rules-form-item {
  margin-bottom: 18px;
}

.rule-header {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.rule-header-col {
  font-size: 12px;
  color: #CC6633;
  font-weight: 500;
}

.rule-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.rule-col-name {
  width: 80px;
  flex-shrink: 0;
}
.rule-col-selector {
  width: 180px;
  flex-shrink: 0;
}
.rule-col-attr {
  width: 90px;
  flex-shrink: 0;
}
.rule-col-filter {
  flex: 1;
  min-width: 0;
}
</style>
