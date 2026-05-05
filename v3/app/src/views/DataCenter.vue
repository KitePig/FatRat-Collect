<template>
  <div class="page-data">
    <template v-if="!selectedBucket">
      <div class="page-header">
        <h2>数据桶中心</h2>
        <p>管理所有采集配置下的数据，一目了然</p>
      </div>

      <div class="toolbar">
        <div class="type-tabs">
          <button v-for="t in typeTabs" :key="t.value" :class="['tab-btn', { active: activeType === t.value }]" @click="activeType = t.value; fetchBuckets()">{{ t.label }} <span class="tab-count">({{ tabCount(t.value) }})</span></button>
        </div>
        <div class="search-box">
          <input v-model="searchQuery" placeholder="搜索..." @input="onSearchInput" />
        </div>
      </div>

      <div class="table-wrap">
        <table v-if="buckets.length" class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>数据桶名称</th>
              <th>类型</th>
              <th>今日采集</th>
              <th>今日发布</th>
              <th>未发布</th>
              <th>已发布</th>
              <th>总数据</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in buckets" :key="b.id" @click="openBucket(b)" style="cursor:pointer">
              <td class="cell-id">{{ b.id }}</td>
              <td><strong>{{ b.collect_name }}</strong></td>
              <td><span :class="['type-badge', 'type-' + b.collect_type]">{{ typeLabel(b.collect_type) }}</span></td>
              <td>{{ b.to_day_collect || 0 }}</td>
              <td>{{ b.to_day_release || 0 }}</td>
              <td><span class="text-orange">{{ b.not_release_count || 0 }}</span></td>
              <td>{{ b.release_count || 0 }}</td>
              <td><strong>{{ b.all_count || 0 }}</strong></td>
              <td>
                <button class="btn-sm btn-edit" @click.stop="openBucket(b)">进入桶</button>
                <button class="btn-sm btn-delete" @click.stop="quickPublish(b)">快捷发布</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else-if="!loading" class="empty-wrap">
          <div class="empty-icon">🗄️</div>
          <p>暂无数据桶</p>
        </div>
        <div v-if="loading" class="loading-wrap"><div class="spinner"></div></div>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button class="page-btn" :disabled="page <= 1" @click="page--; fetchBuckets()">上一页</button>
        <span class="page-info">{{ page }} / {{ totalPages }} · 共 {{ total }} 条</span>
        <button class="page-btn" :disabled="page >= totalPages" @click="page++; fetchBuckets()">下一页</button>
      </div>
    </template>

    <template v-else>
      <DataDetail :bucket="selectedBucket" @back="selectedBucket = null" />
    </template>

    <!-- 快捷发布弹窗 -->
    <div class="modal-overlay" v-if="showQuickPublish" @click.self="showQuickPublish = false">
      <div class="modal-panel modal-sm">
        <div class="modal-header"><h3>快捷发布</h3><button class="modal-close" @click="showQuickPublish = false">&times;</button></div>
        <div class="modal-body" style="padding:24px">
          <p>将对「{{ quickBucket?.collect_name }}」的数据进行批量发布。</p>
          <div class="form-group">
            <label>发布数量（最多100篇）</label>
            <input v-model.number="quickCount" type="number" min="1" max="100" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-cancel" @click="showQuickPublish = false">取消</button>
          <button class="btn btn-primary" @click="doQuickPublish">确认发布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
  { label: '全部', value: '' },
  { label: '列表', value: 'list' },
  { label: '详情', value: 'single' },
  { label: '全站', value: 'all' },
]

function typeLabel(t) { return { list: '列表', single: '详情', all: '全站', keyword: '关键字' }[t] || t }

function tabCount(value) {
  if (value === '') return bucketStats.value.total
  return bucketStats.value[value] || 0
}

async function fetchBucketsStats() {
  try { const res = await getBucketsStats(); bucketStats.value = res.data || { total: 0, list: 0, single: 0, all: 0 } }
  catch (e) { console.error(e) }
}

async function fetchBuckets() {
  loading.value = true
  try {
    const params = { page: page.value, per_page: perPage.value }
    if (activeType.value) params.type = activeType.value
    if (searchQuery.value) params.search = searchQuery.value
    const res = await getBuckets(params)
    buckets.value = res.data || []
    total.value = res.meta?.total || 0
    totalPages.value = res.meta?.total_pages || 0
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; fetchBuckets() }, 300)
}

function openBucket(b) { selectedBucket.value = b }

function quickPublish(b) {
  quickBucket.value = b
  quickCount.value = 10
  showQuickPublish.value = true
}

async function doQuickPublish() {
  try {
    await batchPublish({ option_id: quickBucket.value.id, count: quickCount.value })
    showQuickPublish.value = false
    fetchBuckets()
  } catch (e) { alert('发布失败: ' + e.message) }
}

onMounted(() => { fetchBuckets(); fetchBucketsStats() })
</script>
