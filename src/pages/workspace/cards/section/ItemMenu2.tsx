import { RiDeleteBinLine } from "react-icons/ri";
import { useFolders } from "@/hooks/useFolders";
import { MdOutlineShortcut } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import store from "@/state/store";
import { FiLink } from "react-icons/fi";

export const ItemMenu2 = ({ data }: { data: folder }) => {
    const itemStyles =
        "dark:hover:bg-neutral-700 duration-150 hover:bg-neutral-300 flex-1 flex gap-2 items-center justify-center";

    const { removeFolder, addFolder } = useFolders()
    const { setBuffer, openMenu, setMenuValue, setRenameBuffer } = store()

    return (
        <div
            className={`rounded-l-4xl bg-neutral-100 dark:bg-neutral-800 w-0 min-w-0 duration-300 overflow-x-hidden flex absolute h-full right-0 dark:text-white text-lg ${openMenu === data.id && "min-w-50"
                }`}
        >
            <div
                className={itemStyles + " pl-2"}
                onClick={() => {
                    setMenuValue(null)
                    addFolder(data.title + " (ref)", data.id)
                }}
            >
                <FiLink />
            </div>
            <div
                className={itemStyles}
                onClick={() => {
                    setMenuValue(null)
                    setRenameBuffer(data.id)
                }}
            >
                <LuPencil />
            </div>
            <div
                onClick={() => {
                    setBuffer(data.id, data.parent)
                    setMenuValue(null)
                }}
                className={itemStyles}
            >
                <MdOutlineShortcut />
            </div>
            {/* <div
                className={itemStyles}
            >
                <FaAngleUp />
            </div>
            <div
                className={itemStyles}
            >
                <FaAngleDown />
            </div> */}
            <div
                onClick={() => data.childrens.length === 0 && removeFolder(data.id, data.parent)}
                className={itemStyles + (data.childrens.length !== 0 ? " text-neutral-500 cursor-auto" : "")}
            >
                <RiDeleteBinLine />
            </div>
        </div>
    )
}