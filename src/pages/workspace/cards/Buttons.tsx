import { Button } from "@/components/ui/button";
import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { useNavigate } from "react-router";

export const Buttons = () => {
  const navigate = useNavigate()
  const { moveBuffer } = stateFolders()
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
