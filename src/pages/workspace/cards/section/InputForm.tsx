import { Button } from "@/components/ui/button"
import store from "@/state/store";
import { useEffect, useRef } from "react";

export const InputForm = ({ defaultValue, cancelFunc, submitFunc, submitTitle }: {
    submitTitle: string
    defaultValue?: string
    cancelFunc: () => void
    submitFunc: (value: string, ref: number | null) => void
}) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const childrensId = store.use.childrensId()

    useEffect(() => {
        if (defaultValue && ref.current)
            ref.current.value = defaultValue
        ref.current?.focus()
    }, [])

    return (
        <div className={`p-2 w-full ${childrensId.length !== 0 && "border-t-1"} border-neutral-700`}>
            <textarea ref={ref} placeholder="Enter text" className="px-4 py-2 w-full mb-2 outline-none resize-none" />
            <div className="flex justify-end gap-2">
                <Button onClick={cancelFunc} variant={"outline"}>Cancel</Button>
                {/* <Button><RiGeminiFill />Ai generation</Button> */}
                <Button onClick={() => ref.current && submitFunc(ref.current.value, null)}>{submitTitle}</Button>
            </div>
        </div>
    )
}