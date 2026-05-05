<template>
  <div class="config-center">
    <!-- 统计卡片 -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-number">{{ stats.total }}</div>
        <div class="stat-label">全部配置</div>
      </div>
      <div class="stat-card stat-card--list">
        <div class="stat-number">{{ stats.list }}</div>
        <div class="stat-label">列表采集</div>
      </div>
      <div class="stat-card stat-card--single">
        <div class="stat-number">{{ stats.single }}</div>
        <div class="stat-label">详情采集</div>
      </div>
      <div class="stat-card stat-card--all">
        <div class="stat-number">{{ stats.all }}</div>
        <div class="stat-label">全站采集</div>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="type-tabs">
          <button
            v-for="tab in typeTabs"
            :key="tab.value"
            :class="['tab-btn', { active: activeType === tab.value }]"
            @click="activeType = tab.value; fetchConfigs()"
          >
            {{ tab.label }} <span class="tab-count">({{ tabCount(tab.value) }})</span>
          </button>
        </div>
      </div>
      <div class="toolbar-right">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索配置名称..."
            @input="onSearchInput"
          />
        </div>
        <button class="btn btn-outline" @click="handleImportDefaults">
          导入示例
        </button>
        <button class="btn btn-primary" @click="openCreateForm">
          + 新建配置
        </button>
      </div>
    </div>

    <!-- 配置列表 -->
    <div class="table-wrap">
      <table class="data-table" v-if="configs.length > 0 && !loading">
        <thead>
          <tr>
            <th style="width:60px">ID</th>
            <th>名称</th>
            <th style="width:90px">类型</th>
            <th>描述</th>
            <th style="width:130px">采集地址</th>
            <th style="width:120px">创建时间</th>
            <th style="width:140px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in configs" :key="item.id">
            <td class="cell-id">{{ item.id }}</td>
            <td>
              <span class="config-name">{{ item.collect_name }}</span>
            </td>
            <td>
              <span :class="['type-badge', 'type-' + item.collect_type]">
                {{ typeLabels[item.collect_type] || item.collect_type }}
              </span>
            </td>
            <td class="cell-desc">{{ item.collect_describe || '-' }}</td>
            <td>
              <a v-if="item.collect_list_url" :href="item.collect_list_url" target="_blank" class="link">
                {{ truncateUrl(item.collect_list_url) }}
              </a>
              <span v-else>-</span>
            </td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>
              <div class="actions">
                <button class="btn-sm btn-edit" @click="openEditForm(item)">编辑</button>
                <button class="btn-sm btn-delete" @click="handleDelete(item)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-wrap">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && configs.length === 0" class="empty-wrap">
        <div class="empty-icon">📋</div>
        <p>还没有配置，点击"新建配置"开始吧</p>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="totalPages > 1">
      <button class="page-btn" :disabled="page <= 1" @click="page--; fetchConfigs()">上一页</button>
      <span class="page-info">第 {{ page }} / {{ totalPages }} 页，共 {{ total }} 条</span>
      <button class="page-btn" :disabled="page >= totalPages" @click="page++; fetchConfigs()">下一页</button>
    </div>

    <!-- 配置表单弹窗 -->
    <ConfigFormModal
      v-if="showForm"
      :config="editingConfig"
      @close="closeForm"
      @saved="onSaved"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getConfigs, getStats, deleteConfig, importDefaults } from '../api/config.js'
import ConfigFormModal from '../components/ConfigFormModal.vue'

const configs = ref([])
const stats = ref({ total: 0, list: 0, single: 0, all: 0 })
const loading = ref(false)
const page = ref(1)
const perPage = ref(10)
const total = ref(0)
const totalPages = ref(0)
const activeType = ref('')
const searchQuery = ref('')
const showForm = ref(false)
const editingConfig = ref(null)
let searchTimer = null

const typeTabs = [
  { label: '全部', value: '' },
  { label: '列表采集', value: 'list' },
  { label: '详情采集', value: 'single' },
  { label: '全站采集', value: 'all' },
]

const typeLabels = {
  list: '列表采集',
  single: '详情采集',
  all: '全站采集',
  keyword: '关键字',
}

function tabCount(value) {
  if (value === '') return stats.value.total
  return stats.value[value] || 0
}

async function fetchConfigs() {
  loading.value = true
  try {
    const params = { page: page.value, per_page: perPage.value }
    if (activeType.value) params.type = activeType.value
    if (searchQuery.value) params.search = searchQuery.value

    const res = await getConfigs(params)
    configs.value = res.data || []
    total.value = res.meta?.total || 0
    totalPages.value = res.meta?.total_pages || 0
  } catch (e) {
    console.error('获取配置列表失败:', e)
  } finally {
    loading.value = false
  }
}

async function fetchStats() {
  try {
    const res = await getStats()
    stats.value = res.data || { total: 0, list: 0, single: 0, all: 0 }
  } catch (e) {
    console.error('获取统计数据失败:', e)
  }
}

function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    fetchConfigs()
  }, 300)
}

function openCreateForm() {
  editingConfig.value = null
  showForm.value = true
}

function openEditForm(item) {
  editingConfig.value = { ...item }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingConfig.value = null
}

function onSaved() {
  showForm.value = false
  editingConfig.value = null
  fetchConfigs()
  fetchStats()
}

async function handleDelete(item) {
  if (!confirm(`确定要删除配置「${item.collect_name}」吗？`)) return
  try {
    await deleteConfig(item.id)
    fetchConfigs()
    fetchStats()
  } catch (e) {
    alert('删除失败: ' + e.message)
  }
}

async function handleImportDefaults() {
  try {
    await importDefaults()
    fetchConfigs()
    fetchStats()
    alert('示例配置导入成功！')
  } catch (e) {
    alert('导入失败: ' + e.message)
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return dateStr.replace('T', ' ').substring(0, 16)
}

function truncateUrl(url) {
  if (!url) return '-'
  return url.length > 28 ? url.substring(0, 28) + '...' : url
}

onMounted(() => {
  fetchConfigs()
  fetchStats()
})
</script>
