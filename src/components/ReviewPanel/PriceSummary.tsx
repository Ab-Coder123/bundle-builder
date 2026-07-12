import React from 'react';
import { usePriceCalculator } from '../../hooks/usePriceCalculator';

export const PriceSummary: React.FC = () => {
  const {
    totalPrice,
    savings,
    formattedTotal,
    formattedOriginal,
    formattedSavings,
  } = usePriceCalculator();

  const monthlyEstimate = totalPrice > 0 ? (totalPrice / 12).toFixed(2) : '0.00';

  return (
    <div className="pt-4 border-t border-[#CED6DE] space-y-0">
      {/* Shipping Row — truck uses vector.png (the real green truck icon) */}
      <div className="flex justify-between items-center py-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-[#1F1F1F]">
          <div className='bg-white p-2'> <img
            src="/images/vector.png"
            alt="Fast Shipping"
            className="w-6 h-6 object-contain shrink-0 "
            style={{ imageRendering: 'auto' }}
          /></div>

          <span>Fast Shipping</span>
        </span>
        <div className="text-right flex flex-col items-end">
          <span className="text-[11px] text-[#6F7882] line-through leading-none mb-0.5">$5.99</span>
          <span className="font-bold text-sm text-[#4E2FD2] leading-tight">FREE</span>
        </div>
      </div>

      {/* Satisfaction Badge & Financing / Total Section */}
      <div className="flex items-center justify-between gap-3 pt-3">
        <img
          src="/images/satisfaction-badge.png"
          alt="100% Wyze Satisfaction Guarantee"
          className="w-20 h-20 object-contain shrink-0 drop-shadow-xs"
          style={{ imageRendering: 'auto' }}
        />

        <div className="flex flex-col items-end">
          <div className="px-2.5 py-0.5 rounded-[3px] bg-[#4E2FD2] text-white text-[11px] font-medium tracking-tight mb-1">
            as low as ${monthlyEstimate}/mo
          </div>

          <div className="flex items-baseline gap-2">
            {savings > 0 && (
              <span className="text-base font-medium text-[#6F7882] line-through">
                {formattedOriginal}
              </span>
            )}
            <span className="text-2xl font-bold text-[#4E2FD2] tracking-tight">
              {formattedTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Congrats Savings Message */}
      {savings > 0 && (
        <div className="text-center text-xs font-semibold text-[#0AA288] pt-1">
          Congrats! You're saving {formattedSavings} on your security bundle!
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
