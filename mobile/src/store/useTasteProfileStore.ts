import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizAnswers } from '../types/quiz';
import { Product } from '../types/product';
import { FeedItem } from '../types/feed';
import { fetchTasteProfile } from '../api/profile';
import { fetchFeed } from '../api/feed';
import { fetchSwipeSession } from '../api/swipeSession';

type ProfileStatus = 'idle' | 'loading' | 'success' | 'error';
type FeedStatus = 'idle' | 'loading' | 'success' | 'error';
type SwipeSessionStatus = 'idle' | 'loading' | 'success' | 'error';

interface TasteProfileState {
  answers: QuizAnswers;
  tasteProfileText: string | null;
  searchTerms: string[];
  calibrationDeck: Product[];
  likedProductIds: string[];
  passedProductIds: string[];
  savedProducts: Product[];
  feedItems: FeedItem[];
  feedStatus: FeedStatus;
  feedError: string | null;
  swipeSessionDeck: Product[];
  swipeSessionStatus: SwipeSessionStatus;
  swipeSessionError: string | null;
  profileStatus: ProfileStatus;
  profileError: string | null;
  onboardingComplete: boolean;
  hasHydrated: boolean;
  setAnswer: (questionId: string, optionIds: string[]) => void;
  resetAnswers: () => void;
  generateProfile: () => Promise<void>;
  completeOnboarding: () => void;
  likeProduct: (product: Product) => void;
  passProduct: (productId: string) => void;
  saveProduct: (product: Product) => void;
  unsaveProduct: (productId: string) => void;
  loadFeed: () => Promise<void>;
  startSwipeSession: () => Promise<void>;
  clearSwipeSession: () => void;
}

export const useTasteProfileStore = create<TasteProfileState>()(
  persist(
    (set, get) => ({
      answers: {},
      tasteProfileText: null,
      searchTerms: [],
      calibrationDeck: [],
      likedProductIds: [],
      passedProductIds: [],
      savedProducts: [],
      feedItems: [],
      feedStatus: 'idle',
      feedError: null,
      swipeSessionDeck: [],
      swipeSessionStatus: 'idle',
      swipeSessionError: null,
      profileStatus: 'idle',
      profileError: null,
      onboardingComplete: false,
      hasHydrated: false,
      setAnswer: (questionId, optionIds) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: optionIds } })),
      resetAnswers: () =>
        set({
          answers: {},
          tasteProfileText: null,
          searchTerms: [],
          calibrationDeck: [],
          likedProductIds: [],
          passedProductIds: [],
          savedProducts: [],
          feedItems: [],
          feedStatus: 'idle',
          feedError: null,
          swipeSessionDeck: [],
          swipeSessionStatus: 'idle',
          swipeSessionError: null,
          profileStatus: 'idle',
          profileError: null,
          onboardingComplete: false,
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
      completeOnboarding: () => set({ onboardingComplete: true }),
      likeProduct: (product) =>
        set((state) => ({ likedProductIds: [...state.likedProductIds, product.id] })),
      passProduct: (productId) =>
        set((state) => ({ passedProductIds: [...state.passedProductIds, productId] })),
      saveProduct: (product) =>
        set((state) =>
          state.savedProducts.some((saved) => saved.id === product.id)
            ? state
            : { savedProducts: [...state.savedProducts, product] },
        ),
      unsaveProduct: (productId) =>
        set((state) => ({
          savedProducts: state.savedProducts.filter((product) => product.id !== productId),
        })),
      loadFeed: async () => {
        const { tasteProfileText, searchTerms, answers, likedProductIds, passedProductIds, feedItems } =
          get();
        if (!tasteProfileText) return;
        set({ feedStatus: 'loading', feedError: null });
        try {
          const excludeIds = [
            ...likedProductIds,
            ...passedProductIds,
            ...feedItems.map((item) => item.product.id),
          ];
          const items = await fetchFeed({
            summary: tasteProfileText,
            searchTerms,
            answers,
            excludeIds,
            count: 10,
          });
          set({ feedItems: items, feedStatus: 'success' });
        } catch (error) {
          set({
            feedStatus: 'error',
            feedError: error instanceof Error ? error.message : 'Something went wrong.',
          });
        }
      },
      startSwipeSession: async () => {
        const { searchTerms, answers, likedProductIds, passedProductIds, feedItems } = get();
        set({ swipeSessionStatus: 'loading', swipeSessionError: null, swipeSessionDeck: [] });
        try {
          const excludeIds = [
            ...likedProductIds,
            ...passedProductIds,
            ...feedItems.map((item) => item.product.id),
          ];
          const deck = await fetchSwipeSession({ searchTerms, answers, excludeIds, count: 12 });
          set({ swipeSessionDeck: deck, swipeSessionStatus: 'success' });
        } catch (error) {
          set({
            swipeSessionStatus: 'error',
            swipeSessionError: error instanceof Error ? error.message : 'Something went wrong.',
          });
        }
      },
      clearSwipeSession: () =>
        set({ swipeSessionDeck: [], swipeSessionStatus: 'idle', swipeSessionError: null }),
    }),
    {
      name: 'taste-profile-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        answers: state.answers,
        tasteProfileText: state.tasteProfileText,
        searchTerms: state.searchTerms,
        likedProductIds: state.likedProductIds,
        passedProductIds: state.passedProductIds,
        savedProducts: state.savedProducts,
        feedItems: state.feedItems,
        onboardingComplete: state.onboardingComplete,
      }),
      onRehydrateStorage: () => () => {
        useTasteProfileStore.setState({ hasHydrated: true });
      },
    },
  ),
);
