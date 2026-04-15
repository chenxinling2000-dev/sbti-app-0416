<template>
  <div class="test-page">
    <div class="test-container">
      <ProgressBar
        :current="testStore.progress.current"
        :total="testStore.progress.total"
        :answered="testStore.progress.answered"
      />
      
      <div class="question-wrapper">
        <QuestionCard
          v-if="testStore.currentQuestionData"
          :question="testStore.currentQuestionData"
          :selected="currentAnswer"
          @select="handleSelect"
        />
      </div>
      
      <div class="navigation">
        <el-button
          :disabled="!testStore.canGoPrev"
          @click="handlePrev"
          class="nav-btn"
        >
          上一题
        </el-button>
        <el-button
          v-if="testStore.canGoNext"
          type="primary"
          :disabled="!testStore.isCurrentAnswered"
          @click="handleNext"
          class="nav-btn"
        >
          下一题
        </el-button>
        <el-button
          v-else
          type="primary"
          :disabled="!testStore.isCurrentAnswered"
          @click="handleComplete"
          class="nav-btn complete-btn"
        >
          查看结果
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTestStore } from '../stores/testStore';
import { useResultStore } from '../stores/resultStore';
import ProgressBar from '../components/ProgressBar.vue';
import QuestionCard from '../components/QuestionCard.vue';
import { ElMessage } from 'element-plus';

const router = useRouter();
const testStore = useTestStore();
const resultStore = useResultStore();

const currentAnswer = computed(() => {
  return testStore.answers[testStore.currentQuestion + 1];
});

onMounted(() => {
  testStore.loadFromStorage();
});

function handleSelect(optionId: string) {
  testStore.setAnswer(optionId);
  
  if (testStore.canGoNext) {
    setTimeout(() => {
      testStore.nextQuestion();
    }, 200);
  }
}

function handlePrev() {
  testStore.prevQuestion();
}

function handleNext() {
  if (!testStore.isCurrentAnswered) {
    ElMessage.warning('请先选择答案');
    return;
  }
  testStore.nextQuestion();
}

function handleComplete() {
  if (!testStore.isCurrentAnswered) {
    ElMessage.warning('请先选择答案');
    return;
  }
  
  const result = testStore.completeTest();
  resultStore.saveResult(result);
  router.push('/result');
}
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.test-container {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 20px;
}

.question-wrapper {
  margin-bottom: 24px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.nav-btn {
  flex: 1;
  height: 50px;
  font-size: 16px;
  border-radius: 25px !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  color: #333 !important;
  font-weight: 600;
}

.nav-btn:hover:not(:disabled) {
  background: #fff !important;
  transform: translateY(-2px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn.type-primary {
  background: linear-gradient(135deg, #ff6384, #ff9f9f) !important;
  border: none !important;
  color: #fff !important;
}

.complete-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  border: none !important;
  color: #fff !important;
}

.complete-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
}
</style>