import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex dark:text-white text-black items-center rounded-md cursor-pointer justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:text-neutral-400 duration-150 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size- shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border-1 border-neutral-400 dark:border-white/20 bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 backdrop-blur-lg dark:hover:bg-white/10",
        disactive: "bg-sky-600 cursor-auto",
        destructive: "text-white",
        outline:
          "text-black border-1 dark:text-white border-neutral-400 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-white/10",
        outlineNotActive:
          "border-1 text-black dark:text-white border-neutral-400 dark:border-neutral-900/0 cursor-auto text-neutral-400 dark:text-neutral-800",
        colorfull:
          "text-lg shadow-2xl shadow-sky-500/50 hover:shadow-2xl border-none hover:scale-105 px-8 py-6 transition-all duration-300 bg-sky-600 bg-gradient-to-r from-blue-600 to-purple-600 over:from-blue-700 over:to-purple-700 text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-neutral-300 dark:hover:bg-white/10",
        ghost2: "duration-150",
      },
      size: {
        default: "px-6 py-2 ",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h- rounded-md text-lg px-8 has-[>svg]:px-6 py-3",
        icon: "py-3 px-4",
        smIcon: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
