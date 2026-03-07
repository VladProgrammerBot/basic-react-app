import { RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { MdContentCopy, MdOutlineShortcut } from "react-icons/md";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { ReactNode } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useChildrens } from "@/hooks/folders/useChildrens";

interface contextMenu {
  icon: ReactNode;
  label: string;
  shortcut: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ItemContextMenu = ({
  data,
  index,
}: {
  data: folder;
  index: number;
}) => {
  const { removeFolder, replaceFolders, copyMarkdown, handleRemoveConnection } =
    useFolderManipulation();
  const { setBuffer, setRenameBuffer } = store();
  const childrensId = useChildrens();
  const path = store.use.path();

  const parentId = path[path.length - 1]?.id ?? 0;
  const isFirst = index === 0;
  const isLast = index === childrensId.length - 1;

  const menuActions: contextMenu[] = [
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
      onClick: () => setBuffer(data.id, null),
    },
    {
      icon: <FaLinkSlash />,
      label: "Disconnect this item",
      shortcut: "d",
      onClick: () => handleRemoveConnection(data.id),
    },
    {
      icon: <MdOutlineShortcut />,
      label: "Reconnect to another",
      shortcut: "m",
      onClick: () => setBuffer(data.id, parentId),
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
    <DropdownMenuContent>
      {menuActions.map(({ label, shortcut, icon, onClick, disabled }) => {
        return (
          <DropdownMenuItem
            key={shortcut}
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-4"
            disactive={disabled}
          >
            {icon}
            <span className="flex-1">{label}</span>
            <DropdownMenuShortcut className="max-lg:hidden">
              {shortcut}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  );
};
