import { ItemLayout } from "./ItemLayout";
import { ItemMenu } from "./ItemMenu";
import store from "@/state/store";
import { InputForm } from "./InputForm";
import { useItem } from "@/hooks/folders/useItem";
import { FaFolder, FaRegFolder } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";

export function Item({
  data,
  index
}: {
  data: folder;
  index: number
}) {
  const { moveInto, renameFolder } = useItem();
  const renameBuffer = store.use.renameBuffer()
  const setRenameBuffer = store.use.setRenameBuffer()
  const moveBuffer = store.use.moveBuffer()
  const selectedItemId = store.use.selectedItemId()
  const setSelectedItemId = store.use.setSelectedItemId()

  const handleClick = () => {
    setSelectedItemId(null)
    moveInto(data.ref ? data.ref : data.id, index);
  }

  const childrensLength = data && data?.childrens.length > 0 ? data.childrens.length : 0

  return (
    <ItemLayout
      className={`flex group/item cursor-pointer rounded-md duration-150 hover:bg-neutral-200 dark:hover:bg-white/5 ${selectedItemId === index && "bg-neutral-200 dark:bg-white/5"}`}
    >
      {renameBuffer !== data.id ? (
        <>
          <div
            className={`flex pl-4 py-2 md:py-1 relative space-x-2 w-full duration-150`}
            onClick={handleClick}
          >
            <div className={`text-sky-400 pr-2 dark:text-sky-500 pt-2 text-center flex justify-center `}>
              {data.ref ? <PiLinkSimpleBold /> : childrensLength > 0 ? <FaFolder /> : <FaRegFolder />}
            </div>
            <p
              className={`duration-150 py-1 ${moveBuffer?.id === data.id && "opacity-50"}`}
            >
              {data?.title}
            </p>
          </div>
          <ItemMenu data={data} index={index} />
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
