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
  const folders = store.use.folders();
  const path = store.use.path();
  const designMode = store.use.designMode();
  const moveBuffer = store.use.moveBuffer();
  const { moveInto } = useItem();

  const currentItem = folders[path[path.length - 1].id];

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
            designMode={designMode}
            onBacklinkClick={handleBacklinkClick}
          />
        )}
        <ItemTitleDisplay title={currentItem?.title} />
      </div>

      {designMode !== "Minimalistic" && moveBuffer !== null && (
        <ReferenceButton />
      )}
    </div>
  );
};

const getBacklinksData = (
  backlinkIds: number[],
  folders: Record<number, folder>,
): folder[] => {
  return backlinkIds
    .map((backlinkId) => folders[backlinkId])
    .filter(Boolean) as folder[];
};

const ItemTitleDisplay = ({ title }: { title?: string }) => (
  <p className="font-bold text-xl px-2">{title}</p>
);

const BacklinksDropdown = ({
  count,
  backlinks,
  designMode,
  onBacklinkClick,
}: {
  count: number;
  backlinks: folder[];
  designMode: "normal" | "withKeyTips" | "Minimalistic";
  onBacklinkClick: (id: number) => void;
}) => {
  const mode = store.use.mode();
  const setMode = store.use.setMode();
  const selectedItemId = store.use.selectedItemId();

  return (
    <DropdownMenu
      onOpenChange={(open) => setMode(open ? "Backlinks" : "normal")}
      open={mode === "Backlinks"}
    >
      <DropdownMenuTrigger asChild>
        <Button className="text-neutral-400">
          {count}
          {designMode !== "Minimalistic" && <HiArrowTurnDownRight />}
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

const ReferenceButton = () => {
  const { addConnection } = useItem();

  return (
    <Button className="py-2" onClick={() => addConnection()}>
      <FaLink fontSize={17} />
      <Hotkey is="R" />
    </Button>
  );
};
