<template>
  <div class="page-data">
    <template v-if="!selectedBucket">
      <div class="page-header">
        <h2>{{ $t('data.title') }}<!-- 数据桶中心 --></h2>
        <p style="color:#909399;font-size:13px;margin:0">{{ $t('data.desc') }}<!-- 管理所有采集配置下的数据 --></p>
      </div>

      <div class="tab-card">
        <div class="tab-card-header">
          <div class="tab-nav">
            <button v-for="t in typeTabs" :key="t.value"
              :class="['tab-btn', { active: activeType === t.value }]"
              @click="activeType = t.value; onTabChange()">
              {{ $t('data.' + t.key) }}<!-- all/全部 list/列表 single/详情 allSite/全站 --> ({{ tabCount(t.value) }})
            </button>
          </div>
          <div class="tab-toolbar">
            <el-input v-model="searchQuery" :placeholder="$t('data.search')" size="small" style="width:200px" clearable @input="onSearchInput" /><!-- 搜索... -->
          </div>
        </div>
        <div class="tab-card-body">
          <el-table :data="buckets" v-loading="loading" stripe @row-click="openBucket" style="cursor:pointer;width:100%;border-radius:8px;overflow:hidden">
            <el-table-column prop="id" label="ID" width="100" align="center" />
            <el-table-column :label="$t('data.bucketName')" min-width="120"><!-- 数据桶名称 -->
              <template #default="{ row }"><strong>{{ row.collect_name }}</strong></template>
            </el-table-column>
            <el-table-column label="类型" min-width="120">
              <template #default="{ row }">
                <el-tag :type="tagType(row.collect_type)" size="small" effect="plain">{{ $t('config.typeLabelShort.' + row.collect_type) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('data.todayCollect')" min-width="100"><!-- 今日采集 -->
              <template #default="{ row }">{{ row.to_day_collect ?? 0 }}</template>
            </el-table-column>
            <el-table-column :label="$t('data.todayRelease')" min-width="100"><!-- 今日发布 -->
              <template #default="{ row }">{{ row.to_day_release ?? 0 }}</template>
            </el-table-column>
            <el-table-column :label="$t('data.unreleased')" min-width="100"><!-- 未发布 -->
              <template #default="{ row }"><span style="color:#e6a23c;font-weight:600">{{ row.not_release_count ?? 0 }}</span></template>
            </el-table-column>
            <el-table-column :label="$t('data.released')" min-width="100"><!-- 已发布 -->
              <template #default="{ row }">{{ row.release_count ?? 0 }}</template>
            </el-table-column>
            <el-table-column :label="$t('data.totalData')" min-width="100"><!-- 总数据 -->
              <template #default="{ row }">{{ row.all_count ?? 0 }}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button size="small" link type="primary" @click.stop="openBucket(row)">{{ $t('data.enterBucket') }}<!-- 进入桶 --></el-button>
                <el-button size="small" link @click.stop="quickPublish(row)">{{ $t('data.quickPublish') }}<!-- 快捷发布 --></el-button>
              </template>
            </el-table-column>
          </el-table>

          <div style="display:flex;justify-content:center;margin-top:16px" v-if="totalPages > 1">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="perPage" :current-page="page" @current-change="p => { page = p; fetchBuckets() }" />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <DataDetail :bucket="selectedBucket" @back="selectedBucket = null" />
    </template>

    <el-dialog v-model="showQuickPublish" :title="$t('data.quickPublish')" width="400px" :close-on-click-modal="false"><!-- 快捷发布 -->
      <p style="margin:0 0 12px">{{ $t('data.publishCount', { name: quickBucket?.collect_name }) }}<!-- 将对「{name}」进行批量发布 --></p>
      <el-input-number v-model="quickCount" :min="1" :max="100" style="width:100%" />
      <template #footer>
        <el-button @click="showQuickPublish = false">{{ $t('config.cancelBtn') }}<!-- 取消 --></el-button>
        <el-button type="primary" @click="doQuickPublish">{{ $t('data.confirmPublish') }}<!-- 确认发布 --></el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import DataDetail from '../components/DataDetail.vue'
import { getBuckets, getBucketsStats, batchPublish } from '../api/data.js'

const { t } = useI18n()

const buckets = ref([])
const bucketStats = ref({ total: 0, list: 0, single: 0, all: 0 })
const loading = ref(false)
const page = ref(1)
const perPage = ref(10)
const total = ref(0)
const totalPages = ref(0)
const searchQuery = ref('')
const selectedBucket = ref(null)
const showQuickPublish = ref(false)
const quickBucket = ref(null)
const quickCount = ref(10)
let searchTimer = null

const dataTabMap = { 'all': '', 'list': 'list', 'single': 'single', 'allsite': 'all' }
const dataTabReverseMap = { '': 'all', 'list': 'list', 'single': 'single', 'all': 'allsite' }

function getTabFromUrl() {
  return new URLSearchParams(location.search).get('tab') || 'all'
}

function syncTabToUrl(type) {
  const url = new URL(location.href)
  url.searchParams.set('tab', dataTabReverseMap[type] || 'all')
  history.replaceState(null, '', url.toString())
}

const activeType = ref(dataTabMap[getTabFromUrl()] ?? '')

watch(activeType, syncTabToUrl)

onActivated(() => {
  const type = dataTabMap[getTabFromUrl()]
  if (type !== undefined && type !== activeType.value) {
    activeType.value = type
    onTabChange()
  }
})

const typeTabs = [
  { key: 'all', value: '' }, { key: 'list', value: 'list' },
  { key: 'single', value: 'single' }, { key: 'allSite', value: 'all' },
]
function tagType(t) { return { list: 'success', single: '', all: 'warning' }[t] || '' }
function tabCount(v) { return v === '' ? bucketStats.value.total : (bucketStats.value[v] || 0) }

function onTabChange() {
  page.value = 1
  fetchBuckets()
}

async function fetchBucketsStats() {
  try { const r = await getBucketsStats(); bucketStats.value = r.data || {} } catch {}
}
async function fetchBuckets() {
  loading.value = true
  try {
    const p = { page: page.value, per_page: perPage.value }
    if (activeType.value) p.type = activeType.value
    if (searchQuery.value) p.search = searchQuery.value
    const r = await getBuckets(p)
    buckets.value = r.data || []
    total.value = r.meta?.total || 0
    totalPages.value = r.meta?.total_pages || 0
  } catch { buckets.value = [] }
  finally { loading.value = false }
}
function onSearchInput() { clearTimeout(searchTimer); searchTimer = setTimeout(() => { page.value = 1; fetchBuckets() }, 300) }

function openBucket(b) { selectedBucket.value = b }
function quickPublish(b) { quickBucket.value = b; quickCount.value = 10; showQuickPublish.value = true }
async function doQuickPublish() {
  try { await batchPublish({ option_id: quickBucket.value.id, count: quickCount.value }); showQuickPublish.value = false; fetchBuckets(); ElMessage.success(t('data.done')) }
  catch (e) { ElMessage.error(e.message) }
}
onMounted(() => { fetchBuckets(); fetchBucketsStats() })
</script>
