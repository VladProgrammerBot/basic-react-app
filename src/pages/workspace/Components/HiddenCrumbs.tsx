import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Breadcrumb } from "./Breadcrumb";
import store from "@/state/store";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { RiHistoryFill } from "react-icons/ri";
import { Hotkey } from "../ui-elements/HotKeyTip";

export const HiddenCrumbs = () => {
  const isMenuOpen = store.use.isMenuOpen();
  const toggleMenu = store.use.toggleMenu();
  const { hiddenCrumbs } = useBreadcrumbs();

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={toggleMenu}>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="flex items-center px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150">
          <RiHistoryFill />
          <Hotkey is={"P"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent alignOffset={-10} align="start" sideOffset={-5}>
        {hiddenCrumbs().map((crumb, index) => {
          return (
            <DropdownMenuItem key={crumb.id} className="p-0">
              <Breadcrumb
                maxLen={30}
                elem={crumb}
                index={index}
                className="w-full px-4 py-2"
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
