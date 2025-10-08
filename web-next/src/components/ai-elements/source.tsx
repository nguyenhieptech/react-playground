"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { BookIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

function Sources({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn("not-prose text-primary mb-4 text-xs", className)}
      {...props}
    />
  );
}

function SourcesTrigger({
  className,
  count,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & {
  count: number;
}) {
  return (
    <CollapsibleTrigger className="flex items-center gap-2" {...props}>
      {children ?? (
        <>
          <p className="font-medium">Used {count} sources</p>
          <ChevronDownIcon className="h-4 w-4" />
        </>
      )}
    </CollapsibleTrigger>
  );
}

function SourcesContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      className={cn(
        "mt-3 flex w-fit flex-col gap-2",
        "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=open]:animate-in outline-none",
        className
      )}
      {...props}
    />
  );
}

function Source({ href, title, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className="flex items-center gap-2"
      href={href}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children ?? (
        <>
          <BookIcon className="h-4 w-4" />
          <span className="block font-medium">{title}</span>
        </>
      )}
    </a>
  );
}

export { Source, Sources, SourcesContent, SourcesTrigger };
