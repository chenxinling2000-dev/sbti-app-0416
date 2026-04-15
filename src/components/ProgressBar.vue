<template>
  <div class="progress-bar">
    <div class="progress-info">
      <span class="progress-text">进度: {{ current }}/{{ total }}</span>
      <span class="progress-detail">{{ answered }}已答 · {{ total - answered }}剩余</span>
    </div>
    <el-progress
      :percentage="percentage"
      :stroke-width="8"
      :show-text="false"
      color="#ff6384"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  current: number;
  total: number;
  answered: number;
}>();

const percentage = computed(() => {
  return Math.round((props.answered / props.total) * 100);
});
</script>

<style scoped>
.progress-bar {
  width: 100%;
  padding: 16px 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.progress-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.progress-detail {
  font-size: 13px;
  color: #999;
}
</style>