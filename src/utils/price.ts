import type { SelectedProduct } from '../types/bundle';

/**
 * Calculates the final total price of all selected items in the bundle.
 */
export const calculateTotal = (items: SelectedProduct[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

/**
 * Calculates the total original compare price (before discount) of all selected items.
 */
export const calculateOriginalTotal = (items: SelectedProduct[]): number => {
  return items.reduce((acc, item) => {
    const origPrice = item.comparePrice && item.comparePrice > item.price ? item.comparePrice : item.price;
    return acc + origPrice * item.quantity;
  }, 0);
};

/**
 * Calculates the total discount savings across all selected items.
 */
export const calculateSavings = (items: SelectedProduct[]): number => {
  const originalTotal = calculateOriginalTotal(items);
  const finalTotal = calculateTotal(items);
  return Math.max(0, originalTotal - finalTotal);
};

/**
 * Calculates the percentage discount saved.
 */
export const calculateDiscountPercentage = (items: SelectedProduct[]): number => {
  const originalTotal = calculateOriginalTotal(items);
  if (originalTotal === 0) return 0;
  const savings = calculateSavings(items);
  return Math.round((savings / originalTotal) * 100);
};

/**
 * Formats a numeric price into USD currency string.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
