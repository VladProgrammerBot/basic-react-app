import store from "@/state/store";
import { HiddenCrumbs } from "./HiddenCrumbs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { usePath } from "@/hooks/folders/usePath";
import { FaHouse } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

export const Path = () => {
  const path = store.use.path();
  // const toggleBar = store.use.toggleBar();
  const { moveOut } = usePath();
  const designMode = store.use.designMode();
  const folders = store.use.folders();

  return (
    <div className="md:absolute pr-2 fixed max-w-4xl z-10 max-lg:px-2 pt-2 w-full right-1/2 translate-x-1/2 flex justify-between">
      <div className={`${designMode === "Minimalistic" && "lg:hidden"} flex gap-1`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={path.length === 1}
              size={"icon"}
              onClick={() => path.length !== 1 && moveOut(0)}
            >
              <FaHouse />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Shift + h</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={path.length === 1}
              size={"icon"}
              onClick={() =>
                path.length !== 1 &&
                moveOut(path.length - 2)
              }
            >
              <IoArrowBack />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Shift + h</TooltipContent>
        </Tooltip>
      </div>
      <HiddenCrumbs />
      <div className="flex items-center py-1 truncate backdrop-blur-xs border-1 border-neutral-400 dark:border-white/20 rounded-md p-4 w-full">
        {folders[path[path.length - 1]?.id]?.title}
      </div>
      {/* <div className="text-right ml-1">
        <Button size={"icon"} onClick={toggleBar}>
          <LuMenu />
        </Button>
      </div> */}
    </div>
  );
};
