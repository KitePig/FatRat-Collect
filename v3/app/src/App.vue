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
        <div class="lang-pill">
          <div class="lang-pill-slider" :class="'lang-pill-slider--' + localeIndex"></div>
          <button
            v-for="l in availableLocales"
            :key="l.value"
            :class="['lang-pill-btn', { 'lang-pill-btn--active': locale === l.value }]"
            @click="switchLang(l.value)"
          >{{ l.short }}</button>
        </div>
        <a href="admin.php?page=frc-spider">{{ $t('app.backToV2') }}</a>
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
import { useI18n } from 'vue-i18n'
import { Search, Setting, FolderOpened, Tools, Monitor } from '@element-plus/icons-vue'
import CollectCenter from './views/CollectCenter.vue'
import ConfigCenter from './views/ConfigCenter.vue'
import DataCenter from './views/DataCenter.vue'
import ToolKit from './views/ToolKit.vue'
import DebugConsole from './views/DebugConsole.vue'
import { availableLocales } from './i18n'
import { persistLocale } from './i18n'

const { t, locale } = useI18n()

const navItems = computed(() => [
  { view: 'collect', label: t('sidebar.collect'), icon: Search },
  { view: 'config',  label: t('sidebar.config'), icon: Setting },
  { view: 'data',    label: t('sidebar.data'), icon: FolderOpened },
  { view: 'kit',     label: t('sidebar.kit'), icon: Tools },
  { view: 'debug',   label: t('sidebar.debug'), icon: Monitor },
])

const localeList = availableLocales.map(l => l.value)
const localeIndex = computed(() => localeList.indexOf(locale.value))

function switchLang(val) {
  locale.value = val
  persistLocale(val)
}

const validViews = ['collect', 'config', 'data', 'kit', 'debug']

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
