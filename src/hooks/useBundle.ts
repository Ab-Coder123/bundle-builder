import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectSelectedItems,
  selectActiveStep,
  selectIsBundleSaved,
  selectTotalSelectedCount,
  selectSelectedGroupedByCategory,
} from '../features/bundle/bundleSelectors';
import {
  addProduct,
  removeProduct,
  updateQuantity,
  changeVariant,
  setActiveStep,
  clearBundle,
  saveBundle,
  restoreBundle,
} from '../features/bundle/bundleActions';
import type { AddProductPayload, UpdateQuantityPayload, ChangeVariantPayload } from '../features/bundle/bundleTypes';

export const useBundle = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);
  const activeStep = useAppSelector(selectActiveStep);
  const isSaved = useAppSelector(selectIsBundleSaved);
  const totalItemsCount = useAppSelector(selectTotalSelectedCount);
  const groupedItems = useAppSelector(selectSelectedGroupedByCategory);

  return {
    selectedItems,
    activeStep,
    isSaved,
    totalItemsCount,
    groupedItems,
    handleAddProduct: (payload: AddProductPayload) => dispatch(addProduct(payload)),
    handleRemoveProduct: (key: string) => dispatch(removeProduct(key)),
    handleUpdateQuantity: (payload: UpdateQuantityPayload) => dispatch(updateQuantity(payload)),
    handleChangeVariant: (payload: ChangeVariantPayload) => dispatch(changeVariant(payload)),
    handleSetActiveStep: (step: number) => dispatch(setActiveStep(step)),
    handleClearBundle: () => dispatch(clearBundle()),
    handleSaveBundle: () => dispatch(saveBundle()),
    handleRestoreBundle: () => dispatch(restoreBundle()),
  };
};
