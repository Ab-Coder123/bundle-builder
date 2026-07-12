import React, { useState } from 'react';
import type { Product, ProductVariant } from '../../types/product';
import { useBundle } from '../../hooks/useBundle';
import { useAppSelector } from '../../app/hooks';
import { selectItemQuantityByProductVariant } from '../../features/bundle/bundleSelectors';
import { makeSelectedProductKey } from '../../utils/helpers';
import { formatCurrency } from '../../utils/price';
import ProductVariantSelector from './ProductVariantSelector';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );

  const { handleAddProduct, handleUpdateQuantity } = useBundle();

  const currentQuantity = useAppSelector(
    selectItemQuantityByProductVariant(product.id, selectedVariant.id)
  );

  const currentPrice = selectedVariant.price || product.defaultPrice || 0;
  const currentComparePrice =
    selectedVariant.comparePrice || product.defaultComparePrice || 0;

  const key = makeSelectedProductKey(product.id, selectedVariant.id);

  const handleAdd = () => {
    handleAddProduct({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      category: product.category,
      price: currentPrice,
      comparePrice: currentComparePrice,
      quantity: 1,
      image: product.image,
    });
  };

  const handleIncrement = () => {
    if (currentQuantity === 0) {
      handleAdd();
    } else {
      handleUpdateQuantity({ key, quantity: currentQuantity + 1 });
    }
  };

  const handleDecrement = () => {
    if (currentQuantity > 0) {
      handleUpdateQuantity({ key, quantity: currentQuantity - 1 });
    }
  };

  const hasSelection = currentQuantity > 0;

  return (
    <div
      className={`relative flex flex-col bg-[#FFFFFF] rounded-[10px] transition-all duration-200 overflow-hidden ${
        hasSelection
          ? 'border-2 border-[#4E2FD2] shadow-sm'
          : 'border border-[#CED6DE] hover:border-[#A8B2BD]'
      }`}
    >
      {/* Save Badge — top left */}
      {product.badge && (
        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#4E2FD2] text-white leading-tight">
          {product.badge}
        </span>
      )}

      {/* Card body: image left, info right */}
      <div className="flex gap-2 p-3">
        {/* Product Image */}
        <div className="w-[80px] shrink-0 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain"
            style={{
              imageRendering: 'auto',
              maxHeight: '90px',
              mixBlendMode: product.id === 'cam-unlimited' ? 'multiply' : 'normal',
            }}
          />
        </div>

        {/* Info column */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-[13px] font-semibold text-[#1F1F1F] leading-tight mb-0.5">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#6F7882] leading-snug mb-1 line-clamp-2">
            {product.description}
            {' '}
            <button type="button" className="text-[#0046C7] underline font-medium whitespace-nowrap">
              Learn More
            </button>
          </p>

          {/* Variant Selector */}
          <ProductVariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant.id}
            onSelectVariant={setSelectedVariant}
          />
        </div>
      </div>

      {/* Bottom row: stepper left, price right */}
      <div className="flex items-center justify-between px-3 pb-3 pt-0">
        <QuantityStepper
          quantity={currentQuantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          size="sm"
        />

        <div className="text-right">
          {currentComparePrice > currentPrice && (
            <div className="text-[11px] text-[#D8392B] line-through leading-none">
              {formatCurrency(currentComparePrice)}
            </div>
          )}
          <div className="text-[13px] font-bold text-[#575757]">
            {formatCurrency(currentPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
