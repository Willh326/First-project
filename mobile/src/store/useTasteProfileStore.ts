import { create } from 'zustand';
import { QuizAnswers } from '../types/quiz';

interface TasteProfileState {
  answers: QuizAnswers;
  tasteProfileText: string | null;
  searchTerms: string[];
  setAnswer: (questionId: string, optionIds: string[]) => void;
  resetAnswers: () => void;
  setProfile: (text: string, searchTerms: string[]) => void;
}

export const useTasteProfileStore = create<TasteProfileState>((set) => ({
  answers: {},
  tasteProfileText: null,
  searchTerms: [],
  setAnswer: (questionId, optionIds) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: optionIds } })),
  resetAnswers: () => set({ answers: {}, tasteProfileText: null, searchTerms: [] }),
  setProfile: (text, searchTerms) => set({ tasteProfileText: text, searchTerms }),
}));
