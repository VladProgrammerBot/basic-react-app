import { HiArrowTurnDownRight } from "react-icons/hi2";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { FaLink } from "react-icons/fa6";
import { Button } from "../ui-elements/Button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import store from "@/state/store";

export const ItemTitle = () => {
  const folders = store.use.folders();
  const path = store.use.path();
  const isStyled = store.use.isStyled();
  const item = folders[path[path.length - 1].id];
  
  const backlinksCount = item?.backlinks?.length || 0;
  const backlinksData = item?.backlinks?.map(backlinkId => folders[backlinkId]).filter(Boolean) || [];

  const handleBacklinkClick = (backlinkId: number) => {
    console.log('Navigate to backlink:', backlinkId);
  };

  return (
    <div className="flex items-start justify-between">
      <span className="flex items-start">
        {backlinksCount > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-neutral-400">
                {backlinksCount}
                {isStyled && <HiArrowTurnDownRight />}
                <Hotkey is="B" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {backlinksData.map((backlink) => (
                <DropdownMenuItem 
                  key={backlink.id}
                  onClick={() => handleBacklinkClick(backlink.id)}
                  className="cursor-pointer"
                >
                  {backlink.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <p className="font-bold text-xl px-2">{item?.title}</p>
      </span>
      {isStyled && (
        <Button className="py-2">
          <FaLink fontSize={17} />
          <Hotkey is="R" />
        </Button>
      )}
    </div>
  );
};
