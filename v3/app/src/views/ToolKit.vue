<template>
  <div class="page-kit">
    <div class="page-header">
      <h2>{{ $t('kit.title') }}<!-- 工具箱 --></h2>
      <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.desc') }}<!-- 定时任务 · 功能开关 · 授权管理 --></p>
    </div>

    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane :label="$t('kit.cron')" name="cron"><!-- 定时任务 -->
        <el-card v-for="item in cronItems" :key="item.key" shadow="never" style="margin-bottom:14px">
          <template #header><strong>{{ item.title }}</strong></template>
          <p style="color:#909399;font-size:13px;margin:0 0 10px">{{ item.desc }}</p>
          <div style="display:flex;gap:10px">
            <el-select v-model="cronValues[item.key]" placeholder="选择频率" style="width:180px">
              <el-option label="关闭" value="" />
              <el-option v-for="(label, k) in cronOptionList" :key="k" :label="label" :value="k" />
            </el-select>
            <el-button type="primary" @click="saveCronType(item.key, cronValues[item.key])">{{ $t('kit.save') }}<!-- 保存 --></el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.switch')" name="switch"><!-- 功能开关 -->
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

      <el-tab-pane :label="$t('kit.activation')" name="activation"><!-- 授权激活 -->
        <el-card shadow="never">
          <template v-if="isSponsored">
            <h4 style="margin:0 0 10px;color:#67c23a">{{ $t('kit.sponsorActivated') }}</h4>
            <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.sponsorActivatedDesc') }}</p>
          </template>
          <template v-else>
            <h4 style="margin:0 0 10px">{{ $t('kit.sponsorActivation') }}<!-- 赞助激活 --></h4>
            <p style="color:#909399;font-size:13px;margin:0 0 12px">{{ $t('kit.sponsorDesc') }}<!-- 输入赞助激活码解锁全部高级功能 --></p>
            <div style="display:flex;gap:10px">
              <el-button type="primary" @click="doActivation">{{ $t('kit.activate') }}<!-- 激活 --></el-button>
            </div>
          </template>
          <p v-if="actMsg" :style="{ color: actOk ? '#67c23a' : '#f56c6c', fontSize: '13px', marginTop: '8px' }">{{ actMsg }}</p>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.upgrade')" name="upgrade"><!-- 数据升级 -->
        <el-card shadow="never">
          <h4 style="margin:0 0 10px">{{ $t('kit.dbUpgrade') }}<!-- 数据库升级 --></h4>
          <p style="color:#909399;font-size:13px;margin:0 0 10px">{{ $t('kit.dbUpgradeDesc') }}<!-- 从旧版本升级数据表结构（仅升级时使用） --></p>
          <el-tag type="info" style="margin-bottom:12px">{{ $t('kit.currentStatus') }}<!-- 当前状态 -->：{{ mysqlUpgradeStatus || $t('kit.latest') }}<!-- 最新 --></el-tag>
          <div><el-button type="primary" @click="doUpgrade">{{ $t('kit.startUpgrade') }}<!-- 开始升级 --></el-button></div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.envCheck')" name="envCheck"><!-- 环境检测 -->
        <!-- 运行环境检测 -->
        <el-card shadow="never" style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div>
              <h4 style="margin:0 0 4px">{{ $t('kit.envCheckTitle') }}<!-- 运行环境检测 --></h4>
              <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.envCheckDesc') }}<!-- 检测服务器环境是否满足插件运行要求，确保所有功能正常运行 --></p>
            </div>
            <el-button type="primary" :loading="envLoading" @click="doEnvCheck">
              {{ envLoading ? $t('kit.checking') : $t('kit.startCheck') }}<!-- 检测中... / 开始检测 -->
            </el-button>
          </div>
          <div v-if="envResult" style="margin-top:12px">
            <div style="margin-bottom:14px">
              <el-tag :type="envResult.envAllPass ? 'success' : 'danger'" size="large">
                {{ envResult.envAllPass ? $t('kit.envAllPass') : $t('kit.envNotAllPass') }}<!-- 全部通过 / 存在不达标项 -->
              </el-tag>
            </div>
            <el-table :data="envItems" stripe size="small" style="width:100%">
              <el-table-column :label="$t('kit.envColItem')" width="180"><!-- 检测项 -->
                <template #default="{ row }">
                  <span style="font-weight:500">{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColCurrent')" width="180"><!-- 当前值 -->
                <template #default="{ row }">
                  <el-tag :type="row.pass ? 'success' : 'danger'" size="small">{{ row.current }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColRequire')" width="180"><!-- 要求 -->
                <template #default="{ row }">{{ row.require }}</template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColStatus')" width="100"><!-- 状态 -->
                <template #default="{ row }">
                  <span :style="{ color: row.pass ? '#67c23a' : '#f56c6c', fontWeight: 'bold' }">
                    {{ row.pass ? '✓' : '✗' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColMsg')"><!-- 错误信息 -->
                <template #default="{ row }">
                  <span v-if="row.error" style="color:#f56c6c;font-size:12px">{{ row.error }}</span>
                  <span v-else style="color:#909399;font-size:12px">-</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="!envLoading" style="text-align:center;padding:30px 0;color:#909399">
            {{ $t('kit.envClickToCheck') }}<!-- 点击「开始检测」按钮，检查当前运行环境 -->
          </div>
        </el-card>

        <!-- 业务功能检测 -->
        <el-card shadow="never">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div>
              <h4 style="margin:0 0 4px">{{ $t('kit.bizCheckTitle') }}<!-- 业务功能检测 --></h4>
              <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.bizCheckDesc') }}<!-- 检测核心采集功能是否正常可用 --></p>
            </div>
            <el-button type="warning" :loading="bizLoading" @click="doBizCheck">
              {{ bizLoading ? $t('kit.checking') : $t('kit.bizStartCheck') }}<!-- 检测中... / 业务检测 -->
            </el-button>
          </div>
          <el-table :data="bizItems" stripe size="small" style="width:100%">
            <el-table-column :label="$t('kit.envColItem')" width="180"><!-- 检测项 -->
              <template #default="{ row }">
                <span style="font-weight:500">{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColCurrent')" width="180"><!-- 当前值 -->
              <template #default="{ row }">
                <el-tag v-if="row.pending" type="warning" size="small">{{ $t('kit.bizPending') }}<!-- 完善中 --></el-tag>
                <el-tag v-else :type="row.pass ? 'success' : 'danger'" size="small">{{ row.current }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColRequire')" width="180"><!-- 要求 -->
              <template #default="{ row }">{{ row.require }}</template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColStatus')" width="100"><!-- 状态 -->
              <template #default="{ row }">
                <span v-if="row.pending" style="color:#e6a23c">-</span>
                <span v-else :style="{ color: row.pass ? '#67c23a' : '#f56c6c', fontWeight: 'bold' }">
                  {{ row.pass ? '✓' : '✗' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColMsg')"><!-- 错误信息 -->
              <template #default="{ row }">
                <span v-if="row.error" style="color:#f56c6c;font-size:12px">{{ row.error }}</span>
                <span v-else style="color:#909399;font-size:12px">-</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.version.title')" name="version">
        <el-card shadow="never">
          <div class="version-header">
            <h4>{{ $t('kit.version.title') }}</h4>
            <p>{{ $t('kit.version.desc') }}</p>
          </div>
          <div class="version-options">
            <div
              class="version-card"
              :class="{ active: versionMode === 'v2' }"
              @click="versionMode = 'v2'"
            >
              <div class="version-card-badge" v-if="versionMode === 'v2'">
                <el-icon><Check /></el-icon>
              </div>
              <div class="version-card-icon v2-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 3v18" />
                </svg>
              </div>
              <div class="version-card-title">{{ $t('kit.version.v2Only') }}</div>
              <div class="version-card-desc">{{ $t('kit.version.v2OnlyDesc') }}</div>
            </div>
            <div
              class="version-card"
              :class="{ active: versionMode === 'v3' }"
              @click="versionMode = 'v3'"
            >
              <div class="version-card-badge" v-if="versionMode === 'v3'">
                <el-icon><Check /></el-icon>
              </div>
              <div class="version-card-icon v3-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <polygon points="12 2 22 20 2 20" />
                  <line x1="12" y1="9" x2="12" y2="14" />
                  <circle cx="12" cy="17" r="0.5" fill="currentColor" />
                </svg>
              </div>
              <div class="version-card-title">{{ $t('kit.version.v3Only') }}</div>
              <div class="version-card-desc">{{ $t('kit.version.v3OnlyDesc') }}</div>
            </div>
            <div
              class="version-card"
              :class="{ active: versionMode === 'both' }"
              @click="versionMode = 'both'"
            >
              <div class="version-card-badge" v-if="versionMode === 'both'">
                <el-icon><Check /></el-icon>
              </div>
              <div class="version-card-icon both-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="6" width="8" height="12" rx="1.5" />
                  <rect x="14" y="6" width="8" height="12" rx="1.5" />
                  <path d="M10 10h4M10 14h4" stroke-linecap="round" />
                </svg>
              </div>
              <div class="version-card-title">{{ $t('kit.version.both') }}</div>
              <div class="version-card-desc">{{ $t('kit.version.bothDesc') }}</div>
            </div>
          </div>
          <div class="version-action">
            <el-button type="primary" :loading="versionSaving" @click="saveVersion" size="large">
              {{ $t('kit.version.save') }}
            </el-button>
            <el-tag v-if="versionSaved" type="success" effect="plain" style="margin-left:12px">
              {{ $t('kit.version.saved') }}
            </el-tag>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onActivated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
import { getSettings, saveCron, activation, functionSwitch, dbUpgrade, envCheck, getVersionMode, saveVersionMode } from '../api/kit.js'

const { t } = useI18n()

const kitTabIds = ['cron', 'switch', 'activation', 'upgrade', 'envCheck', 'version']

function getTabFromUrl() {
  return new URLSearchParams(location.search).get('tab') || ''
}

function syncTabToUrl(tab) {
  const url = new URL(location.href)
  url.searchParams.set('tab', tab)
  history.replaceState(null, '', url.toString())
}

const activeTab = ref(kitTabIds.includes(getTabFromUrl()) ? getTabFromUrl() : 'cron')

watch(activeTab, syncTabToUrl)

onActivated(() => {
  const tab = getTabFromUrl()
  if (kitTabIds.includes(tab)) activeTab.value = tab
})
const settings = ref({})
const cronValues = reactive({ spider: '', release: '' })
const actMsg = ref(''); const actOk = ref(false)
const mysqlUpgradeStatus = ref('')
const envLoading = ref(false)
const envResult = ref(null)
const bizLoading = ref(false)
const versionMode = ref('both')
const versionSaving = ref(false)
const versionSaved = ref(false)

const isSponsored = computed(() => !!settings.value.sponsorship)

const cronItems = computed(() => [
  { key: 'spider', title: t('kit.cronSpider.title'), desc: t('kit.cronSpider.desc') }, // 定时采集 / 设置后通过 WP-Cron 自动执行列表采集
  { key: 'release', title: t('kit.cronRelease.title'), desc: t('kit.cronRelease.desc') }, // 定时发布 / 定时将已采集数据发布到 WordPress
])
const cronOptionList = computed(() => ({
  fifteenminutes: t('kit.cronOptions.fifteenminutes'), // 每15分钟
  halfhour: t('kit.cronOptions.halfhour'), // 每30分钟
  hourly: t('kit.cronOptions.hourly'), // 每小时
  twohourly: t('kit.cronOptions.twohourly'), // 每2小时
  threehours: t('kit.cronOptions.threehours'), // 每3小时
  fourhourly: t('kit.cronOptions.fourhourly'), // 每4小时
  eighthourly: t('kit.cronOptions.eighthourly'), // 每8小时
  twicedaily: t('kit.cronOptions.twicedaily'), // 每12小时
  daily: t('kit.cronOptions.daily'), // 每天
}))

const switchList = computed(() => [
  { key: 'rendering', name: t('kit.switchList.rendering.name'), desc: t('kit.switchList.rendering.desc') }, // Chrome 动态渲染 / 使用 Headless Chrome 渲染 JS 页面
  { key: 'all-collect', name: t('kit.switchList.allCollect.name'), desc: t('kit.switchList.allCollect.desc') }, // 全站采集 / 从首页匹配所有链接进行采集
  { key: 'auto-tags', name: t('kit.switchList.autoTags.name'), desc: t('kit.switchList.autoTags.desc') }, // 自动标签 / 发布时自动匹配已有关键词作为标签
  { key: 'dynamic-fields', name: t('kit.switchList.dynamicFields.name'), desc: t('kit.switchList.dynamicFields.desc') }, // 动态内容 / 发布时追加相关推荐内容
  { key: 'inner-chain', name: t('kit.switchList.innerChain.name'), desc: t('kit.switchList.innerChain.desc') }, // 标签内链 / 文章内容中的标签自动转为内链
  { key: 'release-control', name: t('kit.switchList.releaseControl.name'), desc: t('kit.switchList.releaseControl.desc') }, // 发布控制 / 自由选择发布分类/作者/类型
  { key: 'insert-keyword', name: t('kit.switchList.insertKeyword.name'), desc: t('kit.switchList.insertKeyword.desc') }, // 关键词随机插入 / 在段落中随机插入关键词外链
  { key: 'featured-picture', name: t('kit.switchList.featuredPicture.name'), desc: t('kit.switchList.featuredPicture.desc') }, // 图片入库 / 发布时图片自动入库为附件
])

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
    versionMode.value = settings.value.version_mode || 'both'
  } catch {}
}

async function saveCronType(type, value) {
  // 保存成功
  try { await saveCron({ type, value }); ElMessage.success(t('kit.saved')) }
  catch (e) { ElMessage.error(e.message) }
}
async function toggleSwitch(key) {
  try {
    const r = await functionSwitch(key)
    if (r.code === 200) {
      await loadSettings()
      ElMessage.success(r.msg || t('kit.toggleSuccess')) // 切换成功
    } else {
      ElMessage.error(r.msg || t('kit.toggleFail'))
    }
  } catch (e) { ElMessage.error(e.message) }
}
async function doActivation() {
  try {
    const r = await activation()
    actMsg.value = r.msg || '操作完成'; actOk.value = r.code === 200
    if (r.code === 200) loadSettings()
  } catch (e) { actMsg.value = e.message; actOk.value = false }
}
async function doUpgrade() {
  try { const r = await dbUpgrade('1'); ElMessage.success(r.msg || '完成'); loadSettings() }
  catch (e) { ElMessage.error(e.message) }
}

const envItems = computed(() => {
  if (!envResult.value) return []
  return Object.values(envResult.value.env || {})
})

async function doEnvCheck() {
  envLoading.value = true
  envResult.value = null
  try {
    const r = await envCheck()
    envResult.value = r.data || null
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    envLoading.value = false
  }
}

const bizItems = computed(() => {
  if (!envResult.value) return Object.values({
    wechat:   { name: t('kit.bizItems.wechat'),   current: '未检测', require: '正常', pass: false, pending: true }, // 微信采集
    jianshu:  { name: t('kit.bizItems.jianshu'),  current: '未检测', require: '正常', pass: false, pending: true }, // 简书采集
    zhihu:    { name: t('kit.bizItems.zhihu'),    current: '未检测', require: '正常', pass: false, pending: true }, // 知乎采集
  })
  return Object.values(envResult.value.business || {})
})

async function doBizCheck() {
  bizLoading.value = true
  try { await new Promise(r => setTimeout(r, 600)) } catch {}
  ElMessage.info(t('kit.bizPendingMsg')) // 业务功能检测完善中，敬请期待
  bizLoading.value = false
}

async function saveVersion() {
  versionSaving.value = true
  versionSaved.value = false
  try {
    const r = await saveVersionMode(versionMode.value)
    if (r.code === 200) {
      versionSaved.value = true
      ElMessage.success(t('kit.version.saved'))
      setTimeout(() => { location.reload() }, 1200)
    } else {
      ElMessage.error(r.msg || '保存失败')
    }
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    versionSaving.value = false
  }
}

onMounted(loadSettings)
</script>

<style scoped>
.version-header {
  margin-bottom: 24px;
}

.version-header h4 {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.version-header p {
  margin: 0;
  font-size: 13px;
  color: #909399;
  line-height: 1.5;
}

.version-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.version-card {
  position: relative;
  padding: 24px 20px 20px;
  border: 2px solid #e4e7ed;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
}

.version-card:hover {
  border-color: #c0c4cc;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.version-card.active {
  border-color: #409eff;
  background: #ecf5ff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.15);
}

.version-card-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 26px;
  height: 26px;
  background: #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.35);
}

.version-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  margin-bottom: 14px;
  transition: all 0.25s;
}

.v2-icon {
  background: #fdf6ec;
  color: #e6a23c;
}

.version-card.active .v2-icon {
  background: #e6a23c;
  color: #fff;
}

.v3-icon {
  background: #ecf5ff;
  color: #409eff;
}

.version-card.active .v3-icon {
  background: #409eff;
  color: #fff;
}

.both-icon {
  background: #f0f9eb;
  color: #67c23a;
}

.version-card.active .both-icon {
  background: #67c23a;
  color: #fff;
}

.version-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
}

.version-card-desc {
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.version-action {
  display: flex;
  align-items: center;
  padding-top: 8px;
}
</style>
