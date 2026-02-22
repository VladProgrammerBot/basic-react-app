import { InputForm } from "../InputForm";
import { Button } from "@/components/ui/button";
import { MdContentPaste } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useFolders } from "@/hooks/folders/useFolders";
import store from "@/state/store";
import { usePath } from "@/hooks/folders/usePath";
import { useAlerts } from "@/hooks/useAlerts";
const api = import.meta.env.VITE_API;

export const Buttons = () => {
  const { generateFolders } = useFolders();
  const { addFolder } = useFolderManipulation();
  const setMode = store((state) => state.setMode);
  const mode = store.use.mode();
  const { moveFolder } = usePath();
  const moveBuffer = store.use.moveBuffer();
  const isStyled = store.use.isStyled();
  const childrensId = store.use.childrensId();
  const { alertError } = useAlerts()

  const handleSearch = async (value: string) => {
    try {
      await fetch(api + "/folders/getbykeyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: value,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
    } catch (error) {
      alertError("get folders");
    }
  };

  return (
    <div
      className={`${
        childrensId.length > 5 &&
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
          submitFunc={(value) => handleSearch(value)}
        />
      )}

      <div className={`${!isStyled && "lg:hidden"}`}>
        {mode === "normal" && (
          <div className="flex justify-between gap-1">
            {childrensId.length > 1 && (
              <Button
                size="icon"
                className="flex-1"
                onClick={() => setMode("Filter")}
              >
                <IoSearchSharp />{" "}
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
      </div>
    </div>
  );
};
