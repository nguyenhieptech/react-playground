"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controls as ControlsPrimitive } from "@xyflow/react";

function Controls({
  className,
  ...props
}: React.ComponentProps<typeof ControlsPrimitive>) {
  return (
    <ControlsPrimitive
      className={cn(
        "bg-card gap-px overflow-hidden rounded-md border p-1 shadow-none!",
        "[&>button]:hover:bg-secondary! [&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent!",
        className
      )}
      {...props}
    />
  );
}

export { Controls };
