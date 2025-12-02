import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import store from "@/state/store";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { Breadcrumb } from "./BreadCrumb";
import { LuMenu } from "react-icons/lu";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs()

  return (
    <div className="fixed z-10 px-2 py-2 w-full right-1/2 translate-x-1/2 flex items-center justify-between bg-white border--1 border-neutral-300 dark:border-neutral-700 overflow-hidden dark:bg-neutral-900">
      <div className="flex items-center">
        {path.length > 1 && (
          <Breadcrumb
            className="px-2"
            elem={{ ...path[0], title: "#" }}
            index={0}
            current={path.length === 1} />
        )}
        {hiddenCrumbs().length !== 0 &&
          <div className="flex relative">
            <div className="text-neutral-400">/</div>
            <HiddenCrumbs hiddenCrumbs={hiddenCrumbs} />
          </div>}
        {lastCrumbs().map((crumb, index) => {
          return (
            <div key={index} className="flex">
              {index + 1 !== 0 && <div className="text-neutral-500">/</div>}
              <Breadcrumb
                key={index}
                elem={crumb}
                index={index + Math.max(path.length - 2, 1)}
                current={path.length > 2 && index === 1 || path.length <= 2 && !index}
                className={index === 0 ? "px-2" : "pl-2"} />
            </div>
          )
        })}
      </div>
      <button onClick={toggleBar} className="cursor-pointer h-full rounded-md p-2 duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-800">
        <LuMenu fontSize={20} />
      </button>
    </div>
  );
};


