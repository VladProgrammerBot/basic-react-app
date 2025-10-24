import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemLayout } from "./ItemLayout";
import { ItemMenu } from "./ItemMenu";

export function SortableItem({
  data
}: {
  data: folder;
}) {
  const { moveInto } = useFolders();
  const { openMenu, setMenuValue } = stateFolders();
  

  return (
    <ItemLayout
      filled
      className={`px-3 flex ${
        openMenu !== data.id && "hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-150"}
      `}
    >
      <div
        className={`flex py-2 relative items-center space-x-2 w-full`}
        onClick={() => {
          if (openMenu !== data.id) {
            setMenuValue(null);
            moveInto(data.id);
          }
        }}
        onContextMenu={() => setMenuValue(data.id)}
      >
        <div className="text-neutral-400 dark:text-neutral-700 w-8 min-w-8 text-center">
          {data && data?.childrens.length > 0 && data.childrens.length}
        </div>
        <p
          className={`text-black dark:text-neutral-200 duration-300 ${
            openMenu === data.id && "opacity-50"
          }`}
        >
          {data?.title}
        </p>
        
      <ItemMenu openMenu={openMenu} data={data} />
      </div>
      <div
        onClick={() => setMenuValue(openMenu === data.id ? null : data.id)}
        className="text-lg px-1 text-black dark:text-white flex items-center"
      >
        <BsThreeDotsVertical />
      </div>
    </ItemLayout>
  );
}
