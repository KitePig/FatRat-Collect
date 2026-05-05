<template>
  <el-dialog
    :model-value="true"
    :title="isEdit ? '编辑配置' : '新建配置'"
    width="720px"
    :close-on-click-modal="false"
    @close="$emit('close')"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" label-position="top" size="small">
      <el-row :gutter="16">
        <el-col :span="16">
          <el-form-item label="配置名称" prop="collect_name">
            <el-input v-model="form.collect_name" placeholder="给你的配置起个名字" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采集类型">
            <el-select v-model="form.collect_type" style="width:100%">
              <el-option label="列表采集" value="list" />
              <el-option label="详情采集" value="single" />
              <el-option label="全站采集" value="all" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="配置描述">
        <el-input v-model="form.collect_describe" placeholder="可选：简短描述这个配置的用途" />
      </el-form-item>

      <template v-if="form.collect_type === 'list'">
        <el-divider content-position="left">列表采集配置</el-divider>
        <el-form-item label="列表采集地址" prop="collect_list_url">
          <el-input v-model="form.collect_list_url" placeholder="https://example.com/news/list_1.html" />
        </el-form-item>
        <el-form-item label="分页地址模板">
          <el-input v-model="form.collect_list_url_paging" placeholder="https://example.com/news/list_{page}.html" />
          <span class="form-hint">{page} 会自动替换为页码</span>
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="列表采集范围" prop="collect_list_range">
              <el-input v-model="form.collect_list_range" placeholder=".news-list ul li" />
              <span class="form-hint">CSS选择器，定位列表每一项</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列表采集规则" prop="collect_list_rules">
              <el-input v-model="form.collect_list_rules" type="textarea" :rows="2" placeholder="link%a|href|null" />
              <span class="form-hint">字段名%选择器|属性|过滤，)连接多条</span>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-divider content-position="left">内容采集配置</el-divider>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="内容采集范围" prop="collect_content_range">
            <el-input v-model="form.collect_content_range" placeholder=".article-content" />
            <span class="form-hint">CSS选择器，定位文章内容区域</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内容采集规则" prop="collect_content_rules">
            <el-input v-model="form.collect_content_rules" type="textarea" :rows="3" placeholder="title%h1|text|null)(content%.content|html|-script" />
            <span class="form-hint">支持 title/content/author/cover 等字段</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">高级选项</el-divider>
      <el-row :gutter="16">
        <el-col :span="6"><el-form-item label="图片源属性"><el-input v-model="form.collect_image_attribute" placeholder="src" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="图片下载"><el-select v-model="form.collect_image_download"><el-option :value="1" label="下载到本地" /><el-option :value="2" label="不下载" /><el-option :value="3" label="清除图片" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="图片路径"><el-select v-model="form.collect_image_path"><el-option :value="1" label="绝对路径" /><el-option :value="2" label="相对路径" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="Chrome渲染"><el-select v-model="form.collect_rendering"><el-option :value="1" label="关闭" /><el-option :value="2" label="开启" /></el-select></el-form-item></el-col>
      </el-row>
      <el-form-item label="Cookie">
        <el-input v-model="form.collect_cookie" type="textarea" :rows="2" placeholder="需要登录时才填写" />
      </el-form-item>

      <el-divider content-position="left">自定义内容</el-divider>
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="自定义头部"><el-input v-model="form.collect_custom_content_head" type="textarea" :rows="2" placeholder="插入到文章开头的 HTML" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="自定义尾部"><el-input v-model="form.collect_custom_content_foot" type="textarea" :rows="2" placeholder="插入到文章结尾的 HTML" /></el-form-item></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" :loading="saving" @click="handleSave">{{ isEdit ? '更新配置' : '创建配置' }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getConfig, createConfig, updateConfig } from '../api/config.js'

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

const rules = {
  collect_name: [{ required: true, message: '请输入配置名称', trigger: 'blur' }],
  collect_list_url: [{ required: true, message: '列表采集需要填写采集地址', trigger: 'blur' }],
  collect_list_range: [{ required: true, message: '请填写列表采集范围', trigger: 'blur' }],
  collect_list_rules: [{ required: true, message: '请填写列表采集规则', trigger: 'blur' }],
  collect_content_range: [{ required: true, message: '请填写内容采集范围', trigger: 'blur' }],
  collect_content_rules: [{ required: true, message: '请填写内容采集规则', trigger: 'blur' }],
}

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
    ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
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
