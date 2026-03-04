import * as React from "react";
import { cn } from "@/lib/utils";
import { Panel as PanelPrimitive } from "@xyflow/react";

function Panel({ className, ...props }: React.ComponentProps<typeof PanelPrimitive>) {
  return (
    <PanelPrimitive
      className={cn("bg-card m-4 overflow-hidden rounded-md border p-1", className)}
      {...props}
    />
  );
}

export { Panel };
