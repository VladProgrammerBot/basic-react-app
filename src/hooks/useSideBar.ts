import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import store from "@/state/store"
import { TiHome } from "react-icons/ti"
import { FaBook } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { HiUserAdd } from "react-icons/hi";

export const useBar = () => {
    const navigate = useNavigate()

    const isBarOpen = store.use.isBarOpen()
    const toggleBar = store.use.toggleBar()
    const setFolders = store.use.setFolders()
    const isLogin = store.use.isLogin()
    const isGuideOpen = store.use.isGuideOpen()
    const setIsGuideOpen = store.use.setIsGuideOpen()

    const [username, setUsername] = useState("")

    useEffect(() => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const [, payload] = token.split(".")
            const { username } = JSON.parse(atob(payload))
            setUsername(username ?? "")
        } catch {}
    }, [])

    const containerClass = useMemo(
        () =>
            `${!isBarOpen ? "translate-x-full" : ""} space-y-2 bg-neutral-100 dark:bg-white/5 backdrop-blur-lg right-0 w-screen sm:w-75 h-screen fixed p-4 z-100 duration-150`,
        [isBarOpen]
    )

    const go = (path: string) => {
        navigate(path)
        toggleBar()
    }

    const logout = () => {
        localStorage.clear()
        setFolders({})
        navigate("/login")
        toggleBar()
    }

    const actions = [
        {
            key: "home",
            label: "Home",
            icon: TiHome,
            show: true,
            onClick: () => go("/")
        },
        {
            key: "guide",
            label: "Guide",
            icon: FaBook,
            show: !isGuideOpen,
            onClick: () => {
                setIsGuideOpen(true)
                toggleBar()
            }
        },
        {
            key: "logout",
            label: "Log out",
            icon: MdLogout,
            show: isLogin,
            onClick: logout
        },
        {
            key: "signin",
            label: "Create account",
            icon: HiUserAdd,
            show: !isLogin,
            onClick: () => go("/signup")
        }
    ]

    return {
        containerClass,
        toggleBar,
        username,
        actions
    }
}
