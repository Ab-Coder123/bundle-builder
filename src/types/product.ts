export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  colorHex?: string;
}

export interface Product {
  id: string;
  category: 'Cameras' | 'Plan' | 'Sensors' | 'Accessories';
  step: number; // 1 | 2 | 3 | 4
  name: string;
  description: string;
  image: string;
  badge?: string;
  variants: ProductVariant[];
  defaultPrice: number;
  defaultComparePrice?: number;
}
