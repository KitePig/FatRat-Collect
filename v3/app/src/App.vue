<template>
  <div class="frc-v3-app">
    <aside class="frc-v3-sidebar">
      <div class="sidebar-brand">
        <span class="sidebar-logo">🐭</span>
        <div>
          <div class="sidebar-title">胖鼠采集</div>
          <div class="sidebar-version">V3.0</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <a v-for="item in navItems" :key="item.view"
           :href="buildUrl(item.view)"
           :class="['nav-item', { active: currentView === item.view }]"
           @click.prevent="navigate(item.view)">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>
      <div class="sidebar-footer">
        <a href="admin.php?page=frc-spider" class="footer-link">↩ 返回 V2 面板</a>
      </div>
    </aside>
    <main class="frc-v3-main">
      <KeepAlive>
        <component :is="currentComponent" :key="currentView" />
      </KeepAlive>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CollectCenter from './views/CollectCenter.vue'
import ConfigCenter from './views/ConfigCenter.vue'
import DataCenter from './views/DataCenter.vue'
import ToolKit from './views/ToolKit.vue'
import DebugConsole from './views/DebugConsole.vue'

const navItems = [
  { view: 'collect', label: '采集中心', icon: '🕷️' },
  { view: 'config',  label: '配置中心', icon: '⚙️' },
  { view: 'data',    label: '数据桶中心', icon: '🗄️' },
  { view: 'kit',     label: '工具箱', icon: '🧰' },
  { view: 'debug',   label: '调试台', icon: '🔬' },
]

const validViews = navItems.map(i => i.view)

const viewMap = {
  collect: CollectCenter,
  config:  ConfigCenter,
  data:    DataCenter,
  kit:     ToolKit,
  debug:   DebugConsole,
}

function getViewFromUrl() {
  const p = new URLSearchParams(location.search)
  const view = p.get('view') || ''
  return validViews.includes(view) ? view : 'collect'
}

function buildUrl(view) {
  return 'admin.php?page=frc-v3&view=' + view
}

const currentView = ref(getViewFromUrl())
const currentComponent = computed(() => viewMap[currentView.value] || viewMap.collect)

function navigate(view) {
  currentView.value = view
  const url = new URL(location.href)
  url.searchParams.set('page', 'frc-v3')
  url.searchParams.set('view', view)
  history.replaceState(null, '', url.toString())
}
</script>
