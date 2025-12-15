import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import store from "@/state/store";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { Breadcrumb } from "./BreadCrumb";
import { LuMenu } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs()

  return (
    <div className="fixed z-10 px-2 py-2 w-full right-1/2 translate-x-1/2 flex items-center justify-between bg-white border--1 border-neutral-300 dark:border-neutral-700 overflow-hidden dark:bg-neutral-900">
      <div className="flex items-center">
        {path.length > 1 && (
          <Tooltip>
            <TooltipTrigger>
              <Breadcrumb
                className="px-2"
                elem={{ ...path[0], title: "Root" }}
                index={0}
                current={path.length === 1} />
            </TooltipTrigger>
            <TooltipContent>
              Shift + h
            </TooltipContent>
          </Tooltip>
        )}
        {hiddenCrumbs().length !== 0 &&
          <div className="flex relative">
            <div className="text-neutral-400">/</div>
            <HiddenCrumbs hiddenCrumbs={hiddenCrumbs} />
          </div>}
        {lastCrumbs().map((crumb, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div className="flex">
                  {index + 1 !== 0 && <div className="text-neutral-500">/</div>}
                  <Breadcrumb
                    key={index}
                    elem={crumb}
                    index={index + Math.max(path.length - 2, 1)}
                    current={path.length > 2 && index === 1 || path.length <= 2 && !index}
                    className={index === 0 ? "px-2" : "pl-2"} />
                </div>
              </TooltipTrigger>
              {index === lastCrumbs().length - 2 && (
                <TooltipContent>
                  h
                </TooltipContent>
              )}
            </Tooltip>

          )
        })}
      </div>
      <Button variant={"ghost"} size={"icon"} onClick={toggleBar}>
        <LuMenu fontSize={20} />
      </Button>
    </div>
  );
};


