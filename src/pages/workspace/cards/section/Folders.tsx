import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useKeyboard } from "@/hooks/folders/useKeyboard";
import { Button } from "@/components/ui/button";
import { usePath } from "@/hooks/folders/usePath";
import { useEffect, useMemo } from "react";
import { MdContentPaste } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

export const Folders = () => {
  const setFilteredChildrens = store.use.setFilteredChildrens();
  const setSelectedItemId = store.use.setSelectedItemId();
  const { childrensData, generateFolders } = useFolders();
  const { addFolder } = useFolderManipulation();
  const setMode = store((state) => state.setMode);
  const mode = store.use.mode();
  const { moveFolder } = usePath();
  const moveBuffer = store.use.moveBuffer();
  const filter = store.use.filter();
  const setFilter = store.use.setFilter();
  const childrensId = store.use.childrensId();
  const filteredChildrensId = store.use.filteredChildrensId();

  useKeyboard();

  const filteredChildrensData = useMemo(() => {
    if (filter === "") return childrensData;

    return childrensData.filter((child) =>
      child.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  }, [filter, childrensData]);

  // 2. Оновлюємо глобальний стор ПІСЛЯ рендеру через useEffect
  useEffect(() => {
    const filteredIds = filteredChildrensData.map((child) => child.id);

    // Якщо filter порожній, передаємо початкові childrensId
    if (filter === "") {
      setFilteredChildrens(childrensId);
    } else {
      setFilteredChildrens(filteredIds);
    }
  }, [filteredChildrensData, filter, childrensId, setFilteredChildrens]);

  return (
    <div
      className={`h-fit mt-13.5 pb-[50vh] space-y-1 max-w-4xl mx-auto max-lg:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {filteredChildrensData?.map((data, index) => {
        return <Item key={data.id} data={data} index={index} />;
      })}

      <div
        className={`${
          filteredChildrensId.length > 5 &&
          "md:absolute fixed bottom-2 left-1/2 -translate-x-1/2 max-lg:pl-2"
        } w-full max-w-4xl lg:pr-2`}
      >
        {mode === "AI Generate" && (
          <InputForm
            placeholder="Enter your prompt"
            submitTitle="Generate"
            cancelFunc={() => setMode("normal")}
            submitFunc={(value) => {
              generateFolders(value);
            }}
          />
        )}

        {mode === "normal" && (
          <div className="flex justify-between gap-1">
            {childrensId.length > 1 && (
              <Button
                size="icon"
                className="flex-1"
                onClick={() => setMode("Filter")}
              >
                <IoSearchSharp />{" "}
                <span className="text-neutral-500">
                  {filter && "(" + filter + ")"}
                </span>
              </Button>
            )}
            <Button
              className="flex-1"
              size="icon"
              onClick={() => setMode("Add Folder")}
            >
              <IoMdAdd />
            </Button>
            {moveBuffer && (
              <Button className="flex-1" size="icon" onClick={moveFolder}>
                <MdContentPaste />
              </Button>
            )}
          </div>
        )}
        {mode === "Add Folder" && (
          <InputForm
            submitTitle="+ Add"
            cancelFunc={() => setMode("normal")}
            submitFunc={addFolder}
          />
        )}
        {mode === "Filter" && (
          <InputForm
            placeholder="Search"
            submitTitle="Search"
            cancelFunc={() => setMode("normal")}
            submitFunc={(value) => {
              setFilter(value);
              setSelectedItemId(0);
              setMode("normal");
            }}
          />
        )}
      </div>
    </div>
  );
};
