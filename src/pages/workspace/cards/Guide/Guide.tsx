import { useState, useEffect } from "react";
import store from "@/state/store";
import { guideSteps } from "./steps";

// Helper styles for things Tailwind doesn't handle inline easily (Scrollbars & Custom Keyframes)
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
  const [currentStep, setCurrentStep] = useState(0);
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
    setCurrentStep(0);
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
      "border p-4 mb-5 rounded-lg relative overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1";
    const labelBaseClass =
      "text-[11px] uppercase tracking-[0.05em] font-bold mb-2 flex items-center gap-1.5";

    return (
      <div className="animate-slide-in">
        {/* <h2 className="mt-0 text-2xl mb-6 text-white">{step.title}</h2> */}

        {step.problem && (
          <div
            className={`${blockBaseClass} bg-[rgba(127,29,29,0.2)] border-[rgba(248,113,113,0.2)] before:bg-[#f87171]`}
          >
            <div className={`${labelBaseClass} text-[#f87171]`}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Проблема
            </div>
            <p>{step.problem.text}</p>
          </div>
        )}

        {step.solution && (
          <div
            className={`${blockBaseClass} bg-[rgba(20,83,45,0.2)] border-[rgba(74,222,128,0.2)] before:bg-[#4ade80]`}
          >
            <div className={`${labelBaseClass} text-[#4ade80]`}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Рішення
            </div>
            <p>{step.solution.text}</p>
          </div>
        )}

        {step.note && (
          <div
            className={`${blockBaseClass} bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>
              💡 Підказка
            </div>
            <p>{step.note.text}</p>
          </div>
        )}

        {step.action && (
          <div
            className={`${blockBaseClass} bg-[rgba(20,83,45,0.2)] border-[rgba(74,222,128,0.2)] before:bg-[#4ade80]`}
          >
            <div className={`${labelBaseClass} text-[#4ade80]`}>🎯 Дія</div>
            {step.action.steps && (
              <ol className="list-decimal list-inside space-y-1">
                {step.action.steps.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            {step.action.result && (
              <p>
                <strong>Результат:</strong> {step.action.result}
              </p>
            )}
          </div>
        )}

        {step.result && (
          <div
            className={`${blockBaseClass} bg-[rgba(20,83,45,0.2)] border-[rgba(74,222,128,0.2)] before:bg-[#4ade80]`}
          >
            <div className={`${labelBaseClass} text-[#4ade80] `}>
              ✅ Результат
            </div>
            <p>{step.result.text}</p>
          </div>
        )}

        {step.tryYourself && (
          <div
            className={`${blockBaseClass} bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>
              🚀 Спробуйте самі
            </div>
            <ol className="list-decimal list-inside space-y-1">
              {step.tryYourself.steps.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {step.congratulations && (
          <div className="text-center py-5">
            <div className="w-[60px] h-[60px] bg-[rgba(20,83,45,0.2)] text-[#4ade80] rounded-full flex items-center justify-center mx-auto mb-4">
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
            className={`${blockBaseClass} bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>
              📚 Повідомлення
            </div>
            <p>{step.message.text}</p>
          </div>
        )}

        {step.spoiler && (
          <div
            className={`${blockBaseClass} bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>💡 Спойлер</div>
            <p>{step.spoiler.text}</p>
          </div>
        )}

        {step.tip && (
          <div
            className={`${blockBaseClass} bg-[rgba(161,98,7,0.15)] border-[rgba(250,204,21,0.2)] before:bg-[#facc15]`}
          >
            <div className={`${labelBaseClass} text-[#facc15]`}>
              ⚡ Підказка
            </div>
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
        <button
          className="fixed bottom-[30px] right-[30px] bg-[#3b82f6] text-white border-none rounded-[50px] px-6 py-3.5 flex items-center gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-semibold text-base hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_25px_rgba(59,130,246,0.6)] before:absolute before:-inset-[5px] before:rounded-[50px] before:border-2 before:border-[#3b82f6] before:animate-custom-pulse before:opacity-0 before:-z-10 max-md:bottom-5 max-md:right-5"
          onClick={() => toggleGuide(true)}
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
        </button>
      )}

      <aside
        className={`fixed top-0 right-0 w-[420px] h-full bg-[#1e1e20] border-l border-[#333336] shadow-[-8px_0_24px_rgba(0,0,0,0.6)] flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-[200] text-[#e0e0e0] font-sans
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          max-md:w-full max-md:h-[80vh] max-md:top-auto max-md:bottom-0 max-md:border-l-0 max-md:border-t max-md:rounded-t-2xl max-md:bg-[#1e1e20]
          ${isOpen ? "max-md:translate-y-0" : "max-md:translate-y-full"}
        `}
        aria-label="Панель навчання"
      >
        <div className="relative p-5 md:px-6 border-b border-[#333336] flex justify-between items-center bg-white/[0.02] max-md:pt-6 max-md:before:content-[''] max-md:before:block max-md:before:w-10 max-md:before:h-1 max-md:before:bg-[#444] max-md:before:rounded-sm max-md:before:absolute max-md:before:top-2 max-md:before:left-1/2 max-md:before:-translate-x-1/2">
          <p className="text-neutral-500">
            Крок <span>{currentStep + 1}</span> з {totalSteps}
          </p>
          <div className="flex">
            <button
              className="bg-transparent border border-transparent text-[#9ca3af] cursor-pointer px-3 text-2xl rounded-md flex items-center justify-center transition-all hover:bg-white/10 hover:text-white"
              onClick={() => toggleGuide(false)}
              aria-label="Згорнути гайд"
            >
              -
            </button>
            <button
              className="bg-transparent border border-transparent text-[#9ca3af] cursor-pointer p-1.5 rounded-md flex items-center justify-center transition-all hover:bg-white/10 hover:text-white"
              onClick={() => setIsGuideShow(false)}
              aria-label="Згорнути гайд"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full h-[2px] bg-[#2d2d2d]">
          <div
            className="h-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6] transition-[width] duration-400 ease-linear"
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

        <div className="p-5 md:px-6 border-t border-[#333336] flex justify-between bg-white/[0.02]">
          <button
            className="bg-transparent text-[#e0e0e0] border border-[#333336] px-5 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-all flex items-center gap-2 hover:border-[#666] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-transparent"
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
          <button
            className="bg-[#3b82f6] border border-[#3b82f6] text-white px-5 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-all flex items-center gap-2 hover:bg-[#2563eb] hover:border-[#2563eb] hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
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
          </button>
        </div>
      </aside>
    </>
  );
};
