import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { RiArrowRightSLine } from "react-icons/ri";

export const Path = () => {
  const { path } = stateFolders();
  const { moveOut } = useFolders()

  return (
    <div className="border-neutral-700 py-2 flex flex-wrap border-b- px-2 w-full">
      {path.map((elem, index) => {
        const maxLength = 10 

        return (
          <div className="flex items-center" key={index}>
            {index !== 0 && (
              <RiArrowRightSLine fontSize={24} className="text-neutral-500" />
            )}
            <div
              onClick={() => moveOut(elem, index)}
              className={` ${
                path.length - 1 !== index
                  ? "text-neutral-500 hover:text-neutral-300 duration-150 cursor-pointer underline underline-offset-2"
                  : "text-white"
              }`}
            >
              {elem.title.length > maxLength ? (elem.title.slice(0, maxLength) + "..") : (elem.title)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
