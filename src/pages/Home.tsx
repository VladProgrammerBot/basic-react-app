import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { TbClick } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { LuAtom } from "react-icons/lu";
import { SiInstructure } from "react-icons/si";

export const Home = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4 p-4 py-32">
        <p className="text-4xl flex items-center gap-1"><SiInstructure fontSize={30} />Strukt</p>
        <div className="text-center space-y-2 border- border-neutral-700 border-dashed rounded-md p-4 shadow-neutral-700">
          <p className="text-5xl font-bold text-shadow-neutral-500">Text Organizer</p>
          <p className="text-xl flex text-neutral-500 gap-x-4 flex-wrap justify-around">
            <span className="text-sk-500 flex gap-1 items-center"><FaCheckCircle />Minimalist</span>
            <span className="block text-pin-500 flex gap-1 items-center"><GiProgression />Scalable</span>
            <span className="text-gree-500 flex gap-1 items-center"><LuAtom />Universal</span>
          </p>
        </div>
        <div className="flex text-lg">
          <NavLink to="workspace">
            <Button><TbClick />Start using Now</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
