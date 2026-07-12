import React from 'react';
import type { ProductVariant } from '../../types/product';

export interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onSelectVariant,
}) => {
  if (!variants || variants.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5 my-2">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelectVariant(variant)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] text-xs font-semibold transition-all duration-150 border cursor-pointer ${
              isSelected
                ? 'bg-[#0AA288]/5 border-[#0AA288] text-[#1F1F1F]'
                : 'bg-[#FFFFFF] border-[#CED6DE] text-[#1F1F1F] hover:border-[#888888]'
            }`}
          >
            {variant.colorHex && (
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: variant.colorHex }}
              />
            )}
            <span>{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProductVariantSelector;
