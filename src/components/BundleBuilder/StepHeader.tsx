import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface StepHeaderProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  selectedCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

// Step icons matching the Figma design from downloaded assets
const StepIcon: React.FC<{ step: number }> = ({ step }) => {
  return (
    <img
      src={`/images/step-icons/step-${step}.png`}
      alt={`Step ${step} icon`}
      className="w-5 h-5 object-contain shrink-0"
    />
  );
};

export const StepHeader: React.FC<StepHeaderProps> = ({
  stepNumber,
  totalSteps,
  title,
  selectedCount,
  isExpanded,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      className="w-full flex flex-col items-start px-4 py-3 sm:px-5 sm:py-4 text-left transition-all duration-200 hover:bg-[#F8FAFF]"
    >
      <div className="text-[10px] font-semibold tracking-[1.4px] text-[#8A96A3] uppercase mb-1">
        STEP {stepNumber} OF {totalSteps}
      </div>

      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#CED6DE] shrink-0 shadow-sm">
            <StepIcon step={stepNumber} />
          </div>
          <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#0B0D10] leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {selectedCount > 0 && (
            <span className="text-sm font-semibold text-[#4E2FD2] whitespace-nowrap">
              {selectedCount} selected
            </span>
          )}
          <div className="text-[#8A96A3]">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>
    </button>
  );
};

export default StepHeader;
