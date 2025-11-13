import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router"

export const Bar = () => {
    const navigate = useNavigate()
    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()
    const closeBar = store.use.closeBar()
    const setFolders = store.use.setFolders()

    // const token = localStorage.getItem("token")
    // const body = token?.split(".")
    // if (typeof token === "string" && body?.length === 3) {
    //     console.log(JSON.parse(atob(body[1])).userId)
    // }

    return (
        <div className={`${isBarOpen ? "w-screen sm:w-75" : "w-0"} h-screen border-r- border-neutral-200 dark:border-neutral-900 pb-12 overflow-x-hidden fixed bg-indigo-600 dark:bg-gradient-to-r from-violet-600 to-indigo-600 z-100 duration-300`}>
            <div className="space-y-4 p-2">
                <div>
                    <div className="flex justify-between items-center">
                        <div className="text-xl p-2 font-bold cursor-pointer" onClick={() => {
                            navigate("/")
                            setFolders([])
                            closeBar()
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
                    <Button variant={"outline"} className="w-full border-red-500 text-red-500" onClick={() => {
                        localStorage.clear()
                        setFolders([])
                        closeBar()
                        navigate("/login")
                    }}>Log out</Button>
                </div>
            </div>
        </div>
    )
}