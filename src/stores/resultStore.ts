import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PersonalityType, TestResult } from '../data/types';

const RESULT_STORAGE_KEY = 'sbti_result';

export const useResultStore = defineStore('result', () => {
  const personality = ref<PersonalityType | null>(null);
  const dimensionScores = ref<Record<string, number>>({});
  const hiddenUnlocked = ref(false);
  
  function saveResult(result: TestResult) {
    personality.value = result.personality;
    dimensionScores.value = result.dimensionScores;
    hiddenUnlocked.value = result.hiddenUnlocked;
    
    try {
      localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify({
        personality: result.personality,
        dimensionScores: result.dimensionScores,
        hiddenUnlocked: result.hiddenUnlocked
      }));
    } catch {
      console.warn('Failed to save result to storage');
    }
  }
  
  function loadResult(): boolean {
    try {
      const saved = localStorage.getItem(RESULT_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        personality.value = data.personality;
        dimensionScores.value = data.dimensionScores;
        hiddenUnlocked.value = data.hiddenUnlocked;
        return true;
      }
    } catch {
      console.warn('Failed to load result from storage');
    }
    return false;
  }
  
  function clearResult() {
    personality.value = null;
    dimensionScores.value = {};
    hiddenUnlocked.value = false;
    
    try {
      localStorage.removeItem(RESULT_STORAGE_KEY);
    } catch {
      console.warn('Failed to clear result from storage');
    }
  }
  
  return {
    personality,
    dimensionScores,
    hiddenUnlocked,
    saveResult,
    loadResult,
    clearResult
  };
});