import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { useEffect, useRef } from "react"

export const ItemRename = ({ title }: { title: string }) => {
    const renameBuffer = store.use.renameBuffer()
    const setRenameBuffer = store.use.setRenameBuffer()

    const ref = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (ref.current)
            ref.current.value = title
    }, [renameBuffer])

    return (
        <div className="w-full py-2 text-end">
            <textarea ref={ref} className="w-full resize-none p-2 outline-none" />
            <Button onClick={() => setRenameBuffer(null)} variant={"outline"} className="mr-2">cancel</Button>
            <Button>rename</Button>
        </div>
    )
}