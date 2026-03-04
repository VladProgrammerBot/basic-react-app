import { HiArrowTurnDownRight, HiArrowTurnRightDown } from "react-icons/hi2";

export const ConnectedItem = ({ title }: { title: string }) => {
  return (
    <li
      className={`flex items-center pl-2 hover:bg-neutral-600 bg-neutral-700 duration-150 cursor-pointer w-full rounded-xl`}
    >
      <span className="text-sm text-neutral-400 flex items-center">
        2
        <HiArrowTurnDownRight />
      </span>
      <p className="flex-1 p-2 px-2">{title}</p>
      <span className="text-sm p-2 text-neutral-400 flex items-center">
        <HiArrowTurnRightDown />
        5
      </span>
    </li>
  );
};
