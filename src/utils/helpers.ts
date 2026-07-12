import type { SelectedProduct } from '../types/bundle';

/**
 * Creates a unique composite key for a product and its selected variant.
 */
export const makeSelectedProductKey = (productId: string, variantId?: string): string => {
  return `${productId}_${variantId || 'default'}`;
};

/**
 * Groups selected products by their category.
 */
export const groupSelectedByCategory = (items: SelectedProduct[]): Record<string, SelectedProduct[]> => {
  return items.reduce<Record<string, SelectedProduct[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};
