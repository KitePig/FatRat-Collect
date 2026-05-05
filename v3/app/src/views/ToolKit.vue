<template>
  <div class="page-kit">
    <div class="page-header">
      <h2>工具箱</h2>
      <p>定时任务 · 功能开关 · 授权管理</p>
    </div>

    <div class="kit-tabs">
      <button v-for="t in kitTabs" :key="t.id" :class="['ctab', { active: activeTab === t.id }]" @click="activeTab = t.id">{{ t.name }}</button>
    </div>

    <!-- 定时任务 -->
    <div v-if="activeTab === 'cron'" class="kit-section">
      <div class="kit-card">
        <h4>定时采集</h4>
        <p>设置后系统将通过 WP-Cron 自动执行列表采集任务</p>
        <div class="form-row">
          <select v-model="cronSpider">
            <option value="">关闭</option>
            <option v-for="(label, key) in cronOptions" :key="key" :value="key">{{ label }}</option>
          </select>
          <button class="btn btn-primary" @click="saveCron('spider', cronSpider)">保存采集频率</button>
        </div>
      </div>
      <div class="kit-card">
        <h4>定时发布</h4>
        <p>设置后系统将定时将已采集数据发布到 WordPress</p>
        <div class="form-row">
          <select v-model="cronRelease">
            <option value="">关闭</option>
            <option v-for="(label, key) in cronOptions" :key="key" :value="key">{{ label }}</option>
          </select>
          <button class="btn btn-primary" @click="saveCron('release', cronRelease)">保存发布频率</button>
        </div>
      </div>
    </div>

    <!-- 功能开关 -->
    <div v-if="activeTab === 'switch'" class="kit-section">
      <div class="kit-card" v-for="item in switchList" :key="item.key">
        <div class="switch-row">
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.desc }}</p>
          </div>
          <label class="toggle">
            <input type="checkbox" :checked="isEnabled(item.key)" @change="toggleSwitch(item.key)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- 授权激活 -->
    <div v-if="activeTab === 'activation'" class="kit-section">
      <div class="kit-card">
        <h4>赞助激活</h4>
        <p>输入赞助激活码解锁全部高级功能</p>
        <div class="form-row">
          <input v-model="activationCode" placeholder="请输入激活码" style="flex:1" />
          <button class="btn btn-primary" @click="doActivation">激活</button>
        </div>
        <p v-if="actMsg" class="act-msg" :class="{ success: actOk, error: !actOk }">{{ actMsg }}</p>
      </div>
    </div>

    <!-- 数据升级 -->
    <div v-if="activeTab === 'upgrade'" class="kit-section">
      <div class="kit-card">
        <h4>数据库升级</h4>
        <p>从旧版本升级数据表结构（仅升级时使用）</p>
        <p>当前状态：<strong>{{ mysqlUpgradeStatus }}</strong></p>
        <button class="btn btn-primary" @click="doUpgrade">开始升级</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSettings, saveCron, activation, functionSwitch, dbUpgrade } from '../api/kit.js'

const kitTabs = [
  { id: 'cron', name: '定时任务' },
  { id: 'switch', name: '功能开关' },
  { id: 'activation', name: '授权激活' },
  { id: 'upgrade', name: '数据升级' },
]

const activeTab = ref('cron')

const cronOptions = {
  fifteenminutes: '每15分钟',
  halfhour: '每30分钟',
  hourly: '每小时',
  twohourly: '每2小时',
  threehours: '每3小时',
  fourhourly: '每4小时',
  eighthourly: '每8小时',
  twicedaily: '每12小时',
  daily: '每天',
}

const cronSpider = ref('')
const cronRelease = ref('')
const settings = ref({})
const activationCode = ref('')
const actMsg = ref('')
const actOk = ref(false)
const mysqlUpgradeStatus = ref('')

const switchList = [
  { key: 'rendering', name: 'Chrome 动态渲染', desc: '使用 Headless Chrome 渲染 JS 页面' },
  { key: 'all-collect', name: '全站采集', desc: '从首页匹配所有链接进行采集' },
  { key: 'auto-tags', name: '自动标签', desc: '发布时自动匹配已有关键词作为标签' },
  { key: 'dynamic-fields', name: '动态内容', desc: '发布时追加相关推荐内容' },
  { key: 'inner-chain', name: '标签内链', desc: '文章内容中的标签自动转为内链' },
  { key: 'release-control', name: '发布控制', desc: '自由选择发布分类/作者/类型' },
  { key: 'insert-keyword', name: '关键词随机插入', desc: '在段落中随机插入关键词外链' },
  { key: 'featured-picture', name: '图片入库', desc: '发布时图片自动入库为附件' },
]

function isEnabled(key) {
  const v = settings.value[key.replace(/-/g, '_')]
  if (!v) return false
  try { return JSON.parse(v).switch === 'open' } catch { return v === 'open' || v === '1' }
}

async function loadSettings() {
  try {
    const res = await getSettings()
    settings.value = res.data || {}
    cronSpider.value = settings.value.cron_spider || ''
    cronRelease.value = settings.value.cron_release || ''
    mysqlUpgradeStatus.value = settings.value.mysql_upgrade || ''
  } catch (e) { console.error(e) }
}

async function saveCronType(type, value) {
  try { await saveCron({ type, value }); alert('保存成功') } catch (e) { alert(e.message) }
}

async function toggleSwitch(key) {
  try { await functionSwitch(key); loadSettings() } catch (e) { alert(e.message) }
}

async function doActivation() {
  try {
    const res = await activation(activationCode.value)
    actMsg.value = res.msg || '操作完成'
    actOk.value = res.code === 200
    if (res.code === 200) loadSettings()
  } catch (e) { actMsg.value = e.message; actOk.value = false }
}

async function doUpgrade() {
  try {
    const res = await dbUpgrade('1')
    alert(res.msg || '完成')
    loadSettings()
  } catch (e) { alert(e.message) }
}

onMounted(loadSettings)
</script>

<style scoped>
.kit-section { display: flex; flex-direction: column; gap: 16px; }
.kit-card {
  background: #fff; border-radius: 10px; padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.kit-card h4 { margin: 0 0 8px; font-size: 15px; color: #1a202c; }
.kit-card p { margin: 0 0 12px; font-size: 13px; color: #718096; }
.form-row { display: flex; gap: 10px; align-items: center; }
.form-row select, .form-row input { padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; }
.switch-row { display: flex; justify-content: space-between; align-items: center; }
.toggle { position: relative; display: inline-block; width: 48px; height: 26px; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; cursor: pointer; inset: 0; background: #cbd5e0; border-radius: 26px; transition: .2s; }
.toggle-slider::before { content: ''; position: absolute; height: 20px; width: 20px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; }
.toggle input:checked + .toggle-slider { background: #667eea; }
.toggle input:checked + .toggle-slider::before { transform: translateX(22px); }
.act-msg { margin-top: 8px; font-size: 13px; }
.act-msg.success { color: #38a169; }
.act-msg.error { color: #e53e3e; }
</style>
