import { Button } from "./Button";
import { Hotkey } from "./HotKeyTip";
import { useState, useRef, useEffect } from "react";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import store from "@/state/store";

export const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFolder } = useFolderManipulation();
  const mode = store.use.mode();
  const setMode = store.use.setMode();

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    try {
      // Call addFolder with title and null ref (no reference)
      await addFolder(inputValue, null);
      setInputValue(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error adding folder:", error);
    } finally {
      setIsLoading(false);
    }
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
    if (mode === "Add Folder") {
      inputRef.current?.focus();
    }
  }, [mode]);

  return (
    <div className="border border-white/20 rounded-xl border-dashed flex items-center w-full mt-1 pr-1">
      <Hotkey className="ml-2" is="A" />
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={() => setMode("Add Folder")}
        onBlur={() => setMode("normal")}
        disabled={isLoading}
        className="outline-none w-full placeholder:text-white/30 px-4 py-2 flex-1 disabled:opacity-50"
        placeholder="Add note and connect to it"
      />
      {mode === "Add Folder" && (
        <Button onClick={handleSubmit} disabled={isLoading || !inputValue.trim()}>
          {isLoading ? "..." : "+"}
          <Hotkey is="Enter" />
        </Button>
      )}
    </div>
  );
};
