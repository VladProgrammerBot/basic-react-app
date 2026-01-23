import { Button } from "@/components/ui/button"
import { IoClose } from "react-icons/io5"
import { useBar } from "@/hooks/useSideBar"
import store from "@/state/store"

export const Bar = () => {
    const {  toggleBar, actions, username } = useBar()
    const isBarOpen = store.use.isBarOpen()

    return (
        <div className={`${!isBarOpen ? "translate-x-[100vw]" : ""} space-y-1 bg-white dark:bg-white/0 dark:border-1 rounded-md border-neutral-400 dark:border-white/20 backdrop-blur-sm right-2 top-2 w-[calc(100vw-1rem)] sm:w-75 h-[calc(100vh-1rem)] fixed p-4 z-100 duration-150`}>
            <Button variant="ghost" size="icon" onClick={toggleBar}>
                <IoClose />
            </Button>

            <div className="text-2xl py-2 text-center">{username}</div>

            {actions
                .filter(a => a.show)
                .map(({ key, label, icon: Icon, onClick }) => (
                    <Button
                        key={key}
                        // variant="ghost"
                        className="w-full px-3 justify-start"
                        onClick={onClick}
                    >
                        <Icon className="text-xl" /> {label}
                    </Button>
                ))}
        </div>
    )
}