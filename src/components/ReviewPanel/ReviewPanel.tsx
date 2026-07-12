import React from 'react';
import { useBundle } from '../../hooks/useBundle';
import ReviewItem from './ReviewItem';
import PriceSummary from './PriceSummary';
import CheckoutButton from './CheckoutButton';
import type { SelectedProduct } from '../../types/bundle';

export const ReviewPanel: React.FC = () => {
  const { selectedItems: selectedProducts = [], totalItemsCount } = useBundle();

  const categoriesOrder = ['cameras', 'sensors', 'accessories', 'plan'];
  const categoryLabels: Record<string, string> = {
    cameras: 'CAMERAS',
    sensors: 'SENSORS',
    accessories: 'ACCESSORIES',
    plan: 'HOME MONITORING PLAN',
  };

  const safeSelectedProducts = selectedProducts || [];

  const groupedItems = categoriesOrder.reduce((acc, category) => {
    acc[category] = safeSelectedProducts.filter(
      (item) => (item.category || '').toLowerCase() === category.toLowerCase()
    );
    return acc;
  }, {} as Record<string, SelectedProduct[]>);

  const otherItems = safeSelectedProducts.filter(
    (item) => !categoriesOrder.includes((item.category || '').toLowerCase())
  );

  return (
    <div className="flex flex-col bg-[#EDF4FF] rounded-[10px] p-4 sm:p-6 shadow-sm border border-[#D8E4F7] lg:sticky lg:top-6">
      {/* REVIEW label */}
      <div className="text-[11px] font-semibold tracking-[1.6px] text-[#484848] uppercase mb-2">
        REVIEW
      </div>

      {/* Title & Description */}
      <h2 className="text-[20px] font-bold text-[#1F1F1F] leading-tight mb-1">
        Your security system
      </h2>
      <p className="text-xs text-[#484848] leading-relaxed mb-5">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {/* Items List grouped by Category */}
      {totalItemsCount === 0 ? (
        <div className="py-10 text-center border-t border-[#CED6DE]">
          <p className="text-sm font-medium text-[#484848] mb-1">
            Your security bundle is empty
          </p>
          <p className="text-xs text-[#6F7882]">
            Select cameras, sensors, and accessories on the left to configure your system.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {categoriesOrder.map((category) => {
            const items = groupedItems[category];
            if (!items || items.length === 0) return null;

            return (
              <div key={category} className="border-t border-[#CED6DE] pt-2 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#A8B2BD] mb-1.5 mt-1">
                  {categoryLabels[category] || category}
                </div>
                <div>
                  {items.map((item) => (
                    <ReviewItem key={item.key} item={item} />
                  ))}
                </div>
              </div>
            );
          })}

          {otherItems.length > 0 && (
            <div className="border-t border-[#CED6DE] pt-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#A8B2BD] mb-1.5">
                OTHER ITEMS
              </div>
              <div>
                {otherItems.map((item) => (
                  <ReviewItem key={item.key} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Totals & Checkout Actions */}
      <PriceSummary />
      <CheckoutButton />
    </div>
  );
};

export default ReviewPanel;
