import { describe, it, expect, beforeEach } from 'vitest';
import bundleReducer, {
  addProduct,
  removeProduct,
  updateQuantity,
  changeVariant,
  clearBundle,
} from '../src/features/bundle/bundleSlice';
import { BundleState } from '../src/types/bundle';
import { calculateTotal, calculateSavings } from '../src/utils/price';

describe('bundleSlice Redux logic', () => {
  let initialState: BundleState;

  beforeEach(() => {
    initialState = {
      selectedItems: [],
      activeStep: 1,
      saved: false,
    };
  });

  it('should add a product variant to selectedItems', () => {
    const nextState = bundleReducer(
      initialState,
      addProduct({
        productId: 'cam-001',
        variantId: 'black',
        name: 'Outdoor Camera',
        variantName: 'Black',
        category: 'Cameras',
        price: 199,
        comparePrice: 250,
        quantity: 1,
        image: '/cam.png',
      })
    );

    expect(nextState.selectedItems).toHaveLength(1);
    expect(nextState.selectedItems[0].key).toBe('cam-001_black');
    expect(nextState.selectedItems[0].quantity).toBe(1);
  });

  it('should isolate distinct variants of the same product without overwriting', () => {
    let state = bundleReducer(
      initialState,
      addProduct({
        productId: 'cam-001',
        variantId: 'black',
        name: 'Outdoor Camera',
        variantName: 'Black',
        category: 'Cameras',
        price: 199,
        comparePrice: 250,
        quantity: 2,
        image: '/cam.png',
      })
    );

    state = bundleReducer(
      state,
      addProduct({
        productId: 'cam-001',
        variantId: 'white',
        name: 'Outdoor Camera',
        variantName: 'White',
        category: 'Cameras',
        price: 219,
        comparePrice: 260,
        quantity: 1,
        image: '/cam.png',
      })
    );

    expect(state.selectedItems).toHaveLength(2);
    expect(state.selectedItems.find(i => i.key === 'cam-001_black')?.quantity).toBe(2);
    expect(state.selectedItems.find(i => i.key === 'cam-001_white')?.quantity).toBe(1);
  });

  it('should update quantity and remove item when quantity drops to 0', () => {
    let state = bundleReducer(
      initialState,
      addProduct({
        productId: 'cam-001',
        variantId: 'black',
        name: 'Outdoor Camera',
        category: 'Cameras',
        price: 100,
        quantity: 2,
        image: '/cam.png',
      })
    );

    state = bundleReducer(
      state,
      updateQuantity({ key: 'cam-001_black', quantity: 5 })
    );
    expect(state.selectedItems[0].quantity).toBe(5);

    state = bundleReducer(
      state,
      updateQuantity({ key: 'cam-001_black', quantity: 0 })
    );
    expect(state.selectedItems).toHaveLength(0);
  });

  it('should correctly calculate totals and savings', () => {
    let state = bundleReducer(
      initialState,
      addProduct({
        productId: 'cam-001',
        variantId: 'black',
        name: 'Camera',
        category: 'Cameras',
        price: 100,
        comparePrice: 150,
        quantity: 2,
        image: '/cam.png',
      })
    );

    expect(calculateTotal(state.selectedItems)).toBe(200);
    expect(calculateSavings(state.selectedItems)).toBe(100);
  });

  it('should clear the entire bundle', () => {
    let state = bundleReducer(
      initialState,
      addProduct({
        productId: 'cam-001',
        name: 'Camera',
        category: 'Cameras',
        price: 100,
        quantity: 1,
        image: '/cam.png',
      })
    );

    state = bundleReducer(state, clearBundle());
    expect(state.selectedItems).toHaveLength(0);
  });
});
