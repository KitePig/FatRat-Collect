<template>
  <div class="page-roadmap">
    <div class="page-header">
      <h2>{{ $t('roadmap.title') }}</h2>
      <p>{{ $t('roadmap.desc') }}</p>
    </div>

    <div class="roadmap-grid">
      <div
        v-for="(item, idx) in features"
        :key="idx"
        class="roadmap-card"
        :style="{ animationDelay: idx * 0.1 + 's' }"
      >
        <div class="roadmap-card-icon">
          <el-icon :size="28"><component :is="item.icon" /></el-icon>
        </div>
        <div class="roadmap-card-body">
          <div class="roadmap-card-header">
            <h3>{{ item.title }}</h3>
            <el-tag
              :type="item.statusType"
              size="small"
              effect="plain"
              round
            >{{ item.status }}</el-tag>
          </div>
          <p class="roadmap-card-desc">{{ item.desc }}</p>
          <ul class="roadmap-card-features">
            <li v-for="(f, fi) in item.features" :key="fi">
              <el-icon class="roadmap-check"><Check /></el-icon>
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <el-divider />

    <div class="roadmap-note">
      <el-alert
        :title="$t('roadmap.noteTitle')"
        :description="$t('roadmap.noteDesc')"
        type="info"
        :closable="false"
        show-icon
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Monitor, Grid, Connection, Check } from '@element-plus/icons-vue'

const { t } = useI18n()

const features = computed(() => [
  {
    icon: Monitor,
    title: t('roadmap.feature1.title'),
    desc: t('roadmap.feature1.desc'),
    status: t('roadmap.feature1.status'),
    statusType: 'warning',
    features: [
      t('roadmap.feature1.h1'),
      t('roadmap.feature1.h2'),
      t('roadmap.feature1.h3'),
    ],
  },
  {
    icon: Grid,
    title: t('roadmap.feature2.title'),
    desc: t('roadmap.feature2.desc'),
    status: t('roadmap.feature2.status'),
    statusType: 'warning',
    features: [
      t('roadmap.feature2.h1'),
      t('roadmap.feature2.h2'),
      t('roadmap.feature2.h3'),
    ],
  },
  {
    icon: Connection,
    title: t('roadmap.feature3.title'),
    desc: t('roadmap.feature3.desc'),
    status: t('roadmap.feature3.status'),
    statusType: '',
    features: [
      t('roadmap.feature3.h1'),
      t('roadmap.feature3.h2'),
      t('roadmap.feature3.h3'),
    ],
  },
])
</script>

<style scoped>
.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.roadmap-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 24px 24px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
  animation: frc-v3-fadeUp 0.4s ease both;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.roadmap-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--accent-light);
}

.roadmap-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.roadmap-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.roadmap-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.roadmap-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.roadmap-card-desc {
  margin: 0;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}

.roadmap-card-features {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.roadmap-card-features li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.5;
}

.roadmap-check {
  color: var(--accent);
  margin-top: 3px;
  flex-shrink: 0;
  font-size: 15px;
}

.roadmap-note {
  margin-top: 24px;
}

@media (max-width: 900px) {
  .roadmap-grid {
    grid-template-columns: 1fr;
  }
}
</style>
