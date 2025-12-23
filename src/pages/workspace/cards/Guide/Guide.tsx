import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import store from "@/state/store";
import { guideSteps } from "./steps";
import "./Guide.css"; // Assuming we'll create Guide.css for the styles

export const Guide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const setIsGuideShow = store.use.setIsGuideOpen();

  const totalSteps = guideSteps.length;

  const toggleGuide = (show: boolean) => {
    setIsOpen(show);
    if (show) {
      document.body.classList.add('guide-active');
    } else {
      document.body.classList.remove('guide-active');
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
    return (
      <>
        <h2 className="step-title">{step.title}</h2>
        {step.problem && (
          <div className="info-block problem">
            <div className="block-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
          <div className="info-block solution">
            <div className="block-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Рішення
            </div>
            <p>{step.solution.text}</p>
          </div>
        )}
        {step.note && (
          <div className="info-block hint">
            <div className="block-label">💡 Підказка</div>
            <p>{step.note.text}</p>
          </div>
        )}
        {step.action && (
          <div className="info-block solution">
            <div className="block-label">🎯 Дія</div>
            {step.action.steps && (
              <ol className="list-decimal list-inside space-y-1">
                {step.action.steps.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            {step.action.result && <p><strong>Результат:</strong> {step.action.result}</p>}
          </div>
        )}
        {step.result && (
          <div className="info-block solution">
            <div className="block-label">✅ Результат</div>
            <p>{step.result.text}</p>
          </div>
        )}
        {step.tryYourself && (
          <div className="info-block hint">
            <div className="block-label">🚀 Спробуйте самі</div>
            <ol className="list-decimal list-inside space-y-1">
              {step.tryYourself.steps.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        )}
        {step.congratulations && (
          <div className="finish-message">
            <div className="finish-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3>{step.congratulations.text}</h3>
          </div>
        )}
        {step.message && (
          <div className="info-block hint">
            <div className="block-label">📚 Повідомлення</div>
            <p>{step.message.text}</p>
          </div>
        )}
        {step.spoiler && (
          <div className="info-block hint">
            <div className="block-label">💡 Спойлер</div>
            <p>{step.spoiler.text}</p>
          </div>
        )}
        {step.tip && (
          <div className="info-block hint">
            <div className="block-label">⚡ Підказка</div>
            <p>{step.tip.text}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {!isOpen && (
        <button className="guide-trigger-btn" onClick={() => toggleGuide(true)} title="Відкрити гайд">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Почати Гайд</span>
        </button>
      )}

      <aside className={`guide-panel ${isOpen ? 'open' : ''}`} aria-label="Панель навчання">
        <div className="guide-header">
          <div className="guide-title">
            <h3>Навчання Strukt</h3>
            <span className="step-indicator">
              Крок <span>{currentStep + 1}</span> з {totalSteps}
            </span>
          </div>
          <button className="icon-btn" onClick={() => toggleGuide(false)} aria-label="Згорнути гайд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="guide-content">
          {guideSteps.map((step, index) => (
            <div key={step.id} className={`step ${index === currentStep ? 'active' : ''}`} data-step={index + 1}>
              {renderStepContent(step)}
            </div>
          ))}
        </div>

        <div className="guide-footer">
          <button className="nav-btn" onClick={handlePrev} disabled={currentStep === 0}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Назад
          </button>
          <button className="nav-btn primary" onClick={handleNext}>
            {currentStep === totalSteps - 1 ? 'Завершити' : 'Далі'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
};
