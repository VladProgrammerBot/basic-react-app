import { Button } from "@/components/ui/button";
import stateFolders from "@/state/stateFolders";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

export const Buttons = () => {
  const { setMode } = stateFolders();
  const navigate = useNavigate()

  return (
    <div className="text-white space-x-2 flex justify-end mb-2">
      {/* <Button>
        Filter
      </Button>
      <Button>
        Paste
      </Button> */}
      {/* <Button>
        <IoIosSearch fontSize={20} />
      </Button> */}
      <Button
        onClick={() => setMode("Add Folder")}
      >
        <IoAddOutline fontSize={23} />
      </Button>
      <Button onClick={() => {
        localStorage.clear()
        navigate("/login")
      }}>
        Logout
      </Button>
      <Button onClick={() => {
        navigate("/")
      }}>
        Home
      </Button>
    </div>
  );
};
