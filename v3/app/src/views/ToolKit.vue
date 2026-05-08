<template>
  <div class="page-kit">
    <div class="page-header">
      <h2>{{ $t('kit.title') }}</h2>
      <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.desc') }}</p>
    </div>

    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane :label="$t('kit.cron')" name="cron">
        <el-card v-for="item in cronItems" :key="item.key" shadow="never" style="margin-bottom:14px">
          <template #header><strong>{{ item.title }}</strong></template>
          <p style="color:#909399;font-size:13px;margin:0 0 10px">{{ item.desc }}</p>
          <div style="display:flex;gap:10px">
            <el-select v-model="cronValues[item.key]" placeholder="选择频率" style="width:180px">
              <el-option label="关闭" value="" />
              <el-option v-for="(label, k) in cronOptionList" :key="k" :label="label" :value="k" />
            </el-select>
            <el-button type="primary" @click="saveCronType(item.key, cronValues[item.key])">{{ $t('kit.save') }}</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.switch')" name="switch">
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

      <el-tab-pane :label="$t('kit.activation')" name="activation">
        <el-card shadow="never">
          <h4 style="margin:0 0 10px">{{ $t('kit.sponsorActivation') }}</h4>
          <p style="color:#909399;font-size:13px;margin:0 0 12px">{{ $t('kit.sponsorDesc') }}</p>
          <div style="display:flex;gap:10px">
            <el-input v-model="activationCode" :placeholder="$t('kit.activatePlaceholder')" style="width:300px" />
            <el-button type="primary" @click="doActivation">{{ $t('kit.activate') }}</el-button>
          </div>
          <p v-if="actMsg" :style="{ color: actOk ? '#67c23a' : '#f56c6c', fontSize: '13px', marginTop: '8px' }">{{ actMsg }}</p>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.upgrade')" name="upgrade">
        <el-card shadow="never">
          <h4 style="margin:0 0 10px">{{ $t('kit.dbUpgrade') }}</h4>
          <p style="color:#909399;font-size:13px;margin:0 0 10px">{{ $t('kit.dbUpgradeDesc') }}</p>
          <el-tag type="info" style="margin-bottom:12px">{{ $t('kit.currentStatus') }}：{{ mysqlUpgradeStatus || $t('kit.latest') }}</el-tag>
          <div><el-button type="primary" @click="doUpgrade">{{ $t('kit.startUpgrade') }}</el-button></div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('kit.envCheck')" name="envCheck">
        <!-- 运行环境检测 -->
        <el-card shadow="never" style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div>
              <h4 style="margin:0 0 4px">{{ $t('kit.envCheckTitle') }}</h4>
              <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.envCheckDesc') }}</p>
            </div>
            <el-button type="primary" :loading="envLoading" @click="doEnvCheck">
              {{ envLoading ? $t('kit.checking') : $t('kit.startCheck') }}
            </el-button>
          </div>
          <div v-if="envResult" style="margin-top:12px">
            <div style="margin-bottom:14px">
              <el-tag :type="envResult.envAllPass ? 'success' : 'danger'" size="large">
                {{ envResult.envAllPass ? $t('kit.envAllPass') : $t('kit.envNotAllPass') }}
              </el-tag>
            </div>
            <el-table :data="envItems" stripe size="small" style="width:100%">
              <el-table-column :label="$t('kit.envColItem')" width="180">
                <template #default="{ row }">
                  <span style="font-weight:500">{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColCurrent')" width="180">
                <template #default="{ row }">
                  <el-tag :type="row.pass ? 'success' : 'danger'" size="small">{{ row.current }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColRequire')" width="180">
                <template #default="{ row }">{{ row.require }}</template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColStatus')" width="100">
                <template #default="{ row }">
                  <span :style="{ color: row.pass ? '#67c23a' : '#f56c6c', fontWeight: 'bold' }">
                    {{ row.pass ? '✓' : '✗' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('kit.envColMsg')">
                <template #default="{ row }">
                  <span v-if="row.error" style="color:#f56c6c;font-size:12px">{{ row.error }}</span>
                  <span v-else style="color:#909399;font-size:12px">-</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="!envLoading" style="text-align:center;padding:30px 0;color:#909399">
            {{ $t('kit.envClickToCheck') }}
          </div>
        </el-card>

        <!-- 业务功能检测 -->
        <el-card shadow="never">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div>
              <h4 style="margin:0 0 4px">{{ $t('kit.bizCheckTitle') }}</h4>
              <p style="color:#909399;font-size:13px;margin:0">{{ $t('kit.bizCheckDesc') }}</p>
            </div>
            <el-button type="warning" :loading="bizLoading" @click="doBizCheck">
              {{ bizLoading ? $t('kit.checking') : $t('kit.bizStartCheck') }}
            </el-button>
          </div>
          <el-table :data="bizItems" stripe size="small" style="width:100%">
            <el-table-column :label="$t('kit.envColItem')" width="180">
              <template #default="{ row }">
                <span style="font-weight:500">{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColCurrent')" width="180">
              <template #default="{ row }">
                <el-tag v-if="row.pending" type="warning" size="small">{{ $t('kit.bizPending') }}</el-tag>
                <el-tag v-else :type="row.pass ? 'success' : 'danger'" size="small">{{ row.current }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColRequire')" width="180">
              <template #default="{ row }">{{ row.require }}</template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColStatus')" width="100">
              <template #default="{ row }">
                <span v-if="row.pending" style="color:#e6a23c">-</span>
                <span v-else :style="{ color: row.pass ? '#67c23a' : '#f56c6c', fontWeight: 'bold' }">
                  {{ row.pass ? '✓' : '✗' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('kit.envColMsg')">
              <template #default="{ row }">
                <span v-if="row.error" style="color:#f56c6c;font-size:12px">{{ row.error }}</span>
                <span v-else style="color:#909399;font-size:12px">-</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getSettings, saveCron, activation, functionSwitch, dbUpgrade, envCheck } from '../api/kit.js'

const { t } = useI18n()

const activeTab = ref('cron')
const settings = ref({})
const cronValues = reactive({ spider: '', release: '' })
const activationCode = ref(''); const actMsg = ref(''); const actOk = ref(false)
const mysqlUpgradeStatus = ref('')
const envLoading = ref(false)
const envResult = ref(null)
const bizLoading = ref(false)

const cronItems = computed(() => [
  { key: 'spider', title: t('kit.cronSpider.title'), desc: t('kit.cronSpider.desc') },
  { key: 'release', title: t('kit.cronRelease.title'), desc: t('kit.cronRelease.desc') },
])
const cronOptionList = computed(() => ({
  fifteenminutes: t('kit.cronOptions.fifteenminutes'),
  halfhour: t('kit.cronOptions.halfhour'),
  hourly: t('kit.cronOptions.hourly'),
  twohourly: t('kit.cronOptions.twohourly'),
  threehours: t('kit.cronOptions.threehours'),
  fourhourly: t('kit.cronOptions.fourhourly'),
  eighthourly: t('kit.cronOptions.eighthourly'),
  twicedaily: t('kit.cronOptions.twicedaily'),
  daily: t('kit.cronOptions.daily'),
}))

const switchList = computed(() => [
  { key: 'rendering', name: t('kit.switchList.rendering.name'), desc: t('kit.switchList.rendering.desc') },
  { key: 'all-collect', name: t('kit.switchList.allCollect.name'), desc: t('kit.switchList.allCollect.desc') },
  { key: 'auto-tags', name: t('kit.switchList.autoTags.name'), desc: t('kit.switchList.autoTags.desc') },
  { key: 'dynamic-fields', name: t('kit.switchList.dynamicFields.name'), desc: t('kit.switchList.dynamicFields.desc') },
  { key: 'inner-chain', name: t('kit.switchList.innerChain.name'), desc: t('kit.switchList.innerChain.desc') },
  { key: 'release-control', name: t('kit.switchList.releaseControl.name'), desc: t('kit.switchList.releaseControl.desc') },
  { key: 'insert-keyword', name: t('kit.switchList.insertKeyword.name'), desc: t('kit.switchList.insertKeyword.desc') },
  { key: 'featured-picture', name: t('kit.switchList.featuredPicture.name'), desc: t('kit.switchList.featuredPicture.desc') },
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
  } catch {}
}

async function saveCronType(type, value) {
  try { await saveCron({ type, value }); ElMessage.success(t('kit.saved')) }
  catch (e) { ElMessage.error(e.message) }
}
async function toggleSwitch(key) {
  try { await functionSwitch(key); loadSettings(); ElMessage.success(t('kit.toggleSuccess')) }
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
    wechat:   { name: t('kit.bizItems.wechat'),   current: '未检测', require: '正常', pass: false, pending: true },
    jianshu:  { name: t('kit.bizItems.jianshu'),  current: '未检测', require: '正常', pass: false, pending: true },
    zhihu:    { name: t('kit.bizItems.zhihu'),    current: '未检测', require: '正常', pass: false, pending: true },
  })
  return Object.values(envResult.value.business || {})
})

async function doBizCheck() {
  bizLoading.value = true
  try { await new Promise(r => setTimeout(r, 600)) } catch {}
  ElMessage.info(t('kit.bizPendingMsg'))
  bizLoading.value = false
}

onMounted(loadSettings)
</script>
