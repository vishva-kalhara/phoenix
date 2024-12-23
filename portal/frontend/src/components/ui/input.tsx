import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            // focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
            <input
                type={type}
                className={cn(
                    "bg-white/5 text-sm outline-none flex h-10 w-full rounded-md border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-[#C6FCA6] focus-visible:border px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
