import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react";

export const InputForm = ({ defaultValue, cancelFunc, submitFunc, submitTitle }: {
    submitTitle: string
    defaultValue?: string
    cancelFunc: () => void
    submitFunc: (value: string) => void
}) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (defaultValue && ref.current)
            ref.current.value = defaultValue
        ref.current?.focus()
    }, [])

    return (
        <div className="p-2 text-end w-full">
            <textarea ref={ref} placeholder="Enter text" className="px-4 py-2 w-full mb-2 outline-none resize-none" />
            <Button onClick={cancelFunc} variant={"outline"} className="mr-2">Cancel</Button>
            <Button onClick={() => ref.current && submitFunc(ref.current.value)}>{submitTitle}</Button>
        </div>
    )
}