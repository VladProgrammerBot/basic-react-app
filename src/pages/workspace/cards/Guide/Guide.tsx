import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { guideMarkdownSteps } from "@/GuideMarkdown";
import { GuideContent } from "./GuideContent";
import { useTypingEffect } from "./useTypingEffect";
import { useDarkMode } from "./useDarkMode";

export const Guide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [viewedSteps, setViewedSteps] = useState<number>(0);
  const isUserLoggedIn =
    localStorage.getItem("token") && localStorage.getItem("token") !== "" ? true : false;
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(!isUserLoggedIn);

  const isDarkMode = useDarkMode();
  const { displayedText, isTyping, skipTyping } = useTypingEffect({
    text: guideMarkdownSteps[currentStep],
    currentStep,
    viewedSteps,
  });

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
      }  p-2 max-lg:pr-0 left-0`}
    >
      {isGuideOpen ? (
        <GuideContent
          displayedText={displayedText}
          isDarkMode={isDarkMode}
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
        <Button
          onClick={() => setIsGuideOpen(true)}
          className="fixed text-2xl font-bold bottom-2 right-2 z-100 py-3 px-6"
          variant="colorfull"
        >
          ?
        </Button>
      )}
    </div>
  );
};
