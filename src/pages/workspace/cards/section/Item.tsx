import { useFolders } from "@/hooks/useFolders";
import { ItemLayout } from "./ItemLayout";
import { ItemMenu } from "./ItemMenu";
import store from "@/state/store";
import { InputForm } from "./InputForm";
import { FiLink } from "react-icons/fi";

export function Item({
  data
}: {
  data: folder;
}) {
  const { moveInto, renameFolder } = useFolders();
  const openMenu = store.use.openMenu()
  const renameBuffer = store.use.renameBuffer()
  const setMenuValue = store(state => state.setMenuValue)
  const setRenameBuffer = store.use.setRenameBuffer()
  const moveBuffer = store.use.moveBuffer()

  const handleClick = () => {
    if (openMenu !== data.id) {
      setMenuValue(null);
      moveInto(data.ref ? data.ref : data.id);
    }
  }

  const childrensLength = data && data?.childrens.length > 0 && data.childrens.length

  return (
    <ItemLayout
      filled={renameBuffer !== data.id}
      className={`flex group/item overflow-hidden ${openMenu !== data.id && renameBuffer !== data.id && ""}
      `}
    >
      {renameBuffer !== data.id ? (
        <>
          <div
            className={`flex pl-3 py-2 relative items-center space-x-2 w-full`}
            onClick={handleClick}
            onContextMenu={() => setMenuValue(data.id)}
          >

            <div className="text-neutral-400 dark:text-neutral-500 w-8 min-w-8 text-center">
              {data.ref ? <FiLink className="mx-auto" /> : childrensLength}
            </div>
            <p
              className={`text-black dark:text-white duration-300 ${openMenu === data.id || moveBuffer?.id === data.id && "opacity-50"}`}
            >
              {data?.title}
            </p>
            {/* <ItemMenu data={data} /> */}
          </div>
          <ItemMenu data={data}/>
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
