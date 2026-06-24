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
import { useLongTouch } from "@/hooks/folders/useLongTouch";

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
  const { longTouchTrigger } = useLongTouch(() => setDropdownOpen(true));

  const backlinksNumber = backlinks.length !== 0 && (
    <>
      {backlinks.length}
      {designMode !== "Minimalistic" && <HiArrowTurnDownRight />}
    </>
  );

  useEffect(() => {
    if (renameBuffer === id && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renameBuffer, id]);

  const relationsNumber = childrens.length !== 0 && (
    <>
      {designMode !== "Minimalistic" && <HiArrowTurnRightDown />}
      {childrens.length}
    </>
  );

  return (
    <div>
      {renameBuffer === id ? (
        <Input
          submitFunction={renameFolder}
          placeholder="Rename folder"
          defaultValue={title}
        />
      ) : (
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={(open) => !open && setDropdownOpen(false)}
        >
          <DropdownMenuTrigger asChild>
            <li
              onClick={() => !renameBuffer && moveInto(id, index)}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDropdownOpen(true);
              }}
              {...longTouchTrigger}
              className={`flex items-center py-1 lg:py-0 px-2 ${selectedItemId === index && mode !== "Backlinks" ? "bg-neutral-700" : "hover:bg-neutral-700 g-neutral-700"}  duration-150 cursor-default w-full rounded-xl select-none`}
            >
              <span className="text-sm text-neutral-400 flex items-center">
                {backlinksNumber}
              </span>
              <p className="flex-1 py-2 px-2">{title}</p>
              <span className="text-sm text-neutral-400 flex items-center">
                {relationsNumber}
              </span>
            </li>
          </DropdownMenuTrigger>
          <ItemContextMenu data={data} index={index} />
        </DropdownMenu>
      )}
    </div>
  );
};
