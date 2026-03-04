"use client";

import { BookmarkIcon, type LucideProps } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function Checkpoint({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center gap-0.5 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
      <Separator />
    </div>
  );
}

function CheckpointIcon({ className, children, ...props }: LucideProps) {
  return (
    children ?? <BookmarkIcon className={cn("size-4 shrink-0", className)} {...props} />
  );
}

function CheckpointTrigger({
  children,
  className,
  variant = "ghost",
  size = "sm",
  tooltip,
  ...props
}: React.ComponentProps<typeof Button> & {
  tooltip?: string;
}) {
  return tooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={size} type="button" variant={variant} {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Button size={size} type="button" variant={variant} {...props}>
      {children}
    </Button>
  );
}

export { Checkpoint, CheckpointIcon, CheckpointTrigger };
