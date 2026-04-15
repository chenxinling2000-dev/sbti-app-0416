<template>
  <div class="question-card">
    <div class="question-header">
      <span class="question-number">Q{{ question.id }}</span>
    </div>
    <div class="question-content">{{ question.content }}</div>
    <div class="options">
      <div
        v-for="option in question.options"
        :key="option.id"
        class="option-item"
        :class="{ selected: selected === option.id }"
        @click="handleSelect(option.id)"
      >
        <span class="option-id">{{ option.id }}</span>
        <span class="option-text">{{ option.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '../data/types';

const props = defineProps<{
  question: Question;
  selected?: string;
}>();

const emit = defineEmits<{
  select: [optionId: string];
}>();

function handleSelect(optionId: string) {
  emit('select', optionId);
}
</script>

<style scoped>
.question-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.question-header {
  margin-bottom: 20px;
}

.question-number {
  font-size: 14px;
  font-weight: 600;
  color: #ff6384;
  background: rgba(255, 99, 132, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
}

.question-content {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  line-height: 1.6;
  margin-bottom: 28px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border: 2px solid #eee;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-item:hover {
  border-color: #ff6384;
  background: rgba(255, 99, 132, 0.03);
}

.option-item.selected {
  border-color: #ff6384;
  background: rgba(255, 99, 132, 0.08);
}

.option-id {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
  color: #666;
  margin-right: 14px;
  transition: all 0.2s ease;
}

.option-item.selected .option-id {
  background: #ff6384;
  color: #fff;
}

.option-text {
  font-size: 16px;
  color: #333;
  flex: 1;
}
</style>