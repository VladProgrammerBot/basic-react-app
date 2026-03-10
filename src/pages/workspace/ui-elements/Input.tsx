import { Button } from "./Button";
import { Hotkey } from "./HotKeyTip";
import { useState, useRef, useEffect } from "react";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import store from "@/state/store";
import type { mode } from "@/types/storeTypes";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

interface InputProps {
  mode?: string;
  submitFunction?: (title: string) => Promise<void>;
  placeholder?: string;
  hotkey?: string;
  setModeOnFocus?: string;
  setModeOnBlur?: string;
}

export const Input = ({
  submitFunction,
  placeholder = "Add note and connect to it",
  setModeOnFocus = "Add Folder",
  setModeOnBlur = "normal",
}: InputProps = {}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFolder } = useFolderManipulation();
  const setGlobalMode = store.use.setMode();
  const designMode = store.use.designMode();

  const handleSubmitFn = submitFunction || addFolder;

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      await handleSubmitFn(inputValue);
      setInputValue("");
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
    inputRef.current?.focus();
  }, []);

  return (
    <div className="border border-neutral-700 rounded-xl border-dashed flex items-center w-full pr-1 py-1 lg:py-0">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={() => setGlobalMode(setModeOnFocus as mode)}
        // onBlur={() => setGlobalMode(setModeOnBlur as any)}
        disabled={isLoading}
        className="outline-none w-full placeholder:text-white/30 px-4 py-2 flex-1 disabled:opacity-50"
        placeholder={placeholder}
      />
      {designMode !== "Minimalistic" && (
        <>
          <Button onClick={handleButtonClick} className="py-3  mr-1">
            <IoMdAdd />
            <Hotkey is="Enter" />
          </Button>
          <Button
            onClick={() => setGlobalMode(setModeOnBlur as mode)}
            className="py-3"
          >
            <IoClose />
            <Hotkey is="Esc" />
          </Button>
        </>
      )}
    </div>
  );
};
