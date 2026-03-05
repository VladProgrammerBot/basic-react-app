import React, { useState } from "react";
import { guideMarkdownSteps } from "@/pages/workspace2/cards/Guide/GuideMarkdown";
import { GuideContent } from "./GuideContent";
import { useTypingEffect } from "./useTypingEffect";
import { BigButton } from "../../../../components/BigButton";
import store from "@/state/store";

export const Guide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [viewedSteps, setViewedSteps] = useState<number>(0);
  const isUserLoggedIn =
    localStorage.getItem("token") && localStorage.getItem("token") !== ""
      ? true
      : false;
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(!isUserLoggedIn);

  const { displayedText, isTyping, skipTyping } = useTypingEffect({
    text: guideMarkdownSteps[currentStep],
    currentStep,
    viewedSteps,
  });
  const isStyled = store.use.isStyled();

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    setViewedSteps((prev) => prev + 1);
  };

  const handleFinish = () => {
    setIsGuideOpen(false);
  };

  return (
    <div
      className={`max-md:fixed z-20 bottom-0 ${
        isGuideOpen && "d:w-full"
      }  p-2 max-lg:pr-0 left-0 ${!isStyled && "hidden"}`}
    >
      {isGuideOpen ? (
        <GuideContent
          displayedText={displayedText}
          isTyping={isTyping}
          currentStep={currentStep}
          totalSteps={guideMarkdownSteps.length}
          onClose={() => setIsGuideOpen(false)}
          onBack={handleBack}
          onNext={handleNext}
          onSkip={skipTyping}
          onFinish={handleFinish}
        />
      ) : (
        <BigButton className="animate-fade-in" Func={() => setIsGuideOpen(true)} text="?" tooltip="Open Guide" />
      )}
    </div>
  );
};
