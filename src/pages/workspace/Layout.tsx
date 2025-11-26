import { Outlet } from "react-router";

export const Layout = () => {
    return (
        <div>
            <div className="dotted-background fixed left-0 top-0 p-8 flex items-center justify-center -z-10 w-screen h-screen">
        <div className="w-130 bg-white dark:bg-neutral-900 aspect-square flex items-center justify-center shadow-2xl shadow-blue-500 rounded-full"></div>
      </div>
            <Outlet />
        </div>
    );
};
