import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import store from "@/state/store";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiddenCrumbs } from "./hiddenCrumbs";
import { Breadcrumb } from "./BreadCrumb";
import { FaPlus } from "react-icons/fa6";
import { RiGeminiFill } from "react-icons/ri";
import { MdContentPaste } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { usePath } from "@/hooks/folders/usePath";

export const Path = () => {
  const path = store.use.path()
  const toggleBar = store.use.toggleBar()
  const setMode = store.use.setMode()
  const moveBuffer = store.use.moveBuffer()
  const { hiddenCrumbs, lastCrumbs } = useBreadcrumbs()
  const { moveFolder } = usePath()

  return (
    <div className="p-2 fixed z-10 w-full max-w-4xl right-1/2 translate-x-1/2">
      <div className={`flex items-center justify-between bg-white border-1 border-neutral-700 rounded-md overflow-hidden dark:bg-neutral-800 p-1`}>
        <div className="flex items-center">
          <div className="text-xl cursor-pointer p-3 rounded-md hover:bg-neutral-800 duration-150" onClick={toggleBar}>
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
        <div className="space-x-2">
          {moveBuffer && <Button variant={"outline"} onClick={moveFolder} className="p-2"><MdContentPaste /></Button>}
          {/* <Button onClick={() => setMode("AI Generate")} className="p-2"><RiGeminiFill /></Button> */}
          <button className="p-3 rounded-md cursor-pointer hover:bg-neutral-800 duration-150" onClick={() => setMode("Add Folder")}><FaPlus /></button>
        </div>
      </div>
    </div>
  );
};


