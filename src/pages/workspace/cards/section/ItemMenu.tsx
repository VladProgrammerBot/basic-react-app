import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import store from "@/state/store";
import { FiLink } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { MdOutlineShortcut } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { MdContentCopy } from "react-icons/md";

export const ItemMenu = ({ data, index }: { data: folder, index: number }) => {
    const { removeFolder, addFolder, replaceFolders, copyMarkdown } = useFolderManipulation()
    const { setBuffer, setRenameBuffer, childrensId } = store()

    return (
        <DropdownMenu>
            <div
                className={`text-lg text-black group-hover/item:opacity-100 md:opacity-0 duration-150 dark:text-white flex items-center`}
            >
                <DropdownMenuTrigger className="outline-none cursor-pointer pl-3 pr-4 py-4">
                    <BsThreeDotsVertical />
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent side="left" sideOffset={0} align="start" alignOffset={-10}>
                <DropdownMenuItem
                    onClick={() => {
                        setBuffer(data.id, data.parent)
                    }}>
                    <MdOutlineShortcut /> Move To
                </DropdownMenuItem>
                <DropdownMenuItem
                    disactive={index === 0}
                    onClick={() => replaceFolders(data.id, 1)}
                >
                    <IoIosArrowUp /> Move Up
                </DropdownMenuItem>
                <DropdownMenuItem
                    disactive={index === childrensId.length - 1}
                    onClick={() => replaceFolders(data.id, -1)}
                >
                    <IoIosArrowDown /> Move Down
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        addFolder(data.title + " (ref)", data.id)
                    }} className="flex">
                    <FiLink /> Create Link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => copyMarkdown(data.id)}
                    disactive={data.childrens.length === 0}
                    className="flex"
                >
                    <MdContentCopy /> Copy Markdown
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setRenameBuffer(data.id)
                    }}>
                    <LuPencil />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => removeFolder(data.id, data.parent)}
                >
                    <RiDeleteBinLine /> Remove
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}