import { ItemLayout } from "./ItemLayout";
import { ItemMenu } from "./ItemMenu";
import store from "@/state/store";
import { InputForm } from "./InputForm";
import { FiLink } from "react-icons/fi";
import { useItem } from "@/hooks/folders/useItem";

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

  const childrensLength = data && data?.childrens.length > 0 && data.childrens.length
  
  return (
    <ItemLayout
      filled={renameBuffer !== data.id}
      className={`flex group/item overflow-hidden}
      `}
    >
      {renameBuffer !== data.id ? (
        <>
          <div
            className={`flex pl-2 py-2 relative items-center space-x-2 w-full`}
            onClick={handleClick}
          >

            <div className="text-neutral-400 dark:text-neutral-500 w-8 min-w-8 text-center">
              {data.ref ? <FiLink className="mx-auto" /> : childrensLength}
            </div>
            <p
              className={`text-black dark:text-white duration-300 ${moveBuffer?.id === data.id && "opacity-50"}`}
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
