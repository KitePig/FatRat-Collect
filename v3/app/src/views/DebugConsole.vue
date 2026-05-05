<template>
  <div class="page-debug">
    <div class="page-header">
      <h2>调试台</h2>
      <p>在线测试采集规则，实时预览采集结果</p>
    </div>

    <div class="debug-card">
      <div class="form-group">
        <label>目标地址 <span class="required">*</span></label>
        <input v-model="debugUrl" placeholder="https://example.com/article.html" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>编码处理</label>
          <select v-model="debugRemoveHead">
            <option :value="1">自动识别</option>
            <option :value="2">删除HEAD重新编码</option>
            <option :value="3">强制转换编码</option>
          </select>
        </div>
        <div class="form-group">
          <label>采集方式</label>
          <select v-model="debugRendering">
            <option :value="1">静态采集</option>
            <option :value="2">Chrome 动态渲染</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>采集范围 <span class="required">*</span></label>
        <input v-model="debugRange" placeholder=".article-content" />
      </div>

      <div class="form-group">
        <label>采集规则</label>
        <p class="form-hint">格式：规则名称 - 选择器 - 获取属性 - 内容过滤</p>
      </div>

      <div v-for="(rule, i) in debugRules" :key="i" class="debug-rule-row">
        <input v-model="rule.name" placeholder="规则名" style="width:100px" />
        <input v-model="rule.selector" placeholder="选择器" style="flex:1" />
        <input v-model="rule.attr" placeholder="属性" style="width:100px" />
        <input v-model="rule.filter" placeholder="过滤" style="width:120px" />
        <button class="btn-sm btn-delete" @click="debugRules.splice(i, 1)" v-if="debugRules.length > 1">×</button>
      </div>
      <button class="btn-sm btn-edit" @click="debugRules.push({ name: '', selector: '', attr: '', filter: '' })">+ 添加规则</button>

      <div style="margin-top:16px">
        <button class="btn btn-primary" :disabled="running" @click="runDebug">
          {{ running ? '采集中...' : '▶ 开始调试' }}
        </button>
      </div>
    </div>

    <!-- 结果 -->
    <div class="debug-result" v-if="debugResult">
      <div class="debug-result-header">
        <h3>采集结果</h3>
        <span class="result-status" :class="debugResult.code === 200 ? 'text-green' : 'text-red'">
          {{ debugResult.code === 200 ? '成功' : '失败' }}
        </span>
      </div>
      <div class="debug-result-body">
        <pre>{{ JSON.stringify(debugResult.data || debugResult, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debugRun } from '../api/debug.js'

const debugUrl = ref('')
const debugRemoveHead = ref(1)
const debugRendering = ref(1)
const debugRange = ref('')
const debugRules = ref([{ name: '', selector: '', attr: '', filter: '' }])
const debugResult = ref(null)
const running = ref(false)

async function runDebug() {
  running.value = true
  try {
    const rules = debugRules.value
      .filter(r => r.selector.trim())
      .map((r, i) => `${r.name || 'field' + i}%${r.selector}|${r.attr || 'text'}|${r.filter || 'null'}`)
      .join(')(')

    const res = await debugRun({
      url: debugUrl.value,
      remove_head: debugRemoveHead.value,
      rendering: debugRendering.value,
      range: debugRange.value,
      rule_a: rules.length > 0 ? rules.split(')(')[0] || '' : '',
      rule_b: rules.length > 1 ? rules.split(')(')[1] || '' : '',
      rule_c: rules.length > 2 ? rules.split(')(')[2] || '' : '',
      rule_d: rules.length > 3 ? rules.split(')(')[3] || '' : '',
    })
    debugResult.value = res
  } catch (e) {
    debugResult.value = { code: 0, msg: e.message }
  } finally {
    running.value = false
  }
}
</script>

<style scoped>
.debug-card {
  background: #fff; border-radius: 10px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  margin-bottom: 24px;
}
.debug-rule-row {
  display: flex; gap: 8px; margin-bottom: 8px; align-items: center;
}
.debug-rule-row input {
  padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; outline: none;
}
.debug-rule-row input:focus { border-color: #667eea; }
.debug-result {
  background: #fff; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.06); overflow: hidden;
}
.debug-result-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; background: #f7fafc; border-bottom: 1px solid #e2e8f0;
}
.debug-result-header h3 { margin: 0; font-size: 14px; }
.result-status { font-size: 13px; font-weight: 600; }
.text-green { color: #38a169; }
.text-red { color: #e53e3e; }
.debug-result-body { padding: 16px 20px; }
.debug-result-body pre {
  background: #1a202c; color: #e2e8f0; padding: 16px; border-radius: 8px;
  font-size: 12px; overflow-x: auto; max-height: 500px; margin: 0;
  line-height: 1.6;
}
</style>
