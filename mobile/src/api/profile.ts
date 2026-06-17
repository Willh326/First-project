import { QuizAnswers } from '../types/quiz';
import { Product } from '../types/product';
import { API_BASE_URL } from './config';
import { postJson } from './http';

export interface TasteProfileResponse {
  summary: string;
  searchTerms: string[];
  calibrationDeck: Product[];
}

export async function fetchTasteProfile(answers: QuizAnswers): Promise<TasteProfileResponse> {
  return postJson<TasteProfileResponse>(`${API_BASE_URL}/api/profile`, { answers });
}
