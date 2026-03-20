import { useEffect, useRef } from "react";
import store from "@/state/store";

export const useItemInput = ({
  submitFunction,
}: {
  submitFunction: (title: string) => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const setMode = store.use.setMode();
  const setRenameBuffer = store.use.setRenameBuffer();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow space and other normal typing keys to work in the input
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit();
    }

    if (e.key === "Escape") {
      setRenameBuffer(null)
      setMode("normal")
    }

    // Stop propagation to prevent global keyboard handlers from interfering
    e.stopPropagation();
  };

  const handleSubmit = () => {
    submitFunction(inputRef.current?.value || "");
    handleCancel()
  };

  const handleCancel = () => {
    setMode("normal")
    setRenameBuffer(null)
  }

  return { handleKeyDown, handleSubmit, handleCancel, inputRef };
};
