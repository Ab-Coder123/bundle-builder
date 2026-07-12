import React from 'react';
import type { ProductVariant } from '../../types/product';
import { getVariantImage } from '../../utils/variantImages';

export interface ProductVariantSelectorProps {
  productId?: string;
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  productId = '',
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
        const variantImg = getVariantImage(productId, variant.name, '');
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelectVariant(variant)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-[3px] text-xs font-semibold transition-all duration-150 border cursor-pointer ${
              isSelected
                ? 'bg-[#0AA288]/5 border-[#0AA288] text-[#1F1F1F]'
                : 'bg-[#FFFFFF] border-[#CED6DE] text-[#1F1F1F] hover:border-[#888888]'
            }`}
          >
            {variantImg ? (
              <img
                src={variantImg}
                alt={variant.name}
                className="w-5 h-5 object-contain shrink-0"
              />
            ) : variant.colorHex ? (
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: variant.colorHex }}
              />
            ) : null}
            <span>{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProductVariantSelector;
