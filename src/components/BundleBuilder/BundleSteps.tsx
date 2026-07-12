import React from 'react';
import { useBundle } from '../../hooks/useBundle';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCountForStep } from '../../features/bundle/bundleSelectors';
import StepAccordion from './StepAccordion';
import productsData from '../../data/products.json';
import type { Product } from '../../types/product';

export const STEPS_CONFIG = [
  {
    id: 1,
    title: 'Choose your cameras',
    subtitle: null,
  },
  {
    id: 2,
    title: 'Choose your plan',
    subtitle: null,
  },
  {
    id: 3,
    title: 'Choose your sensors',
    subtitle: null,
  },
  {
    id: 4,
    title: 'Add extra protection',
    subtitle: null,
  },
];

export const BundleSteps: React.FC = () => {
  const { activeStep, handleSetActiveStep } = useBundle();
  const totalSteps = STEPS_CONFIG.length;

  const countStep1 = useAppSelector(selectSelectedCountForStep(1));
  const countStep2 = useAppSelector(selectSelectedCountForStep(2));
  const countStep3 = useAppSelector(selectSelectedCountForStep(3));
  const countStep4 = useAppSelector(selectSelectedCountForStep(4));

  const stepCounts: Record<number, number> = {
    1: countStep1,
    2: countStep2,
    3: countStep3,
    4: countStep4,
  };

  const handleToggle = (stepId: number) => {
    handleSetActiveStep(stepId);
  };

  const handleNextStep = (currentStepId: number) => {
    if (currentStepId < totalSteps) {
      handleSetActiveStep(currentStepId + 1);
    }
  };

  const allProducts = productsData as Product[];

  return (
    <div className="flex flex-col bg-[#EDF4FF] rounded-[10px] overflow-hidden shadow-sm border border-[#D8E4F7]">
      {STEPS_CONFIG.map((step) => {
        const stepProducts = allProducts.filter((p) => p.step === step.id);
        const selectedCount = stepCounts[step.id] || 0;
        const isExpanded = activeStep === step.id;

        return (
          <StepAccordion
            key={step.id}
            stepNumber={step.id}
            totalSteps={totalSteps}
            title={step.title}
            subtitle={step.subtitle}
            products={stepProducts}
            selectedCount={selectedCount}
            isExpanded={isExpanded}
            onToggle={() => handleToggle(step.id)}
            onNextStep={() => handleNextStep(step.id)}
          />
        );
      })}
    </div>
  );
};

export default BundleSteps;
