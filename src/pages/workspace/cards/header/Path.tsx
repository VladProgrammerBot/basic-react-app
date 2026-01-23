import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import store from "@/state/store";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { Breadcrumb } from "./BreadCrumb";
import { LuMenu } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
// import { Tip } from "../Guide-old/Tip";
import { IoIosArrowForward } from "react-icons/io";

export const Path = () => {
  const path = store.use.path();
  const toggleBar = store.use.toggleBar();
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs();
  // const guideStep = store.use.currentStep();

  return (
    <div className="md:absolute pr-2 fixed max-w-4xl gap-1 z-10 max-lg:px-2 pt-2 w-full right-1/2 translate-x-1/2 flex justify-between">
      {/* {guideStep === 1 && path.length > 1 && (
        <Tip className="items-center left-2" text="Context" />
      )} */}
      <div className="flex items-center py-1 backdrop-blur-xs border-1 border-white/20 rounded-md pl-4 pr-1 w-full">
        <Tooltip>
          <TooltipTrigger>
            <Breadcrumb
              className="sm:pr-2"
              elem={{ ...path[0], title: "Root" }}
              index={0}
              current={path.length === 1}
            />
          </TooltipTrigger>
          <TooltipContent>Shift + h</TooltipContent>
        </Tooltip>
        {hiddenCrumbs().length !== 0 && (
          <div className="flex relative items-center">
            <div className="text-neutral-400">
              <IoIosArrowForward />
            </div>
            <HiddenCrumbs hiddenCrumbs={hiddenCrumbs} />
          </div>
        )}
        {lastCrumbs().map((crumb, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div className="flex items-center">
                  {index + 1 !== 0 && (
                    <div className="text-neutral-400">
                      <IoIosArrowForward />
                    </div>
                  )}
                  <Breadcrumb
                    key={index}
                    elem={crumb}
                    index={index + Math.max(path.length - 2, 1)}
                    current={
                      (path.length > 2 && index === 1) ||
                      (path.length <= 2 && !index)
                    }
                    className={index === 0 ? "sm:px-2" : "sm:pl-2"}
                  />
                </div>
              </TooltipTrigger>
              {index === lastCrumbs().length - 2 && (
                <TooltipContent>h</TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
      <div className="text-right">
        <Button size={"icon"} onClick={toggleBar}>
          <LuMenu fontSize={20} />
        </Button>
      </div>
    </div>
  );
};
