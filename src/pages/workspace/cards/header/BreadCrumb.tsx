import { usePath } from "@/hooks/folders/usePath";

export const Breadcrumb = ({ elem, index, current, className, maxLen }: { maxLen?: number, elem: folder, index: number, current?: boolean, className?: string }) => {
    const { moveOut } = usePath();
    const maxLength = maxLen ?? 8;

    return (
        <div
            onClick={() => !current && moveOut(elem.childrens, index)}
            className={`${!current && "text-neutral-500 rounded-md dark:text-neutral-500 ark:hover:text-white"} ${!current
                ? "duration-150 cursor-pointer hover:underline"
                : "dark:text-white"
                } ${className}`}
        >
            {elem.title.length > maxLength
                ? elem.title.slice(0, maxLength) + ".."
                : elem.title}
        </div>
    )
}