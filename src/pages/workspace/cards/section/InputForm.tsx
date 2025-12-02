import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";

export const InputForm = ({ placeholder, defaultValue, cancelFunc, submitFunc, submitTitle }: {
    placeholder?: string
    submitTitle: string
    defaultValue?: string
    cancelFunc: () => void
    submitFunc: (value: string, ref: number | null) => void
}) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (defaultValue && ref.current)
            ref.current.value = defaultValue
        ref.current?.focus()
    }, [])

    return (
        <div className={`px-4 w-full`}>
            <div className="flex pl-4">
                <textarea ref={ref} placeholder={placeholder ?? "Enter text"} className="px-4 py-2 w-full mb-2 outline-none resize-none" />
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={cancelFunc} variant={"outline"}>Cancel</Button>
                <Button onClick={() => {
                    setIsLoading(true)
                    ref.current && submitFunc(ref.current.value, null)
                }}>{isLoading && <span className="auth-loader"></span>}{submitTitle}</Button>
            </div>
        </div>
    )
}