import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoAddOutline, IoAirplane } from "react-icons/io5";
import { useFolders } from "@/hooks/useFolders";

export const ItemMenu = ({data, openMenu}: {data: folder, openMenu: number | null}) => {
    const itemStyles =
        "bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-700 duration-150 flex-1 flex gap-2 items-center justify-center";

    const { removeFolder } = useFolders()

    return (
        <div
            className={`w-0 min-w-0 duration-300 overflow-x-hidden flex absolute h-full right-0 dark:text-white text-lg shadow-sm shadow-neutral-500 dark:shadow-neutral-950 ${openMenu === data.id && "w-60 min-w-60"
                }`}
        >
            <div
                className={itemStyles}
            >
                <IoAddOutline />
            </div>
            <div
                className={itemStyles}
            >
                <IoAirplane />
            </div>
            <div
                className={itemStyles}
            >
                <FaAngleUp />
            </div>
            <div
                className={itemStyles}
            >
                <FaAngleDown />
            </div>
            <div
                onClick={() => data.childrens.length === 0 && removeFolder(data.id, data.parent)}
                className={itemStyles}
            >
                <RiDeleteBinLine />
            </div>
        </div>
    )
}