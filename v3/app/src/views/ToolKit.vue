<template>
  <div class="page-kit">
    <div class="page-header">
      <h2>工具箱</h2>
      <p style="color:#909399;font-size:13px;margin:0">定时任务 · 功能开关 · 授权管理</p>
    </div>

    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="定时任务" name="cron">
        <el-card v-for="item in cronItems" :key="item.key" shadow="never" style="margin-bottom:14px">
          <template #header><strong>{{ item.title }}</strong></template>
          <p style="color:#909399;font-size:13px;margin:0 0 10px">{{ item.desc }}</p>
          <div style="display:flex;gap:10px">
            <el-select v-model="cronValues[item.key]" placeholder="选择频率" style="width:180px">
              <el-option label="关闭" value="" />
              <el-option v-for="(label, k) in cronOptions" :key="k" :label="label" :value="k" />
            </el-select>
            <el-button type="primary" @click="saveCronType(item.key, cronValues[item.key])">保存</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="功能开关" name="switch">
        <el-card v-for="item in switchList" :key="item.key" shadow="never" style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong style="font-size:14px">{{ item.name }}</strong>
              <p style="color:#909399;font-size:12px;margin:4px 0 0">{{ item.desc }}</p>
            </div>
            <el-switch :model-value="isEnabled(item.key)" @change="toggleSwitch(item.key)" />
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="授权激活" name="activation">
        <el-card shadow="never">
          <h4 style="margin:0 0 10px">赞助激活</h4>
          <p style="color:#909399;font-size:13px;margin:0 0 12px">输入赞助激活码解锁全部高级功能</p>
          <div style="display:flex;gap:10px">
            <el-input v-model="activationCode" placeholder="请输入激活码" style="width:300px" />
            <el-button type="primary" @click="doActivation">激活</el-button>
          </div>
          <p v-if="actMsg" :style="{ color: actOk ? '#67c23a' : '#f56c6c', fontSize: '13px', marginTop: '8px' }">{{ actMsg }}</p>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="数据升级" name="upgrade">
        <el-card shadow="never">
          <h4 style="margin:0 0 10px">数据库升级</h4>
          <p style="color:#909399;font-size:13px;margin:0 0 10px">从旧版本升级数据表结构（仅升级时使用）</p>
          <el-tag type="info" style="margin-bottom:12px">当前状态：{{ mysqlUpgradeStatus || '最新' }}</el-tag>
          <div><el-button type="primary" @click="doUpgrade">开始升级</el-button></div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getSettings, saveCron, activation, functionSwitch, dbUpgrade } from '../api/kit.js'

const activeTab = ref('cron')
const settings = ref({})
const cronValues = reactive({ spider: '', release: '' })
const activationCode = ref(''); const actMsg = ref(''); const actOk = ref(false)
const mysqlUpgradeStatus = ref('')

const cronItems = [
  { key: 'spider', title: '定时采集', desc: '设置后通过 WP-Cron 自动执行列表采集' },
  { key: 'release', title: '定时发布', desc: '定时将已采集数据发布到 WordPress' },
]
const cronOptions = {
  fifteenminutes: '每15分钟', halfhour: '每30分钟', hourly: '每小时',
  twohourly: '每2小时', threehours: '每3小时', fourhourly: '每4小时',
  eighthourly: '每8小时', twicedaily: '每12小时', daily: '每天',
}

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
    const r = await getSettings()
    settings.value = r.data || {}
    cronValues.spider = settings.value.cron_spider || ''
    cronValues.release = settings.value.cron_release || ''
    mysqlUpgradeStatus.value = settings.value.mysql_upgrade || ''
  } catch {}
}

async function saveCronType(type, value) {
  try { await saveCron({ type, value }); ElMessage.success('保存成功') }
  catch (e) { ElMessage.error(e.message) }
}
async function toggleSwitch(key) {
  try { await functionSwitch(key); loadSettings(); ElMessage.success('切换成功') }
  catch (e) { ElMessage.error(e.message) }
}
async function doActivation() {
  try {
    const r = await activation(activationCode.value)
    actMsg.value = r.msg || '操作完成'; actOk.value = r.code === 200
    if (r.code === 200) loadSettings()
  } catch (e) { actMsg.value = e.message; actOk.value = false }
}
async function doUpgrade() {
  try { const r = await dbUpgrade('1'); ElMessage.success(r.msg || '完成'); loadSettings() }
  catch (e) { ElMessage.error(e.message) }
}

onMounted(loadSettings)
</script>
