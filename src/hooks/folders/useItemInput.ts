import { useEffect, useRef } from "react";
import store from "@/state/store";

export const useItemInput = ({
  submitFunction,
}: {
  submitFunction: (title: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setMode = store.use.setMode();
  const setRenameBuffer = store.use.setRenameBuffer();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    submitFunction(inputRef.current?.value || "");
    setMode("normal")
  };

  const handleCancel = () => {
    setMode("normal")
    setRenameBuffer(null)
  }

  return { handleKeyDown, handleSubmit, handleCancel, inputRef };
};
