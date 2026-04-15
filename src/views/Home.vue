<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-badge">AI 重制版</div>
      <h1 class="hero-title">SBTI 人格测试</h1>
      <p class="hero-subtitle">探索你的性格密码</p>
      
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">31</span>
          <span class="stat-label">道题目</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">15</span>
          <span class="stat-label">维雷达图</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">27</span>
          <span class="stat-label">种人格</span>
        </div>
      </div>
      
      <div class="hero-buttons">
        <el-button type="primary" size="large" class="btn-primary" @click="startTest">
          开始测试
        </el-button>
        <el-button size="large" class="btn-secondary" @click="goToTypes">
          浏览人格图鉴
        </el-button>
      </div>
      
      <div class="hero-footer">
        纯前端应用 · 数据本地计算
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTestStore } from '../stores/testStore';
import { useResultStore } from '../stores/resultStore';

const router = useRouter();
const testStore = useTestStore();
const resultStore = useResultStore();

function startTest() {
  testStore.startTest();
  resultStore.clearResult();
  router.push('/test');
}

function goToTypes() {
  router.push('/types');
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.hero-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 32px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  width: 100%;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  color: #333;
  margin: 0 0 8px 0;
}

.hero-subtitle {
  font-size: 18px;
  color: #999;
  margin: 0 0 32px 0;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: #ff6384;
}

.stat-label {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #eee;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6384, #ff9f9f) !important;
  border: none !important;
  font-weight: 600;
  height: 52px;
  font-size: 16px;
  border-radius: 26px !important;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 99, 132, 0.4) !important;
}

.btn-secondary {
  height: 52px;
  font-size: 16px;
  border-radius: 26px !important;
  border: 2px solid #eee !important;
  font-weight: 600;
}

.btn-secondary:hover {
  border-color: #ff6384 !important;
  color: #ff6384 !important;
}

.hero-footer {
  font-size: 13px;
  color: #bbb;
}
</style>