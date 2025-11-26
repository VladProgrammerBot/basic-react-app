import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import store from "@/state/store";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { Breadcrumb } from "./BreadCrumb";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs()

  return (
    <div className="fixed z-10 w-full">
      <div className={`flex items-center bg-white w-full dark:bg-neutral-900 p-2`}>
        <div className="text-xl cursor-pointer p-2 duration-150 rounded-full" onClick={toggleBar}>
          <HiOutlineMenuAlt1 />
        </div>
        {path.length > 1 && <Breadcrumb className="px-2" elem={path[0]} index={0} current={path.length === 1} />}
        {hiddenCrumbs().length !== 0 &&
          <div className="flex relative">
            <div className="text-neutral-400">/</div>
            <HiddenCrumbs hiddenCrumbs={hiddenCrumbs} />
          </div>}
        {lastCrumbs().map((crumb, index) => {
          return (
            <div key={index} className="flex">
              {index + 1 !== 0 && <div className="text-neutral-500">/</div>}
              <Breadcrumb key={index} elem={crumb} index={index + Math.max(path.length - 2, 1)} current={path.length > 2 && index === 1 || path.length <= 2 && !index} className="px-2" />
            </div>
          )
        })}
      </div>
    </div>
  );
};


