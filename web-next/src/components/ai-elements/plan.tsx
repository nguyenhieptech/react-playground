"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";
import { createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Shimmer } from "./shimmer";

type PlanContextValue = {
  isStreaming: boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("Plan components must be used within Plan");
  }
  return context;
}

function Plan({
  className,
  isStreaming = false,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean;
}) {
  return (
    <PlanContext.Provider value={{ isStreaming }}>
      <Collapsible asChild data-slot="plan" {...props}>
        <Card className={cn("shadow-none", className)}>{children}</Card>
      </Collapsible>
    </PlanContext.Provider>
  );
}

function PlanHeader({ className, ...props }: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      className={cn("flex items-start justify-between", className)}
      data-slot="plan-header"
      {...props}
    />
  );
}

function PlanTitle({
  children,
  ...props
}: Omit<React.ComponentProps<typeof CardTitle>, "children"> & {
  children: string;
}) {
  const { isStreaming } = usePlan();

  return (
    <CardTitle data-slot="plan-title" {...props}>
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardTitle>
  );
}

function PlanDescription({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CardDescription>, "children"> & {
  children: string;
}) {
  const { isStreaming } = usePlan();

  return (
    <CardDescription
      className={cn("text-balance", className)}
      data-slot="plan-description"
      {...props}
    >
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardDescription>
  );
}

function PlanAction(props: React.ComponentProps<typeof CardAction>) {
  return <CardAction data-slot="plan-action" {...props} />;
}

function PlanContent(props: React.ComponentProps<typeof CardContent>) {
  return (
    <CollapsibleContent asChild>
      <CardContent data-slot="plan-content" {...props} />
    </CollapsibleContent>
  );
}

function PlanFooter(props: React.ComponentProps<"div">) {
  return <CardFooter data-slot="plan-footer" {...props} />;
}

function PlanTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger asChild>
      <Button
        className={cn("size-8", className)}
        data-slot="plan-trigger"
        size="icon"
        variant="ghost"
        {...props}
      >
        <ChevronsUpDownIcon className="size-4" />
        <span className="sr-only">Toggle plan</span>
      </Button>
    </CollapsibleTrigger>
  );
}

export {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
};
