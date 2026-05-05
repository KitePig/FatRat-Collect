<template>
  <div class="page-data">
    <template v-if="!selectedBucket">
      <div class="page-header">
        <h2>数据桶中心</h2>
        <p style="color:#909399;font-size:13px;margin:0">管理所有采集配置下的数据</p>
      </div>

      <el-tabs v-model="activeType" type="border-card" @tab-change="onTabChange">
        <el-tab-pane v-for="t in typeTabs" :key="t.value" :label="`${t.label} (${tabCount(t.value)})`" :name="t.value">
          <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
            <el-input v-model="searchQuery" placeholder="搜索..." size="small" style="width:200px" clearable @input="onSearchInput" />
          </div>

          <el-table :data="buckets" v-loading="loading" stripe @row-click="openBucket" style="cursor:pointer;width:100%;border-radius:8px;overflow:hidden">
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column prop="collect_name" label="数据桶名称">
              <template #default="{ row }"><strong>{{ row.collect_name }}</strong></template>
            </el-table-column>
            <el-table-column label="类型" width="90">
              <template #default="{ row }">
                <el-tag :type="tagType(row.collect_type)" size="small" effect="plain">{{ typeLabel(row.collect_type) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="to_day_collect" label="今日采集" width="90" />
            <el-table-column prop="to_day_release" label="今日发布" width="90" />
            <el-table-column label="未发布" width="90">
              <template #default="{ row }"><span style="color:#e6a23c;font-weight:600">{{ row.not_release_count || 0 }}</span></template>
            </el-table-column>
            <el-table-column prop="release_count" label="已发布" width="80" />
            <el-table-column prop="all_count" label="总数据" width="80" />
            <el-table-column label="操作" width="180" fixed="right">
              <template #default="{ row }">
                <el-button size="small" link type="primary" @click.stop="openBucket(row)">进入桶</el-button>
                <el-button size="small" link @click.stop="quickPublish(row)">快捷发布</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div style="display:flex;justify-content:center;margin-top:16px" v-if="totalPages > 1">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="perPage" :current-page="page" @current-change="p => { page = p; fetchBuckets() }" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>

    <template v-else>
      <DataDetail :bucket="selectedBucket" @back="selectedBucket = null" />
    </template>

    <el-dialog v-model="showQuickPublish" title="快捷发布" width="400px" :close-on-click-modal="false">
      <p style="margin:0 0 12px">将对「{{ quickBucket?.collect_name }}」进行批量发布</p>
      <el-input-number v-model="quickCount" :min="1" :max="100" style="width:100%" />
      <template #footer>
        <el-button @click="showQuickPublish = false">取消</el-button>
        <el-button type="primary" @click="doQuickPublish">确认发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import DataDetail from '../components/DataDetail.vue'
import { getBuckets, getBucketsStats, batchPublish } from '../api/data.js'

const buckets = ref([])
const bucketStats = ref({ total: 0, list: 0, single: 0, all: 0 })
const loading = ref(false)
const page = ref(1)
const perPage = ref(10)
const total = ref(0)
const totalPages = ref(0)
const activeType = ref('')
const searchQuery = ref('')
const selectedBucket = ref(null)
const showQuickPublish = ref(false)
const quickBucket = ref(null)
const quickCount = ref(10)
let searchTimer = null

const typeTabs = [
  { label: '全部', value: '' }, { label: '列表', value: 'list' },
  { label: '详情', value: 'single' }, { label: '全站', value: 'all' },
]
function typeLabel(t) { return { list: '列表', single: '详情', all: '全站', keyword: '关键字' }[t] || t }
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
  try { await batchPublish({ option_id: quickBucket.value.id, count: quickCount.value }); showQuickPublish.value = false; fetchBuckets(); ElMessage.success('发布完成') }
  catch (e) { ElMessage.error(e.message) }
}
onMounted(() => { fetchBuckets(); fetchBucketsStats() })
</script>
