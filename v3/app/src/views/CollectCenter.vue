<template>
  <div class="page-collect">
    <div class="page-header">
      <h2>采集中心</h2>
      <p>多种采集方式，灵活应对不同场景</p>
    </div>

    <div class="collect-tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="['ctab', { active: activeTab === tab.id }]" @click="activeTab = tab.id">
        {{ tab.name }}
      </button>
    </div>

    <!-- 微信采集 -->
    <div v-if="activeTab === 'wechat'" class="collect-card">
      <h4>微信文章采集</h4>
      <p class="card-desc">粘贴微信公众号文章链接，支持批量（每行一个）</p>
      <textarea v-model="wechatUrls" rows="4" placeholder="https://mp.weixin.qq.com/s/xxxxx"></textarea>
      <button class="btn btn-primary" :disabled="running" @click="runCollect('wechat')">
        {{ running === 'wechat' ? '采集中...' : '开始采集' }}
      </button>
    </div>

    <!-- 简书采集 -->
    <div v-if="activeTab === 'jianshu'" class="collect-card">
      <h4>简书文章采集</h4>
      <p class="card-desc">粘贴简书文章链接，支持批量</p>
      <textarea v-model="jianshuUrls" rows="4" placeholder="https://www.jianshu.com/p/xxxxx"></textarea>
      <button class="btn btn-primary" :disabled="running" @click="runCollect('jianshu')">
        {{ running === 'jianshu' ? '采集中...' : '开始采集' }}
      </button>
    </div>

    <!-- 知乎采集 -->
    <div v-if="activeTab === 'zhihu'" class="collect-card">
      <h4>知乎问答采集</h4>
      <p class="card-desc">粘贴知乎回答链接</p>
      <textarea v-model="zhihuUrls" rows="4" placeholder="https://www.zhihu.com/question/xxxxx"></textarea>
      <button class="btn btn-primary" :disabled="running" @click="runCollect('zhihu')">
        {{ running === 'zhihu' ? '采集中...' : '开始采集' }}
      </button>
    </div>

    <!-- 列表采集 -->
    <div v-if="activeTab === 'list'" class="collect-card">
      <h4>列表采集 · 从列表页批量采集详情</h4>
      <p class="card-desc">选择一个配置，系统会从列表页获取所有详情链接后逐篇采集</p>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label>选择配置</label>
          <select v-model="listOptionId">
            <option :value="0">请选择配置</option>
            <option v-for="c in configOptions" :key="c.id" :value="c.id">{{ c.collect_name }}</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" :disabled="running || !listOptionId" @click="runCollect('list')">
        {{ running === 'list' ? '采集中...' : '开始列表采集' }}
      </button>
    </div>

    <!-- 分页采集 -->
    <div v-if="activeTab === 'history'" class="collect-card">
      <h4>分页采集 · 自动翻页批量抓取</h4>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label>选择配置</label>
          <select v-model="historyOptionId">
            <option :value="0">请选择配置</option>
            <option v-for="c in configOptions" :key="c.id" :value="c.id">{{ c.collect_name }}</option>
          </select>
        </div>
        <div class="form-group" style="width:200px">
          <label>分页参数</label>
          <input v-model="historyPaging" placeholder="1-10" />
        </div>
      </div>
      <button class="btn btn-primary" :disabled="running || !historyOptionId" @click="runCollect('history')">
        {{ running === 'history' ? '采集中...' : '开始分页采集' }}
      </button>
    </div>

    <!-- 详情采集 -->
    <div v-if="activeTab === 'detail'" class="collect-card">
      <h4>详情采集 · 直接采集文章详情</h4>
      <p class="card-desc">手动输入一组链接，选择一个配置规则进行采集</p>
      <textarea v-model="detailUrls" rows="3" placeholder="每行一个链接"></textarea>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label>选择配置</label>
          <select v-model="detailOptionId">
            <option :value="0">请选择配置</option>
            <option v-for="c in configOptions" :key="c.id" :value="c.id">{{ c.collect_name }}</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" :disabled="running || !detailOptionId || !detailUrls.trim()" @click="runCollect('detail')">
        {{ running === 'detail' ? '采集中...' : '开始详情采集' }}
      </button>
    </div>

    <!-- 全站采集 -->
    <div v-if="activeTab === 'all'" class="collect-card">
      <h4>全站采集</h4>
      <p class="card-desc">从网站首页匹配所有链接进行批量采集（需赞助授权）</p>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label>选择配置</label>
          <select v-model="allOptionId">
            <option :value="0">请选择配置</option>
            <option v-for="c in configOptions" :key="c.id" :value="c.id">{{ c.collect_name }}</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" :disabled="running || !allOptionId" @click="runCollect('all')">
        {{ running === 'all' ? '采集中...' : '开始全站采集' }}
      </button>
    </div>

    <!-- 微信公众号历史采集 -->
    <div v-if="activeTab === 'wechat-history'" class="collect-card">
      <h4>微信公众号历史文章采集</h4>
      <div class="form-row">
        <div class="form-group flex-2">
          <label>公众号名称</label>
          <input v-model="wxAppName" placeholder="如：人民日报" />
        </div>
        <div class="form-group">
          <label>起始序号</label>
          <input v-model="wxStartNumber" placeholder="1" />
        </div>
        <div class="form-group">
          <label>采集数量</label>
          <input v-model="wxNumber" placeholder="20" />
        </div>
      </div>
      <div class="form-group">
        <label>Cookie</label>
        <textarea v-model="wxCookie" rows="2" placeholder="微信公众号平台登录后的 Cookie"></textarea>
      </div>
      <div class="form-group">
        <label>Token</label>
        <input v-model="wxToken" placeholder="微信公众号平台的 Token" />
      </div>
      <button class="btn btn-primary" :disabled="running" @click="runCollect('wechat-history')">
        {{ running === 'wechat-history' ? '采集中（耗时较长）...' : '开始采集历史文章' }}
      </button>
    </div>

    <!-- 结果面板 -->
    <div class="result-panel" v-if="results.length > 0">
      <div class="result-header">
        <h4>采集结果</h4>
        <button class="btn-sm" @click="results = []">清空</button>
      </div>
      <div class="result-list">
        <div v-for="(r, i) in results" :key="i" :class="['result-item', r.type]">
          <span class="result-time">{{ r.time }}</span>
          <span class="result-msg" v-html="r.msg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getConfigs } from '../api/config.js'
import { collectCustom, collectList, collectDetail, collectHistory, collectAll, collectWechatHistory } from '../api/collect.js'

const tabs = [
  { id: 'wechat', name: '微信采集' },
  { id: 'jianshu', name: '简书采集' },
  { id: 'zhihu', name: '知乎采集' },
  { id: 'list', name: '列表采集' },
  { id: 'history', name: '分页采集' },
  { id: 'detail', name: '详情采集' },
  { id: 'all', name: '全站采集' },
  { id: 'wechat-history', name: '公众号历史' },
]

const activeTab = ref('wechat')
const running = ref(false)
const results = ref([])
const configOptions = ref([])

const wechatUrls = ref('')
const jianshuUrls = ref('')
const zhihuUrls = ref('')
const listOptionId = ref(0)
const historyOptionId = ref(0)
const historyPaging = ref('1-5')
const detailUrls = ref('')
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

async function runCollect(type) {
  running.value = type
  addResult('开始采集...', 'info')
  try {
    let res
    switch (type) {
      case 'wechat':
        res = await collectCustom({ collect_urls: wechatUrls.value, collect_name: 'wx' })
        break
      case 'jianshu':
        res = await collectCustom({ collect_urls: jianshuUrls.value, collect_name: 'js' })
        break
      case 'zhihu':
        res = await collectCustom({ collect_urls: zhihuUrls.value, collect_name: 'zh' })
        break
      case 'list':
        res = await collectList({ option_id: listOptionId.value })
        break
      case 'history':
        res = await collectHistory({ option_id: historyOptionId.value, paging: historyPaging.value })
        break
      case 'detail':
        res = await collectDetail({ collect_urls: detailUrls.value, option_id: detailOptionId.value })
        break
      case 'all':
        res = await collectAll({ option_id: allOptionId.value })
        break
      case 'wechat-history':
        res = await collectWechatHistory({
          app_name: wxAppName.value, start_number: wxStartNumber.value,
          number: wxNumber.value, cookie: wxCookie.value, token: wxToken.value,
        })
        break
    }
    if (res.code === 200) {
      addResult('<strong>✓</strong> ' + (res.msg || '采集完成'), 'success')
    } else {
      addResult('<strong>✗</strong> ' + (res.msg || '采集失败'), 'error')
    }
  } catch (e) {
    addResult('<strong>✗ 错误:</strong> ' + e.message, 'error')
  } finally {
    running.value = false
  }
}

onMounted(async () => {
  try {
    const res = await getConfigs({ per_page: 100 })
    configOptions.value = res.data || []
  } catch (e) { console.error('加载配置列表失败', e) }
})
</script>
