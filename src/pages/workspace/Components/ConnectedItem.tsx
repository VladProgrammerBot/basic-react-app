import { HiArrowTurnDownRight, HiArrowTurnRightDown } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ItemContextMenu } from "../ui-elements/ContextMenu";
import { useItem } from "@/hooks/folders/useItem";
import store from "@/state/store";
import { useState, useRef, useEffect } from "react";
import { Input } from "../ui-elements/ItemInput";

export const ConnectedItem = ({
  data,
  index,
}: {
  data: folder;
  index: number;
}) => {
  const selectedItemId = store.use.selectedItemId();
  const { backlinks, childrens, title, id } = data;
  const designMode = store.use.designMode();
  const { moveInto, renameFolder } = useItem();
  const inputRef = useRef<HTMLInputElement>(null);
  const renameBuffer = store.use.renameBuffer();
  const mode = store.use.mode();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const longTouchTimer = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    longTouchTimer.current = window.setTimeout(() => {
      e.preventDefault();
      setDropdownOpen(true);
    }, 300); // 500ms for long touch
  };

  const handleTouchEnd = () => {
    if (longTouchTimer.current) {
      clearTimeout(longTouchTimer.current);
      longTouchTimer.current = null;
    }
  };

  const handleTouchMove = () => {
    if (longTouchTimer.current) {
      clearTimeout(longTouchTimer.current);
      longTouchTimer.current = null;
    }
  };

  const backlinksNumber = backlinks.length !== 0 && (
    <>
      {backlinks.length}
      {designMode !== "Minimalistic" && <HiArrowTurnDownRight />}
    </>
  );

  const relationsNumber = childrens.length !== 0 && (
    <>
      {designMode !== "Minimalistic" && <HiArrowTurnRightDown />}
      {childrens.length}
    </>
  );

  useEffect(() => {
    if (renameBuffer === id && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renameBuffer, id]);

  const text =
    renameBuffer === id ? (
      <Input submitFunction={renameFolder} placeholder="Rename folder" defaultValue={title} />
    ) : (
      <p className="flex-1 py-2 px-2">{title}</p>
    );

  return (
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={(open) => !open && setDropdownOpen(false)}
    >
      <DropdownMenuTrigger asChild>
        <div>
          <li
            onClick={() => !renameBuffer && moveInto(id, index)}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDropdownOpen(true);
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className={`flex items-center py-1 lg:py-0 px-2 ${selectedItemId === index && mode !== "Backlinks" ? "bg-neutral-600" : "hover:bg-neutral-600 bg-neutral-700"}  duration-150 cursor-default w-full rounded-xl select-none`}
          >
            <span className="text-sm text-neutral-400 flex items-center">
              {backlinksNumber}
            </span>
            {text}
            <span className="text-sm text-neutral-400 flex items-center">
              {relationsNumber}
            </span>
          </li>
        </div>
      </DropdownMenuTrigger>
      <ItemContextMenu data={data} index={index} />
    </DropdownMenu>
  );
};
