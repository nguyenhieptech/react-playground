import * as React from "react";
import { cn } from "@/lib/utils";
import { NodeToolbar, Position } from "@xyflow/react";

type ToolbarProps = React.ComponentProps<typeof NodeToolbar>;

function Toolbar({ className, ...props }: ToolbarProps) {
  return (
    <NodeToolbar
      className={cn(
        "bg-background flex items-center gap-1 rounded-sm border p-1.5",
        className
      )}
      position={Position.Bottom}
      {...props}
    />
  );
}

export { Toolbar };
