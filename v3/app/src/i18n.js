import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import en from './locales/en'

const messages = { 'zh-CN': zhCN, en }

const STORAGE_KEY = 'frc_v3_locale'

function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && messages[stored]) return stored
  const wp = (window.frcV3Data?.locale || 'zh-CN').replace('_', '-')
  return messages[wp] ? wp : 'zh-CN'
}

const locale = detectLocale()

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'zh-CN',
  messages,
})

export function persistLocale(val) {
  localStorage.setItem(STORAGE_KEY, val)
}

export const availableLocales = [
  { value: 'zh-CN', label: '简体中文', short: '中' },
  { value: 'en',    label: 'English', short: 'EN' },
]
