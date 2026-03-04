import { RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { MdContentCopy, MdOutlineShortcut } from "react-icons/md";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { ReactNode } from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";

export const ItemContextMenu = () => {
  interface contextMenu {
    icon: ReactNode;
    label: string;
    shortcut: string;
  }

  const menuActions = [
    {
      icon: <IoIosArrowUp />,
      label: "Move Up",
      shortcut: "shift+k",
      // onClick: () => replaceFolders(data.id, 1),
      // disabled: isFirst,
    },
    {
      icon: <IoIosArrowDown />,
      label: "Move Down",
      shortcut: "shift+j",
      // onClick: () => replaceFolders(data.id, -1),
      // disabled: isLast,
    },
    {
      icon: <FaLink />,
      label: "Connect to another item",
      shortcut: "r",
      // onClick: () => setBuffer(data.id, parentId),
    },
    {
      icon: <FaLinkSlash />,
      label: "Disconnect from this",
      shortcut: "d",
      // onClick: () => handleRemoveConnection(data.id),
    },
    {
      icon: <MdOutlineShortcut />,
      label: "switch connection",
      shortcut: "m",
      // onClick: () => setIdForNewConnection(data.id),
    },
    {
      icon: <MdContentCopy />,
      label: "Copy Markdown",
      shortcut: "shift+c",
      // onClick: () => copyMarkdown(data.id),
    },
    {
      icon: <LuPencil />,
      label: "Edit text",
      shortcut: "e",
      // onClick: () => setRenameBuffer(data.id),
    },
    {
      icon: <RiDeleteBinLine />,
      label: "Delete item",
      shortcut: "shift+d",
      // onClick: () => removeFolder(data.id),
    },
  ];
  return (
    <ContextMenuContent>
      {menuActions.map(({ label, shortcut, icon }: contextMenu) => {
        return (
          <ContextMenuItem key={shortcut}>
            {icon}
            {label}
            <ContextMenuShortcut className="max-lg:hidden">⌘{shortcut}</ContextMenuShortcut>
          </ContextMenuItem>
        );
      })}
    </ContextMenuContent>
  );
};
