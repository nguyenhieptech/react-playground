"use client";

import { ChevronDownIcon, PaperclipIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type QueueMessagePart = {
  type: string;
  text?: string;
  url?: string;
  filename?: string;
  mediaType?: string;
};

type QueueMessage = {
  id: string;
  parts: QueueMessagePart[];
};

type QueueTodo = {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "completed";
};

function QueueItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "group hover:bg-muted flex flex-col gap-1 rounded-md px-3 py-1 text-sm transition-colors",
        className
      )}
      {...props}
    />
  );
}

function QueueItemIndicator({
  completed = false,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  completed?: boolean;
}) {
  return (
    <span
      className={cn(
        "mt-0.5 inline-block size-2.5 rounded-full border",
        completed
          ? "border-muted-foreground/20 bg-muted-foreground/10"
          : "border-muted-foreground/50",
        className
      )}
      {...props}
    />
  );
}

function QueueItemContent({
  completed = false,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  completed?: boolean;
}) {
  return (
    <span
      className={cn(
        "line-clamp-1 grow break-words",
        completed ? "text-muted-foreground/50 line-through" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function QueueItemDescription({
  completed = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  completed?: boolean;
}) {
  return (
    <div
      className={cn(
        "ml-6 text-xs",
        completed ? "text-muted-foreground/40 line-through" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function QueueItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex gap-1", className)} {...props} />;
}

function QueueItemAction({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button
      className={cn(
        "text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground size-auto rounded p-1 opacity-0 transition-opacity group-hover:opacity-100",
        className
      )}
      size="icon"
      type="button"
      variant="ghost"
      {...props}
    />
  );
}

function QueueItemAttachment({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-1 flex flex-wrap gap-2", className)} {...props} />;
}

function QueueItemImage({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      alt=""
      className={cn("h-8 w-8 rounded border object-cover", className)}
      height={32}
      width={32}
      {...props}
    />
  );
}

function QueueItemFile({ children, className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "bg-muted flex items-center gap-1 rounded border px-2 py-1 text-xs",
        className
      )}
      {...props}
    >
      <PaperclipIcon size={12} />
      <span className="max-w-[100px] truncate">{children}</span>
    </span>
  );
}

function QueueList({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea className={cn("mt-2 -mb-1", className)} {...props}>
      <div className="max-h-40 pr-4">
        <ul>{children}</ul>
      </div>
    </ScrollArea>
  );
}

// QueueSection - collapsible section container
function QueueSection({
  className,
  defaultOpen = true,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return <Collapsible className={cn(className)} defaultOpen={defaultOpen} {...props} />;
}

// QueueSectionTrigger - section header/trigger
function QueueSectionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <CollapsibleTrigger asChild>
      <button
        className={cn(
          "group bg-muted/40 text-muted-foreground hover:bg-muted flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
          className
        )}
        type="button"
        {...props}
      >
        {children}
      </button>
    </CollapsibleTrigger>
  );
}

// QueueSectionLabel - label content with icon and count
function QueueSectionLabel({
  count,
  label,
  icon,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  count?: number;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)} {...props}>
      <ChevronDownIcon className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
      {icon}
      <span>
        {count} {label}
      </span>
    </span>
  );
}

// QueueSectionContent - collapsible content area
function QueueSectionContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return <CollapsibleContent className={cn(className)} {...props} />;
}

function Queue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-border bg-background flex flex-col gap-2 rounded-xl border px-3 pt-2 pb-2 shadow-xs",
        className
      )}
      {...props}
    />
  );
}

export {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
  type QueueMessage,
  type QueueMessagePart,
  type QueueTodo,
};
