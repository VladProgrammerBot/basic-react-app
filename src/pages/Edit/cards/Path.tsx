import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { RiArrowRightSLine } from "react-icons/ri";

export const Path = () => {
  const { path } = stateFolders();
  const { moveOut } = useFolders()

  return (
    <div className="max-lg:px-2 max-w-4xl py-2 m-auto flex flex-wrap">
      {path.map((elem, index) => {
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
              {elem.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};
