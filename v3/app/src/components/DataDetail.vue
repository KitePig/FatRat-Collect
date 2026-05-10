<template>
  <div class="data-detail">
    <div class="page-header" style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
      <el-button @click="$emit('back')">{{ $t('data.detail.back') }}<!-- ← 返回桶列表 --></el-button>
      <h2 style="margin:0">{{ bucket.collect_name }}</h2>
      <el-tag :type="tagType(bucket.collect_type)" effect="plain">{{ $t('config.typeLabel.' + bucket.collect_type) }}</el-tag>
    </div>

    <div style="display:flex;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <el-radio-group v-model="statusFilter" size="small" @change="fetchData">
        <el-radio-button v-for="s in statusTabs" :key="s.value" :value="s.value">
          {{ s.label }} <span style="opacity:0.7">({{ statusCount(s.value) }})</span>
        </el-radio-button>
      </el-radio-group>
      <div style="display:flex;gap:8px">
        <el-button size="small" @click="fetchData">{{ $t('data.detail.refresh') }}<!-- 刷新 --></el-button>
        <el-button v-if="bucket.collect_type !== 'single'" size="small" @click="doPlay">{{ playing ? $t('data.detail.stop') : $t('data.detail.stepCollect') }}<!-- 停止 / 逐步采集 --></el-button>
        <el-button type="primary" size="small" @click="showReleaseConfig = true">{{ $t('data.detail.releaseConfig') }}<!-- 发布配置 --></el-button>
      </div>
    </div>

    <el-table :data="items" v-loading="loading" stripe style="width:100%;border-radius:8px;overflow:hidden">
      <el-table-column prop="id" label="ID" width="100" align="center" />
      <el-table-column label="状态" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="statusTag(row.status)" size="small" effect="plain">{{ $t('data.detail.status.' + statusKey(row.status)) }}<!-- pending/待采集 collected/已采集 released/已发布 failed/失败 --></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="160" show-overflow-tooltip>
        <template #default="{ row }"><span style="font-weight:500">{{ row.title }}</span></template>
      </el-table-column>
      <el-table-column label="链接" width="260">
        <template #default="{ row }">
          <a v-if="row.link" :href="row.link" target="_blank" class="el-link el-link--primary" style="font-size:12px">{{ truncate(row.link, 24) }}</a>
          <span v-else style="color:#c0c4cc">-</span>
        </template>
      </el-table-column>
      <el-table-column label="文章ID" width="100" align="center">
        <template #default="{ row }">
          <a v-if="row.post_id" :href="adminUrl + 'post.php?post=' + row.post_id + '&action=edit'" target="_blank" class="el-link el-link--primary">#{{ row.post_id }}</a>
          <span v-else style="color:#c0c4cc">-</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" fixed="right">
        <template #default="{ row }">
          <el-button v-if="row.status == 2" size="small" link type="primary" @click="doPublish(row)">{{ $t('data.detail.publish') }}<!-- 发布 --></el-button>
          <el-button v-if="row.status == 2" size="small" link @click="doPreview(row)">{{ $t('data.detail.preview') }}<!-- 预览 --></el-button>
          <el-popconfirm :title="$t('data.detail.confirmDelete')" @confirm="doDelete(row)"><!-- 确定删除？ -->
            <template #reference><el-button size="small" link type="danger">{{ $t('data.detail.delete') }}<!-- 删除 --></el-button></template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="display:flex;justify-content:center;margin-top:16px" v-if="totalPages > 1">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="perPage" :current-page="page" @current-change="p => { page = p; fetchData() }" />
    </div>

    <el-dialog v-model="showReleaseConfig" title="发布配置" width="560px" :close-on-click-modal="false">
      <el-form label-position="top" size="small">
        <el-row :gutter="16">
          <el-col :span="8"><el-form-item label="发布状态"><el-select v-model="releaseConfig.status"><el-option label="发布" value="publish" /><el-option label="待审核" value="pending" /><el-option label="草稿" value="draft" /></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="发布类型"><el-select v-model="releaseConfig.type"><el-option v-for="pt in postTypes" :key="pt.id" :label="pt.name" :value="pt.id" /></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="特色图片"><el-select v-model="releaseConfig.thumbnail"><el-option label="正文第一张" value="thumbnail1" /><el-option label="不需要" value="thumbnail2" /></el-select></el-form-item></el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12"><el-form-item label="发布分类"><el-select v-model="releaseConfig.category" multiple><el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" /></el-select></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="发布作者"><el-select v-model="releaseConfig.user" multiple><el-option v-for="u in users" :key="u.id" :label="u.name" :value="u.id" /></el-select></el-form-item></el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="showReleaseConfig = false">{{ $t('config.cancelBtn') }}<!-- 取消 --></el-button>
        <el-button type="primary" @click="doSaveReleaseConfig">{{ $t('data.detail.saveReleaseConfig') }}<!-- 保存发布配置 --></el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getDataDetail, deleteDataItem, publishArticle, previewArticle, getReleaseConfig, saveReleaseConfig, wechatPlay } from '../api/data.js'
import { getCategories, getUsers, getPostTypes } from '../api/config.js'

const { t } = useI18n()

const props = defineProps({ bucket: Object })
const emit = defineEmits(['back'])

const adminUrl = window.frcV3Data?.adminUrl || ''
const items = ref([]); const loading = ref(false)
const page = ref(1); const perPage = ref(20); const total = ref(0); const totalPages = ref(0)
const statusFilter = ref(''); const playing = ref(false)
const statusCounts = ref({ all: 0, '1': 0, '2': 0, '3': 0, '5': 0 })
let playTimer = null

const showReleaseConfig = ref(false)
const releaseConfig = ref({ status: 'pending', type: 'post', thumbnail: 'thumbnail1', category: [1], user: [], release_type: 'WordPress', extension_field: 'post' })
const categories = ref([]); const users = ref([]); const postTypes = ref([])

const statusTabs = [
  { label: t('data.detail.status.all'), value: '' }, // 全部
  { label: t('data.detail.status.pending'), value: '1' }, // 待采集
  { label: t('data.detail.status.collected'), value: '2' }, // 已采集
  { label: t('data.detail.status.released'), value: '3' }, // 已发布
  { label: t('data.detail.status.failed'), value: '5' }, // 失败
]
function statusKey(s) { return { '1':'pending','2':'collected','3':'released','5':'failed' }[s] || s }
function statusTag(s) { return { '1':'warning','2':'','3':'success','5':'danger' }[s] || 'info' }
function tagType(t) { return { list: 'success', single: '', all: 'warning' }[t] || '' }
function truncate(s, n) { return s && s.length > n ? s.slice(0, n) + '...' : s || '-' }
function statusCount(v) { return statusCounts.value[v || 'all'] ?? 0 }

async function fetchData() {
  loading.value = true
  try {
    const p = { page: page.value, per_page: perPage.value }
    if (statusFilter.value) p.status = statusFilter.value
    const r = await getDataDetail(props.bucket.id, p)
    items.value = r.data || []
    total.value = r.meta?.total || 0
    totalPages.value = r.meta?.total_pages || 0
    if (r.meta?.status_counts) statusCounts.value = r.meta.status_counts
  } catch {} finally { loading.value = false }
}

async function doDelete(item) { try { await deleteDataItem(item.id); fetchData(); ElMessage.success(t('data.detail.deleted')) } catch (e) { ElMessage.error(e.message) } } // 删除成功
async function doPublish(item) {
  try { const r = await publishArticle(item.id); ElMessage.success(r.msg || t('data.detail.publishSuccess')); fetchData() } catch (e) { ElMessage.error(e.message) } // 发布成功
  }
  async function doPreview(item) {
    try {
      const r = await previewArticle(item.id)
      if (r.code === 200 && r.data?.post_id) window.open(adminUrl + '?p=' + r.data.post_id + '&preview=true', '_blank')
      else ElMessage.error(r.msg || t('data.detail.previewFailed')) // 预览失败
  } catch (e) { ElMessage.error(e.message) }
}

function doPlay() {
  if (playing.value) { clearInterval(playTimer); playing.value = false; return }
  playing.value = true
  const tick = async () => { try { await wechatPlay(); fetchData() } catch {} }
  tick(); playTimer = setInterval(tick, 3000)
}

async function loadReleaseConfig() {
  try { const r = await getReleaseConfig(props.bucket.id); if (r.data) releaseConfig.value = { ...releaseConfig.value, ...r.data } } catch {}
}
async function doSaveReleaseConfig() {
  try {
    await saveReleaseConfig(props.bucket.id, { category: releaseConfig.value.category, user: releaseConfig.value.user, status: releaseConfig.value.status, thumbnail: releaseConfig.value.thumbnail, type: releaseConfig.value.type, release_type: releaseConfig.value.release_type, extension_field: releaseConfig.value.extension_field })
    showReleaseConfig.value = false; ElMessage.success(t('data.detail.saved')) // 发布配置保存成功
  } catch (e) { ElMessage.error(e.message) }
}

onMounted(async () => {
  fetchData()
  const [c, u, pt] = await Promise.all([getCategories(), getUsers(), getPostTypes()])
  categories.value = c.data || []; users.value = u.data || []; postTypes.value = pt.data || []
  loadReleaseConfig()
})
</script>
