import { QuizAnswers } from '../types/quiz';
import { Product } from '../types/product';
import { API_BASE_URL } from './config';

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
  const response = await fetch(`${API_BASE_URL}/api/swipe-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ searchTerms, answers, excludeIds, count }),
  });

  if (!response.ok) {
    throw new Error(`Failed to load swipe session (status ${response.status})`);
  }

  const data: { deck: Product[] } = await response.json();
  return data.deck;
}
