export interface SelectedProduct {
  key: string; // unique composite key: `${productId}_${variantId || 'default'}`
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

export interface BundleState {
  selectedItems: SelectedProduct[];
  activeStep: number;
  saved: boolean;
}
