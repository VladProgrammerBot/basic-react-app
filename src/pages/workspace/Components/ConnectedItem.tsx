import { HiArrowTurnDownRight, HiArrowTurnRightDown } from "react-icons/hi2";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ItemContextMenu } from "../ui-elements/ContextMenu";
import { useItem } from "@/hooks/folders/useItem";
import store from "@/state/store";

export const ConnectedItem = ({
  data,
  index,
}: {
  data: folder;
  index: number;
}) => {
  const selectedItemId = store.use.selectedItemId()
  const { backlinks, childrens, title, id } = data;
  const isMinimalist = false;
  const { moveInto } = useItem();

  const backlinksNumber = backlinks.length !== 0 && (
    <>
      {backlinks.length}
      {!isMinimalist && <HiArrowTurnDownRight />}
    </>
  );

  const relationsNumber = childrens.length !== 0 && (
    <>
      {!isMinimalist && <HiArrowTurnRightDown />}
      {childrens.length}
    </>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <li
          onClick={() => moveInto(id, index)}
          className={`flex items-center pl-2 ${selectedItemId === index ? "bg-neutral-600" : "hover:bg-neutral-600 bg-neutral-700"}  duration-150 cursor-pointer w-full rounded-xl`}
        >
          <span className="text-sm text-neutral-400 flex items-center">
            {backlinksNumber}
          </span>
          <p className="flex-1 p-2 px-2">{title}</p>
          <span className="text-sm p-2 text-neutral-400 flex items-center">
            {relationsNumber}
          </span>
        </li>
      </ContextMenuTrigger>
      <ItemContextMenu />
    </ContextMenu>
  );
};
