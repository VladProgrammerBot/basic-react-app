import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Breadcrumb } from "./BreadCrumb"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import store from "@/state/store";

export const HiddenCrumbs = ({ hiddenCrumbs }: { hiddenCrumbs: () => folder[] }) => {
    const isMenuOpen = store.use.isMenuOpen()
    const toggleMenu = store.use.toggleMenu()

    return (
        <DropdownMenu open={isMenuOpen} onOpenChange={toggleMenu}>
            <DropdownMenuTrigger className="outline-none">
                <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer px-2 hover:bg-neutral-200 duration-150 dark:hover:bg-neutral-800 rounded-md outline-none">
                        <p>...</p>
                    </TooltipTrigger>
                    <TooltipContent>p</TooltipContent>
                </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent alignOffset={-10} align="start" sideOffset={-5}>
                {hiddenCrumbs().map((crumb, index) => {
                    return (
                        <DropdownMenuItem key={index} className="flex gap-1 p-0 cursor-pointer duration-150 text-nowrap">
                            <Breadcrumb maxLen={30} key={index} elem={crumb} index={index + 1} className="dark:text-neutral-500 dark:hover:text-white w-full px-4 py-1" />
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}