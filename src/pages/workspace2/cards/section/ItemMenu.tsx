import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { MdOutlineShortcut, MdContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useChildrens } from "@/hooks/folders/useChildrens";
import { FaLink, FaLinkSlash } from "react-icons/fa6";

export const ItemMenu = ({ data, index }: { data: folder; index: number }) => {
  const { removeFolder, replaceFolders, copyMarkdown, handleRemoveConnection } =
    useFolderManipulation();
  const { setBuffer, setRenameBuffer } = store();
  const childrensId = useChildrens();
  const path = store.use.path();
  const setIdForNewConnection = store.use.setIdForNewConnection();

  const parentId = path[path.length - 1]?.id ?? 0;
  const isFirst = index === 0;
  const isLast = index === childrensId.length - 1;

  const menuActions = [
    {
      icon: <IoIosArrowUp />,
      label: "Move Up",
      shortcut: "shift+k",
      onClick: () => replaceFolders(data.id, 1),
      disabled: isFirst,
    },
    {
      icon: <IoIosArrowDown />,
      label: "Move Down",
      shortcut: "shift+j",
      onClick: () => replaceFolders(data.id, -1),
      disabled: isLast,
    },
    {
      icon: <FaLink />,
      label: "Connect to another item",
      shortcut: "r",
      onClick: () => setBuffer(data.id, parentId),
    },
    {
      icon: <FaLinkSlash />,
      label: "Disconnect this item",
      shortcut: "shift+d",
      onClick: () => handleRemoveConnection(data.id),
    },
    {
      icon: <MdOutlineShortcut />,
      label: "Connect this to another",
      shortcut: "m",
      onClick: () => setIdForNewConnection(data.id),
    },
    {
      icon: <MdContentCopy />,
      label: "Copy Markdown",
      shortcut: "shift+c",
      onClick: () => copyMarkdown(data.id),
    },
    {
      icon: <LuPencil />,
      label: "Edit text",
      shortcut: "e",
      onClick: () => setRenameBuffer(data.id),
    },
    {
      icon: <RiDeleteBinLine />,
      label: "Delete item",
      shortcut: "shift+d",
      onClick: () => removeFolder(data.id),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group-hover/item:opacity-100 md:opacity-0 flex items-center text-lg text-neutral-500 outline-none cursor-pointer pl-3 pr-4 py-2 hover:text-black dark:hover:text-white transition-all duration-150">
          <BsThreeDotsVertical />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="left"
        sideOffset={0}
        align="start"
        alignOffset={-10}
      >
        {menuActions.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            disabled={item.disabled}
            className="flex items-center gap-4"
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
