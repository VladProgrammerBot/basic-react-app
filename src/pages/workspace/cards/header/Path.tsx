import store from "@/state/store";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { LuMenu } from "react-icons/lu";
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
  const toggleBar = store.use.toggleBar();
  const { moveOut } = usePath();
  

  return (
    <div className="md:absolute pr-2 fixed max-w-4xl gap-1 z-10 max-lg:px-2 pt-2 w-full right-1/2 translate-x-1/2 flex justify-between">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={path.length === 1}
            size={"icon"}
            onClick={() => path.length !== 1 && moveOut(path[0].childrens, 0)}
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
              moveOut(path[path.length - 2].childrens, path.length - 2)
            }
          >
            <IoArrowBack />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Shift + h</TooltipContent>
      </Tooltip>
      <HiddenCrumbs />
      <div className="flex items-center py-1 overflow-x-hidden text-nowrap backdrop-blur-xs border-1 border-neutral-400 dark:border-white/20 rounded-md p-4 w-full">
        {path[path.length - 1].title}
      </div>
      <div className="text-right">
        <Button size={"icon"} onClick={toggleBar}>
          <LuMenu />
        </Button>
      </div>
    </div>
  );
};
