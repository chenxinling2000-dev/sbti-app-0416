import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { questions } from '../data/questions';
import type { TestResult } from '../data/types';
import { calculateResult } from '../utils/calculator';

const STORAGE_KEY = 'sbti_test_state';

export const useTestStore = defineStore('test', () => {
  const currentQuestion = ref(0);
  const answers = ref<Record<number, string>>({});
  const isCompleted = ref(false);
  
  const totalQuestions = questions.length;
  
  const currentQuestionData = computed(() => {
    return questions[currentQuestion.value];
  });
  
  const progress = computed(() => {
    const answered = Object.keys(answers.value).length;
    return {
      current: currentQuestion.value + 1,
      total: totalQuestions,
      answered,
      remaining: totalQuestions - answered
    };
  });
  
  const canGoNext = computed(() => {
    return currentQuestion.value < totalQuestions - 1;
  });
  
  const canGoPrev = computed(() => {
    return currentQuestion.value > 0;
  });
  
  const isCurrentAnswered = computed(() => {
    return answers.value[currentQuestion.value + 1] !== undefined;
  });
  
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        currentQuestion.value = state.currentQuestion || 0;
        answers.value = state.answers || {};
        isCompleted.value = state.isCompleted || false;
      }
    } catch {
      console.warn('Failed to load test state from storage');
    }
  }
  
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentQuestion: currentQuestion.value,
        answers: answers.value,
        isCompleted: isCompleted.value
      }));
    } catch {
      console.warn('Failed to save test state to storage');
    }
  }
  
  function startTest() {
    currentQuestion.value = 0;
    answers.value = {};
    isCompleted.value = false;
    saveToStorage();
  }
  
  function setAnswer(optionId: string) {
    answers.value[currentQuestion.value + 1] = optionId;
    saveToStorage();
  }
  
  function nextQuestion() {
    if (canGoNext.value) {
      currentQuestion.value++;
      saveToStorage();
    }
  }
  
  function prevQuestion() {
    if (canGoPrev.value) {
      currentQuestion.value--;
      saveToStorage();
    }
  }
  
  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions) {
      currentQuestion.value = index;
      saveToStorage();
    }
  }
  
  function completeTest(): TestResult {
    isCompleted.value = true;
    saveToStorage();
    return calculateResult(answers.value);
  }
  
  function clearTest() {
    currentQuestion.value = 0;
    answers.value = {};
    isCompleted.value = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.warn('Failed to clear test state from storage');
    }
  }
  
  return {
    currentQuestion,
    answers,
    isCompleted,
    totalQuestions,
    currentQuestionData,
    progress,
    canGoNext,
    canGoPrev,
    isCurrentAnswered,
    loadFromStorage,
    startTest,
    setAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    completeTest,
    clearTest
  };
});