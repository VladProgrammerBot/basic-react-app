import { Button } from "@/components/ui/button"
import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { useEffect, useRef } from "react";

export const InputForm = () => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const { addFolder } = useFolders()
    const { setMode } = stateFolders()

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
        <div className="p-2 text-end">
            <textarea ref={ref} placeholder="Enter text" className="px-4 py-2 w-full mb-2 outline-none   autogrow-textarea resize-none" />
            <Button onClick={() => setMode("normal")} variant={"outline"} className="mr-2">Cancel</Button>
            <Button onClick={() => ref.current && addFolder(ref.current.value)}>+ Add</Button>
        </div>
    )
}