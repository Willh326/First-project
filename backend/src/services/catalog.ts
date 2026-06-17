import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product, QuizAnswers } from '../types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '..', 'catalog', 'catalog.json');
const catalog: Product[] = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);
}

function scoreProduct(product: Product, searchTokens: string[], preferredCategories: string[], preferredPriceTier?: string): number {
  let score = 0;
  const productTokens = new Set([
    ...tokenize(product.title),
    ...product.tags.map((tag) => tag.toLowerCase()),
  ]);

  for (const token of searchTokens) {
    if (productTokens.has(token)) score += 2;
  }

  if (preferredCategories.includes(product.category)) score += 3;
  if (preferredPriceTier && product.priceTier === preferredPriceTier) score += 1;

  return score;
}

export interface SelectProductsOptions {
  searchTerms: string[];
  answers: QuizAnswers;
  count: number;
  excludeIds?: string[];
}

export function selectProducts({ searchTerms, answers, count, excludeIds = [] }: SelectProductsOptions): Product[] {
  const searchTokens = searchTerms.flatMap(tokenize);
  const preferredCategories = answers.categories ?? [];
  const preferredPriceTier = answers.everydayBudget?.[0];
  const excluded = new Set(excludeIds);

  const ranked = catalog
    .filter((product) => !excluded.has(product.id))
    .map((product) => ({
      product,
      score: scoreProduct(product, searchTokens, preferredCategories, preferredPriceTier),
    }))
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, count).map((entry) => entry.product);
}

export function getAllProducts(): Product[] {
  return catalog;
}

export function getProductById(id: string): Product | undefined {
  return catalog.find((product) => product.id === id);
}
