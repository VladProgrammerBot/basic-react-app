import { Button } from "../ui-elements/Button";
import { IoClose } from "react-icons/io5";
import { useBar } from "@/hooks/useSideBar";
import { FiMenu } from "react-icons/fi";
import { MenuButton } from "../ui-elements/MenuButton";

export const Bar = () => {
  const { isBarOpen, setIsBarOpen, actions, username } = useBar();

  return (
    <>
      <MenuButton onClick={() => setIsBarOpen(true)} icon={<FiMenu/>}/>
      {isBarOpen && <div className="fixed w-full h-full backdrop-blur-sm top-0 left-0" />}
      <div
        className={`${!isBarOpen ? "translate-x-[100vw]" : ""} space-y-1 border-1 rounded-md bg-neutral-800 border-white/20 right-2 top-2 w-[calc(100vw-1rem)] sm:w-75 h-[calc(100vh-1rem)] fixed p-4 z-100 duration-150`}
      >
        <Button className="py-3" onClick={() => setIsBarOpen(false)}>
          <IoClose />
        </Button>

        <div className="text-2xl py-2 text-center">{username}</div>

        {actions
          .filter((a) => a.show)
          .map(({ key, label, icon: Icon, onClick }) => (
            <Button
              key={key}
              className="m-0 w-full p-2 py-2 mb-1 justify-start"
              onClick={onClick}
            >
              <Icon className="text-xl" /> {label}
            </Button>
          ))}
      </div>
    </>
  );
};
