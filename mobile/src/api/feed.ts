import { QuizAnswers } from '../types/quiz';
import { FeedItem } from '../types/feed';
import { API_BASE_URL } from './config';
import { postJson } from './http';

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
  const data = await postJson<{ items: FeedItem[] }>(`${API_BASE_URL}/api/feed`, {
    summary,
    searchTerms,
    answers,
    excludeIds,
    count,
  });
  return data.items;
}
