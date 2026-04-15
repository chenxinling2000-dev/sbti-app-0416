<template>
  <div class="result-page">
    <div class="result-container">
      <div class="result-card">
        <div class="result-emoji">{{ resultStore.personality?.emoji }}</div>
        <div class="result-name">{{ resultStore.personality?.name }}</div>
        <div class="result-description">{{ resultStore.personality?.description }}</div>
        
        <div v-if="resultStore.hiddenUnlocked" class="hidden-badge">
          隐藏人格已解锁
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-title">15维人格分析</div>
        <RadarChart
          v-if="scoresArray.length > 0"
          :scores="scoresArray"
          :dimensions="dimensionLabels"
        />
      </div>
      
      <div class="traits-card">
        <div class="traits-title">人格特征</div>
        <div class="traits-list">
          <span
            v-for="trait in resultStore.personality?.traits"
            :key="trait"
            class="trait-tag"
          >
            {{ trait }}
          </span>
        </div>
      </div>
      
      <div class="action-buttons">
        <el-button size="large" @click="handleRestart" class="action-btn">
          重新测试
        </el-button>
        <el-button size="large" type="primary" @click="handleShare" class="action-btn share-btn">
          分享结果
        </el-button>
      </div>
      
      <div class="more-actions">
        <el-button text @click="goToTypes" class="types-link">
          查看人格图鉴
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useResultStore } from '../stores/resultStore';
import { useTestStore } from '../stores/testStore';
import { getScoresArray, getDimensionLabels } from '../utils/calculator';
import RadarChart from '../components/RadarChart.vue';
import { ElMessage } from 'element-plus';

const router = useRouter();
const resultStore = useResultStore();
const testStore = useTestStore();

const scoresArray = computed(() => {
  return getScoresArray(resultStore.dimensionScores);
});

const dimensionLabels = computed(() => {
  return getDimensionLabels();
});

onMounted(() => {
  if (!resultStore.personality) {
    const loaded = resultStore.loadResult();
    if (!loaded) {
      router.push('/test');
    }
  }
});

function handleRestart() {
  testStore.startTest();
  resultStore.clearResult();
  router.push('/test');
}

function handleShare() {
  const text = `我在SBTI人格测试中测出了「${resultStore.personality?.name}」${resultStore.personality?.emoji}！${resultStore.personality?.description}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'SBTI 人格测试',
      text: text
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      ElMessage.success('结果已复制到剪贴板');
    }).catch(() => {
      ElMessage.error('复制失败');
    });
  }
}

function goToTypes() {
  router.push('/types');
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.result-container {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 20px;
}

.result-card {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.result-emoji {
  font-size: 72px;
  margin-bottom: 16px;
}

.result-name {
  font-size: 28px;
  font-weight: 800;
  color: #333;
  margin-bottom: 8px;
}

.result-description {
  font-size: 15px;
  color: #999;
  line-height: 1.5;
}

.hidden-badge {
  display: inline-block;
  margin-top: 16px;
  padding: 6px 16px;
  background: linear-gradient(135deg, #ff6384, #ff9f9f);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
}

.traits-card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.traits-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.traits-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.trait-tag {
  padding: 8px 16px;
  background: rgba(255, 99, 132, 0.1);
  color: #ff6384;
  font-size: 14px;
  border-radius: 20px;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.action-btn {
  flex: 1;
  height: 50px;
  font-size: 16px;
  border-radius: 25px !important;
  font-weight: 600;
}

.action-btn:not(.share-btn) {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  color: #333 !important;
}

.share-btn {
  background: linear-gradient(135deg, #ff6384, #ff9f9f) !important;
  border: none !important;
  color: #fff !important;
}

.more-actions {
  text-align: center;
}

.types-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 14px;
}

.types-link:hover {
  color: #fff !important;
}
</style>