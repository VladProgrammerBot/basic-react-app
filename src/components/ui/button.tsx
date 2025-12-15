import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

export const buttonVariants = cva(
  "rounded-m inline-flex min-w-14 items-center rounded-md cursor-pointer justify-center gap-2 whitespace-nowrap disabled:pointer-events-none duration-150 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size- shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 border-1 dark:border-neutral-600 border-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
        disactive: "bg-sky-600 cursor-auto",
        destructive:
          "text-white",
        outline:
          "text-black dark:text-white border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        outlineNotActive:
          "border-1 text-black dark:text-white border-neutral-300 dark:border-neutral-900/0 cursor-auto text-neutral-400 dark:text-neutral-800",
          
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-neutral-300 hover:text-black dark:hover:bg-neutral-700 dark:hover:text-white text-xl text-neutral-600 dark:text-neutral-400",
        ghost2: "duration-150",
      },
      size: {
        default: "px-6 py-2 ",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
