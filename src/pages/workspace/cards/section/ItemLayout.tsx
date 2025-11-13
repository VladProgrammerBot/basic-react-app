import type { PropsWithChildren } from "react"

export const ItemLayout = ({children, className, filled, onClick} : PropsWithChildren & {className?: string, filled?: boolean, onClick?: () => void}) => {
    return (
        <div onClick={onClick} className={`hover:bg-neutral-300 dark:hover:bg-neutral-500/10 duration-150 w-full min-h-14 border-b-1 border-neutral-400/20 cursor-pointer ${className}`}>
            {children}
        </div>
    )
}