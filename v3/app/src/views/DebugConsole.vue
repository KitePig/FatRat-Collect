<template>
  <div class="page-debug">
    <div class="page-header">
      <h2>{{ $t('debug.title') }}</h2>
      <p>{{ $t('debug.desc') }}</p>
    </div>

    <div class="debug-layout">
      <!-- 左侧：表单 + 历史 -->
      <div class="debug-left">
        <!-- 主表单 -->
        <div class="card debug-card" style="padding: 24px;">
          <el-form label-position="top" size="default">
            <!-- 目标地址 -->
            <el-form-item :label="$t('debug.targetUrl')">
              <el-input
                v-model="debugUrl"
                placeholder="https://example.com/article.html"
                size="large"
                clearable
                @keyup.enter="runDebug"
              >
                <template #prefix>
                  <el-icon><Link /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <!-- 编码处理 & 采集方式 -->
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('debug.encoding')">
                  <el-radio-group v-model="debugRemoveHead" class="opt-radio-group">
                    <el-radio-button :value="1">{{ $t('debug.autoDetect') }}</el-radio-button>
                    <el-radio-button :value="2">{{ $t('debug.removeHead') }}</el-radio-button>
                    <el-radio-button :value="3">{{ $t('debug.forceConvert') }}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('debug.collectType')">
                  <el-radio-group v-model="debugRendering" class="opt-radio-group">
                    <el-radio-button :value="1">{{ $t('debug.static') }}</el-radio-button>
                    <el-radio-button :value="2">{{ $t('debug.chromeRender') }}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 采集范围 -->
            <el-form-item :label="$t('debug.collectRange')">
              <el-input
                v-model="debugRange"
                placeholder=".article-content"
                clearable
              >
                <template #prefix>
                  <el-icon><Aim /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <!-- 采集规则 -->
            <el-form-item :label="$t('debug.collectRules')">
              <div class="rules-hint">{{ $t('debug.ruleFormat') }}</div>

              <div class="rules-header">
                <span class="rules-col rules-col-num">#</span>
                <span class="rules-col rules-col-name">{{ $t('debug.ruleName') }}</span>
                <span class="rules-col rules-col-selector">{{ $t('debug.selector') }}</span>
                <span class="rules-col rules-col-attr">{{ $t('debug.attribute') }}</span>
                <span class="rules-col rules-col-filter">{{ $t('debug.filter') }}</span>
                <span class="rules-col rules-col-del"></span>
              </div>

              <TransitionGroup name="rule-list" tag="div" class="rules-list">
                <div v-for="(rule, i) in debugRules" :key="rule._key" class="rule-item">
                  <span class="rules-col rules-col-num rule-num">{{ i + 1 }}</span>
                  <el-input
                    v-model="rule.name"
                    :placeholder="$t('debug.ruleName')"
                    class="rules-col rules-col-name"
                    size="default"
                  />
                  <el-input
                    v-model="rule.selector"
                    :placeholder="$t('debug.selector')"
                    class="rules-col rules-col-selector"
                    size="default"
                  />
                  <el-input
                    v-model="rule.attr"
                    :placeholder="$t('debug.attribute')"
                    class="rules-col rules-col-attr"
                    size="default"
                  />
                  <el-input
                    v-model="rule.filter"
                    :placeholder="$t('debug.filter')"
                    class="rules-col rules-col-filter"
                    size="default"
                  />
                  <el-button
                    v-if="debugRules.length > 1"
                    class="rules-col rules-col-del"
                    size="small"
                    type="danger"
                    :icon="Delete"
                    circle
                    plain
                    @click="removeRule(i)"
                  />
                </div>
              </TransitionGroup>

              <el-button class="add-rule-btn" :icon="Plus" @click="addRule">
                {{ $t('debug.addRule') }}
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 操作按钮 -->
          <div class="debug-actions">
            <el-button
              type="primary"
              size="large"
              :loading="running"
              :icon="running ? undefined : VideoPlay"
              @click="runDebug"
              class="btn-debug-run"
            >
              {{ running ? $t('debug.running') : $t('debug.runDebug') }}
            </el-button>
            <el-button size="large" @click="clearForm" :disabled="running">
              {{ $t('debug.clearForm') }}
            </el-button>
            <el-button size="large" @click="loadSample" :disabled="running">
              {{ $t('debug.loadSample') }}
            </el-button>
          </div>
        </div>

        <!-- 请求历史 -->
        <div v-if="history.length > 0" class="card debug-history-card" style="padding: 0; margin-top: 20px; overflow: hidden;">
          <div class="card-section-header">
            <div class="card-section-title">
              <el-icon><Clock /></el-icon>
              <span>{{ $t('debug.history') }}</span>
              <el-tag size="small" effect="plain" round>{{ history.length }}</el-tag>
            </div>
            <el-button size="small" text type="danger" @click="clearHistory">
              {{ $t('debug.clearHistory') }}
            </el-button>
          </div>
          <div class="history-list">
            <div
              v-for="(item, i) in history"
              :key="i"
              class="history-item"
              @click="replayHistory(item)"
            >
              <div class="history-item-main">
                <span class="history-url">{{ item.url }}</span>
                <span class="history-meta">
                  <el-tag :type="item.code === 200 ? 'success' : 'danger'" size="small" effect="plain">
                    {{ item.code === 200 ? $t('debug.success') : $t('debug.failed') }}
                  </el-tag>
                  <span class="history-time">{{ formatTime(item._time) }}</span>
                </span>
              </div>
              <el-icon class="history-replay"><RefreshRight /></el-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：结果展示 -->
      <div class="debug-right">
        <div class="card debug-result-card" style="overflow: hidden;">
          <div class="card-section-header result-top-bar">
            <div class="card-section-title">
              <span>{{ $t('debug.result') }}</span>
              <template v-if="debugResult">
                <el-tag :type="debugResult.code === 200 ? 'success' : 'danger'" size="small" effect="dark">
                  {{ debugResult.code === 200 ? $t('debug.success') : $t('debug.failed') }}
                </el-tag>
                <span v-if="debugResult.code === 200 && resultItems.length" class="result-count">
                  {{ $t('debug.totalItems', { count: resultItems.length }) }}
                </span>
              </template>
            </div>
            <div class="result-top-actions" v-if="debugResult">
              <el-button size="small" text :icon="CopyDocument" @click="copyResult">
                {{ $t('debug.copyJson') }}
              </el-button>
              <el-button size="small" text @click="showRaw = !showRaw">
                {{ showRaw ? $t('debug.visualView') : $t('debug.jsonView') }}
              </el-button>
            </div>
          </div>

          <template v-if="!debugResult">
            <div class="result-placeholder">
              <el-icon class="result-placeholder-icon"><Monitor /></el-icon>
              <p class="result-placeholder-text">{{ $t('debug.waitingForDebug') }}</p>
            </div>
          </template>

          <template v-else>
            <el-alert
              v-if="debugResult.code !== 200"
              type="error"
              :title="debugResult.msg"
              show-icon
              style="margin: 16px 20px"
            />

            <div v-else-if="resultItems.length === 0" style="padding: 40px 20px; text-align: center;">
              <el-empty :description="$t('debug.noData')" />
            </div>

            <pre v-if="showRaw && debugResult.code === 200" class="debug-pre">{{ JSON.stringify(debugResult.data, null, 2) }}</pre>

            <div v-else-if="debugResult.code === 200 && resultItems.length > 0" class="result-visual">
              <div class="result-summary">
                <el-icon class="result-summary-icon"><CircleCheck /></el-icon>
                <span>{{ debugResult.msg || $t('debug.completed') }}</span>
              </div>

              <div class="result-items">
                <div v-for="(item, i) in resultItems" :key="i" class="result-item-card">
                  <div class="result-item-header">
                    <el-tag size="small" effect="plain" round>#{{ i + 1 }}</el-tag>
                    <span class="result-item-fields">{{ Object.keys(item).length }} fields</span>
                  </div>
                  <table class="result-table">
                    <tr v-for="(val, key) in item" :key="key">
                      <td class="result-label">{{ key }}</td>
                      <td class="result-value">
                        <template v-if="isHtml(val)">
                          <div class="html-preview" v-html="val"></div>
                          <div class="result-value-actions">
                            <el-button size="small" text type="primary" @click="toggleRaw(i, key)">
                              {{ rawToggles[i + '_' + key] ? $t('debug.collapseSource') : $t('debug.viewSource') }}
                            </el-button>
                            <el-button size="small" text @click="copyText(val)">
                              <el-icon><CopyDocument /></el-icon>
                            </el-button>
                          </div>
                          <pre v-if="rawToggles[i + '_' + key]" class="debug-pre-inline">{{ val }}</pre>
                        </template>
                        <template v-else-if="isUrl(val)">
                          <div class="result-value-row">
                            <el-link :href="val" target="_blank" type="primary" :underline="false">{{ val }}</el-link>
                            <el-button size="small" text @click="copyText(val)" style="margin-left: 8px;">
                              <el-icon><CopyDocument /></el-icon>
                            </el-button>
                          </div>
                        </template>
                        <template v-else>
                          <div class="result-value-row">
                            <span :class="{ 'text-truncated': val && val.length > 200 && !rawToggles[i + '_' + key] }">{{ val || '-' }}</span>
                            <span v-if="val && val.length > 200" class="result-value-actions" style="display: inline-flex;">
                              <el-button size="small" text type="primary" @click="toggleRaw(i, key)">
                                {{ rawToggles[i + '_' + key] ? $t('debug.collapse') : $t('debug.expand') }}
                              </el-button>
                            </span>
                            <el-button v-if="val" size="small" text @click="copyText(val)" style="margin-left: 4px;">
                              <el-icon><CopyDocument /></el-icon>
                            </el-button>
                          </div>
                          <div v-if="rawToggles[i + '_' + key] && val && val.length > 200" class="expanded-text">{{ val }}</div>
                        </template>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Delete, Plus, VideoPlay, CircleCheck,
  Link, Aim, Clock, RefreshRight, CopyDocument, Monitor
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { debugRun } from '../api/debug.js'

const { t } = useI18n()

const STORAGE_KEY = 'frc_v3_debug_history'
const MAX_HISTORY = 10

let _ruleKey = 0
function nextKey() { return ++_ruleKey }

const debugUrl = ref('')
const debugRemoveHead = ref(1)
const debugRendering = ref(1)
const debugRange = ref('')
const debugRules = ref([{ name: '', selector: '', attr: '', filter: '', _key: nextKey() }])
const debugResult = ref(null)
const running = ref(false)
const showRaw = ref(false)
const rawToggles = reactive({})

const history = ref(loadHistory())

const resultItems = computed(() => {
  const data = debugResult.value?.data
  if (!data) return []
  if (Array.isArray(data)) return data
  return [data]
})

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveHistory(entry) {
  const list = loadHistory()
  list.unshift(entry)
  if (list.length > MAX_HISTORY) list.length = MAX_HISTORY
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  history.value = list
}

function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
  history.value = []
  ElMessage.success(t('debug.historyCleared'))
}

function replayHistory(item) {
  debugUrl.value = item._url || ''
  debugRemoveHead.value = item._remove_head ?? 1
  debugRendering.value = item._rendering ?? 1
  debugRange.value = item._range || ''
  if (item._rules && item._rules.length) {
    debugRules.value = item._rules.map(r => ({ ...r, _key: nextKey() }))
  }
  showRaw.value = false
  Object.keys(rawToggles).forEach(k => delete rawToggles[k])
  ElMessage.success(t('debug.replayed'))
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const pad = n => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function addRule() {
  debugRules.value.push({ name: '', selector: '', attr: '', filter: '', _key: nextKey() })
}

function removeRule(index) {
  if (debugRules.value.length > 1) {
    debugRules.value.splice(index, 1)
  }
}

function clearForm() {
  debugUrl.value = ''
  debugRemoveHead.value = 1
  debugRendering.value = 1
  debugRange.value = ''
  debugRules.value = [{ name: '', selector: '', attr: '', filter: '', _key: nextKey() }]
  debugResult.value = null
  showRaw.value = false
  Object.keys(rawToggles).forEach(k => delete rawToggles[k])
}

function loadSample() {
  debugUrl.value = 'https://example.com/article.html'
  debugRange.value = '.article-content'
  debugRules.value = [
    { name: 'title', selector: '.title', attr: 'text', filter: '', _key: nextKey() },
    { name: 'content', selector: '.content', attr: 'html', filter: '-script -style', _key: nextKey() },
    { name: 'author', selector: '.author', attr: 'text', filter: '', _key: nextKey() },
    { name: 'cover', selector: '.cover img', attr: 'src', filter: '', _key: nextKey() },
  ]
}

function toggleRaw(i, key) {
  const k = i + '_' + key
  rawToggles[k] = !rawToggles[k]
}

function isHtml(val) {
  if (typeof val !== 'string') return false
  return /<[a-z][\s\S]*>/i.test(val)
}

function isUrl(val) {
  if (typeof val !== 'string') return false
  return /^https?:\/\/\S+$/i.test(val.trim())
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(t('debug.copied'))
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    ElMessage.success(t('debug.copied'))
  }
}

async function copyResult() {
  if (!debugResult.value) return
  await copyText(JSON.stringify(debugResult.value, null, 2))
}

async function runDebug() {
  if (!debugUrl.value.trim()) {
    ElMessage.warning(t('debug.urlRequired'))
    return
  }
  showRaw.value = false
  Object.keys(rawToggles).forEach(k => delete rawToggles[k])
  running.value = true
  try {
    const rules = debugRules.value
      .filter(r => r.selector.trim())
      .map((r, i) => {
        const name = r.name?.trim() || 'field' + i
        const attr = r.attr?.trim() || 'text'
        const filter = r.filter?.trim() || 'null'
        return `${name}%${r.selector.trim()}|${attr}|${filter}`
      })
      .join(')(')

    const res = await debugRun({
      debug_url: debugUrl.value.trim(),
      debug_remove_head: debugRemoveHead.value,
      debug_rendering: debugRendering.value,
      debug_range: debugRange.value.trim(),
      debug_rules: rules,
    })

    debugResult.value = res

    if (res.code === 200) {
      ElMessage.success(t('debug.success'))

      saveHistory({
        url: debugUrl.value.trim(),
        code: res.code,
        msg: res.msg,
        _time: Date.now(),
        _url: debugUrl.value.trim(),
        _remove_head: debugRemoveHead.value,
        _rendering: debugRendering.value,
        _range: debugRange.value.trim(),
        _rules: debugRules.value.map(r => ({
          name: r.name, selector: r.selector, attr: r.attr, filter: r.filter,
        })),
      })
    } else {
      ElMessage.error(res.msg || t('debug.failed'))
    }
  } catch (e) {
    ElMessage.error(e.message || t('debug.error'))
    debugResult.value = { code: 0, msg: e.message }
  } finally {
    running.value = false
  }
}
</script>

<style scoped>
/* ── Layout ── */
.debug-layout {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.debug-left {
  flex: 0 0 calc(50% - 8px);
  width: calc(50% - 8px);
  min-width: 0;
}

.debug-right {
  flex: 0 0 calc(50% - 8px);
  width: calc(50% - 8px);
  min-width: 0;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 100px);
  display: flex;
}

.debug-left .card,
.debug-right .card {
  width: 100%;
}

/* 表单内输入组件撑满宽度 */
.debug-card :deep(.el-form-item__content) {
  width: 100%;
}

.debug-card :deep(.el-radio-group) {
  width: 100%;
  display: flex;
}

.debug-card :deep(.el-radio-button) {
  flex: 1;
}

.debug-card :deep(.el-radio-button__inner) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.debug-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
}

.btn-debug-run {
  min-width: 140px;
  font-size: 14px !important;
}

/* ── 规则区 ── */
.rules-hint {
  font-size: 12px;
  color: var(--text3);
  margin-bottom: 12px;
  line-height: 1.5;
}

.rules-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 2px 8px 2px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--border-light);
}

.rules-header .rules-col {
  font-size: 12px;
  font-weight: 600;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #fafbfc;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  transition: all .2s ease;
}

.rule-item:hover {
  background: #f0f2f5;
  border-color: var(--accent-light);
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}

.rule-num {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  user-select: none;
  flex-shrink: 0;
}

.rules-col {
  flex-shrink: 0;
}

.rules-col-num {
  width: 24px;
}

.rules-col-name {
  width: 88px;
}

.rules-col-selector {
  flex: 1;
  min-width: 0;
}

.rules-col-attr {
  width: 90px;
}

.rules-col-filter {
  width: 110px;
}

.rules-col-del {
  width: 32px;
  flex-shrink: 0;
}

.add-rule-btn {
  width: 100%;
  margin-top: 10px;
  border-style: dashed;
  border-color: var(--border);
  color: var(--text2);
  font-weight: 500;
  transition: all .2s ease;
}

.add-rule-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}

/* transition */
.rule-list-enter-active {
  transition: all .3s ease;
}

.rule-list-leave-active {
  transition: all .2s ease;
}

.rule-list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.rule-list-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

/* ── 通用卡片区块头部 ── */
.card-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  background: #fafbfc;
  gap: 12px;
}

.card-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

/* ── 请求历史 ── */
.debug-history-card {
  animation: frc-v3-fadeUp .35s ease both;
}

.history-list {
  max-height: 280px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  cursor: pointer;
  transition: background .15s ease;
  border-bottom: 1px solid var(--border-light);
  gap: 12px;
}

.history-item:last-child {
  border-bottom: none;
}

.history-item:hover {
  background: var(--accent-soft);
}

.history-item-main {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}

.history-url {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 420px;
}

.history-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.history-time {
  font-size: 11px;
  color: var(--text3);
  font-family: monospace;
}

.history-replay {
  font-size: 16px;
  color: var(--text3);
  flex-shrink: 0;
  transition: color .15s;
}

.history-item:hover .history-replay {
  color: var(--accent);
}

/* ── 结果区 ── */
.debug-result-card {
  animation: frc-v3-fadeUp .4s ease both;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 100px);
}

.debug-result-card > :last-child {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.result-top-bar {
  background: #fafbfc;
}

.result-top-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.result-count {
  font-size: 12px;
  color: var(--text3);
  font-weight: 400;
}

/* JSON 代码块 */
.debug-pre {
  background: #1e293b;
  color: #cbd5e1;
  padding: 20px 24px;
  font-size: 12px;
  overflow: auto;
  margin: 0;
  line-height: 1.7;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  tab-size: 2;
  flex: 1;
}

.debug-pre-inline {
  background: #f8fafc;
  padding: 12px 14px;
  border-radius: var(--radius-xs);
  font-size: 11px;
  max-height: 300px;
  overflow: auto;
  margin-top: 8px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
  border: 1px solid var(--border);
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}

/* 结果占位 */
.result-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 200px;
}

.result-placeholder-icon {
  font-size: 48px;
  color: var(--text4, #c0c4cc);
  margin-bottom: 16px;
}

.result-placeholder-text {
  font-size: 14px;
  color: var(--text3, #909399);
  margin: 0;
}

/* 可视化结果 */
.result-visual {
  padding: 0;
}

.result-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  margin: 0;
  background: var(--success-soft);
  border-bottom: 1px solid #bbf7d0;
  font-size: 13px;
  font-weight: 500;
  color: #065f46;
}

.result-summary-icon {
  font-size: 18px;
}

.result-items {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.result-item-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  overflow: hidden;
  transition: border-color .2s, box-shadow .2s;
}

.result-item-card:hover {
  border-color: var(--accent-light);
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
}

.result-item-header {
  padding: 8px 14px;
  background: #fafbfc;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-item-fields {
  font-size: 11px;
  color: var(--text3);
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

.result-table tr:not(:last-child) td {
  border-bottom: 1px solid var(--border-light);
}

.result-table td {
  padding: 10px 14px;
  vertical-align: top;
}

.result-label {
  width: 110px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text2);
  background: #fafbfc;
  white-space: nowrap;
  text-align: right;
  padding-right: 12px !important;
  border-right: 1px solid var(--border-light);
}

.result-value {
  font-size: 13px;
  color: var(--text);
  line-height: 1.6;
  word-break: break-word;
}

.result-value-row {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

.result-value-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 4px;
}

.html-preview {
  max-height: 400px;
  overflow: auto;
  margin-bottom: 4px;
  padding: 8px 0;
}

.html-preview :deep(img) {
  max-width: 100%;
  height: auto;
}

.html-preview :deep(a) {
  color: var(--accent);
}

.text-truncated {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.expanded-text {
  padding: 12px 14px;
  margin-top: 8px;
  background: #f8fafc;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}
</style>
