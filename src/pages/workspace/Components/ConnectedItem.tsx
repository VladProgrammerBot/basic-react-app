import { HiArrowTurnDownRight, HiArrowTurnRightDown } from "react-icons/hi2";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ItemContextMenu } from "../ui-elements/ContextMenu";
import { useItem } from "@/hooks/folders/useItem";
import store from "@/state/store";
import { useState, useRef, useEffect } from "react";

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
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameBuffer = store.use.renameBuffer();
  const setRenameBuffer = store.use.setRenameBuffer();
  const mode = store.use.mode();

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

  const handleSubmit = () => {
    if (editValue.trim() && editValue !== title) {
      renameFolder(editValue);
    }
    setRenameBuffer(null);
  };

  const handleCancel = () => {
    setEditValue(title);
    setRenameBuffer(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  useEffect(() => {
    if (renameBuffer === id && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renameBuffer, id]);

  const text =
    renameBuffer === id ? (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleCancel}
        className="flex-1 py-2 px-2 bg-neutral-800 text-white outline-none rounded"
        onClick={(e) => e.stopPropagation()}
      />
    ) : (
      <p className="flex-1 p-2 px-2">{title}</p>
    );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <li
          onClick={() => moveInto(id, index)}
          className={`flex items-center py-1 lg:py-0 pl-2 ${selectedItemId === index && mode !== "Backlinks" ? "bg-neutral-600" : "hover:bg-neutral-600 bg-neutral-700"}  duration-150 cursor-pointer w-full rounded-xl`}
        >
          <span className="text-sm text-neutral-400 flex items-center">
            {backlinksNumber}
          </span>
          {text}
          <span className="text-sm p-2 text-neutral-400 flex items-center">
            {relationsNumber}
          </span>
        </li>
      </ContextMenuTrigger>
      <ItemContextMenu data={data} index={index} />
    </ContextMenu>
  );
};
