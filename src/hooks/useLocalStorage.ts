import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { restoreBundle } from '../features/bundle/bundleActions';

/**
 * Hook to automatically restore the saved bundle from LocalStorage when the app mounts.
 */
export const useLocalStorageRestore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreBundle());
  }, [dispatch]);
};
