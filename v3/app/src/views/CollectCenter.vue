<template>
  <div class="page-collect">
    <div class="page-header">
      <h2>采集中心</h2>
      <p style="color:#909399;font-size:13px;margin:0">多种采集方式，灵活应对不同场景</p>
    </div>

    <el-tabs v-model="activeTab" type="border-card" class="collect-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.name" :name="tab.id">
        <div class="collect-card">
          <el-alert v-if="tab.desc" :title="tab.desc" type="info" :closable="false" style="margin-bottom:16px" />

          <!-- 微信/简书/知乎/详情 -->
          <template v-if="tab.input === 'urls'">
            <el-input v-model="urls[tab.id]" type="textarea" :rows="4" :placeholder="tab.placeholder" style="margin-bottom:12px" />
            <el-button type="primary" :loading="running === tab.id" @click="runCollect(tab.id, tab.collect)">
              {{ running === tab.id ? '采集中...' : '开始采集' }}
            </el-button>
          </template>

          <!-- 列表采集 -->
          <template v-if="tab.id === 'list'">
            <el-select v-model="listOptionId" placeholder="选择配置" style="width:320px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'list'" :disabled="!listOptionId" @click="runCollect('list', { option_id: listOptionId })">
              {{ running === 'list' ? '采集中...' : '开始列表采集' }}
            </el-button>
          </template>

          <!-- 分页采集 -->
          <template v-if="tab.id === 'history'">
            <el-select v-model="historyOptionId" placeholder="选择配置" style="width:240px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-input v-model="historyPaging" placeholder="分页 1-10" style="width:140px;margin-right:12px" />
            <el-button type="primary" :loading="running === 'history'" :disabled="!historyOptionId" @click="runCollect('history', { option_id: historyOptionId, paging: historyPaging })">
              {{ running === 'history' ? '采集中...' : '开始分页采集' }}
            </el-button>
          </template>

          <!-- 详情采集 -->
          <template v-if="tab.id === 'detail'">
            <el-input v-model="urls.detail" type="textarea" :rows="3" placeholder="每行一个链接" style="margin-bottom:12px" />
            <el-select v-model="detailOptionId" placeholder="选择配置" style="width:240px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'detail'" :disabled="!detailOptionId || !urls.detail.trim()" @click="runCollect('detail', { collect_urls: urls.detail, option_id: detailOptionId })">
              {{ running === 'detail' ? '采集中...' : '开始详情采集' }}
            </el-button>
          </template>

          <!-- 全站采集 -->
          <template v-if="tab.id === 'all'">
            <el-select v-model="allOptionId" placeholder="选择配置" style="width:320px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'all'" :disabled="!allOptionId" @click="runCollect('all', { option_id: allOptionId })">
              开始全站采集
            </el-button>
          </template>

          <!-- 公众号历史 -->
          <template v-if="tab.id === 'wechat-history'">
            <el-row :gutter="12" style="margin-bottom:12px">
              <el-col :span="12"><el-input v-model="wxAppName" placeholder="公众号名称" /></el-col>
              <el-col :span="6"><el-input v-model="wxStartNumber" placeholder="起始序号" /></el-col>
              <el-col :span="6"><el-input v-model="wxNumber" placeholder="采集数量" /></el-col>
            </el-row>
            <el-input v-model="wxCookie" type="textarea" :rows="2" placeholder="Cookie" style="margin-bottom:12px" />
            <el-input v-model="wxToken" placeholder="Token" style="margin-bottom:12px" />
            <el-button type="primary" :loading="running === 'wechat-history'" @click="runCollect('wechat-history', { app_name: wxAppName, start_number: wxStartNumber, number: wxNumber, cookie: wxCookie, token: wxToken })">
              {{ running === 'wechat-history' ? '采集中（耗时较长）...' : '开始采集历史文章' }}
            </el-button>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 结果面板 -->
    <el-card v-if="results.length" class="result-card" shadow="never">
      <template #header>
        <div class="result-header">
          <span>采集结果</span>
          <el-button size="small" text @click="results = []">清空</el-button>
        </div>
      </template>
      <div class="result-list">
        <div v-for="(r, i) in results" :key="i" class="result-item">
          <el-tag size="small" :type="r.type === 'success' ? 'success' : r.type === 'error' ? 'danger' : 'info'" effect="plain">{{ r.time }}</el-tag>
          <span class="result-msg" :class="r.type" v-html="r.msg"></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getConfigs } from '../api/config.js'
import { collectCustom, collectList, collectDetail, collectHistory, collectAll, collectWechatHistory } from '../api/collect.js'

const tabs = [
  { id: 'wechat', name: '微信采集', input: 'urls', desc: '粘贴微信公众号文章链接，每行一个', placeholder: 'https://mp.weixin.qq.com/s/xxxxx', collect: 'wx' },
  { id: 'jianshu', name: '简书采集', input: 'urls', desc: '粘贴简书文章链接', placeholder: 'https://www.jianshu.com/p/xxxxx', collect: 'js' },
  { id: 'zhihu', name: '知乎采集', input: 'urls', desc: '粘贴知乎回答链接', placeholder: 'https://www.zhihu.com/question/xxxxx', collect: 'zh' },
  { id: 'list', name: '列表采集', input: null, desc: '选择一个配置，从列表页批量采集所有详情' },
  { id: 'history', name: '分页采集', input: null, desc: '自动翻页批量抓取，支持 {page} 占位符' },
  { id: 'detail', name: '详情采集', input: 'detail', desc: '手动输入链接 + 选择配置规则' },
  { id: 'all', name: '全站采集', input: null, desc: '从网站首页匹配所有链接进行采集' },
  { id: 'wechat-history', name: '公众号历史', input: null, desc: '采集微信公众号历史文章列表' },
]

const activeTab = ref('wechat')
const running = ref(false)
const results = ref([])
const configOptions = ref([])

const urls = reactive({ wechat: '', jianshu: '', zhihu: '', detail: '' })
const listOptionId = ref(0)
const historyOptionId = ref(0)
const historyPaging = ref('1-5')
const detailOptionId = ref(0)
const allOptionId = ref(0)
const wxAppName = ref('')
const wxStartNumber = ref('1')
const wxNumber = ref('20')
const wxCookie = ref('')
const wxToken = ref('')

function now() { return new Date().toLocaleTimeString() }
function addResult(msg, type = 'info') {
  results.value.unshift({ time: now(), msg, type })
  if (results.value.length > 200) results.value.pop()
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
      addResult('<strong>✓</strong> ' + (res.msg || '采集完成'), 'success')
      ElMessage.success(res.msg || '采集完成')
    } else {
      addResult('<strong>✗</strong> ' + (res.msg || '采集失败'), 'error')
      ElMessage.error(res.msg || '采集失败')
    }
  } catch (e) {
    addResult('<strong>✗ 错误:</strong> ' + e.message, 'error')
    ElMessage.error(e.message)
  } finally { running.value = false }
}

onMounted(async () => {
  try { const r = await getConfigs({ per_page: 100 }); configOptions.value = r.data || [] } catch {}
})
</script>
