import { Button } from "@/components/ui/button"
import store from "@/state/store"
import { IoClose } from "react-icons/io5"
import { Link, useNavigate } from "react-router"
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { PiSignInBold } from "react-icons/pi";

export const Bar = () => {
    const navigate = useNavigate()
    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()
    const setFolders = store.use.setFolders()
    const [username, setUsername] = useState("")
    const isLogin = store.use.isLogin()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        const payload = token.split(".")
        const data = JSON.parse(atob(payload[1]))
        setUsername(data.username)
    }, [])

    return (
        <div className={`${!isBarOpen && "translate-x-full"} space-y-2 bg-white dark:bg-neutral-900 right-0 w-screen sm:w-75 h-screen fixed p-4 z-100 duration-150`}>
            <div onClick={toggleBar} className="text-2xl p-1 w-fit cursor-pointer duration-150 dark:hover:bg-neutral-800">
                <IoClose />
            </div>
            <div className="text-2xl py-2 text-center">
                {username}
            </div>
            <Button className="w-full" onClick={() => {
                navigate("/")
            }}><TiHome className="text-xl" /> Home</Button>
            {isLogin ?
                <Button className="w-full" onClick={() => {
                    navigate("/login")
                    localStorage.clear()
                    setFolders({})
                }}>
                    <MdLogout className="text-xl" /> Log out
                </Button> : (
                    <Link to={"/signup"}>
                        <Button className="w-full text-black dark:text-white">
                            <PiSignInBold className="text-xl" /> Create account
                        </Button>
                    </Link>
                )}
        </div>
    )
}