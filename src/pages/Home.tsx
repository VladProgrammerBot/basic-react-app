import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { TbClick } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { LuAtom } from "react-icons/lu";
import { SiInstructure } from "react-icons/si";

export const Home = () => {
  return (
    <div className="p-16 max-w-5xl mx-auto">
      <div className="fixed bg-neutral-900 border-1 border-neutral-700 top-4 overflow-hidden left-1/2 -translate-x-1/2 flex rounded-md">
        <p className="duration-150 cursor-pointer hover:bg-neutral-800 px-6 py-2">Home</p>
        <p className="duration-150 cursor-pointer hover:bg-neutral-800 px-6 py-2">About</p>
        <p className="duration-150 cursor-pointer hover:bg-neutral-800 px-6 py-2">Manual</p>
      </div>
      <div className="flex flex-col items-center mt-35 space-y-2">
        <p className="text-2xl sm:text-4xl flex items-center gap-1 mb-4"><SiInstructure fontSize={30} />Strukt</p>
        <p className="text-5xl font-bold w-fit text-shadow-neutral-500 text-center">TEXT ORGANIZER</p>
        <p className="text-md sm:text-xl flex text-neutral-500 w-fit gap-x-4 flex-wrap justify-center">
          <span className="text-sk-500 flex gap-1 items-center"><FaCheckCircle />Minimalist</span>
          <span className="block text-pin-500 flex gap-1 items-center"><GiProgression />Scalable</span>
          <span className="text-gree-500 flex gap-1 items-center"><LuAtom />Universal</span>
        </p>
        <div className="flex text-lg mt-4">
          <NavLink to="workspace">
            <Button><TbClick />Start using Now</Button>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col items-center mt-50">
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
      <div className="flex flex-col items-center mt-50">
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
