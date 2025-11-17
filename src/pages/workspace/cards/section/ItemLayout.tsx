import store from "@/state/store"
import type { PropsWithChildren } from "react"

export const ItemLayout = ({children, filled, className, onClick} : PropsWithChildren & {className?: string, filled?: boolean, onClick?: () => void}) => {
    const mode = store.use.mode()
    
    return (
        <div onClick={onClick} className={`duration-150 w-full min-h-14 border-b-1 border-neutral-300 dark:border-neutral-700 ${filled && mode && "hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"} ${className}`}>
            {children}
        </div>
    )
}