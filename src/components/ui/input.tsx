import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground bg-neutral-200 dark:bg-neutral-800 placeholder:text-muted-foreground rounded-md selection:text-primary-foreground border-neutral-300 dark:border-neutral-600 h-9 w-full min-w-0 border px-4 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 border-none file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
