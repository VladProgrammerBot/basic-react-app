import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";

export const Path = () => {
  const { path } = stateFolders();
  const { moveOut } = useFolders();

  // document.addEventListener('mouseover', (e) => {
  //   console.log(e.clientX, e.clientY);
  // })

  return (
    <div className="p-2 flex gap-4 flex-wrap justify-between items-center w-full">
      <div className="flex flex-wrap flex-1">
        {path.map((elem, index) => {
          const maxLength = 10;

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
                {elem.title.length > maxLength
                  ? elem.title.slice(0, maxLength) + ".."
                  : elem.title}
              </div>
            </div>
          );
        })}
      </div>
      <FiMenu fontSize={20} className="mx-2" color="white"/>
    </div>
  );
};
