<template>
  <div class="page-debug">
    <div class="page-header">
      <h2>{{ $t('debug.title') }}</h2>
      <p style="color:#909399;font-size:13px;margin:0">{{ $t('debug.desc') }}</p>
    </div>

    <el-card shadow="never" style="margin-bottom:20px">
      <el-form label-position="top" size="small">
        <el-form-item :label="$t('debug.targetUrl')">
          <el-input v-model="debugUrl" placeholder="https://example.com/article.html" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item :label="$t('debug.encoding')">
              <el-select v-model="debugRemoveHead" style="width:100%">
                <el-option :value="1" :label="$t('debug.autoDetect')" />
                <el-option :value="2" :label="$t('debug.removeHead')" />
                <el-option :value="3" :label="$t('debug.forceConvert')" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('debug.collectType')">
              <el-select v-model="debugRendering" style="width:100%">
                <el-option :value="1" :label="$t('debug.static')" />
                <el-option :value="2" :label="$t('debug.chromeRender')" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('debug.collectRange')">
          <el-input v-model="debugRange" placeholder=".article-content" />
        </el-form-item>
        <el-form-item :label="$t('debug.collectRules')">
          <div style="margin-bottom:8px">
            <span style="font-size:11px;color:#909399">{{ $t('debug.ruleFormat') }}</span>
          </div>
          <div v-for="(rule, i) in debugRules" :key="i" style="display:flex;gap:6px;margin-bottom:6px">
            <el-input v-model="rule.name" :placeholder="$t('debug.ruleName')" style="width:100px" />
            <el-input v-model="rule.selector" :placeholder="$t('debug.selector')" style="flex:1" />
            <el-input v-model="rule.attr" :placeholder="$t('debug.attribute')" style="width:100px" />
            <el-input v-model="rule.filter" :placeholder="$t('debug.filter')" style="width:110px" />
            <el-button v-if="debugRules.length > 1" size="small" @click="debugRules.splice(i, 1)" type="danger" plain>×</el-button>
          </div>
          <el-button size="small" @click="debugRules.push({ name: '', selector: '', attr: '', filter: '' })">{{ $t('debug.addRule') }}</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="running" @click="runDebug" style="margin-top:8px">{{ running ? $t('debug.running') : $t('debug.runDebug') }}</el-button>
    </el-card>

    <el-card v-if="debugResult" shadow="never">
      <template #header>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span>{{ $t('debug.result') }}</span>
          <el-tag :type="debugResult.code === 200 ? 'success' : 'danger'" size="small">{{ debugResult.code === 200 ? $t('debug.success') : $t('debug.failed') }}</el-tag>
        </div>
      </template>
      <pre class="debug-pre">{{ JSON.stringify(debugResult.data || debugResult, null, 2) }}</pre>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debugRun } from '../api/debug.js'

const debugUrl = ref(''); const debugRemoveHead = ref(1); const debugRendering = ref(1)
const debugRange = ref(''); const debugRules = ref([{ name: '', selector: '', attr: '', filter: '' }])
const debugResult = ref(null); const running = ref(false)

async function runDebug() {
  running.value = true
  try {
    const rules = debugRules.value.filter(r => r.selector.trim())
      .map((r, i) => `${r.name || 'field' + i}%${r.selector}|${r.attr || 'text'}|${r.filter || 'null'}`)
      .join(')(')
    const parts = rules.split(')(')
    const res = await debugRun({
      url: debugUrl.value, remove_head: debugRemoveHead.value, rendering: debugRendering.value, range: debugRange.value,
      rule_a: parts[0] || '', rule_b: parts[1] || '', rule_c: parts[2] || '', rule_d: parts[3] || '',
    })
    debugResult.value = res
  } catch (e) { debugResult.value = { code: 0, msg: e.message } }
  finally { running.value = false }
}
</script>

<style scoped>
.debug-pre { background: #1e293b; color: #cbd5e1; padding: 16px; border-radius: 8px; font-size: 12px; max-height: 500px; overflow: auto; margin: 0; line-height: 1.6; }
</style>
