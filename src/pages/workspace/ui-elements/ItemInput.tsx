import { Button } from "./Button";
import { Hotkey } from "./HotKeyTip";
import store from "@/state/store";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useItemInput } from "@/hooks/folders/useItemInput";

interface InputProps {
  submitFunction: (title: string) => void;
  placeholder: string;
}

export const Input = ({
  submitFunction,
  placeholder,
}: InputProps) => {
  const { handleKeyDown, handleSubmit, inputRef } = useItemInput({
    submitFunction,
  });
  const designMode = store.use.designMode();
  const setMode = store.use.setMode();

  return (
    <div className="border border-neutral-700 rounded-xl border-dashed flex items-center w-full pr-1 py-1 lg:py-0">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="outline-none w-full placeholder:text-white/30 px-4 py-2 flex-1 disabled:opacity-50"
        placeholder={placeholder}
      />
      {designMode !== "Minimalistic" && (
        <>
          <Button onClick={handleSubmit} className="py-3  mr-1">
            <IoMdAdd />
            <Hotkey is="Enter" />
          </Button>
          <Button onClick={() => setMode("normal")} className="py-3">
            <IoClose />
            <Hotkey is="Esc" />
          </Button>
        </>
      )}
    </div>
  );
};
