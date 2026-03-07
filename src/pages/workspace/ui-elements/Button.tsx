import type { ReactNode } from "react";

export const Button = ({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={
        "py-1 px-4 -1 cursor-pointer flex items-center gap-1 rounded-xl bg-neutral-700 hover:bg-neutral-600 duration-150 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};
