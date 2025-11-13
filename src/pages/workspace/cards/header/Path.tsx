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
    <div className="flex w-full space-x-2 max-w-full items-center fixed bg-white dark:bg-gradient-to-r from-violet-600 to-indigo-600 z-10 p-2">
      <div className="text-xl mr-2 cursor-pointer p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800/50 duration-150 rounded-full" onClick={toggleBar}>
        <HiOutlineMenuAlt1 />
      </div>
      <Breadcrumb elem={path[0]} index={0} current={path.length === 1} />
      {hiddenCrumbs().length !== 0 &&
        <div className="flex relative gap-2">
          <div className="opacity-50">/</div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">...</button>
          {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="left-0 absolute top-full p-2">
            <div className="bg-white dark:bg-black w-full rounded-3xl border-1 border-neutral-300 dark:border-neutral-800 min-w-30 px-3 py-2 space-y-1">
              {hiddenCrumbs().map((crumb, index) => {
                return (
                  <div key={index} className="flex pr-4 text-nowrap">
                    <div className="opacity-50">/</div>
                    <Breadcrumb key={index} elem={crumb} index={index + 1} />
                  </div>
                )
              })}
            </div>
          </div>}
        </div>}
      {lastCrumbs().map((crumb, index) => {
        return (
          <div key={index} className="flex gap-2">
            {index + 1 !== 0 && <div className="opacity-50">/</div>}
            <Breadcrumb key={index} elem={crumb} index={index + Math.max(path.length - 2, 1)} current={path.length > 2 && index === 1 || path.length <= 2 && !index} />
          </div>
        )
      })}
    </div>
  );
};

const Breadcrumb = ({ elem, index, current }: { elem: folder, index: number, current?: boolean }) => {
  const { moveOut } = useFolders();
  const maxLength = 10;

  return (
      <div
        onClick={() => !current && moveOut(elem, index)}
        className={` ${!current
          ? "duration-150 cursor-pointer"
          : "dark:text-white"
          }`}
      >
        {elem.title.length > maxLength
          ? elem.title.slice(0, maxLength) + ".."
          : elem.title}
      </div>
  )
}
