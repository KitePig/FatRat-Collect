<template>
  <div class="page-collect">
    <div class="page-header">
      <h2>{{ $t('collect.title') }}</h2>
      <p style="color:#909399;font-size:13px;margin:0">{{ $t('collect.desc') }}</p>
    </div>

    <el-tabs v-model="activeTab" type="border-card" class="collect-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.name" :name="tab.id">
        <div class="collect-card">
          <el-alert v-if="tab.desc" :title="tab.desc" type="info" :closable="false" style="margin-bottom:16px" />

          <!-- 微信/简书/知乎/详情 -->
          <template v-if="tab.input === 'urls'">
            <el-input v-model="urls[tab.id]" type="textarea" :rows="4" :placeholder="tab.placeholder" style="margin-bottom:12px" />
            <el-button type="primary" :loading="running === tab.id" @click="runCollect(tab.id, tab.collect)">
              {{ running === tab.id ? $t('collect.running') : $t('collect.start') }}
            </el-button>
          </template>

          <!-- 列表采集 -->
          <template v-if="tab.id === 'list'">
            <el-select v-model="listOptionId" :placeholder="$t('collect.selectConfig')" style="width:320px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'list'" :disabled="!listOptionId" @click="runCollect('list', { option_id: listOptionId })">
              {{ running === 'list' ? $t('collect.running') : $t('collect.list') }}
            </el-button>
          </template>

          <!-- 分页采集 -->
          <template v-if="tab.id === 'history'">
            <el-select v-model="historyOptionId" :placeholder="$t('collect.selectConfig')" style="width:240px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-input v-model="historyPaging" :placeholder="$t('collect.selectPaging')" style="width:140px;margin-right:12px" />
            <el-button type="primary" :loading="running === 'history'" :disabled="!historyOptionId" @click="runCollect('history', { option_id: historyOptionId, paging: historyPaging })">
              {{ running === 'history' ? $t('collect.running') : $t('collect.history') }}
            </el-button>
          </template>

          <!-- 详情采集 -->
          <template v-if="tab.id === 'detail'">
            <el-input v-model="urls.detail" type="textarea" :rows="3" :placeholder="$t('collect.inputLinks')" style="margin-bottom:12px" />
            <el-select v-model="detailOptionId" :placeholder="$t('collect.selectConfig')" style="width:240px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'detail'" :disabled="!detailOptionId || !urls.detail.trim()" @click="runCollect('detail', { collect_urls: urls.detail, option_id: detailOptionId })">
              {{ running === 'detail' ? $t('collect.running') : $t('collect.detail') }}
            </el-button>
          </template>

          <!-- 全站采集 -->
          <template v-if="tab.id === 'all'">
            <el-select v-model="allOptionId" :placeholder="$t('collect.selectConfig')" style="width:320px;margin-right:12px">
              <el-option v-for="c in configOptions" :key="c.id" :label="c.collect_name" :value="c.id" />
            </el-select>
            <el-button type="primary" :loading="running === 'all'" :disabled="!allOptionId" @click="runCollect('all', { option_id: allOptionId })">
              {{ $t('collect.all') }}
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
              {{ running === 'wechat-history' ? '采集中（耗时较长）...' : $t('collect.wechatHistory') }}
            </el-button>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 结果面板 -->
    <el-card v-if="results.length" class="result-card" shadow="never">
      <template #header>
        <div class="result-header">
          <span>{{ $t('collect.collectResult') }}</span>
          <el-button size="small" text @click="results = []">{{ $t('collect.clear') }}</el-button>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getConfigs } from '../api/config.js'
import { collectCustom, collectList, collectDetail, collectHistory, collectAll, collectWechatHistory } from '../api/collect.js'

const { t } = useI18n()

const tabs = computed(() => [
  { id: 'wechat', name: t('collect.wechat'), input: 'urls', desc: t('collect.wechatDesc'), placeholder: 'https://mp.weixin.qq.com/s/xxxxx', collect: 'wx' },
  { id: 'jianshu', name: t('collect.jianshu'), input: 'urls', desc: t('collect.jianshuDesc'), placeholder: 'https://www.jianshu.com/p/xxxxx', collect: 'js' },
  { id: 'zhihu', name: t('collect.zhihu'), input: 'urls', desc: t('collect.zhihuDesc'), placeholder: 'https://www.zhihu.com/question/xxxxx', collect: 'zh' },
  { id: 'list', name: t('collect.list'), input: null, desc: t('collect.listDesc') },
  { id: 'history', name: t('collect.history'), input: null, desc: t('collect.historyDesc') },
  { id: 'detail', name: t('collect.detail'), input: 'detail', desc: t('collect.detailDesc') },
  { id: 'all', name: t('collect.all'), input: null, desc: t('collect.allDesc') },
  { id: 'wechat-history', name: t('collect.wechatHistory'), input: null, desc: t('collect.wechatHistoryDesc') },
])

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
      addResult('<strong>✓</strong> ' + (res.msg || t('collect.complete')), 'success')
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
  try { const r = await getConfigs({ per_page: 100 }); configOptions.value = r.data || [] } catch {}
})
</script>
