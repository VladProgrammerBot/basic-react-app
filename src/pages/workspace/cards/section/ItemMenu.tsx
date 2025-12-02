import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    ItemStyle,
} from "@/components/ui/dropdown-menu"
import store from "@/state/store";
import { PiLinkSimpleBold } from "react-icons/pi";
import { LuPencil } from "react-icons/lu";
import { MdOutlineShortcut } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { MdContentCopy } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const ItemMenu = ({ data, index }: { data: folder, index: number }) => {
    const { removeFolder, addFolder, replaceFolders, copyMarkdown } = useFolderManipulation()
    const { setBuffer, setRenameBuffer, childrensId } = store()

    return (
        <DropdownMenu>
            <div
                className={`text-lg text-black group-hover/item:opacity-100 md:opacity-0 duration-150 dark:text-white flex items-center`}
            >
                <DropdownMenuTrigger className="outline-none cursor-pointer text-neutral-500 pl-3 pr-4 py-2">
                    <BsThreeDotsVertical />
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent side="left" sideOffset={0} align="start" alignOffset={-10}>
                <DropdownMenuItem
                    onClick={() => {
                        setBuffer(data.id, data.parent)
                    }}>
                    <MdOutlineShortcut /> Cut {"(move)"}
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
                    <PiLinkSimpleBold /> Create Link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => copyMarkdown(data.id)}
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
                <AlertDialog>
                    <AlertDialogTrigger onClick={() => data.childrens.length === 0 && removeFolder(data.id, data.parent)} className={ItemStyle + " dark:hover:bg-neutral-700 hover:bg-neutral-200 w-full"}>
                        <RiDeleteBinLine />Remove</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the folder and the contents inside.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <DropdownMenuItem className="w-fit" isStyled={false}><AlertDialogCancel>Cancel</AlertDialogCancel></DropdownMenuItem>
                            <DropdownMenuItem className="w-fit" onClick={() => removeFolder(data.id, data.parent)} isStyled={false}><AlertDialogAction>Remove</AlertDialogAction></DropdownMenuItem>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}