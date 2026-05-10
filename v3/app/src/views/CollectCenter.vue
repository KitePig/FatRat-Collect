<template>
  <div class="page-collect">
    <div class="page-header">
      <h2>{{ $t('collect.title') }}<!-- 采集中心 --></h2>
      <p style="color:#909399;font-size:13px;margin:0">{{ $t('collect.desc') }}<!-- 多种采集方式，灵活应对不同场景 --></p>
    </div>

    <el-tabs v-model="activeTab" type="border-card" class="collect-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.name" :name="tab.id">
        <div class="collect-card">
          <el-alert v-if="tab.desc" :title="tab.desc" type="info" :closable="false" style="margin-bottom:16px" />

          <!-- 微信/简书/知乎/详情 -->
          <template v-if="tab.input === 'urls'">
            <el-input v-model="urls[tab.id]" type="textarea" :rows="4" :placeholder="tab.placeholder" style="margin-bottom:12px" />
            <el-button type="primary" :loading="running === tab.id" @click="runCollect(tab.id, tab.collect)">
              {{ running === tab.id ? $t('collect.running') : $t('collect.start') }}<!-- 采集中... / 开始采集 -->
            </el-button>
          </template>

          <!-- 列表采集 -->
          <template v-if="tab.id === 'list'">
            <el-select v-model="listOptionId" :placeholder="$t('collect.selectConfig')" style="width:320px;margin-right:12px"><!-- 选择配置 -->
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'list'" :disabled="!listOptionId" @click="runCollect('list', { option_id: listOptionId })">
              {{ running === 'list' ? $t('collect.running') : $t('collect.list') }}<!-- 采集中... / 列表采集 -->
            </el-button>
          </template>

          <!-- 分页采集 -->
          <template v-if="tab.id === 'history'">
            <el-select v-model="historyOptionId" :placeholder="$t('collect.selectConfig')" style="width:240px;margin-right:12px"><!-- 选择配置 -->
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-input v-model="historyPaging" :placeholder="$t('collect.selectPaging')" style="width:140px;margin-right:12px" /><!-- 分页 1-10 -->
            <el-button type="primary" :loading="running === 'history'" :disabled="!historyOptionId" @click="runCollect('history', { option_id: historyOptionId, paging: historyPaging })">
              {{ running === 'history' ? $t('collect.running') : $t('collect.history') }}<!-- 采集中... / 分页采集 -->
            </el-button>
          </template>

          <!-- 详情采集 -->
          <template v-if="tab.id === 'detail'">
            <el-input v-model="urls.detail" type="textarea" :rows="3" :placeholder="$t('collect.inputLinks')" style="margin-bottom:12px" /><!-- 每行一个链接 -->
            <el-select v-model="detailOptionId" :placeholder="$t('collect.selectConfig')" style="width:240px;margin-right:12px"><!-- 选择配置 -->
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'detail'" :disabled="!detailOptionId || !urls.detail.trim()" @click="runCollect('detail', { collect_urls: urls.detail, option_id: detailOptionId })">
              {{ running === 'detail' ? $t('collect.running') : $t('collect.detail') }}<!-- 采集中... / 详情采集 -->
            </el-button>
          </template>

          <!-- 全站采集 -->
          <template v-if="tab.id === 'all'">
            <el-select v-model="allOptionId" :placeholder="$t('collect.selectConfig')" style="width:320px;margin-right:12px"><!-- 选择配置 -->
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'all'" :disabled="!allOptionId" @click="runCollect('all', { option_id: allOptionId })">
              {{ $t('collect.all') }}<!-- 全站采集 -->
            </el-button>
          </template>

          <!-- 公众号历史 -->
          <template v-if="tab.id === 'wechat-history'">
            <el-row :gutter="12" style="margin-bottom:12px">
              <el-col :span="12">
                <div class="wx-label">{{ $t('collect.wxAppName') }}</div>
                <el-input v-model="wxAppName" :placeholder="$t('collect.wxAppName')" />
                <p class="wx-hint">{{ $t('collect.wxAppNameHint') }}</p>
              </el-col>
              <el-col :span="6">
                <div class="wx-label">{{ $t('collect.wxStartNum') }}</div>
                <el-input v-model="wxStartNumber" :placeholder="$t('collect.wxStartNum')" />
              </el-col>
              <el-col :span="6">
                <div class="wx-label">{{ $t('collect.wxNum') }}</div>
                <el-input v-model="wxNumber" :placeholder="$t('collect.wxNum')" />
              </el-col>
            </el-row>
            <p class="wx-hint" style="margin-top:-8px;margin-bottom:12px">{{ $t('collect.wxNumHint') }}</p>
            <div class="wx-label">{{ $t('collect.wxCookie') }}</div>
            <el-input v-model="wxCookie" type="textarea" :rows="2" :placeholder="$t('collect.wxCookie')" style="margin-bottom:6px" />
            <p class="wx-hint" style="margin-bottom:12px">{{ $t('collect.wxCookieHint') }}</p>
            <div class="wx-label">{{ $t('collect.wxToken') }}</div>
            <el-input v-model="wxToken" :placeholder="$t('collect.wxToken')" style="margin-bottom:6px" />
            <p class="wx-hint" style="margin-bottom:12px">{{ $t('collect.wxTokenHint') }}</p>
            <el-alert :title="$t('collect.wxDisclaimer')" type="warning" :closable="false" show-icon style="margin-bottom:12px" />
            <el-button type="primary" :loading="running === 'wechat-history'" @click="runCollect('wechat-history', { app_name: wxAppName, start_number: wxStartNumber, number: wxNumber, cookie: wxCookie, token: wxToken })">
              {{ running === 'wechat-history' ? '采集中（耗时较长）...' : $t('collect.wechatHistory') }}<!-- 公众号历史 -->
            </el-button>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 结果面板 -->
    <el-card v-if="results.length" class="result-card" shadow="never">
      <template #header>
        <div class="result-header">
          <span>{{ $t('collect.collectResult') }}<!-- 采集结果 --></span>
          <el-button size="small" text @click="results = []">{{ $t('collect.clear') }}<!-- 清空 --></el-button>
        </div>
      </template>
      <div class="result-list">
        <template v-for="(r, i) in results" :key="i">
          <!-- 汇总行 or 普通消息 -->
          <div v-if="!r.isDetail" class="result-item" :class="r.type">
            <el-tag size="small" :type="r.type === 'success' ? 'success' : r.type === 'error' ? 'danger' : 'info'" effect="plain">{{ r.time }}</el-tag>
            <span class="result-msg" :class="r.type" v-html="r.msg"></span>
          </div>
          <!-- 采集条目详情行 -->
          <div v-else class="result-item-detail">
            <span class="result-badge" :class="r.type">
              {{ r.success ? '✓' : '✗' }} {{ r.idx }}/{{ r.total }}
            </span>
            <div class="result-detail-body">
              <div class="result-detail-title">{{ r.title || '-' }}</div>
              <div v-if="r.contentPreview" class="result-detail-content">{{ r.contentPreview }}</div>
              <div class="result-detail-meta">
                <span class="result-detail-msg" :class="r.type">{{ r.message }}</span>
                <a v-if="r.link" :href="r.link" target="_blank" class="result-detail-link">{{ $t('collect.viewOriginal') }}<!-- 查看原文 --> →</a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onActivated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getConfigs } from '../api/config.js'
import { collectCustom, collectList, collectDetail, collectHistory, collectAll, collectWechatHistory } from '../api/collect.js'

const { t } = useI18n()

const tabs = computed(() => [
  { id: 'wechat', name: t('collect.wechat'), input: 'urls', desc: t('collect.wechatDesc'), placeholder: 'https://mp.weixin.qq.com/s/xxxxx', collect: 'wx' }, // 微信采集 / 粘贴微信公众号文章链接，每行一个
  { id: 'jianshu', name: t('collect.jianshu'), input: 'urls', desc: t('collect.jianshuDesc'), placeholder: 'https://www.jianshu.com/p/xxxxx', collect: 'js' }, // 简书采集 / 粘贴简书文章链接
  { id: 'zhihu', name: t('collect.zhihu'), input: 'urls', desc: t('collect.zhihuDesc'), placeholder: 'https://www.zhihu.com/question/xxxxx', collect: 'zh' }, // 知乎采集 / 粘贴知乎回答链接
  { id: 'list', name: t('collect.list'), input: null, desc: t('collect.listDesc') }, // 列表采集 / 选择一个配置，从列表页批量采集所有详情
  { id: 'history', name: t('collect.history'), input: null, desc: t('collect.historyDesc') }, // 分页采集 / 自动翻页批量抓取，支持 {page} 占位符
  { id: 'detail', name: t('collect.detail'), input: 'detail', desc: t('collect.detailDesc') }, // 详情采集 / 手动输入链接 + 选择配置规则
  { id: 'all', name: t('collect.all'), input: null, desc: t('collect.allDesc') }, // 全站采集 / 从网站首页匹配所有链接进行采集
  { id: 'wechat-history', name: t('collect.wechatHistory'), input: null, desc: t('collect.wechatHistoryDesc') }, // 公众号历史 / 采集微信公众号历史文章列表
])

const collectTabIds = ['wechat', 'jianshu', 'zhihu', 'list', 'history', 'detail', 'all', 'wechat-history']

function getTabFromUrl() {
  return new URLSearchParams(location.search).get('tab') || ''
}

function syncTabToUrl(tab) {
  const url = new URL(location.href)
  url.searchParams.set('tab', tab)
  history.replaceState(null, '', url.toString())
}

const activeTab = ref(collectTabIds.includes(getTabFromUrl()) ? getTabFromUrl() : 'wechat')

watch(activeTab, syncTabToUrl)

onActivated(() => {
  const tab = getTabFromUrl()
  if (collectTabIds.includes(tab)) activeTab.value = tab
})
const running = ref(false)
const results = ref([])
const configOptions = ref([])

const urls = reactive({ wechat: '', jianshu: '', zhihu: '', detail: '' })
const listOptionId = ref(null)
const historyOptionId = ref(null)
const historyPaging = ref('1-5')
const detailOptionId = ref(null)
const allOptionId = ref(null)
const wxAppName = ref('')
const wxStartNumber = ref('1')
const wxNumber = ref('5')
const wxCookie = ref('')
const wxToken = ref('')

const WX_CACHE_KEY = 'frc_v3_wx_cache'

function getMidnight() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime()
}

function loadWxCache() {
  try {
    const raw = localStorage.getItem(WX_CACHE_KEY)
    if (!raw) return
    const cache = JSON.parse(raw)
    if (cache._expiry && Date.now() > cache._expiry) {
      localStorage.removeItem(WX_CACHE_KEY)
      return
    }
    if (cache.appName) wxAppName.value = cache.appName
    if (cache.cookie) wxCookie.value = cache.cookie
    if (cache.token) wxToken.value = cache.token
  } catch {}
}

function saveWxCache() {
  const cache = {
    _expiry: getMidnight(),
    appName: wxAppName.value,
    cookie: wxCookie.value,
    token: wxToken.value,
  }
  localStorage.setItem(WX_CACHE_KEY, JSON.stringify(cache))
}

function now() { return new Date().toLocaleTimeString() }
function addResult(msg, type = 'info') {
  results.value.unshift({ time: now(), msg, type })
  if (results.value.length > 200) results.value.pop()
}

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '').trim()
}

function addDetailResults(data, total) {
  data.forEach(function(item, idx) {
    var isSuccess = item.success !== false
    var type = isSuccess ? 'success' : 'error'
    var contentText = stripHtml(item.content)
    var contentPreview = contentText.length > 10 ? contentText.substring(0, 10) + '…' : (contentText || '')

    results.value.unshift({
      time: now(),
      isDetail: true,
      type: type,
      success: isSuccess,
      idx: idx + 1,
      total: total,
      title: item.title || '',
      contentPreview: contentPreview,
      message: item.message || '',
      link: item.link || '',
    })
    if (results.value.length > 200) results.value.pop()
  })
}

async function runCollect(id, extra) {
  running.value = id
  addResult('开始采集...', 'info')
  try {
    let res
    switch (id) {
      case 'wechat': case 'jianshu': case 'zhihu':
        res = await collectCustom({ collect_urls: urls[id], collect_name: extra }); break
      case 'list': res = await collectList(extra); break
      case 'history': res = await collectHistory(extra); break
      case 'detail': res = await collectDetail(extra); break
      case 'all': res = await collectAll(extra); break
      case 'wechat-history': res = await collectWechatHistory(extra); break
    }
    if (res.code === 200) {
      var data = Array.isArray(res.data) ? res.data : []
      var total = data.length
      var successCount = 0
      var errorCount = 0
      data.forEach(function(item) {
        item.success !== false ? successCount++ : errorCount++
      })
      addDetailResults(data, total)
      // 汇总行放最后（unshift 后在最上面）
      addResult('<strong>✓</strong> ' + (res.msg || t('collect.complete')) + ' | 共采集 <strong>' + total + '</strong> 条，成功 ' + successCount + ' 条，失败 ' + errorCount + ' 条', 'success')
      ElMessage.success(res.msg || t('collect.complete'))
    } else {
      addResult('<strong>✗</strong> ' + (res.msg || t('collect.failed')), 'error')
      ElMessage.error(res.msg || t('collect.failed'))
    }
  } catch (e) {
    addResult('<strong>✗ ' + t('collect.failed') + ':</strong> ' + e.message, 'error')
    ElMessage.error(e.message)
  } finally { running.value = false }
}

onMounted(async () => {
  loadWxCache()
  try { const r = await getConfigs({ per_page: 100 }); configOptions.value = r.data || [] } catch {}
})

let _wxTimer
watch([wxAppName, wxCookie, wxToken], () => {
  clearTimeout(_wxTimer)
  _wxTimer = setTimeout(saveWxCache, 500)
})
</script>

<style scoped>
.wx-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
  line-height: 1.4;
}
.wx-hint {
  font-size: 12px;
  color: #f56c6c;
  margin: 0;
  line-height: 1.6;
}
</style>
