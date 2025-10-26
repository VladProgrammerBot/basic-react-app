import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiArrowRightSLine } from "react-icons/ri";

export const Path = () => {
  const path = store(state => state.path);
  const { moveOut } = useFolders();
  const toggleBar = store.use.toggleBar()
  const isBarOpen = store.use.isBarOpen()

  return (
    <div className="flex text-lg w-full items-center border-1">
      {/* {!isBarOpen && (
        <div className="text-2xl cursor-pointer p-2 hover:bg-neutral-800 duration-150 rounded-full" onClick={toggleBar}>
          <HiOutlineMenuAlt1 />
        </div>
      )} */}
      <div className="flex p-2 w-full">
        {path?.map((elem, index) => {
          const maxLength = 10;

          return (
            <div className={`${index !== path.length - 1 && "max-w-fit flex-1"} relative flex overflow-hidden items-center`} key={index}>
              <div>

                {index !== 0 && (
                  <RiArrowRightSLine fontSize={24} className="text-neutral-800" />
                )}
              </div>
              <div
                onClick={() => moveOut(elem, index)}
                className={`text-nowrap ${path.length - 1 !== index
                  ? "text-neutral-500 hover:text-neutral-300 duration-150 cursor-pointer"
                  : "dark:text-white"
                  }`}
              >
                {elem.title.length > maxLength
                  ? elem.title.slice(0, maxLength) + ".."
                  : elem.title}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
