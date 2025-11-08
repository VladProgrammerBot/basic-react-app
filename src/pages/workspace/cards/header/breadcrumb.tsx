import { usePath } from "@/hooks/folders/usePath";

export const Breadcrumb = ({ elem, index, current }: { elem: folder, index: number, current?: boolean }) => {
  const { moveOut } = usePath();
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
