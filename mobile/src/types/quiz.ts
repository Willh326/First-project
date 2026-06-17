export type QuizQuestionType = 'single' | 'multi';

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string[]>;
