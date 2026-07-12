import React from 'react';
import { formatCurrency } from '../../utils/price';

export interface ProductPriceProps {
  price: number;
  comparePrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  comparePrice,
  size = 'md',
}) => {
  const hasDiscount = comparePrice !== undefined && comparePrice > price;

  const sizeClasses = {
    sm: { current: 'text-sm font-semibold', compare: 'text-xs' },
    md: { current: 'text-lg font-bold', compare: 'text-sm' },
    lg: { current: 'text-2xl font-extrabold', compare: 'text-base' },
  }[size];

  return (
    <div className="flex items-baseline gap-2">
      <span className={`text-slate-100 ${sizeClasses.current}`}>
        {formatCurrency(price)}
      </span>
      {hasDiscount && (
        <span className={`text-slate-500 line-through ${sizeClasses.compare}`}>
          {formatCurrency(comparePrice)}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
