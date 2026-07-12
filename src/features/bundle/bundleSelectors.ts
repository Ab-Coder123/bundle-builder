import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { calculateTotal, calculateOriginalTotal, calculateSavings, calculateDiscountPercentage } from '../../utils/price';
import { groupSelectedByCategory, makeSelectedProductKey } from '../../utils/helpers';
import productsData from '../../data/products.json';
import type { Product } from '../../types/product';

export const selectBundleState = (state: RootState) => state.bundle;

export const selectSelectedItems = (state: RootState) => state.bundle.selectedItems;

export const selectActiveStep = (state: RootState) => state.bundle.activeStep;

export const selectIsBundleSaved = (state: RootState) => state.bundle.saved;

export const selectSelectedCountForStep = (step: number) => (state: RootState): number => {
  const stepProducts = (productsData as Product[]).filter(p => p.step === step);
  const stepProductIds = new Set(stepProducts.map(p => p.id));
  return state.bundle.selectedItems
    .filter(item => stepProductIds.has(item.productId))
    .reduce((total, item) => total + item.quantity, 0);
};

export const selectTotalSelectedCount = (state: RootState): number => {
  return state.bundle.selectedItems.reduce((total, item) => total + item.quantity, 0);
};

export const selectItemQuantityByKey = (key: string) => (state: RootState): number => {
  const item = state.bundle.selectedItems.find(i => i.key === key);
  return item ? item.quantity : 0;
};

export const selectItemQuantityByProductVariant = (productId: string, variantId?: string) => (state: RootState): number => {
  const key = makeSelectedProductKey(productId, variantId);
  const item = state.bundle.selectedItems.find(i => i.key === key);
  return item ? item.quantity : 0;
};

export const selectBundleTotalPrice = (state: RootState): number => {
  return calculateTotal(state.bundle.selectedItems);
};

export const selectBundleOriginalPrice = (state: RootState): number => {
  return calculateOriginalTotal(state.bundle.selectedItems);
};

export const selectBundleSavings = (state: RootState): number => {
  return calculateSavings(state.bundle.selectedItems);
};

export const selectBundleDiscountPercentage = (state: RootState): number => {
  return calculateDiscountPercentage(state.bundle.selectedItems);
};

export const selectSelectedGroupedByCategory = createSelector(
  [selectSelectedItems],
  (selectedItems) => groupSelectedByCategory(selectedItems)
);
