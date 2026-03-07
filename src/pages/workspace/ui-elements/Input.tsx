import { Button } from "./Button";
import { Hotkey } from "./HotKeyTip";
import { useState, useRef, useEffect } from "react";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import store from "@/state/store";

interface InputProps {
  mode?: string;
  submitFunction?: (title: string) => Promise<void>;
  placeholder?: string;
  hotkey?: string;
  setModeOnFocus?: string;
  setModeOnBlur?: string;
}

export const Input = ({
  mode: propMode,
  submitFunction,
  placeholder = "Add note and connect to it",
  hotkey,
  setModeOnFocus = "Add Folder",
  setModeOnBlur = "normal",
}: InputProps = {}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFolder } = useFolderManipulation();
  const globalMode = store.use.mode();
  const setGlobalMode = store.use.setMode();
  const designMode = store.use.designMode();

  const mode = propMode || globalMode;
  const handleSubmitFn = submitFunction || addFolder;

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      // Call the provided submit function or default addFolder
      await handleSubmitFn(inputValue);
      setInputValue(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error adding folder:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
      setInputValue("");
    }
  };

  useEffect(() => {
    if (mode === setModeOnFocus) {
      inputRef.current?.focus();
    }
  }, [mode, setModeOnFocus]);

  return (
    <div className="border border-white/20 rounded-xl border-dashed flex items-center w-full pr-1">
      {hotkey && <Hotkey className="ml-2" is={hotkey} />}
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={() => setGlobalMode(setModeOnFocus as any)}
        onBlur={() => setGlobalMode(setModeOnBlur as any)}
        disabled={isLoading}
        className="outline-none w-full placeholder:text-white/30 px-4 py-2 flex-1 disabled:opacity-50"
        placeholder={placeholder}
      />
      {designMode !== "Minimalistic" && (
        <Button
          onClick={handleButtonClick}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? "..." : "+"}
          <Hotkey is="Enter" />
        </Button>
      )}
    </div>
  );
};
