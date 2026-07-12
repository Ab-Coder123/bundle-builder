import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BundleState, AddProductPayload, UpdateQuantityPayload, ChangeVariantPayload } from './bundleTypes';
import { makeSelectedProductKey } from '../../utils/helpers';
import { loadBundleFromStorage, saveBundleToStorage, clearBundleFromStorage } from '../../utils/storage';

const initialState: BundleState = {
  selectedItems: [],
  activeStep: 1,
  saved: false,
};

export const bundleSlice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductPayload>) => {
      const payload = action.payload;
      const key = makeSelectedProductKey(payload.productId, payload.variantId);
      const existingIndex = state.selectedItems.findIndex(item => item.key === key);

      if (payload.quantity <= 0) {
        if (existingIndex >= 0) {
          state.selectedItems.splice(existingIndex, 1);
        }
        state.saved = false;
        return;
      }

      if (existingIndex >= 0) {
        state.selectedItems[existingIndex].quantity = payload.quantity;
      } else {
        state.selectedItems.push({
          key,
          productId: payload.productId,
          variantId: payload.variantId,
          name: payload.name,
          variantName: payload.variantName,
          category: payload.category,
          price: payload.price,
          comparePrice: payload.comparePrice,
          quantity: payload.quantity,
          image: payload.image,
        });
      }
      state.saved = false;
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      // action.payload is the composite key
      state.selectedItems = state.selectedItems.filter(item => item.key !== action.payload);
      state.saved = false;
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { key, quantity } = action.payload;
      const index = state.selectedItems.findIndex(item => item.key === key);

      if (quantity <= 0) {
        if (index >= 0) {
          state.selectedItems.splice(index, 1);
        }
      } else if (index >= 0) {
        state.selectedItems[index].quantity = quantity;
      }
      state.saved = false;
    },

    changeVariant: (state, action: PayloadAction<ChangeVariantPayload>) => {
      const { oldKey, newVariantId, newVariantName, newPrice, newComparePrice } = action.payload;
      const oldItemIndex = state.selectedItems.findIndex(item => item.key === oldKey);
      if (oldItemIndex < 0) return;

      const oldItem = state.selectedItems[oldItemIndex];
      const newKey = makeSelectedProductKey(oldItem.productId, newVariantId);

      // Check if target variant already exists in bundle
      const existingTargetIndex = state.selectedItems.findIndex(item => item.key === newKey);
      if (existingTargetIndex >= 0 && existingTargetIndex !== oldItemIndex) {
        // Merge quantities into existing target variant
        state.selectedItems[existingTargetIndex].quantity += oldItem.quantity;
        state.selectedItems.splice(oldItemIndex, 1);
      } else {
        // Update in place
        oldItem.key = newKey;
        oldItem.variantId = newVariantId;
        oldItem.variantName = newVariantName;
        oldItem.price = newPrice;
        oldItem.comparePrice = newComparePrice;
      }
      state.saved = false;
    },

    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },

    clearBundle: (state) => {
      state.selectedItems = [];
      state.activeStep = 1;
      state.saved = false;
      clearBundleFromStorage();
    },

    saveBundle: (state) => {
      saveBundleToStorage(state);
      state.saved = true;
    },

    restoreBundle: (state) => {
      const savedState = loadBundleFromStorage();
      if (savedState) {
        state.selectedItems = savedState.selectedItems;
        state.activeStep = savedState.activeStep || 1;
        state.saved = true;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  changeVariant,
  setActiveStep,
  clearBundle,
  saveBundle,
  restoreBundle,
} = bundleSlice.actions;

export default bundleSlice.reducer;
