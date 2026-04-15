<template>
  <div class="personality-card" @click="handleClick">
    <div class="card-emoji">{{ personality.emoji }}</div>
    <div class="card-name">{{ personality.name }}</div>
    <div class="card-description">{{ personality.description }}</div>
  </div>
</template>

<script setup lang="ts">
import type { PersonalityType } from '../data/types';

const props = defineProps<{
  personality: PersonalityType;
}>();

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  emit('click');
}
</script>

<style scoped>
.personality-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.personality-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #ff6384;
}

.card-emoji {
  font-size: 48px;
  margin-bottom: 12px;
}

.card-name {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.card-description {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}
</style>