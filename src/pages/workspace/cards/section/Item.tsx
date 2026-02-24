import { ItemMenu } from "./ItemMenu";
import store from "@/state/store";
import { InputForm } from "./InputForm";
import { useItem } from "@/hooks/folders/useItem";
import { FaFolder, FaRegFolder } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";

export function Item({
  data,
  index,
  className,
}: {
  data: folder;
  index: number;
  className?: string;
}) {
  const { moveInto, renameFolder } = useItem();
  const renameBuffer = store.use.renameBuffer();
  const setRenameBuffer = store.use.setRenameBuffer();
  const moveBuffer = store.use.moveBuffer();
  const selectedItemId = store.use.selectedItemId();
  const setSelectedItemId = store.use.setSelectedItemId();

  const handleClick = () => {
    setSelectedItemId(null);
    moveInto(data.ref ? data.ref : data.id, index);
  };

  const childrensLength =
    data && data?.childrens.length > 0 ? data.childrens.length : 0;

  return (
    <div
      className={`flex group/item lg:mr-2 md:min-h-10 relative min-h-12 cursor-pointer rounded-md border-1 border-neutral-400 dark:border-white/20 duration-150 bg-neutral-50 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 ${
        selectedItemId === index &&
        renameBuffer === null &&
        "bg-neutral-200 dark:bg-white/10"
      } ${className}`}
    >
      {renameBuffer !== data.id ? (
        <>
          <div
            className={`flex pl-4 py-2 md:py-1 relative space-x-2 w-full duration-150`}
            onClick={handleClick}
          >
            <div
              className={`dark:text-white/50 pr-2 text-neutral-500 pt-2 text-center flex justify-center`}
            >
              {data.ref ? (
                <PiLinkSimpleBold />
              ) : childrensLength > 0 ? (
                <FaFolder />
              ) : (
                <FaRegFolder />
              )}
            </div>
            <p
              className={`duration-150 py-1 ext-white ${
                moveBuffer?.id === data.id && "opacity-50"
              }`}
            >
              {data?.title}
            </p>
          </div>
          <ItemMenu data={data} index={index} />
        </>
      ) : (
        <InputForm
          border={false}
          submitTitle="rename"
          cancelFunc={() => setRenameBuffer(null)}
          submitFunc={renameFolder}
          defaultValue={data.title}
        />
      )}
    </div>
  );
}
