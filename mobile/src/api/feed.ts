import { QuizAnswers } from '../types/quiz';
import { FeedItem } from '../types/feed';
import { API_BASE_URL } from './config';

export interface FetchFeedParams {
  summary: string;
  searchTerms: string[];
  answers: QuizAnswers;
  excludeIds: string[];
  count?: number;
}

export async function fetchFeed({
  summary,
  searchTerms,
  answers,
  excludeIds,
  count = 10,
}: FetchFeedParams): Promise<FeedItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary, searchTerms, answers, excludeIds, count }),
  });

  if (!response.ok) {
    throw new Error(`Failed to load feed (status ${response.status})`);
  }

  const data: { items: FeedItem[] } = await response.json();
  return data.items;
}
