import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemLayout } from "./ItemLayout";
import { ItemMenu } from "./ItemMenu";
import { IoClose } from "react-icons/io5";
import store from "@/state/store";
import { InputForm } from "./InputForm";
import { useItem } from "@/hooks/folders/useItem";

export function Item({
  data
}: {
  data: folder;
}) {
  const { moveInto, renameFolder } = useItem();
  const openMenu = store.use.openMenu()
  const renameBuffer = store.use.renameBuffer()
  const setMenuValue = store(state => state.setMenuValue)
  const setRenameBuffer = store.use.setRenameBuffer()
  const moveBuffer = store.use.moveBuffer()

  const handleClick = () => {
    if (openMenu !== data.id) {
      setMenuValue(null);
      moveInto(data.id);
    }
  }

  const childrensLength = data && data?.childrens.length > 0 && data.childrens.length

  return (
    <ItemLayout
      filled={renameBuffer !== data.id}
      className={`flex group/item overflow-hidden ${openMenu !== data.id && renameBuffer !== data.id && "hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-150"}
      `}
    >
      {renameBuffer !== data.id ? (
        <>
          <div
            className={`flex pl-3 py-2 relative items-center space-x-2 w-full`}
            onClick={handleClick}
            onContextMenu={() => setMenuValue(data.id)}
          >

            <div className="text-neutral-400 dark:text-neutral-700 w-8 min-w-8 text-center">
              {childrensLength}
            </div>
            <p
              className={`text-black dark:text-neutral-200 duration-300 ${openMenu === data.id || moveBuffer?.id === data.id && "opacity-50"}`}
            >
              {data?.title}
            </p>
            <ItemMenu data={data} />
          </div>
          <div
            onClick={() => setMenuValue(openMenu === data.id ? null : data.id)}
            className={`text-lg pl-3 pr-4 text-black ${openMenu === data.id ? "dark:bg-neutral-800" : "group-hover/item:opacity-100 md:opacity-0"} duration-150 dark:text-white flex items-center`}
          >
            {openMenu !== data.id ? (
              <BsThreeDotsVertical />
            ) : (
              <IoClose className="text-neutral-500"/>
            )}
          </div>
        </>
      ) : (
        <InputForm
          submitTitle="rename"
          cancelFunc={() => setRenameBuffer(null)}
          submitFunc={renameFolder}
          defaultValue={data.title}
        />
      )}
    </ItemLayout>
  );
}
