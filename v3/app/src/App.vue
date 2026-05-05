<template>
  <div class="frc-v3-app">
    <div class="v3-sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-logo">🐭</div>
        <div>
          <div class="sidebar-title">FatRat Collect</div>
          <span class="sidebar-version">v3.0</span>
        </div>
      </div>
      <el-menu
        :default-active="currentView"
        background-color="transparent"
        text-color="#a8a29e"
        active-text-color="#fff"
        @select="navigate"
      >
        <el-menu-item v-for="item in navItems" :key="item.view" :index="item.view">
          <el-icon style="margin-right:10px"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
      <div class="sidebar-footer">
        <a href="admin.php?page=frc-spider">← 返回 V2 面板</a>
      </div>
    </div>
    <div class="v3-main">
      <KeepAlive>
        <component :is="currentComponent" :key="currentView" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Setting, FolderOpened, Tools, Monitor } from '@element-plus/icons-vue'
import CollectCenter from './views/CollectCenter.vue'
import ConfigCenter from './views/ConfigCenter.vue'
import DataCenter from './views/DataCenter.vue'
import ToolKit from './views/ToolKit.vue'
import DebugConsole from './views/DebugConsole.vue'

const navItems = [
  { view: 'collect', label: '采集中心', icon: Search },
  { view: 'config',  label: '配置中心', icon: Setting },
  { view: 'data',    label: '数据桶', icon: FolderOpened },
  { view: 'kit',     label: '工具箱', icon: Tools },
  { view: 'debug',   label: '调试台', icon: Monitor },
]

const validViews = navItems.map(i => i.view)

const viewMap = {
  collect: CollectCenter, config: ConfigCenter,
  data: DataCenter, kit: ToolKit, debug: DebugConsole,
}

function getViewFromUrl() {
  const p = new URLSearchParams(location.search)
  const view = p.get('view') || ''
  return validViews.includes(view) ? view : 'collect'
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
