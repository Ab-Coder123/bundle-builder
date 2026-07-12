import { useAppSelector } from '../app/hooks';
import {
  selectBundleTotalPrice,
  selectBundleOriginalPrice,
  selectBundleSavings,
  selectBundleDiscountPercentage,
} from '../features/bundle/bundleSelectors';
import { formatCurrency } from '../utils/price';

export const usePriceCalculator = () => {
  const totalPrice = useAppSelector(selectBundleTotalPrice);
  const originalPrice = useAppSelector(selectBundleOriginalPrice);
  const savings = useAppSelector(selectBundleSavings);
  const discountPercentage = useAppSelector(selectBundleDiscountPercentage);

  return {
    totalPrice,
    originalPrice,
    savings,
    discountPercentage,
    formattedTotal: formatCurrency(totalPrice),
    formattedOriginal: formatCurrency(originalPrice),
    formattedSavings: formatCurrency(savings),
  };
};
