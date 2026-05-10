<template>
  <div class="page-config">
    <div class="page-header">
      <h2>{{ $t('config.title') }}<!-- 配置中心 --></h2>
      <p>{{ $t('config.desc') }}<!-- 管理采集规则，所有配置统一维护 --></p>
    </div>

    <div class="stats-grid">
      <div v-for="s in statCards" :key="s.key" class="stat-card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span class="stat-dot" :style="{ background: s.color }"></span>
          <span class="stat-label">{{ $t('config.' + s.labelKey) }}<!-- allConfig/全部配置 listConfig/列表采集 singleConfig/详情采集 allSiteConfig/全站采集 --></span>
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
            {{ $t(t.labelKey) }}<!-- allConfig/全部配置 listConfig/列表采集 singleConfig/详情采集 allSiteConfig/全站采集 --> ({{ tabCount(t.value) }})
          </button>
        </div>
        <div class="tab-toolbar">
          <el-input v-model="searchQuery" :placeholder="$t('config.search')" size="small" style="width:200px" clearable @input="onSearchInput"><!-- 搜索配置… -->
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-button size="small" @click="handleImportDefaults">{{ $t('config.importSample') }}<!-- 导入示例 --></el-button>
          <el-button type="primary" size="small" @click="openCreateForm">{{ $t('config.createConfig') }}<!-- 新建配置 --></el-button>
        </div>
      </div>
      <div class="tab-card-body">
        <el-table :data="configs" v-loading="loading" stripe>
          <el-table-column prop="id" label="ID" width="100" align="center" />
          <el-table-column prop="collect_name" :label="$t('config.name')" min-width="120"><!-- 名称 -->
            <template #default="{ row }"><strong style="font-weight:600">{{ row.collect_name }}</strong></template>
          </el-table-column>
          <el-table-column :label="$t('config.type')" width="120" align="center"><!-- 类型 -->
            <template #default="{ row }">
              <el-tag :type="tagType(row.collect_type)" size="small" effect="plain">{{ $t('config.typeLabelShort.' + row.collect_type) }}<!-- list/列表 single/详情 all/全站 --></el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('config.descLabel')" min-width="200" show-overflow-tooltip><!-- 描述 -->
            <template #default="{ row }"><span style="color:var(--text3)">{{ row.collect_describe || '—' }}</span></template>
          </el-table-column>
          <el-table-column :label="$t('config.collectUrl')" width="160" show-overflow-tooltip><!-- 采集地址 -->
            <template #default="{ row }">
              <a v-if="row.collect_list_url" :href="row.collect_list_url" target="_blank" style="color:var(--accent);font-size:12px;text-decoration:none">{{ truncateUrl(row.collect_list_url) }}</a>
              <span v-else style="color:#d6d3d1">—</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('config.createdAt')" width="180"><!-- 创建时间 -->
            <template #default="{ row }"><span style="color:var(--text3);font-size:12px">{{ formatDate(row.created_at) }}</span></template>
          </el-table-column>
          <el-table-column :label="$t('config.actions')" width="150" fixed="right"><!-- 操作 -->
            <template #default="{ row }">
              <el-button size="small" link type="primary" @click="openEditForm(row)">{{ $t('config.edit') }}<!-- 编辑 --></el-button>
              <el-popconfirm :title="$t('config.confirmDelete')" :confirm-button-text="$t('config.confirmBtn')" :cancel-button-text="$t('config.cancelBtn')" @confirm="handleDelete(row)"><!-- 确定删除此配置？ / 删除 / 取消 -->
                <template #reference><el-button size="small" link style="color:var(--danger)">{{ $t('config.delete') }}<!-- 删除 --></el-button></template>
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
import { ref, onMounted, onActivated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getConfigs, getStats, deleteConfig, importDefaults } from '../api/config.js'
import ConfigFormModal from '../components/ConfigFormModal.vue'

const { t } = useI18n()

const configs = ref([])
const stats = ref({ total: 0, list: 0, single: 0, all: 0 })
const loading = ref(false); const page = ref(1); const perPage = ref(10)
const total = ref(0); const totalPages = ref(0)
const searchQuery = ref(''); const showForm = ref(false); const editingConfig = ref(null)
let searchTimer = null

// URL tab value → internal activeType mapping
const configTabMap = { 'all': '', 'list': 'list', 'single': 'single', 'allsite': 'all' }
const configTabReverseMap = { '': 'all', 'list': 'list', 'single': 'single', 'all': 'allsite' }

function getTabFromUrl() {
  return new URLSearchParams(location.search).get('tab') || 'all'
}

function syncTabToUrl(type) {
  const url = new URL(location.href)
  url.searchParams.set('tab', configTabReverseMap[type] || 'all')
  history.replaceState(null, '', url.toString())
}

const activeType = ref(configTabMap[getTabFromUrl()] ?? '')

watch(activeType, syncTabToUrl)

onActivated(() => {
  const type = configTabMap[getTabFromUrl()]
  if (type !== undefined && type !== activeType.value) {
    activeType.value = type
    onTabChange()
  }
})

const statCards = [
  { key: 'total', labelKey: 'allConfig', color: '#4f46e5' },
  { key: 'list', labelKey: 'listConfig', color: '#059669' },
  { key: 'single', labelKey: 'singleConfig', color: '#2563eb' },
  { key: 'all', labelKey: 'allSiteConfig', color: '#7c3aed' },
]
const typeTabs = [
  { labelKey: 'config.allConfig', value: '' },
  { labelKey: 'config.listConfig', value: 'list' },
  { labelKey: 'config.singleConfig', value: 'single' },
  { labelKey: 'config.allSiteConfig', value: 'all' },
]
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
  // 已删除
  try { await deleteConfig(item.id); fetchConfigs(); fetchStats(); ElMessage.success({ message: t('config.deleted'), offset: 60 }) } catch(e) { ElMessage.error({ message: e.message, offset: 60 }) }
}
async function handleImportDefaults() {
  // 示例导入成功
  try { await importDefaults(); fetchConfigs(); fetchStats(); ElMessage.success({ message: t('config.imported'), offset: 60 }) } catch(e) { ElMessage.error({ message: e.message, offset: 60 }) }
}
onMounted(() => { fetchConfigs(); fetchStats() })
</script>
