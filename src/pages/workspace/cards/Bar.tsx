import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router"

export const Bar = () => {
    const navigate = useNavigate()
    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()

    return (
        <div className={`${isBarOpen ? "w-75" : "w-0"} duration-300 overflow-clip`}>
            <div className="border-r-1 p-2 h-screen border-neutral-900 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center">
                        <div className="text-xl p-2 font-bold cursor-pointer" onClick={() => {
                            navigate("/")
                        }}>
                            Strukt
                        </div>
                        <div onClick={toggleBar} className="px-2 py-1 text-2xl rounded-full w-fit cursor-pointer duration-150 dark:hover:bg-neutral-800">
                            <IoClose />
                        </div>
                    </div>
                    <p className="text-2xl text-center p-2 rounded-4xl mt-2">user228</p>
                </div>
                <div className="">
                    <Button variant={"outline"} className="w-full">Log out</Button>
                </div>
            </div>
        </div>
    )
}