"use client";

import type { ToolUIPart } from "ai";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
  WrenchIcon,
  XCircleIcon,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

function Tool({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn("not-prose mb-4 w-full rounded-md border", className)}
      {...props}
    />
  );
}

function getStatusBadge(status: ToolUIPart["state"]) {
  const labels: Record<ToolUIPart["state"], string> = {
    "input-streaming": "Pending",
    "input-available": "Running",
    "approval-requested": "Awaiting Approval",
    "approval-responded": "Responded",
    "output-available": "Completed",
    "output-error": "Error",
    "output-denied": "Denied",
  };

  const icons: Record<ToolUIPart["state"], React.ReactNode> = {
    "input-streaming": <CircleIcon className="size-4" />,
    "input-available": <ClockIcon className="size-4 animate-pulse" />,
    "approval-requested": <ClockIcon className="size-4 text-yellow-600" />,
    "approval-responded": <CheckCircleIcon className="size-4 text-blue-600" />,
    "output-available": <CheckCircleIcon className="size-4 text-green-600" />,
    "output-error": <XCircleIcon className="size-4 text-red-600" />,
    "output-denied": <XCircleIcon className="size-4 text-orange-600" />,
  };

  return (
    <Badge className="gap-1.5 rounded-full text-xs" variant="secondary">
      {icons[status]}
      {labels[status]}
    </Badge>
  );
}

function ToolHeader({
  className,
  title,
  type,
  state,
  ...props
}: {
  title?: string;
  type: ToolUIPart["type"];
  state: ToolUIPart["state"];
  className?: string;
}) {
  return (
    <CollapsibleTrigger
      className={cn("flex w-full items-center justify-between gap-4 p-3", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <WrenchIcon className="text-muted-foreground size-4" />
        <span className="text-sm font-medium">
          {title ?? type.split("-").slice(1).join("-")}
        </span>
        {getStatusBadge(state)}
      </div>
      <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
  );
}

function ToolContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in outline-none",
        className
      )}
      {...props}
    />
  );
}

function ToolInput({
  className,
  input,
  ...props
}: React.ComponentProps<"div"> & {
  input: ToolUIPart["input"];
}) {
  return (
    <div className={cn("space-y-2 overflow-hidden p-4", className)} {...props}>
      <h4 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Parameters
      </h4>
      <div className="bg-muted/50 rounded-md">
        <CodeBlock code={JSON.stringify(input, null, 2)} language="json" />
      </div>
    </div>
  );
}

function ToolOutput({
  className,
  output,
  errorText,
  ...props
}: React.ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
}) {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as React.ReactNode}</div>;

  if (typeof output === "object" && !React.isValidElement(output)) {
    Output = <CodeBlock code={JSON.stringify(output, null, 2)} language="json" />;
  } else if (typeof output === "string") {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div className={cn("space-y-2 p-4", className)} {...props}>
      <h4 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {errorText ? "Error" : "Result"}
      </h4>
      <div
        className={cn(
          "overflow-x-auto rounded-md text-xs [&_table]:w-full",
          errorText ? "bg-destructive/10 text-destructive" : "bg-muted/50 text-foreground"
        )}
      >
        {errorText && <div>{errorText}</div>}
        {Output}
      </div>
    </div>
  );
}

export { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput };
