import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import store from "@/state/store";
// import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { Breadcrumb } from "./BreadCrumb";
// import { FaPlus } from "react-icons/fa6";
// import { MdContentPaste } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
// import { GoFileDirectoryFill } from "react-icons/go";
// import { usePath } from "@/hooks/folders/usePath";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  // const setMode = store.use.setMode()
  // const moveBuffer = store.use.moveBuffer()
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs()
  // const { moveFolder } = usePath()

  return (
    <div className="fixed z-10 p-2 w-full right-1/2 translate-x-1/2 flex items-center justify-between bg-white border--1 border-neutral-300 dark:border-neutral-700 overflow-hidden dark:bg-neutral-900">
      {/* <div className={`flex items-center justify-between bg-white border-1 border-neutral-300 dark:border-neutral-700 rounded-md overflow-hidden dark:bg-neutral-800`}> */}
      <div className="flex items-center">
        {/* <div className="text-lg cursor-pointer p-4" onClick={toggleBar}>
          <HiOutlineMenuAlt1 />
        </div> */}
        {path.length > 1 && <Breadcrumb className="px-2" elem={{...path[0], title: "#"}} index={0} current={path.length === 1} />}
        {hiddenCrumbs().length !== 0 &&
          <div className="flex relative">
            <div className="text-neutral-400">/</div>
            <HiddenCrumbs hiddenCrumbs={hiddenCrumbs} />
          </div>}
        {lastCrumbs().map((crumb, index) => {
          return (
            <div key={index} className="flex">
              {index + 1 !== 0 && <div className="text-neutral-500">/</div>}
              <Breadcrumb key={index} elem={crumb} index={index + Math.max(path.length - 2, 1)} current={path.length > 2 && index === 1 || path.length <= 2 && !index} className={index === 0 ? "px-2" : "pl-2"} />
            </div>
          )
        })}
      </div>
      {/* <div>
          {moveBuffer && <button onClick={moveFolder} className="p-3 rounded-md cursor-pointer duration-150"><MdContentPaste /></button>}
          <button className="p-4 rounded-md text-xl cursor-pointer duration-150" onClick={() => setMode("Add Folder")}><FaPlus /></button>
        </div> */}
      <button onClick={toggleBar} className="cursor-pointer h-full rounded-md px-2 duration-150 hover:bg-neutral-800"><BsThreeDots fontSize={20}/></button>
    </div>
    // </div>
  );
};


