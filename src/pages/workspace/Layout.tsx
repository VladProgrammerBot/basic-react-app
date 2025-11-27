import { Outlet } from "react-router";

export const Layout = () => {
    return (
        <div>
            <div className="dark:bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px] fixed left-0 top-0 p-8 flex items-center justify-center -z-10 w-screen h-screen">
                <div className="w-130 dark:bg-neutral-900 aspect-square flex items-center justify-center dark:shadow-2xl dark:shadow-blue-500 rounded-full">
                    {/* <img src="https://t4.ftcdn.net/jpg/09/26/93/69/360_F_926936965_2VuurfE4CFrEwTbnJaMtUmS58FVuGEYK.jpg" alt="" /> */}
                </div>
            </div>
            <Outlet />
        </div>
    );
};
