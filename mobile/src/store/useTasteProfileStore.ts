import { create } from 'zustand';
import { QuizAnswers } from '../types/quiz';
import { Product } from '../types/product';
import { fetchTasteProfile } from '../api/profile';

type ProfileStatus = 'idle' | 'loading' | 'success' | 'error';

interface TasteProfileState {
  answers: QuizAnswers;
  tasteProfileText: string | null;
  searchTerms: string[];
  calibrationDeck: Product[];
  likedProductIds: string[];
  profileStatus: ProfileStatus;
  profileError: string | null;
  setAnswer: (questionId: string, optionIds: string[]) => void;
  resetAnswers: () => void;
  generateProfile: () => Promise<void>;
  likeProduct: (productId: string) => void;
}

export const useTasteProfileStore = create<TasteProfileState>((set, get) => ({
  answers: {},
  tasteProfileText: null,
  searchTerms: [],
  calibrationDeck: [],
  likedProductIds: [],
  profileStatus: 'idle',
  profileError: null,
  setAnswer: (questionId, optionIds) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: optionIds } })),
  resetAnswers: () =>
    set({
      answers: {},
      tasteProfileText: null,
      searchTerms: [],
      calibrationDeck: [],
      profileStatus: 'idle',
      profileError: null,
    }),
  generateProfile: async () => {
    set({ profileStatus: 'loading', profileError: null });
    try {
      const { summary, searchTerms, calibrationDeck } = await fetchTasteProfile(get().answers);
      set({
        tasteProfileText: summary,
        searchTerms,
        calibrationDeck,
        profileStatus: 'success',
      });
    } catch (error) {
      set({
        profileStatus: 'error',
        profileError: error instanceof Error ? error.message : 'Something went wrong.',
      });
    }
  },
  likeProduct: (productId) =>
    set((state) => ({ likedProductIds: [...state.likedProductIds, productId] })),
}));
