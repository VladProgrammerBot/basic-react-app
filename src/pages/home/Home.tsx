import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export const Home = () => {
  return (
    <div>
      <div className="p-4 mx-auto max-w-4xl text-center w-full flex flex-col items-center gap-4 fixed translate-1/2 bottom-1/2 right-1/2">
        <p className="text-8xl text-shadow-white text-shadow-lg">Strukt</p>
        <p className="text-2xl font-thin">
          Organize information easily and without limits.
        </p>
        <div className="flex gap-2">
          <Button>About</Button>
          <NavLink to="workspace">
            <Button>Get started</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
