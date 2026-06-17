import { QuizAnswers } from '../types/quiz';
import { Product } from '../types/product';
import { API_BASE_URL } from './config';
import { postJson } from './http';

export interface FetchSwipeSessionParams {
  searchTerms: string[];
  answers: QuizAnswers;
  excludeIds: string[];
  count?: number;
}

export async function fetchSwipeSession({
  searchTerms,
  answers,
  excludeIds,
  count = 12,
}: FetchSwipeSessionParams): Promise<Product[]> {
  const data = await postJson<{ deck: Product[] }>(`${API_BASE_URL}/api/swipe-session`, {
    searchTerms,
    answers,
    excludeIds,
    count,
  });
  return data.deck;
}
