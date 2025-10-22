import type { PropsWithChildren } from "react"

export const ItemLayout = ({children, className, filled, onClick} : PropsWithChildren & {className?: string, filled?: boolean, onClick?: () => void}) => {
    return (
        <div onClick={onClick} className={`w-full min-h-14 rounded-4xl cursor-pointer duration-150 ${filled ? "bg-neutral-200 dark:bg-neutral-900" : "border-2 border-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-800 dark:border-neutral-900"} ${className}`}>
            {children}
        </div>
    )
}