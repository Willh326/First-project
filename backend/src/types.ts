export type QuizAnswers = Record<string, string[]>;

export interface Product {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  priceTier: 'budget' | 'midRange' | 'premium' | 'luxury';
  price: number;
  aesthetic: string;
  colorTag: string;
  brandType: string;
  sustainable: boolean;
  retailer: string;
  image: string;
  retailerUrl: string;
  tags: string[];
}

export interface TasteProfile {
  summary: string;
  searchTerms: string[];
}

export interface FeedItem {
  product: Product;
  reason: string;
}
