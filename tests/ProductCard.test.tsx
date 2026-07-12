import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bundleReducer from '../src/features/bundle/bundleSlice';
import ProductCard from '../src/components/Product/ProductCard';
import { Product } from '../src/types/product';

const mockProduct: Product = {
  id: 'test-cam',
  category: 'Cameras',
  step: 1,
  name: 'Test 4K AI Camera',
  description: 'High definition camera',
  image: '/test.png',
  badge: 'Save 20%',
  defaultPrice: 100,
  defaultComparePrice: 125,
  variants: [
    { id: 'black', name: 'Black', price: 100, comparePrice: 125 },
    { id: 'white', name: 'White', price: 110, comparePrice: 135 },
  ],
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { bundle: bundleReducer },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ProductCard Component', () => {
  it('renders product details and badge', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test 4K AI Camera')).toBeInTheDocument();
    expect(screen.getByText('Save 20%')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('allows adding product to bundle and increments quantity', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const increaseBtn = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(increaseBtn);

    // Quantity stepper should now show quantity 1
    expect(screen.getByText('1')).toBeInTheDocument();

    // Increment again
    fireEvent.click(increaseBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
