import React, { useState } from "react";
import { guideMarkdownSteps } from "@/pages/workspace/cards/Guide/GuideMarkdown";
import { useTypingEffect } from "@/pages/workspace/cards/Guide/useTypingEffect";
import { TypingCursor } from "@/pages/workspace/cards/Guide/TypingCursor";
import { GuideNavigation } from "@/pages/workspace/cards/Guide/GuideNavigation";
import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export const WithoutMarkdown: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [viewedSteps, setViewedSteps] = useState<number>(0);
  
  const isUserLoggedIn =
    typeof window !== 'undefined' && localStorage.getItem("token") && localStorage.getItem("token") !== ""
      ? true
      : false;

  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(!isUserLoggedIn);

  // Кількість кроків беремо з масиву контенту
  const totalSteps = guideMarkdownSteps.length;

  const { isTyping, skipTyping } = useTypingEffect({
    text: guideMarkdownSteps[currentStep],
    currentStep,
    viewedSteps,
  });

  // Логіка перемикання
  const handleBack = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setViewedSteps((prev) => Math.max(prev, currentStep + 1));
    }
  };

  const handleFinish = () => {
    setIsGuideOpen(false);
  };

  return (
    <div
      className={`max-md:fixed z-20 bottom-0 ${
        isGuideOpen ? "md:w-auto" : ""
      } p-2 max-lg:pr-0 left-0`}
    >
      {isGuideOpen ? (
        <>
          {/* Backdrop для мобілок */}
          <div
            onClick={handleFinish}
            className="z-1 fixed w-screen h-screen top-0 left-0 backdrop-blur-xs md:hidden"
          />
          
          <div className="h-full z-2 md:w-sm lg:w-lg 2xl:w-xl max-md:w-[calc(100vw-1rem)] max-md:h-[80vh] backdrop-blur-md relative flex flex-col mx-auto bg-white dark:bg-white/0 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-white/20">
            <Button
              className="absolute top-2 right-2 max-md:hidden"
              size={"icon"}
              onClick={handleFinish}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </Button>
            
            <div className="w-10 mx-auto mb-4 mt-2 visible md:hidden rounded-full h-1 bg-white/20" />

            <div className="prose overflow-y-scroll flex-1 prose-slate p-4 dark:prose-invert max-w-none">
              {/* <MarkdownRenderer content={displayedText} /> */}
              <TypingCursor isTyping={isTyping} />
            </div>

            <GuideNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              isTyping={isTyping}
              onBack={handleBack}
              onNext={handleNext}
              onSkip={skipTyping}
              onFinish={handleFinish}
            />
          </div>
        </>
      ) : (
        /* Кнопка відкриття гайду (Floating Action Button) */
        <div
          onClick={() => setIsGuideOpen(true)}
          className="fixed bottom-4 right-4 z-100 group cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 group-hover:opacity-100 animate-pulse blur-md transition-all duration-300" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 animate-ping" />

          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
            <div className="absolute inset-0.5 rounded-full bg-white/10 backdrop-blur-sm" />
            <span className="relative text-3xl font-bold text-white drop-shadow-lg">?</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
              Відкрити гайд
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};