import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router"
import { MdContentPaste, MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { usePath } from "@/hooks/folders/usePath";
import { RiGeminiFill } from "react-icons/ri";

export const Bar = () => {
    const navigate = useNavigate()
    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()
    const closeBar = store.use.closeBar()
    const setFolders = store.use.setFolders()
    const setMode = store.use.setMode()
    const [username, setUsername] = useState("")
    const { moveFolder } = usePath()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        const payload = token.split(".")
        const data = JSON.parse(atob(payload[1]))
        setUsername(data.username)
    }, [])

    return (
        <div className={`${!isBarOpen && "translate-x-full"} right-0 w-screen sm:w-75 h-screen border-neutral-200 dark:border-neutral-700 fixed p-4 sm:pl-0 z-100 duration-150`}>
            <div className="p-4 pb-8 bg-neutral-100 flex flex-col justify-between dark:bg-neutral-800 overflow-y-scroll h-full rounded-md">
                <div className="flex-col flex gap-2">
                    <div onClick={toggleBar} className="text-2xl pb-2 rounded-full w-fit cursor-pointer duration-150 dark:hover:bg-neutral-800">
                        <IoClose />
                    </div>
                    <Button onClick={() => {
                        setMode("Add Folder")
                        toggleBar()
                    }}>+ Add new note</Button>
                    <Button onClick={() => {
                        setMode("AI Generate")
                        toggleBar()
                    }} variant={"outline"}><RiGeminiFill />Generate with AI</Button>
                    <Button onClick={() => {
                        moveFolder()
                        toggleBar()
                    }} variant={"outline"}><MdContentPaste />Paste</Button>
                </div>
                <div className="space-y-2">
                    <div className="text-2xl py-2 text-center">
                        {username}
                    </div>
                    <Button variant={"outline"} className="w-full" onClick={() => {
                        localStorage.clear()
                        setFolders({})
                        closeBar()
                        navigate("/login")
                    }}><TiHome className="text-xl" /> Home</Button>
                    <Button variant={"outline"} className="w-full" onClick={() => {
                        localStorage.clear()
                        setFolders({})
                        closeBar()
                        navigate("/login")
                    }}><MdLogout className="text-xl" /> Log out</Button>
                </div>
            </div>
        </div>
    )
}