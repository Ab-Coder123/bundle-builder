import React from 'react';

export interface NextButtonProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
}

export const NextButton: React.FC<NextButtonProps> = ({
  currentStep,
  totalSteps,
  onNext,
}) => {
  const isLastStep = currentStep === totalSteps;

  const getNextStepName = (step: number) => {
    switch (step) {
      case 1:
        return 'Next: Choose your sensors';
      case 2:
        return 'Next: Choose your sensors';
      case 3:
        return 'Next: Add extra protection';
      case 4:
      default:
        return 'Review Your Security System';
    }
  };

  return (
    <div className="flex justify-center pt-4 mt-2">
      <button
        type="button"
        onClick={onNext}
        className="px-8 py-2.5 rounded-[6px] border border-[#4E2FD2] bg-[#FFFFFF] text-[#4E2FD2] font-semibold text-sm hover:bg-[#4E2FD2] hover:text-white transition-all duration-200"
      >
        {isLastStep ? 'Review Your Security System' : getNextStepName(currentStep)}
      </button>
    </div>
  );
};

export default NextButton;
