import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiArrowRightSLine } from "react-icons/ri";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const root = path[0]
  const hidden = () => {
    const startFrom = 1
    const length = path.length - 3
    const hiddenArr = []

    for (let i = 0; i < length; i++) {
      hiddenArr.push(path[i + startFrom])
    }

    return hiddenArr
  }
  const visible = () => {
    const length = 2
    const startFrom = path.length - length
    const visibleArr = []

    for (let i = startFrom; i < path.length; i++) {
      if (i > 0) {
        visibleArr.push(path[i])
      }
    }

    return visibleArr
  }

  return (
    <div className="flex w-full max-w-full items-center fixed bg-white dark:bg-black z-100 p-2">
      <div className="text-xl cursor-pointer p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-150 rounded-full" onClick={toggleBar}>
        <HiOutlineMenuAlt1 />
      </div>
      <div className="flex p-2 max-w-full w-full items-center">
        <Breadcrumb elem={root} index={0} />
        {hidden().length !== 0 && <>
          <div className="flex relative cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <RiArrowRightSLine className="text-neutral-300 dark:text-neutral-800 text-lg sm:text-2xl" />...
            {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="left-0 absolute top-full p-2">
              <div className="bg-black w-full rounded-3xl border-1 border-neutral-800 min-w-30 px-3 py-2 space-y-1">
                {hidden().map((crumb, index) => {
                  return (
                    <div key={index} className="flex pr-4 text-nowrap">
                      <RiArrowRightSLine className="text-neutral-300 dark:text-neutral-800 text-lg sm:text-2xl" />
                      <Breadcrumb key={index} elem={crumb} index={index + 1} />
                    </div>
                  )
                })}
              </div>
            </div>}
          </div>
        </>}
        {visible().map((crumb, index) => {
          return (
            <div key={index} className="flex">
              {index + 1 !== 0 && <RiArrowRightSLine className="text-neutral-300 dark:text-neutral-800 text-lg sm:text-2xl" />}
              <Breadcrumb key={index} elem={crumb} index={index + Math.max(path.length - 2, 1)} current={path.length > 2 && index === 1 || path.length <= 2 && !index} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

const Breadcrumb = ({ elem, index, current }: { elem: folder, index: number, current?: boolean }) => {
  const { moveOut } = useFolders();
  const maxLength = 10;

  return (
    <>
      <div
        onClick={() => !current && moveOut(elem, index)}
        className={` ${!current
          ? "text-neutral-500 hover:text-neutral-300 duration-150 cursor-pointer"
          : "dark:text-white"
          }`}
      >
        {elem.title.length > maxLength
          ? elem.title.slice(0, maxLength) + ".."
          : elem.title}
      </div>
    </>
  )
}
