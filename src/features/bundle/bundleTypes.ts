import type { SelectedProduct, BundleState } from '../../types/bundle';

export type { SelectedProduct, BundleState };

export interface AddProductPayload {
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  category: 'Cameras' | 'Plan' | 'Sensors' | 'Accessories';
  price: number;
  comparePrice?: number;
  quantity: number;
  image: string;
}

export interface UpdateQuantityPayload {
  key: string; // composite key
  quantity: number;
}

export interface ChangeVariantPayload {
  oldKey: string;
  newVariantId: string;
  newVariantName: string;
  newPrice: number;
  newComparePrice?: number;
}
