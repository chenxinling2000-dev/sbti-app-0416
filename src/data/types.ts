export interface Dimension {
  key: string;
  description: string;
  lowLabel: string;
  highLabel: string;
}

export interface Option {
  id: string;
  text: string;
  scores: Record<string, number>;
}

export interface Question {
  id: number;
  content: string;
  options: Option[];
}

export interface PersonalityType {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  hidden: boolean;
  unlockCondition?: string;
  dimensionTemplate: Record<string, number>;
}

export interface TestResult {
  personality: PersonalityType;
  dimensionScores: Record<string, number>;
  hiddenUnlocked: boolean;
}

export interface TestState {
  currentQuestion: number;
  answers: Record<number, string>;
  isCompleted: boolean;
}

export interface ResultState {
  personality: PersonalityType | null;
  dimensionScores: Record<string, number>;
  hiddenUnlocked: boolean;
}