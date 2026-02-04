import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Breadcrumb } from "./BreadCrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import store from "@/state/store";
import { FaHistory } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export const HiddenCrumbs = () => {
  const isMenuOpen = store.use.isMenuOpen();
  const toggleMenu = store.use.toggleMenu();
  const path = store.use.path();
  const { hiddenCrumbs } = useBreadcrumbs();
  const isStyled = store.use.isStyled();

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={toggleMenu}>
      <DropdownMenuTrigger className="outline-none">
        <Tooltip>
          <TooltipTrigger
            asChild
          >
            <Button disabled={path.length === 1} className={`${!isStyled && "lg:hidden"} mx-1`} size={"icon"}>
              <FaHistory />
            </Button>
          </TooltipTrigger>
          <TooltipContent>p</TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent alignOffset={-10} align="start" sideOffset={-5}>
        {hiddenCrumbs().map((crumb, index) => {
          return (
            <DropdownMenuItem
              key={crumb.id}
              // className="text-white"
              className="p-0"
            >
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
