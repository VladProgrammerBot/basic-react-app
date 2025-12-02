import { usePath } from "@/hooks/folders/usePath";

export const Breadcrumb = ({ elem, index, current, className }: { elem: folder, index: number, current?: boolean, className?: string }) => {
    const { moveOut } = usePath();
    const maxLength = 10;

    return (
        <div
            onClick={() => !current && moveOut(elem, index)}
            className={`${!current && "text-neutral-500 hover:text-black hover:bg-neutral-800 rounded-md dark:text-neutral-500 dark:hover:text-white"} ${!current
                ? "duration-150 cursor-pointer"
                : "dark:text-white"
                } ${className}`}
        >
            {elem.title.length > maxLength
                ? elem.title.slice(0, maxLength) + ".."
                : elem.title}
        </div>
    )
}