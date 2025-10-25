import { Button } from "@/components/ui/button";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { useNavigate } from "react-router";

export const Buttons = () => {
  const navigate = useNavigate()
  const moveBuffer = store((state) => state.moveBuffer)
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
      <Button onClick={() => {
        navigate("/")
      }}>
        Home
      </Button>
    </div>
  );
};
