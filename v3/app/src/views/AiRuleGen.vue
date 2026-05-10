<template>
  <div class="page-placeholder">
    <div class="placeholder-card fade-up">
      <div class="placeholder-icon">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24 44h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M28 48h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M20 28l4-4 4 4 8-8 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="44" cy="20" r="2" fill="currentColor"/>
        </svg>
      </div>
      <div class="placeholder-content">
        <h2>{{ $t('ai.ruleTitle') }}</h2>
        <p class="placeholder-desc">{{ $t('ai.ruleDesc') }}</p>
        <div class="placeholder-badge">
          <span class="badge-dot"></span>
          <span>{{ $t('proxy.soon') }}</span>
        </div>
      </div>
      <div class="placeholder-features">
        <div class="feature-item" v-for="f in features" :key="f">
          <el-icon><Check /></el-icon>
          <span>{{ f }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check } from '@element-plus/icons-vue'

const { t } = useI18n()

const features = computed(() => [
  t('ai.ruleFeature1'),
  t('ai.ruleFeature2'),
  t('ai.ruleFeature3'),
])
</script>

<style scoped>
.page-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 180px);
  padding: 40px 20px;
}

.placeholder-card {
  max-width: 520px;
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 48px 40px 40px;
  text-align: center;
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 28px;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}

.placeholder-icon svg {
  width: 100%;
  height: 100%;
}

.placeholder-content h2 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.placeholder-desc {
  font-size: 14px;
  color: var(--text3);
  margin: 0 0 24px;
  line-height: 1.7;
}

.placeholder-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: var(--warning-soft);
  border: 1px solid #fde68a;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 32px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d97706;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.placeholder-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
  padding: 24px 20px;
  background: #fafaf9;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border-light);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text2);
  font-weight: 500;
}

.feature-item .el-icon {
  color: var(--success);
  font-size: 16px;
  flex-shrink: 0;
}
</style>
