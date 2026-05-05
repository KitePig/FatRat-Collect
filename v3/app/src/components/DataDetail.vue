<template>
  <div class="data-detail">
    <div class="page-header">
      <button class="btn btn-outline" @click="$emit('back')">← 返回桶列表</button>
      <h2 style="margin-left:12px">{{ bucket.collect_name }}</h2>
      <span :class="['type-badge', 'type-' + bucket.collect_type]">{{ bucket.collect_type }}</span>
    </div>

    <!-- 刷新/批量操作 -->
    <div class="data-detail-bar">
      <div class="status-tabs">
        <button v-for="s in statusTabs" :key="s.value" :class="['tab-btn', { active: statusFilter === s.value }]" @click="statusFilter = s.value; fetchData()">
          {{ s.label }} <span class="tab-count">({{ statusCount(s.value) }})</span>
        </button>
      </div>
      <div class="bar-actions">
        <button class="btn btn-outline" @click="fetchData">刷新</button>
        <button v-if="bucket.collect_type !== 'single'" class="btn btn-outline" @click="doPlay">{{ playing ? '⏹ 停止' : '▶ 逐步采集' }}</button>
        <button class="btn btn-primary" @click="showReleaseConfig = true">发布配置</button>
      </div>
    </div>

    <div class="table-wrap">
      <table v-if="items.length" class="data-table">
        <thead>
          <tr>
            <th style="width:50px">ID</th>
            <th style="width:100px">状态</th>
            <th>标题</th>
            <th style="width:200px">链接</th>
            <th style="width:100px">文章ID</th>
            <th style="width:180px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="cell-id">{{ item.id }}</td>
            <td><span :class="['status-badge', 'status-' + item.status]">{{ statusLabel(item.status) }}</span></td>
            <td>
              <div class="data-title" :title="item.title">{{ item.title }}</div>
            </td>
            <td>
              <a v-if="item.link" :href="item.link" target="_blank" class="link">{{ truncate(item.link, 24) }}</a>
            </td>
            <td>
              <a v-if="item.post_id" :href="adminUrl + 'post.php?post=' + item.post_id + '&action=edit'" target="_blank" class="link">#{{ item.post_id }}</a>
              <span v-else>-</span>
            </td>
            <td>
              <div class="actions">
                <button v-if="item.status == 2" class="btn-sm btn-edit" @click="doPublish(item)">发布</button>
                <button v-if="item.status == 2" class="btn-sm btn-outline" @click="doPreview(item)">预览</button>
                <button class="btn-sm btn-delete" @click="doDelete(item)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="!loading" class="empty-wrap"><p>暂无数据</p></div>
      <div v-if="loading" class="loading-wrap"><div class="spinner"></div></div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button class="page-btn" :disabled="page <= 1" @click="page--; fetchData()">上一页</button>
      <span class="page-info">{{ page }} / {{ totalPages }} · {{ total }} 条</span>
      <button class="page-btn" :disabled="page >= totalPages" @click="page++; fetchData()">下一页</button>
    </div>

    <!-- 发布配置弹窗 -->
    <div class="modal-overlay" v-if="showReleaseConfig" @click.self="showReleaseConfig = false">
      <div class="modal-panel">
        <div class="modal-header"><h3>发布配置</h3><button class="modal-close" @click="showReleaseConfig = false">&times;</button></div>
        <div class="modal-body" style="padding:24px">
          <div class="form-row">
            <div class="form-group">
              <label>发布状态</label>
              <select v-model="releaseConfig.status">
                <option value="publish">发布</option>
                <option value="pending">待审核</option>
                <option value="draft">草稿</option>
              </select>
            </div>
            <div class="form-group">
              <label>发布类型</label>
              <select v-model="releaseConfig.type">
                <option v-for="pt in postTypes" :key="pt.id" :value="pt.id">{{ pt.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>特色图片</label>
              <select v-model="releaseConfig.thumbnail">
                <option value="thumbnail1">正文第一张</option>
                <option value="thumbnail2">不需要</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>发布分类（多选）</label>
              <select v-model="releaseConfig.category" multiple style="height:120px">
                <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>发布作者（多选随机）</label>
              <select v-model="releaseConfig.user" multiple style="height:120px">
                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-cancel" @click="showReleaseConfig = false">取消</button>
          <button class="btn btn-primary" @click="doSaveReleaseConfig">保存发布配置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDataDetail, deleteDataItem, publishArticle, previewArticle, getReleaseConfig, saveReleaseConfig, wechatPlay } from '../api/data.js'
import { getCategories, getUsers, getPostTypes } from '../api/config.js'

const props = defineProps({ bucket: Object })
const emit = defineEmits(['back'])

const adminUrl = window.frcV3Data?.adminUrl || ''
const items = ref([])
const loading = ref(false)
const page = ref(1)
const perPage = ref(20)
const total = ref(0)
const totalPages = ref(0)
const statusFilter = ref('')
const playing = ref(false)
const statusCounts = ref({ all: 0, '1': 0, '2': 0, '3': 0, '5': 0 })
let playTimer = null

const showReleaseConfig = ref(false)
const releaseConfig = ref({ status: 'pending', type: 'post', thumbnail: 'thumbnail1', category: [1], user: [], release_type: 'WordPress', extension_field: 'post' })
const categories = ref([])
const users = ref([])
const postTypes = ref([])

const statusTabs = [
  { label: '全部', value: '' },
  { label: '待采集', value: '1' },
  { label: '已采集', value: '2' },
  { label: '已发布', value: '3' },
  { label: '失败', value: '5' },
]

function statusLabel(s) { return { '1':'待采集','2':'已采集','3':'已发布','5':'失败' }[s] || s }
function truncate(s, n) { return s && s.length > n ? s.slice(0, n) + '...' : s || '-' }
function statusCount(v) { return statusCounts.value[v] ?? 0 }

async function fetchData() {
  loading.value = true
  try {
    const params = { page: page.value, per_page: perPage.value }
    if (statusFilter.value) params.status = statusFilter.value
    const res = await getDataDetail(props.bucket.id, params)
    items.value = res.data || []
    total.value = res.meta?.total || 0
    totalPages.value = res.meta?.total_pages || 0
    if (res.meta?.status_counts) statusCounts.value = res.meta.status_counts
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function doDelete(item) {
  if (!confirm('确定删除？')) return
  try { await deleteDataItem(item.id); fetchData() } catch (e) { alert(e.message) }
}

async function doPublish(item) {
  try {
    const res = await publishArticle(item.id)
    alert(res.msg || (res.code === 200 ? '发布成功' : '发布失败'))
    fetchData()
  } catch (e) { alert(e.message) }
}

async function doPreview(item) {
  try {
    const res = await previewArticle(item.id)
    if (res.code === 200 && res.data?.post_id) {
      window.open(adminUrl + '?p=' + res.data.post_id + '&preview=true', '_blank')
    } else {
      alert(res.msg || '预览失败')
    }
  } catch (e) { alert(e.message) }
}

function doPlay() {
  if (playing.value) {
    clearInterval(playTimer)
    playing.value = false
    return
  }
  playing.value = true
  const tick = async () => {
    try { await wechatPlay(); fetchData() } catch (e) {}
  }
  tick()
  playTimer = setInterval(tick, 3000)
}

async function loadReleaseConfig() {
  try {
    const res = await getReleaseConfig(props.bucket.id)
    if (res.data) releaseConfig.value = { ...releaseConfig.value, ...res.data }
  } catch (e) {}
}

async function doSaveReleaseConfig() {
  try {
    await saveReleaseConfig(props.bucket.id, {
      category: releaseConfig.value.category,
      user: releaseConfig.value.user,
      status: releaseConfig.value.status,
      thumbnail: releaseConfig.value.thumbnail,
      type: releaseConfig.value.type,
      release_type: releaseConfig.value.release_type,
      extension_field: releaseConfig.value.extension_field,
    })
    showReleaseConfig.value = false
    alert('发布配置保存成功')
  } catch (e) { alert(e.message) }
}

onMounted(async () => {
  fetchData()
  const [c, u, pt] = await Promise.all([getCategories(), getUsers(), getPostTypes()])
  categories.value = c.data || []
  users.value = u.data || []
  postTypes.value = pt.data || []
  loadReleaseConfig()
})
</script>
