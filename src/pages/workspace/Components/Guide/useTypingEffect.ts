import { useState, useEffect } from "react";

interface UseTypingEffectProps {
  text: string;
  currentStep: number;
  viewedSteps: number;
}

export const useTypingEffect = ({
  text,
  currentStep,
  viewedSteps,
}: UseTypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (viewedSteps <= currentStep) {
      setDisplayedText("");
      setCurrentIndex(0);
    } else {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [currentStep, text, viewedSteps]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const getDelay = () => {
        const char = text[currentIndex - 1];

        if (char === "." || char === "!" || char === "?") return 80;
        if (char === "," || char === ":" || char === ";") return 40;
        if (char === "\n") return 100;

        return 20;
      };

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, getDelay());

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  const skipTyping = () => {
    setCurrentIndex(text.length);
    setDisplayedText(text);
  };

  return {
    displayedText,
    isTyping: currentIndex < text.length,
    skipTyping,
  };
};
