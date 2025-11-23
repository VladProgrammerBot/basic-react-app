import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router"
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";

export const Bar = () => {
    const navigate = useNavigate()
    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()
    const closeBar = store.use.closeBar()
    const setFolders = store.use.setFolders()
    const [username, setUsername] = useState("")

    // const token = localStorage.getItem("token")
    // const body = token?.split(".")
    // if (typeof token === "string" && body?.length === 3) {
    //     console.log(JSON.parse(atob(body[1])).userId)
    // }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        const payload = token.split(".")
        const data = JSON.parse(atob(payload[1]))
        setUsername(data.username)
    }, [])

    return (
        <div className={`${isBarOpen ? "w-screen sm:w-75 border-r-1" : "w-0"}  h-screen border-neutral-200 dark:border-neutral-700 pb-12 overflow-x-hidden fixed bg-white shadow-md shadow-neutral-300 dark:shadow-neutral-950 dark:bg-neutral-900 z-100 duration-300`}>
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
                    <p className="text-2xl text-center p-2 rounded-4xl mt-2">{username}</p>
                </div>
                <div className="text-lg">
                    <Button variant={"outline"} className="w-full border-red-500 text-red-500" onClick={() => {
                        localStorage.clear()
                        setFolders([])
                        closeBar()
                        navigate("/login")
                    }}><MdLogout className="text-xl" /> Log out</Button>
                </div>
            </div>
        </div>
    )
}