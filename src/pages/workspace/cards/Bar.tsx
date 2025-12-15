import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { IoClose } from "react-icons/io5"
import { Link, useNavigate } from "react-router"
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { PiSignInBold } from "react-icons/pi";
import { FaBook } from "react-icons/fa";

export const Bar = () => {
    const navigate = useNavigate()
    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()
    const setFolders = store.use.setFolders()
    const [username, setUsername] = useState("")
    const isLogin = store.use.isLogin()
    const setIsGuideOpen = store.use.setIsGuideOpen()
    const isGuideOpen = store.use.isGuideOpen()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        const payload = token.split(".")
        const data = JSON.parse(atob(payload[1]))
        setUsername(data.username)
    }, [])

    return (
        <div className={`${!isBarOpen && "translate-x-full"} space-y-2 bg-white dark:bg-neutral-900 right-0 w-screen sm:w-75 h-screen fixed p-4 z-100 duration-150`}>
            <Button variant={"ghost"} size={"icon"} onClick={toggleBar}>
                <IoClose />
            </Button>
            <div className="text-2xl py-2 text-center">
                {username}
            </div>
            <Button variant={"ghost"} className="w-full px-3 justify-start" onClick={() => {
                navigate("/")
            }}><TiHome className="text-xl" /> Home</Button>
            {!isGuideOpen && (
                <Button variant={"ghost"} className="w-full px-3 justify-start" onClick={() => {
                    setIsGuideOpen(true)
                    toggleBar()
                }}>
                    <FaBook className="text-xl" /> Guide
                </Button>
            )}

            {isLogin ?
                <Button variant={"ghost"} className="w-full px-3 justify-start" onClick={() => {
                    navigate("/login")
                    localStorage.clear()
                    setFolders({})
                }}>
                    <MdLogout className="text-xl" /> Log out
                </Button> : (
                    <Link to={"/signup"}>
                        <Button variant={"ghost"} className="w-full px-3 justify-start text-black dark:text-white">
                            <PiSignInBold className="text-xl" /> Create account
                        </Button>
                    </Link>
                )}
        </div>
    )
}