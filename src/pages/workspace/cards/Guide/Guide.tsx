import { useState, useEffect } from "react";
import store from "@/state/store";
import { guideSteps } from "./steps";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const customStyles = `
  .guide-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .guide-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .guide-scrollbar::-webkit-scrollbar-thumb {
    background: #4b4b4b;
    border-radius: 4px;
  }
  .guide-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #5e5e5e;
  }
  @keyframes custom-pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.4); opacity: 0; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-custom-pulse {
    animation: custom-pulse 2s infinite;
  }
  .animate-slide-in {
    animation: slideIn 0.4s ease;
  }
`;

export const Guide = () => {
  const [isOpen, setIsOpen] = useState(true);
  const currentStep = store.use.currentStep();
  const setCurrentStep = store.use.setCurrentStep();
  const setIsGuideShow = store.use.setIsGuideOpen();

  const totalSteps = guideSteps.length;

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
      if (e.key === "Escape") toggleGuide(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep]);

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const renderStepContent = (step: any) => {
    // Reusable styles for info blocks to keep JSX clean
    const blockBaseClass =
      "p-4 relative overflow-hidden before:absolute flex-1 rounded-lg border-l-4";
    const labelBaseClass =
      "text-sm uppercase tracking-[0.05em] drop-shadow-lg font-bold mb-2 flex items-center gap-1.5";

    return (
      <div className="animate-slide-in">
        <div className="flex gap-4 mb-8">
          {step.problem && (
            <div
              className={`${blockBaseClass}  bg-red-500/10 border-red-400`}
            >
              <div className={`${labelBaseClass} dark:drop-shadow-red-500/50 text-[#f87171]`}>
                <p>Problem</p>
              </div>
              <p>{step.problem.text}</p>
            </div>
          )}

          {step.solution && (
            <div
              className={`${blockBaseClass}  bg-green-500/10 border-[#4ade80]`}
            >
              <div className={`${labelBaseClass} dark:drop-shadow-green-500/50 text-[#4ade80]`}>
                Solution
              </div>
              <p>{step.solution.text}</p>
            </div>
          )}
        </div>

        {step.note && (
          <div
            className={`bg-yellow-500/10 p-4 rounded-xl mb-8`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>💡 Tip</div>
            <p>{step.note.text}</p>
          </div>
        )}

        {step.action && (
          <div>
            <div className="text-xl font-bold">
              🎯 Complete the Task
            </div>
            {step.action.steps && (
              <ol className="list-disc pl-4 py-4 list-inside space-y-1">
                {step.action.steps.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
          </div>
        )}

        {step.result && (
          <div
            className={`p-4 mb-8 flex items-center gap-4 bg-green-500/10 border-1 border-dashed border-green-500 rounded-xl`}
          >
            <div>✅</div>
            <p><b>Result: </b>{step.result.text}</p>
          </div>
        )}

        {step.tryYourself && (
          <div
            className={`p-4 rounded-xl bg-blue-500/40 border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className="text-xl mb-4 font-bold">
              🚀 Try it yourself
            </div>
            <ol className="list-decimal list-inside space-y-1">
              {step.tryYourself.steps.map((s: string, i: number) => (
                <li className={`${i !== 0 ? "border-t-1 border-black/10 dark:border-white/10 py-2" : "pb-2"}`} key={i}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {step.congratulations && (
          <div className="text-center py-5">
            <div className="w-[60px] h-[60px] bg-green-500/10 text-[#4ade80] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-semibold">
              {step.congratulations.text}
            </h3>
          </div>
        )}

        {step.message && (
          <div
            className={`${blockBaseClass} mb-4 bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <p>{step.message.text}</p>
          </div>
        )}

        {step.tip && (
          <div
            className={`${blockBaseClass} bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>⚡ Tip</div>
            <p>{step.tip.text}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{customStyles}</style>

      {!isOpen && (
        <Button
          variant={"colorfull"}
          className="fixed bottom-2 right-2 y-3.5 font-bold"
          onClick={() => toggleGuide(true)}
          size="lg"
          title="Відкрити гайд"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Open Guide</span>
        </Button>
      )}

      <aside
        className={`fixed top-0 right-0 w-[420px] h-full bg-white dark:bg-neutral-900 border-l border-neutral-300 dark:border-[#333336] dark:shadow-[-8px_0_24px_rgba(0,0,0,0.6)] shadow-[-8px_0_24px_rgba(220,220,220,0.6)] flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-50 text-neutral-900 dark:text-[#e0e0e0] font-sans
          ${isOpen ? "md:translate-x-0" : "md:translate-x-full"}
          max-md:w-full max-md:h-[80vh] max-md:top-auto max-md:bottom-0 max-md:border-l-0 max-md:border-t max-md:rounded-t-2xl bg-white max-md:dark:bg-neutral-900
          ${isOpen ? "max-md:translate-y-0" : "max-md:translate-y-full"}
        `}
        aria-label="Панель навчання"
      >
        <div className="relative px-6 py-5 md:px-6 dark:border-b dark:border-[#333336] flex justify-between items-center bg-white/[0.02] max-md:pt-6 max-md:before:content-[''] max-md:before:block max-md:before:w-10 max-md:before:h-1 max-md:before:bg-[#444] max-md:before:rounded-sm max-md:before:absolute max-md:before:top-2 max-md:before:left-1/2 max-md:before:-translate-x-1/2">
          <p className="text-neutral-500">
            Крок <span>{currentStep + 1}</span> з {totalSteps}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleGuide(false)}
            aria-label="Закрити гайд"
          >
            <ChevronDown />
          </Button>
        </div>

        <div className="w-full h-[2px] bg-neutral-300 dark:bg-[#2d2d2d]">
          <div
            className="h-full bg-[#3b82f6] shadow-[0_0_10px_#cccccc] dark:shadow-[0_0_10px_#3b82f6] transition-[width] duration-20Крок 1 з 50 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="guide-scrollbar flex-1 overflow-y-auto p-6 scroll-smooth">
          {guideSteps.map((step, index) => (
            <div
              key={step.id}
              className={index === currentStep ? "block" : "hidden"}
              data-step={index + 1}
            >
              {renderStepContent(step)}
            </div>
          ))}
        </div>

        <div className="p-5 md:px-6 border-t border-neutral-300 dark:border-[#333336] flex justify-between bg-white/[0.02]">
          <button
            className="bg-transparent text-black dark:text-[#e0e0e0] border border-neutral-300 dark:border-[#333336] px-5 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-all flex items-center gap-2 hover:border-neutral-400 dark:hover:border-[#666] hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-transparent"
            onClick={handlePrev}
            disabled={currentStep === 0}
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
      </aside>
    </>
  );
};
