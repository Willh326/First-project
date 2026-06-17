import { QuizAnswers } from '../types/quiz';
import { Product } from '../types/product';
import { API_BASE_URL } from './config';

export interface TasteProfileResponse {
  summary: string;
  searchTerms: string[];
  calibrationDeck: Product[];
}

export async function fetchTasteProfile(answers: QuizAnswers): Promise<TasteProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate taste profile (status ${response.status})`);
  }

  return response.json();
}
