import { Button } from "@/components/ui/button";
import stateFolders from "@/state/stateFolders";
import { IoIosSearch } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";

export const Buttons = () => {
  const { setMode } = stateFolders();

  return (
    <div className="text-white space-x-2 flex justify-end mb-2">
      <Button>
        Filter
      </Button>
      <Button>
        Paste
      </Button>
      <Button>
        <IoIosSearch fontSize={20} />
      </Button>
      <Button
        onClick={() => setMode("Add Folder")}
      >
        <IoAddOutline fontSize={23} />
      </Button>
    </div>
  );
};
