import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bundleReducer, { addProduct } from '../src/features/bundle/bundleSlice';
import ReviewPanel from '../src/components/ReviewPanel/ReviewPanel';

describe('ReviewPanel Component', () => {
  it('renders empty state initially', () => {
    const store = configureStore({
      reducer: { bundle: bundleReducer },
    });
    render(
      <Provider store={store}>
        <ReviewPanel />
      </Provider>
    );

    expect(screen.getByText('Your security bundle is empty')).toBeInTheDocument();
  });

  it('updates automatically when items are added to Redux state', () => {
    const store = configureStore({
      reducer: { bundle: bundleReducer },
    });

    store.dispatch(
      addProduct({
        productId: 'cam-test',
        variantId: 'black',
        name: 'Wyze Outdoor AI Cam',
        variantName: 'Black',
        category: 'Cameras',
        price: 150,
        quantity: 2,
        image: '/cam.png',
      })
    );

    render(
      <Provider store={store}>
        <ReviewPanel />
      </Provider>
    );

    expect(screen.getByText('Wyze Outdoor AI Cam')).toBeInTheDocument();
    expect(screen.getAllByText('$300').length).toBeGreaterThan(0);
  });
});
