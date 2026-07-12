import type { BundleState } from '../types/bundle';

export const STORAGE_KEY = 'bundle_configuration';

export const saveBundleToStorage = (state: BundleState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Could not save bundle state to local storage', err);
  }
};

export const loadBundleFromStorage = (): BundleState | null => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return null;
    return JSON.parse(serializedState) as BundleState;
  } catch (err) {
    console.error('Could not load bundle state from local storage', err);
    return null;
  }
};

export const clearBundleFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Could not clear bundle state from local storage', err);
  }
};
