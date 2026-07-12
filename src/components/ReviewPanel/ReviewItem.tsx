import React from 'react';
import type { SelectedProduct } from '../../types/bundle';
import { useBundle } from '../../hooks/useBundle';
import { formatCurrency } from '../../utils/price';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';

export interface ReviewItemProps {
  item: SelectedProduct;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ item }) => {
  const { handleUpdateQuantity, handleRemoveProduct } = useBundle();

  const isPlan = item.category.toLowerCase() === 'plan';

  const handleIncrement = () => {
    handleUpdateQuantity({ key: item.key, quantity: item.quantity + 1 });
  };

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      handleRemoveProduct(item.key);
    } else {
      handleUpdateQuantity({ key: item.key, quantity: item.quantity - 1 });
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 py-2 border-t border-[#CED6DE]/50 first:border-t-0">
      {/* Left: icon + name */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {isPlan ? (
          /* Plan: Wyze shield logo with multiply blend to remove white bg */
          <div className="w-8 h-8 shrink-0 flex items-center justify-center">
            <img
              src="/images/wyze-shield.png"
              alt="Wyze Cam Unlimited"
              className="w-full h-full object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        ) : (
          /* Other items: product thumbnail in white box */
          <div className="w-8 h-8 rounded-sm bg-white border border-[#ffff] shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain p-0.5"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        )}

        <div className="min-w-0">
          {isPlan ? (
            <h4 className="text-[13px] font-semibold text-[#1F1F1F] leading-tight whitespace-nowrap">
              Cam <span className="text-[#4E2FD2] font-bold">Unlimited</span>
            </h4>
          ) : (
            <h4 className="text-[13px] font-semibold text-[#1F1F1F] leading-tight truncate">
              {item.name}
            </h4>
          )}
        </div>
      </div>

      {/* Middle: quantity stepper (not for plan) */}
      {!isPlan ? (
        <div className="shrink-0">
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            size="sm"
          />
        </div>
      ) : (
        <div className="w-14 shrink-0" />
      )}

      {/* Right: prices */}
      <div className="text-right min-w-[58px] shrink-0 flex flex-col justify-center">
        {item.comparePrice && item.comparePrice > item.price ? (
          <div className="text-[10px] text-[#6F7882] line-through leading-none mb-0.5">
            {formatCurrency(item.comparePrice * item.quantity)}
            {isPlan && '/mo'}
          </div>
        ) : null}
        <div className="text-[13px] font-semibold text-[#4E2FD2] leading-tight">
          {item.price === 0 ? (
            <span className="text-[13px] font-bold text-[#4E2FD2] uppercase">FREE</span>
          ) : (
            <>
              {formatCurrency(item.price * item.quantity)}
              {isPlan && '/mo'}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
