import { usePath } from "@/hooks/folders/usePath";
import store from "@/state/store";
import type { path } from "@/types/storeTypes";

export const Breadcrumb = ({
  elem,
  index,
  current,
  className,
  maxLen,
}: {
  maxLen?: number;
  elem: path;
  index: number;
  current?: boolean;
  className?: string;
}) => {
  const { moveOut } = usePath();
  const maxLength = maxLen ?? 8;
  const folders = store.use.folders();
  const folderTitle = folders[elem.id].title;
  const cuttedTitle =
    folderTitle.length > maxLength
      ? folderTitle.slice(0, maxLength) + ".."
      : folderTitle;

  return (
    <div
      onClick={() => {
        !current && moveOut(index);
      }}
      className={`${!current && "rounded-md"} ${
        !current ? "duration-150 cursor-pointer" : "dark:text-white"
      } ${className}`}
    >
      {cuttedTitle}
    </div>
  );
};
