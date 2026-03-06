import { HiArrowTurnDownRight } from "react-icons/hi2";
import { FaLink } from "react-icons/fa6";

import { Hotkey } from "../ui-elements/HotKeyTip";
import { Button } from "../ui-elements/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import store from "@/state/store";
import { useItem } from "@/hooks/folders/useItem";

export const ItemTitle = () => {
  // Store state
  const folders = store.use.folders();
  const path = store.use.path();
  const isStyled = store.use.isStyled();
  const { moveInto } = useItem();

  // Current item data
  const currentItem = folders[path[path.length - 1].id];

  // Backlinks data
  const backlinksCount = currentItem?.backlinks?.length || 0;
  const backlinksData = getBacklinksData(currentItem?.backlinks || [], folders);

  const handleBacklinkClick = (backlinkId: number) => {
    moveInto(backlinkId, 0);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        {backlinksCount > 0 && (
          <BacklinksDropdown
            count={backlinksCount}
            backlinks={backlinksData}
            isStyled={isStyled}
            onBacklinkClick={handleBacklinkClick}
          />
        )}
        <ItemTitleDisplay title={currentItem?.title} />
      </div>

      {isStyled && <ReferenceButton />}
    </div>
  );
};

// Helper function to get backlinks data
const getBacklinksData = (
  backlinkIds: number[],
  folders: Record<number, folder>,
): folder[] => {
  return backlinkIds
    .map((backlinkId) => folders[backlinkId])
    .filter(Boolean) as folder[];
};

// Component for displaying the item title
const ItemTitleDisplay = ({ title }: { title?: string }) => (
  <p className="font-bold text-xl px-2">{title}</p>
);

// Component for backlinks dropdown
const BacklinksDropdown = ({
  count,
  backlinks,
  isStyled,
  onBacklinkClick,
}: {
  count: number;
  backlinks: folder[];
  isStyled: boolean;
  onBacklinkClick: (id: number) => void;
}) => {
  const mode = store.use.mode();
  const setMode = store.use.setMode();
  const selectedItemId = store.use.selectedItemId();

  return (
    <DropdownMenu onOpenChange={(open) => setMode(open ? "Backlinks" : "normal")} open={mode === "Backlinks"}>
      <DropdownMenuTrigger asChild>
        <Button className="text-neutral-400">
          {count}
          {isStyled && <HiArrowTurnDownRight />}
          <Hotkey is="B" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {backlinks.map((backlink, index) => (
          <DropdownMenuItem
            key={backlink.id}
            onClick={() => onBacklinkClick(backlink.id)}
            className={`cursor-pointer ${index === selectedItemId ? "bg-neutral-700" : ""}`}
          >
            {backlink.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Component for reference button
const ReferenceButton = () => (
  <Button className="py-2">
    <FaLink fontSize={17} />
    <Hotkey is="R" />
  </Button>
);
