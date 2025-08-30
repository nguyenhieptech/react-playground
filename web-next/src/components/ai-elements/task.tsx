"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import * as React from "react";

export type TaskItemFileProps = React.ComponentProps<"div">;

export function TaskItemFile({ children, className, ...props }: TaskItemFileProps) {
  return (
    <div
      className={cn(
        "bg-secondary text-foreground inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type TaskItemProps = React.ComponentProps<"div">;

export function TaskItem({ children, className, ...props }: TaskItemProps) {
  return (
    <div className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </div>
  );
}

export type TaskProps = React.ComponentProps<typeof Collapsible>;

export function Task({ defaultOpen = true, className, ...props }: TaskProps) {
  return (
    <Collapsible
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      )}
      defaultOpen={defaultOpen}
      {...props}
    />
  );
}

export type TaskTriggerProps = React.ComponentProps<typeof CollapsibleTrigger> & {
  title: string;
};

export function TaskTrigger({ children, className, title, ...props }: TaskTriggerProps) {
  return (
    <CollapsibleTrigger asChild className={cn("group", className)} {...props}>
      {children ?? (
        <div className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2">
          <SearchIcon className="size-4" />
          <p className="text-sm">{title}</p>
          <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
        </div>
      )}
    </CollapsibleTrigger>
  );
}

export type TaskContentProps = React.ComponentProps<typeof CollapsibleContent>;

export function TaskContent({ children, className, ...props }: TaskContentProps) {
  return (
    <CollapsibleContent
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in outline-none",
        className
      )}
      {...props}
    >
      <div className="border-muted mt-4 space-y-2 border-l-2 pl-4">{children}</div>
    </CollapsibleContent>
  );
}
