import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={onDecrement}
        className={`flex items-center justify-center rounded-[4px] bg-[#FFFFFF] border border-[#CED6DE] text-[#0B0D10] hover:bg-[#F0F4F7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
          isSm ? 'w-5 h-5' : 'w-6 h-6'
        }`}
      >
        <Minus size={isSm ? 10 : 12} />
      </button>

      <span className={`font-semibold text-center text-[#0B0D10] ${isSm ? 'text-sm min-w-[12px]' : 'text-base min-w-[16px]'}`}>
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={onIncrement}
        className={`flex items-center justify-center rounded-[4px] bg-[#FFFFFF] border border-[#CED6DE] text-[#0B0D10] hover:bg-[#F0F4F7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
          isSm ? 'w-5 h-5' : 'w-6 h-6'
        }`}
      >
        <Plus size={isSm ? 10 : 12} />
      </button>
    </div>
  );
};

export default QuantityStepper;
