import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs()

  return (
    <div className="flex w-full space-x- max-w-full items-center fixed bg-white border-b-1 border-neutral-300 dark:border-none dark:border-neutral-800 dark:bg-neutral-950 z-10 p-2">
      <div className="text-xl mr-2 cursor-pointer p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800/50 duration-150 rounded-full" onClick={toggleBar}>
        <HiOutlineMenuAlt1 />
      </div>
      <Breadcrumb className="pr-2" elem={path[0]} index={0} current={path.length === 1} />
      {hiddenCrumbs().length !== 0 &&
        <div className="flex relative">
          <div className="text-neutral-400">/</div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer px-2">...</button>
          {isMenuOpen && (<>
            <div onClick={() => setIsMenuOpen(false)} className="left-0 absolute z-100 top-full p-2 py-1">
              <div className="bg-white dark:bg-neutral-800 z-100 w-full rounded-md border-1 border-neutral-300 shadow-md shadow-neutral-300 dark:shadow-neutral-950 dark:border-neutral-800 min-w-30 py-2">
                {hiddenCrumbs().map((crumb, index) => {
                  return (
                    <div key={index} className="flex gap-1 cursor-pointer duration-150 hover:bg-neutral-70 text-nowrap">
                      <Breadcrumb key={index} elem={crumb} index={index + 1} className="dark:text-neutral-500 dark:hover:text-white px-4 w-full py-1" />
                    </div>
                  )
                })}
              </div>
            </div>
            <div onClick={() => setIsMenuOpen(false)} className="w-screen opacity-0 z-0 h-screen fixed bg-black top-0 left-0"></div>
          </>)
          }
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

const Breadcrumb = ({ elem, index, current, className }: { elem: folder, index: number, current?: boolean, className?: string }) => {
  const { moveOut } = useFolders();
  const maxLength = 10;

  return (
    <div
      onClick={() => !current && moveOut(elem, index)}
      className={`${!current && "dark:text-neutral-500 dark:hover:text-white"} ${!current
        ? "duration-150 cursor-pointer"
        : "dark:text-white"
        } ${className}`}
    >
      {elem.title.length > maxLength
        ? elem.title.slice(0, maxLength) + ".."
        : elem.title}
    </div>
  )
}
