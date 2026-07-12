import React from 'react';
import type { Product } from '../../types/product';
import StepHeader from './StepHeader';
import ProductCard from '../Product/ProductCard';
import NextButton from './NextButton';

export interface StepAccordionProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  subtitle?: string | null;
  products: Product[];
  selectedCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  onNextStep: () => void;
}

export const StepAccordion: React.FC<StepAccordionProps> = ({
  stepNumber,
  totalSteps,
  title,
  subtitle,
  products,
  selectedCount,
  isExpanded,
  onToggle,
  onNextStep,
}) => {
  return (
    <div className="flex flex-col border-b border-[#D8E4F7] last:border-0 transition-all duration-300">
      <StepHeader
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        title={title}
        selectedCount={selectedCount}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />

      {isExpanded && (
        <div className="px-4 pb-6 pt-2 bg-transparent animate-fadeIn">
          {subtitle && (
            <p className="text-sm text-[#484848] mb-5">{subtitle}</p>
          )}

          {/* Responsive grid: 1 column on mobile, 2 columns on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {products.map((product, idx) => {
              const isLastOdd =
                idx === products.length - 1 && products.length % 2 !== 0;
              return (
                <div
                  key={product.id}
                  className={
                    isLastOdd
                      ? 'md:col-span-2 md:w-1/2 md:mx-auto w-full'
                      : ''
                  }
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          <NextButton
            currentStep={stepNumber}
            totalSteps={totalSteps}
            onNext={onNextStep}
          />
        </div>
      )}
    </div>
  );
};

export default StepAccordion;
