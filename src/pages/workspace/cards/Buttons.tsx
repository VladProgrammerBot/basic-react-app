import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Buttons = () => {
  const navigate = useNavigate()

  return (
    <div className="text-white space-x-2 flex justify-end">
      {/* <Button>
        Filter
      </Button>
      <Button>
        Paste
      </Button> */}
      {/* <Button>
        <IoIosSearch fontSize={20} />
      </Button> */}
      {/* <Button
        onClick={() => setMode("Add Folder")}
      >
        <IoAddOutline fontSize={23} />
      </Button> */}
      <Button variant={"outline"} onClick={() => {
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
