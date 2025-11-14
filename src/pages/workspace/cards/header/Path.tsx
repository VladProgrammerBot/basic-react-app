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
    <div className="flex w-full max-w-full items-center fixed bg-white border-b-1 border-neutral-300 dark:border-none dark:border-neutral-800 dark:bg-neutral-900 z-10 p-2">
      <div className="text-xl mr-2 cursor-pointer p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800/50 duration-150 rounded-full" onClick={toggleBar}>
        <HiOutlineMenuAlt1 />
      </div>
      <Breadcrumb className="pr-2" elem={path[0]} index={0} current={path.length === 1} />
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
  );
};


