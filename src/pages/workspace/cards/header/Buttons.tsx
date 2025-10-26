import { Button } from "@/components/ui/button";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { useNavigate } from "react-router";
import { TiHome } from "react-icons/ti";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export const Buttons = () => {
  const navigate = useNavigate()
  const moveBuffer = store.use.moveBuffer()
  const { moveFolder } = useFolders()

  return (
    <div className="text-white space-x-2 flex justify-end">
      <Button onClick={moveFolder} variant={moveBuffer ? "outline" : "outlineNotActive"}>
        Paste
      </Button>
      <Button variant={"outline"} onClick={() => {
        localStorage.clear()
        navigate("/login")
      }}>
        Logout
      </Button>
      <Button className="text-4xl" onClick={() => {
        navigate("/")
      }}>
        <TiHome />
      </Button>
      <Button variant={"ghost"} className="text-4xl" onClick={() => {
        navigate("/")
      }}>
        <HiOutlineMenuAlt3 />
      </Button>
    </div>
  );
};
