import { Button } from "@/components/ui/button"
import { IoClose } from "react-icons/io5"
import { useBar } from "@/hooks/useSideBar"

export const Bar = () => {
    const { containerClass, toggleBar, actions, username } = useBar()

    return (
        <div className={containerClass}>
            <Button variant="ghost" size="icon" onClick={toggleBar}>
                <IoClose />
            </Button>

            <div className="text-2xl py-2 text-center">{username}</div>

            {actions
                .filter(a => a.show)
                .map(({ key, label, icon: Icon, onClick }) => (
                    <Button
                        key={key}
                        variant="ghost"
                        className="w-full px-3 justify-start"
                        onClick={onClick}
                    >
                        <Icon className="text-xl" /> {label}
                    </Button>
                ))}
        </div>
    )
}