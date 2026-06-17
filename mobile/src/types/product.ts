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
