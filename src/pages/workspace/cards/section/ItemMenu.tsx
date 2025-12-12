import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
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
                        setBuffer(data.id, data.parent ?? 0)
                    }}>
                    <MdOutlineShortcut /> Cut {"(move)"}
                    <DropdownMenuShortcut>m</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                    disactive={index === 0}
                    onClick={() => replaceFolders(data.id, 1)}
                >
                    <IoIosArrowUp /> Move Up
                    <DropdownMenuShortcut>shift+k</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                    disactive={index === childrensId.length - 1}
                    onClick={() => replaceFolders(data.id, -1)}
                >
                    <IoIosArrowDown /> Move Down
                    <DropdownMenuShortcut>shift+j</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        addFolder(data.title + " (ref)", data.id)
                    }} className="flex">
                    <PiLinkSimpleBold /> Create Link
                    <DropdownMenuShortcut>r</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => copyMarkdown(data.id)}
                    className="flex"
                >
                    <MdContentCopy /> Copy Markdown
                    <DropdownMenuShortcut>shift+c</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setRenameBuffer(data.id)
                    }}>
                    <LuPencil />
                    Edit
                    <DropdownMenuShortcut>e</DropdownMenuShortcut>
                </DropdownMenuItem>
                <AlertDialog>
                    <AlertDialogTrigger
                        onClick={() => data.childrens.length === 0 && removeFolder(data.id)}
                        className={ItemStyle + "flex justify-between dark:hover:bg-neutral-700 hover:bg-neutral-200 w-full"}>
                        <p className="flex items-center gap-4"><RiDeleteBinLine />Remove</p>
                        <DropdownMenuShortcut>shift+d</DropdownMenuShortcut>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the folder and the contents inside.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <DropdownMenuItem className="w-fit" onClick={() => removeFolder(data.id)} isStyled={false}><AlertDialogAction>Remove</AlertDialogAction></DropdownMenuItem>
                            <DropdownMenuItem className="w-fit" isStyled={false}><AlertDialogCancel>Cancel</AlertDialogCancel></DropdownMenuItem>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}