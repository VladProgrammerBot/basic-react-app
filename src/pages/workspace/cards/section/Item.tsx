import { ItemLayout } from "./ItemLayout";
import { ItemMenu } from "./ItemMenu";
import store from "@/state/store";
import { InputForm } from "./InputForm";
import { FiLink } from "react-icons/fi";
import { useItem } from "@/hooks/folders/useItem";
import { FaFolder } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";

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

  const handleClick = () => {
    moveInto(data.ref ? data.ref : data.id);
  }

  const childrensLength = data && data?.childrens.length > 0 ? data.childrens.length : 0

  return (
    <ItemLayout
      index={index}
      filled={renameBuffer !== data.id}
      className={`flex group/item overflow-hidden}
      `}
    >
      {renameBuffer !== data.id ? (
        <>
          <div
            className={`flex pl-2 py-1 relative space-x-2 w-full drop-shadow-md ddark:drop-shadow-neutral-600 duration-150`}
            onClick={handleClick}
          >

            <div className="text-neutral-400 dark:text-neutral-500 pt-2 text-center flex justify-center min-w-8">
              {data.ref ? <FiLink className="" /> : childrensLength > 0 ? <FaFolder /> : <FiMinus/>}
            </div>
            <p
              className={`duration-150 py-1  ${moveBuffer?.id === data.id && "opacity-50"}`}
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
