import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { TypingCursor } from "./TypingCursor";
import { GuideNavigation } from "./GuideNavigation";
import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

interface GuideContentProps {
  displayedText: string;
  isDarkMode: boolean;
  isTyping: boolean;
  currentStep: number;
  totalSteps: number;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const GuideContent: React.FC<GuideContentProps> = ({
  displayedText,
  isDarkMode,
  isTyping,
  currentStep,
  totalSteps,
  onClose,
  onBack,
  onNext,
  onSkip,
  onFinish,
}) => {
  return (
    <>
      <div
        onClick={onClose}
        className="z-1 fixed w-screen h-screen top-0 left-0 backdrop-blur-xs md:hidden"
      />
      <div className="h-full z-2 md:w-sm lg:w-lg 2xl:w-xl max-md:w-[calc(100vw-1rem)] max-md:h-[80vh] backdrop-blur-md relative flex flex-col mx-auto bg-white dark:bg-white/0 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-white/20">
        <Button className="absolute top-2 right-2 max-md:hidden" size={"icon"} onClick={onClose}><MdOutlineKeyboardDoubleArrowLeft/></Button>
        <div className="w-10 mx-auto mb-4 mt-2 visible md:hidden rounded-full h-1 bg-white/20" />
        
        <div className="prose overflow-y-scroll flex-1 prose-slate p-4 dark:prose-invert max-w-none">
          <MarkdownRenderer content={displayedText} isDarkMode={isDarkMode} />
          <TypingCursor isTyping={isTyping} />
        </div>
        
        <GuideNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          isTyping={isTyping}
          onBack={onBack}
          onNext={onNext}
          onSkip={onSkip}
          onFinish={onFinish}
        />
      </div>
    </>
  );
};