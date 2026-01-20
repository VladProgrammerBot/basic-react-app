import { useState, useEffect } from "react";
import store from "@/state/store";
import { guideSteps2 } from "./steps";
import { Button } from "@/components/ui/button";

export const Guide = () => {
  const [isOpen, setIsOpen] = useState(true);
  const currentStep = store.use.currentStep();
  const setCurrentStep = store.use.setCurrentStep();
  const setIsGuideShow = store.use.setIsGuideOpen();

  const totalSteps = guideSteps2.length;

  const toggleGuide = (show: boolean) => {
    setIsOpen(show);
    if (show) {
      document.body.classList.add("guide-active");
    } else {
      document.body.classList.remove("guide-active");
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishGuide();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishGuide = () => {
    setIsGuideShow(false);
    toggleGuide(false);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep]);

  return (
    <div
      className={`fixed p-4 border-neutral-300 dark:border-[#333336] dark:shadow-[-8px_0_24px_rgba(0,0,0,0.6)] shadow-[-8px_0_24px_rgba(220,220,220,0.6)] flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-50 text-neutral-900 dark:text-[#e0e0e0] font-sans
          max-w-100 top-auto bottom-2 left-1/2 -translate-x-1/2 rounded-2xl bg-white dark:bg-neutral-800
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      aria-label="Панель навчання"
    >
      <div className="relative text-center items-center">
        <p className="text-neutral-500">
          Крок <span>{currentStep + 1}</span> з {totalSteps}
        </p>
      </div>
      <p className="p-4 text-center">{guideSteps2[currentStep].title ?? ""}</p>
      <ul className="list-decimal px-12 pb-4">
        {guideSteps2[currentStep].list?.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>

      <div className="flex gap-4 justify-between">
        <button
          className={`bg-transparent ${
            currentStep === 0 && "invisible"
          } text-black dark:text-[#e0e0e0] border border-neutral-300 dark:border-[#333336] px-5 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-all flex items-center gap-2 hover:border-neutral-400 dark:hover:border-[#666] hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-transparent`}
          onClick={handlePrev}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Назад
        </button>
        <Button
          // className="bg-[#3b82f6] border border-[#3b82f6] px-5 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-all flex items-center gap-2 hover:bg-[#2563eb] hover:border-[#2563eb] hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
          onClick={handleNext}
        >
          {currentStep === totalSteps - 1 ? "Завершити" : "Далі"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Button>
      </div>
    </div>
  );
};
