import { Button } from "@/components/ui/button";
import { RiGeminiFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useFolders } from "@/hooks/folders/useFolders";
import store from "@/state/store";

export const InputForm = ({
  placeholder,
  defaultValue,
  cancelFunc,
  submitFunc,
  submitTitle,
  border = true,
}: {
  border?: boolean;
  placeholder?: string;
  submitTitle: string;
  defaultValue?: string;
  cancelFunc: () => void;
  submitFunc: (value: string, ref: number | null) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { generateFolders } = useFolders();
  const mode = store.use.mode();

  useEffect(() => {
    if (defaultValue && ref.current) ref.current.value = defaultValue;
    ref.current?.focus();
  }, []);

  const submit = () => {
    setIsLoading(true);
    ref.current && submitFunc(ref.current.value, null);
  };

  return (
    <div
      className={`pl-4 pr-1 pb-1 w-full ${border && "border-1 backdrop-blur-sm dark:border-white/20 border-neutral-400 rounded-md"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submit();
        } else if (e.key === "Escape") {
          cancelFunc();
        }
      }}
    >
      <div className="flex pl-4">
        <textarea
          ref={ref}
          placeholder={placeholder ?? "Enter info or prompt"}
          className="px-4 pb-2 mt-2 w-full min-h-20 mb-2 outline-none resize-none"
        />
      </div>
      <div className="flex justify-end gap-1">
        <Button onClick={cancelFunc} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={submit}>{submitTitle}</Button>
        {mode === "Add Folder" && (
          <Button
            onClick={() => {
              generateFolders(ref.current?.value || "");
              setIsLoading(true);
            }}
            size={"icon"}
          >
            {isLoading ? (
              <span className="auth-loader"></span>
            ) : (
              <RiGeminiFill />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
