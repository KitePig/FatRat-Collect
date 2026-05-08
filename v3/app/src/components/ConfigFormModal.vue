<template>
  <el-dialog
    :model-value="true"
    :title="isEdit ? $t('configForm.editTitle') : $t('configForm.createTitle')"
    width="720px"
    :close-on-click-modal="false"
    @close="$emit('close')"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" label-position="top" size="small">
      <el-row :gutter="16">
        <el-col :span="16">
          <el-form-item :label="$t('configForm.name')" prop="collect_name">
            <el-input v-model="form.collect_name" :placeholder="$t('configForm.namePlaceholder')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('configForm.type')">
            <el-select v-model="form.collect_type" style="width:100%">
              <el-option label="列表采集" value="list" />
              <el-option label="详情采集" value="single" />
              <el-option label="全站采集" value="all" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="配置描述">
        <el-input v-model="form.collect_describe" :placeholder="$t('configForm.descPlaceholder')" />
      </el-form-item>

      <template v-if="form.collect_type === 'list'">
        <el-divider content-position="left">{{ $t('configForm.listSection') }}</el-divider>
        <el-form-item :label="$t('configForm.listUrl')" prop="collect_list_url">
          <el-input v-model="form.collect_list_url" :placeholder="$t('configForm.listUrlPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('configForm.pagingUrl')">
          <el-input v-model="form.collect_list_url_paging" :placeholder="$t('configForm.pagingUrlPlaceholder')" />
          <span class="form-hint">{{ $t('configForm.pagingHint') }}</span>
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item :label="$t('configForm.listRange')" prop="collect_list_range">
              <el-input v-model="form.collect_list_range" :placeholder="$t('configForm.listRangePlaceholder')" />
              <span class="form-hint">{{ $t('configForm.listRangeHint') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('configForm.listRules')" prop="collect_list_rules">
              <el-input v-model="form.collect_list_rules" type="textarea" :rows="2" :placeholder="$t('configForm.listRulesPlaceholder')" />
              <span class="form-hint">{{ $t('configForm.listRulesHint') }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-divider content-position="left">{{ $t('configForm.contentSection') }}</el-divider>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item :label="$t('configForm.contentRange')" prop="collect_content_range">
            <el-input v-model="form.collect_content_range" :placeholder="$t('configForm.contentRangePlaceholder')" />
            <span class="form-hint">{{ $t('configForm.contentRangeHint') }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('configForm.contentRules')" prop="collect_content_rules">
            <el-input v-model="form.collect_content_rules" type="textarea" :rows="3" placeholder="title%h1|text|null)(content%.content|html|-script" />
            <span class="form-hint">{{ $t('configForm.contentRulesHint') }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">{{ $t('configForm.advancedSection') }}</el-divider>
      <el-row :gutter="16">
        <el-col :span="6"><el-form-item :label="$t('configForm.imageAttr')"><el-input v-model="form.collect_image_attribute" placeholder="src" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item :label="$t('configForm.imageDownload')"><el-select v-model="form.collect_image_download"><el-option :value="1" :label="$t('configForm.downloadLocal')" /><el-option :value="2" :label="$t('configForm.noDownload')" /><el-option :value="3" :label="$t('configForm.clearImages')" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item :label="$t('configForm.imagePath')"><el-select v-model="form.collect_image_path"><el-option :value="1" :label="$t('configForm.absolutePath')" /><el-option :value="2" :label="$t('configForm.relativePath')" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item :label="$t('configForm.chromeRender')"><el-select v-model="form.collect_rendering"><el-option :value="1" :label="$t('configForm.off')" /><el-option :value="2" :label="$t('configForm.on')" /></el-select></el-form-item></el-col>
      </el-row>
      <el-form-item :label="$t('configForm.cookie')">
        <el-input v-model="form.collect_cookie" type="textarea" :rows="2" :placeholder="$t('configForm.cookiePlaceholder')" />
      </el-form-item>

      <el-divider content-position="left">{{ $t('configForm.customSection') }}</el-divider>
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item :label="$t('configForm.customHead')"><el-input v-model="form.collect_custom_content_head" type="textarea" :rows="2" :placeholder="$t('configForm.customHeadPlaceholder')" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item :label="$t('configForm.customFoot')"><el-input v-model="form.collect_custom_content_foot" type="textarea" :rows="2" :placeholder="$t('configForm.customFootPlaceholder')" /></el-form-item></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="$emit('close')">{{ $t('configForm.cancel') }}</el-button>
      <el-button type="primary" :loading="saving" @click="handleSave">{{ isEdit ? $t('configForm.saveUpdate') : $t('configForm.saveCreate') }}</el-button>
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
  collect_name: '', collect_describe: '', collect_type: 'list',
  collect_cookie: '', collect_rendering: 1, collect_image_download: 1, collect_image_path: 1,
  collect_remove_head: 1, collect_list_url: '', collect_list_url_paging: '',
  collect_list_range: '', collect_list_rules: '', collect_content_range: '',
  collect_content_rules: '', collect_image_attribute: 'src',
  collect_keywords_replace_rule: '', collect_custom_content_head: '', collect_custom_content_foot: '', collect_keywords: '',
})

const rules = computed(() => ({
  collect_name: [{ required: true, message: t('configForm.ruleRequired.name'), trigger: 'blur' }],
  collect_list_url: [{ required: true, message: t('configForm.ruleRequired.listUrl'), trigger: 'blur' }],
  collect_list_range: [{ required: true, message: t('configForm.ruleRequired.listRange'), trigger: 'blur' }],
  collect_list_rules: [{ required: true, message: t('configForm.ruleRequired.listRules'), trigger: 'blur' }],
  collect_content_range: [{ required: true, message: t('configForm.ruleRequired.contentRange'), trigger: 'blur' }],
  collect_content_rules: [{ required: true, message: t('configForm.ruleRequired.contentRules'), trigger: 'blur' }],
}))

async function handleSave() {
  if (!(await formRef.value.validate())) return
  saving.value = true
  try {
    const data = {
      collect_name: form.collect_name, collect_describe: form.collect_describe, collect_type: form.collect_type,
      collect_cookie: form.collect_cookie, collect_rendering: form.collect_rendering,
      collect_image_download: form.collect_image_download, collect_image_path: form.collect_image_path,
      collect_remove_head: form.collect_remove_head, collect_list_url: form.collect_list_url,
      collect_list_url_paging: form.collect_list_url_paging, collect_list_range: form.collect_list_range,
      collect_list_rules: form.collect_list_rules, collect_content_range: form.collect_content_range,
      collect_content_rules: form.collect_content_rules, collect_image_attribute: form.collect_image_attribute,
      collect_keywords_replace_rule: form.collect_keywords_replace_rule,
      collect_custom_content_head: form.collect_custom_content_head, collect_custom_content_foot: form.collect_custom_content_foot,
      collect_keywords: form.collect_keywords,
    }
    if (isEdit.value && props.config?.id) {
      await updateConfig(props.config.id, data)
    } else {
      await createConfig(data)
    }
    ElMessage.success(isEdit.value ? t('config.updated') : t('config.created'))
    emit('saved')
  } catch (e) { ElMessage.error(e.message) }
  finally { saving.value = false }
}

onMounted(async () => {
  if (props.config?.id) {
    isEdit.value = true
    try {
      const r = await getConfig(props.config.id)
      const d = r.data || {}
      Object.keys(form).forEach(k => { if (d[k] !== undefined && d[k] !== null) form[k] = d[k] })
      if (d._custom_head) form.collect_custom_content_head = d._custom_head
      if (d._custom_foot) form.collect_custom_content_foot = d._custom_foot
    } catch {}
  }
})
</script>

<style scoped>
.form-hint { font-size: 11px; color: #909399; margin-top: 2px; display: block; }
</style>
