import type { PropsWithChildren } from "react"

export const ItemLayout = ({ children, className, onClick }: PropsWithChildren & { className?: string, onClick?: () => void }) => {
    return (
        <div
            onClick={onClick} className={`w-full min-h-12 md:min-h-10 ${className}`}>
            {children}
        </div>
    )
}