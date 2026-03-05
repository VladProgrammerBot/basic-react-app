import type { ReactNode } from "react";
import { MdKeyboardCommandKey } from "react-icons/md";

export const Hotkey = ({
  is,
  className,
  icon,
}: {
  is: string;
  className?: string;
  icon?: ReactNode;
}) => {
  return (
    <div
      className={`text-green-500 flex items-center gap-1 bg-green-500/10 w-fit px-2 rounded-full text-nowrap max-lg:hidden ${className}`}
    >
      {icon ?? (<MdKeyboardCommandKey size={15} />)}
      <p className="text-sm">{is}</p>
    </div>
  );
};
