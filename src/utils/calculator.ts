import type { TestResult, PersonalityType } from '../data/types';
import { dimensionKeys } from '../data/dimensions';
import { personalityTypes } from '../data/personalityTypes';
import { questions } from '../data/questions';

export function calculateDimensionScores(answers: Record<number, string>): Record<string, number> {
  const scores: Record<string, number> = {};
  
  dimensionKeys.forEach(key => scores[key] = 0);
  
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const questionIndex = parseInt(questionId) - 1;
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    
    const question = questions[questionIndex];
    const option = question.options.find(o => o.id === optionId);
    if (!option) return;
    
    Object.entries(option.scores).forEach(([dimension, score]) => {
      if (scores[dimension] !== undefined) {
        scores[dimension] = (scores[dimension] || 0) + score;
      }
    });
  });
  
  const maxPossible = questions.length * 2;
  const minPossible = -questions.length * 2;
  
  dimensionKeys.forEach(key => {
    const raw = scores[key] || 0;
    scores[key] = normalizeToRange(raw, minPossible, maxPossible, 0, 10);
  });
  
  return scores;
}

function normalizeToRange(value: number, min: number, max: number, newMin: number, newMax: number): number {
  if (max === min) return (newMin + newMax) / 2;
  return newMin + ((value - min) / (max - min)) * (newMax - newMin);
}

export function matchPersonality(scores: Record<string, number>): PersonalityType | null {
  let minDistance = Infinity;
  let matchedType: PersonalityType | null = null;
  
  const visibleTypes = personalityTypes.filter(t => !t.hidden);
  
  visibleTypes.forEach(type => {
    let distance = 0;
    dimensionKeys.forEach(key => {
      const userScore = scores[key] || 5;
      const templateScore = type.dimensionTemplate[key] || 5;
      const diff = userScore - templateScore;
      distance += diff * diff;
    });
    distance = Math.sqrt(distance);
    
    if (distance < minDistance) {
      minDistance = distance;
      matchedType = type;
    }
  });
  
  return matchedType;
}

export function checkHiddenPersonality(scores: Record<string, number>): PersonalityType | null {
  const hiddenTypes = personalityTypes.filter(t => t.hidden);
  
  for (const type of hiddenTypes) {
    if (type.id === 'DRUN-K') {
      const liveliness = scores['活跃度'] || 0;
      const sociability = scores['社交性'] || 0;
      if (liveliness > 8 && sociability > 8) {
        return type;
      }
    }
  }
  
  return null;
}

export function calculateResult(answers: Record<number, string>): TestResult {
  const dimensionScores = calculateDimensionScores(answers);
  
  const hiddenPersonality = checkHiddenPersonality(dimensionScores);
  if (hiddenPersonality) {
    return {
      personality: hiddenPersonality,
      dimensionScores,
      hiddenUnlocked: true
    };
  }
  
  const matchedPersonality = matchPersonality(dimensionScores);
  
  return {
    personality: matchedPersonality!,
    dimensionScores,
    hiddenUnlocked: false
  };
}

export function getScoresArray(scores: Record<string, number>): number[] {
  return dimensionKeys.map(key => scores[key] || 5);
}

export function getDimensionLabels(): string[] {
  return dimensionKeys;
}