import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";
import { TbClick } from "react-icons/tb";
import { Footer } from "./workspace/cards/footer";

export const Home = () => {
  return (
    <div className="p-4">
      <div className="flex w-full justify-between">
        <div className="text-2xl font-bold">
          Strukt
        </div>
        <Link to={"/login"}>
          <Button variant={"outline"}>
            Log in
          </Button>
        </Link>
      </div>
      <div className="max-w-5xl mx-auto">
        <img
          className="w-45 aspect-square mx-auto mb-2 mt-8 drop-shadow-lg dark:drop-shadow-neutral-950"
          src="https://cdn-icons-png.freepik.com/512/8298/8298289.png" alt="" />
        <div className="flex flex-col items-center pb-75 space-y-6">
          <p className="text-5xl font-bold w-fit text-shadow-neutral-500 text-center drop-shadow-lg dark:drop-shadow-neutral-500">
            Remember everything.<br /> Forget nothing.
          </p>
          <p className="text-md sm:text-xl text-neutral-500 text-center">
            a minimalist app for quick and organized storage of ideas, goals, plans, etc.
          </p>
          <NavLink to="workspace">
            <Button className="dark:shadow-2xl shadow-blue-600 hover:shadow-blue-500 duration-150 text-white gradient-bg">
              <TbClick />Free up memory in 5 minutes
            </Button>
          </NavLink>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/256/6761/6761386.png"
          alt=""
          className="mx-auto w-30 drop-shadow-xl drop-shadow-neutral-950" />
        <p className="text-5xl font-bold text-center text-shadow-lg text-shadow-neutral-500 mt-16">
          Organize text like in File Explorer
        </p>
        <Footer />
      </div>
    </div>
  );
};
