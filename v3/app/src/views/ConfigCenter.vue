<template>
  <div class="page-config">
    <div class="page-header">
      <h2>配置中心</h2>
      <p>管理采集规则，所有配置统一维护</p>
    </div>

    <div class="stats-grid">
      <div v-for="s in statCards" :key="s.key" class="stat-card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span class="stat-dot" :style="{ background: s.color }"></span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
        <div class="stat-value" :style="{ color: s.color }">{{ stats[s.key] || 0 }}</div>
      </div>
    </div>

    <div class="tab-card">
      <div class="tab-card-header">
        <div class="tab-nav">
          <button v-for="t in typeTabs" :key="t.value"
            :class="['tab-btn', { active: activeType === t.value }]"
            @click="activeType = t.value; onTabChange()">
            {{ t.label }} ({{ tabCount(t.value) }})
          </button>
        </div>
        <div class="tab-toolbar">
          <el-input v-model="searchQuery" placeholder="搜索配置…" size="small" style="width:200px" clearable @input="onSearchInput">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-button size="small" @click="handleImportDefaults">导入示例</el-button>
          <el-button type="primary" size="small" @click="openCreateForm">+ 新建配置</el-button>
        </div>
      </div>
      <div class="tab-card-body">
        <el-table :data="configs" v-loading="loading" stripe>
          <el-table-column prop="id" label="ID" width="80" align="center" />
          <el-table-column prop="collect_name" label="名称" min-width="120">
            <template #default="{ row }"><strong style="font-weight:600">{{ row.collect_name }}</strong></template>
          </el-table-column>
          <el-table-column label="类型" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="tagType(row.collect_type)" size="small" effect="plain">{{ typeLabels[row.collect_type] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="collect_describe" label="描述" min-width="200" show-overflow-tooltip>
            <template #default="{ row }"><span style="color:var(--text3)">{{ row.collect_describe || '—' }}</span></template>
          </el-table-column>
          <el-table-column label="采集地址" width="160" show-overflow-tooltip>
            <template #default="{ row }">
              <a v-if="row.collect_list_url" :href="row.collect_list_url" target="_blank" style="color:var(--accent);font-size:12px;text-decoration:none">{{ truncateUrl(row.collect_list_url) }}</a>
              <span v-else style="color:#d6d3d1">—</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template #default="{ row }"><span style="color:var(--text3);font-size:12px">{{ formatDate(row.created_at) }}</span></template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button size="small" link type="primary" @click="openEditForm(row)">编辑</el-button>
              <el-popconfirm title="确定删除此配置？" confirm-button-text="删除" cancel-button-text="取消" @confirm="handleDelete(row)">
                <template #reference><el-button size="small" link style="color:var(--danger)">删除</el-button></template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <div style="display:flex;justify-content:center;margin-top:20px" v-if="totalPages > 1">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="perPage" :current-page="page" @current-change="p => { page = p; fetchConfigs() }" />
        </div>
      </div>
    </div>

    <ConfigFormModal v-if="showForm" :config="editingConfig" @close="closeForm" @saved="onSaved" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getConfigs, getStats, deleteConfig, importDefaults } from '../api/config.js'
import ConfigFormModal from '../components/ConfigFormModal.vue'

const configs = ref([])
const stats = ref({ total: 0, list: 0, single: 0, all: 0 })
const loading = ref(false); const page = ref(1); const perPage = ref(10)
const total = ref(0); const totalPages = ref(0); const activeType = ref('')
const searchQuery = ref(''); const showForm = ref(false); const editingConfig = ref(null)
let searchTimer = null

const statCards = [
  { key: 'total', label: '全部配置', color: '#4f46e5' },
  { key: 'list', label: '列表采集', color: '#059669' },
  { key: 'single', label: '详情采集', color: '#2563eb' },
  { key: 'all', label: '全站采集', color: '#7c3aed' },
]
const typeTabs = [
  { label: '全部', value: '' }, { label: '列表', value: 'list' },
  { label: '详情', value: 'single' }, { label: '全站', value: 'all' },
]
const typeLabels = { list: '列表', single: '详情', all: '全站' }
function tagType(t) { return { list:'success', single:'', all:'warning' }[t]||'' }
function tabCount(v) { return v==='' ? stats.value.total : (stats.value[v]||0) }
function formatDate(d) { return d ? d.replace('T',' ').substring(0,16) : '—' }
function truncateUrl(u) { return u && u.length > 30 ? u.substring(0,30)+'…' : u||'—' }

function onTabChange() {
  page.value = 1
  fetchConfigs()
}

async function fetchConfigs() {
  loading.value = true
  try {
    const p = { page: page.value, per_page: perPage.value }
    if (activeType.value) p.type = activeType.value
    if (searchQuery.value) p.search = searchQuery.value
    const r = await getConfigs(p)
    configs.value = r.data || []; total.value = r.meta?.total || 0; totalPages.value = r.meta?.total_pages || 0
  } catch { configs.value = [] } finally { loading.value = false }
}
async function fetchStats() { try { const r = await getStats(); stats.value = r.data || {} } catch {} }
function onSearchInput() { clearTimeout(searchTimer); searchTimer = setTimeout(()=>{ page.value=1; fetchConfigs() }, 300) }
function openCreateForm() { editingConfig.value = null; showForm.value = true }
function openEditForm(item) { editingConfig.value = { ...item }; showForm.value = true }
function closeForm() { showForm.value = false; editingConfig.value = null }
function onSaved() { closeForm(); fetchConfigs(); fetchStats() }
async function handleDelete(item) {
  try { await deleteConfig(item.id); fetchConfigs(); fetchStats(); ElMessage.success('已删除') } catch(e) { ElMessage.error(e.message) }
}
async function handleImportDefaults() {
  try { await importDefaults(); fetchConfigs(); fetchStats(); ElMessage.success('示例导入成功') } catch(e) { ElMessage.error(e.message) }
}
onMounted(() => { fetchConfigs(); fetchStats() })
</script>
