import { Button } from "@/components/ui/button"
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { useEffect, useRef } from "react";

export const InputForm = ({ }) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const { addFolder } = useFolders()
    const setMode = store(state => state.setMode)

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
        <div className="py-2 text-end w-full">
            <textarea ref={ref} placeholder="Enter text" className="px-4 py-2 w-full mb-2 outline-none resize-none" />
            <Button onClick={() => setMode("normal")} variant={"outline"} className="mr-2">Cancel</Button>
            <Button onClick={() => ref.current && addFolder(ref.current.value)}>+ Add</Button>
        </div>
    )
}