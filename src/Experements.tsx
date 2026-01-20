import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Додає підтримку списків, таблиць, чекбоксів
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { guideMarkdownSteps } from "@/GuideMarkdown";
import { Button } from "./components/ui/button";
// import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export const Experements: React.FC = () => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [viewedSteps, setViewedSteps] = useState<number>(0);

  // const guideMarkdown = guideMarkdownSteps[currentStep];

  useEffect(() => {
    if (viewedSteps <= currentStep) {
      setDisplayedText("");
      setCurrentIndex(0);
    } else {
      setDisplayedText(guideMarkdownSteps[currentStep]);
      setCurrentIndex(guideMarkdownSteps[currentStep].length);
    }
  }, [currentStep]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (currentIndex < guideMarkdownSteps[currentStep].length) {
      // 1. Визначаємо затримку
      const getDelay = () => {
        const char = guideMarkdownSteps[currentStep][currentIndex - 1]; // Символ, що щойно з'явився

        if (char === "." || char === "!" || char === "?") return 80; // Довга пауза в кінці речення
        if (char === "," || char === ":" || char === ";") return 40; // Середня пауза
        if (char === "\n") return 100; // Пауза на нових рядках

        return 20; // Стандартна швидкість для звичайних літер
      };

      const timeout = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + guideMarkdownSteps[currentStep][currentIndex]
        );
        setCurrentIndex((prev) => prev + 1);
      }, getDelay());

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, guideMarkdownSteps[currentStep]]);

  return (
    <div className="h-full w-full fixed max-w-lg p-2 left-0">
      <div className="h-full relative flex flex-col mx-auto bg-white dark:bg-white/5 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-white/20">
        {/* <Button className="w-fit" size={"icon"}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </Button> */}
        <div className="prose overflow-y-scroll flex-1 prose-slate p-4 dark:prose-invert max-w-none">
          <ReactMarkdown
            // remarkGfm дозволяє краще розпізнавати списки та таблиці
            remarkPlugins={[remarkGfm]}
            components={{
              // Виправляємо відображення параграфів, щоб вони зберігали відступи
              p: ({ children }) => (
                <p className="mb-4 whitespace-pre-wrap">{children}</p>
              ),
              // Налаштування списків
              ul: ({ children }) => (
                <ul className="list-disc ml-6 mb-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-6 mb-4">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="my-4 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      style={isDarkMode ? oneDark : oneLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-pink-500"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {displayedText}
          </ReactMarkdown>

          {currentIndex < guideMarkdownSteps[currentStep].length && (
            <span className="inline-block w-2 h-5 ml-1 bg-blue-500 animate-pulse align-middle" />
          )}
        </div>
        <div className="flex justify-between pt-4">
          {currentStep > 0 ? (
            <Button onClick={() => setCurrentStep((prev) => prev - 1)}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {currentIndex < guideMarkdownSteps[currentStep].length ? (
            <Button
              onClick={() => {
                setCurrentIndex(guideMarkdownSteps[currentStep].length);
                setDisplayedText(guideMarkdownSteps[currentStep]);
              }}
            >
              Skip
            </Button>
          ) : currentStep < guideMarkdownSteps.length - 1 ? (
            <Button
              onClick={() => {
                setCurrentStep((prev) => prev + 1);
                setViewedSteps((prev) => prev + 1);
              }}
            >
              Next
            </Button>
          ) : (
            <Button>Finish</Button>
          )}
        </div>
      </div>
    </div>
  );
};
