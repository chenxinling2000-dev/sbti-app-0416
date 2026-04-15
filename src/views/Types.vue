<template>
  <div class="types-page">
    <div class="types-container">
      <div class="types-header">
        <h1 class="types-title">人格图鉴</h1>
        <p class="types-subtitle">探索27种人格类型</p>
      </div>
      
      <div class="hidden-info" v-if="!resultStore.hiddenUnlocked">
        <span class="hidden-icon">🔒</span>
        <span class="hidden-text">还有1种隐藏人格等待解锁...</span>
      </div>
      
      <div v-else class="hidden-unlocked">
        <span class="unlocked-icon">🔓</span>
        <span class="unlocked-text">隐藏人格已解锁！</span>
      </div>
      
      <div class="types-grid">
        <PersonalityCard
          v-for="personality in visiblePersonalityTypes"
          :key="personality.id"
          :personality="personality"
          @click="showDetail(personality)"
        />
      </div>
    </div>
    
    <el-dialog
      v-model="dialogVisible"
      :title="selectedPersonality?.name"
      width="90%"
      class="personality-dialog"
    >
      <div class="dialog-content" v-if="selectedPersonality">
        <div class="dialog-emoji">{{ selectedPersonality.emoji }}</div>
        <div class="dialog-description">{{ selectedPersonality.description }}</div>
        <div class="dialog-traits">
          <span
            v-for="trait in selectedPersonality.traits"
            :key="trait"
            class="trait-tag"
          >
            {{ trait }}
          </span>
        </div>
        <div class="dialog-dimensions">
          <div class="dimension-title">维度特征</div>
          <div class="dimension-list">
            <div
              v-for="(value, key) in displayDimensions"
              :key="key"
              class="dimension-item"
            >
              <span class="dimension-key">{{ key }}</span>
              <div class="dimension-bar">
                <div class="dimension-fill" :style="{ width: (value / 10 * 100) + '%' }"></div>
              </div>
              <span class="dimension-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { personalityTypes } from '../data/personalityTypes';
import { useResultStore } from '../stores/resultStore';
import PersonalityCard from '../components/PersonalityCard.vue';
import type { PersonalityType } from '../data/types';

const resultStore = useResultStore();

const dialogVisible = ref(false);
const selectedPersonality = ref<PersonalityType | null>(null);

const visiblePersonalityTypes = computed(() => {
  if (resultStore.hiddenUnlocked) {
    return personalityTypes;
  }
  return personalityTypes.filter(t => !t.hidden);
});

const displayDimensions = computed(() => {
  if (!selectedPersonality.value) return {};
  return selectedPersonality.value.dimensionTemplate;
});

function showDetail(personality: PersonalityType) {
  selectedPersonality.value = personality;
  dialogVisible.value = true;
}
</script>

<style scoped>
.types-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.types-container {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 20px;
}

.types-header {
  text-align: center;
  margin-bottom: 24px;
}

.types-title {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px 0;
}

.types-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.hidden-info,
.hidden-unlocked {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.personality-dialog :deep(.el-dialog) {
  border-radius: 20px;
  max-width: 420px;
}

.personality-dialog :deep(.el-dialog__header) {
  text-align: center;
  padding-top: 24px;
}

.personality-dialog :deep(.el-dialog__title) {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

.dialog-content {
  text-align: center;
  padding: 0 8px 16px;
}

.dialog-emoji {
  font-size: 64px;
  margin-bottom: 16px;
}

.dialog-description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.dialog-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 24px;
}

.trait-tag {
  padding: 6px 14px;
  background: rgba(255, 99, 132, 0.1);
  color: #ff6384;
  font-size: 13px;
  border-radius: 16px;
  font-weight: 500;
}

.dialog-dimensions {
  text-align: left;
}

.dimension-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.dimension-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dimension-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dimension-key {
  width: 80px;
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
}

.dimension-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.dimension-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.dimension-value {
  width: 24px;
  font-size: 12px;
  color: #999;
  text-align: right;
}
</style>