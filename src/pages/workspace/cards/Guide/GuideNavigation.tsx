import React from "react";
import { Button } from "../../../../components/ui/button";

interface GuideNavigationProps {
  currentStep: number;
  totalSteps: number;
  isTyping: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const GuideNavigation: React.FC<GuideNavigationProps> = ({
  currentStep,
  totalSteps,
  isTyping,
  onBack,
  onNext,
  onSkip,
  onFinish,
}) => {
  return (
    <div className="flex justify-between pt-4">
      {currentStep > 0 ? (
        <Button onClick={onBack}>Back</Button>
      ) : (
        <div></div>
      )}
      
      {isTyping ? (
        <Button onClick={onSkip}>Skip</Button>
      ) : currentStep < totalSteps - 1 ? (
        <Button onClick={onNext}>Next</Button>
      ) : (
        <Button onClick={onFinish}>Finish</Button>
      )}
    </div>
  );
};