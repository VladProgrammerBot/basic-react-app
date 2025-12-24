import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";

export const InputForm = ({ placeholder, defaultValue, cancelFunc, submitFunc, submitTitle }: {
    placeholder?: string
    submitTitle: string
    defaultValue?: string
    cancelFunc: () => void
    submitFunc: (value: string, ref: number | null) => void
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (defaultValue && ref.current)
            ref.current.value = defaultValue
        ref.current?.focus()
    }, [])

    const submit = () => {
        setIsLoading(true)
        ref.current && submitFunc(ref.current.value, null)
    }

    return (
        <div className={`pl-4 pr-2 w-full`} onKeyDown={(e) => {
            e.key === "Enter" ? submit() :
                e.key === "Escape" ? cancelFunc() : null
        }
        }>
            <div className="flex pl-4">
                <textarea ref={ref} placeholder={placeholder ?? "Enter text"} className="px-4 pb-2 mt-2 w-full min-h-20 mb-2 outline-none resize-none" />
            </div>
            <div className="flex justify-end gap-2 pb-2">
                <Button onClick={cancelFunc} variant={"ghost"}>Cancel</Button>
                <Button onClick={submit}>{isLoading && <span className="auth-loader"></span>}{submitTitle}</Button>
            </div>
        </div>
    )
}