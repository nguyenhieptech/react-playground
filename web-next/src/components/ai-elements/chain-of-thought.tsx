"use client";

import { BrainIcon, ChevronDownIcon, DotIcon, type LucideIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

type ChainOfThoughtContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ChainOfThoughtContext = React.createContext<ChainOfThoughtContextValue | null>(
  null
);

function useChainOfThought() {
  const context = React.useContext(ChainOfThoughtContext);
  if (!context) {
    throw new Error("ChainOfThought components must be used within ChainOfThought");
  }
  return context;
}

const ChainOfThought = React.memo(
  ({
    className,
    open,
    defaultOpen = false,
    onOpenChange,
    children,
    ...props
  }: React.ComponentProps<"div"> & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) => {
    const [isOpen, setIsOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const chainOfThoughtContext = React.useMemo(
      () => ({ isOpen, setIsOpen }),
      [isOpen, setIsOpen]
    );

    return (
      <ChainOfThoughtContext.Provider value={chainOfThoughtContext}>
        <div className={cn("not-prose max-w-prose space-y-4", className)} {...props}>
          {children}
        </div>
      </ChainOfThoughtContext.Provider>
    );
  }
);
ChainOfThought.displayName = "ChainOfThought";

const ChainOfThoughtHeader = React.memo(
  ({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof CollapsibleTrigger>) => {
    const { isOpen, setIsOpen } = useChainOfThought();

    return (
      <Collapsible onOpenChange={setIsOpen} open={isOpen}>
        <CollapsibleTrigger
          className={cn(
            "text-muted-foreground hover:text-foreground flex w-full items-center gap-2 text-sm transition-colors",
            className
          )}
          {...props}
        >
          <BrainIcon className="size-4" />
          <span className="flex-1 text-left">{children ?? "Chain of Thought"}</span>
          <ChevronDownIcon
            className={cn(
              "size-4 transition-transform",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </CollapsibleTrigger>
      </Collapsible>
    );
  }
);
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";

const ChainOfThoughtStep = React.memo(
  ({
    className,
    icon: Icon = DotIcon,
    label,
    description,
    status = "complete",
    children,
    ...props
  }: React.ComponentProps<"div"> & {
    icon?: LucideIcon;
    label: React.ReactNode;
    description?: React.ReactNode;
    status?: "complete" | "active" | "pending";
  }) => {
    const statusStyles = {
      complete: "text-muted-foreground",
      active: "text-foreground",
      pending: "text-muted-foreground/50",
    };

    return (
      <div
        className={cn(
          "flex gap-2 text-sm",
          statusStyles[status],
          "fade-in-0 slide-in-from-top-2 animate-in",
          className
        )}
        {...props}
      >
        <div className="relative mt-0.5">
          <Icon className="size-4" />
          <div className="bg-border absolute top-7 bottom-0 left-1/2 -mx-px w-px" />
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div>{label}</div>
          {description && (
            <div className="text-muted-foreground text-xs">{description}</div>
          )}
          {children}
        </div>
      </div>
    );
  }
);
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";

const ChainOfThoughtSearchResults = React.memo(
  ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
  )
);
ChainOfThoughtSearchResults.displayName = "ChainOfThoughtSearchResults";

const ChainOfThoughtSearchResult = React.memo(
  ({ className, children, ...props }: React.ComponentProps<typeof Badge>) => (
    <Badge
      className={cn("gap-1 px-2 py-0.5 text-xs font-normal", className)}
      variant="secondary"
      {...props}
    >
      {children}
    </Badge>
  )
);
ChainOfThoughtSearchResult.displayName = "ChainOfThoughtSearchResult";

const ChainOfThoughtContent = React.memo(
  ({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof CollapsibleContent>) => {
    const { isOpen } = useChainOfThought();

    return (
      <Collapsible open={isOpen}>
        <CollapsibleContent
          className={cn(
            "mt-2 space-y-3",
            "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in outline-none",
            className
          )}
          {...props}
        >
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }
);
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";

const ChainOfThoughtImage = React.memo(
  ({
    className,
    children,
    caption,
    ...props
  }: React.ComponentProps<"div"> & {
    caption?: string;
  }) => (
    <div className={cn("mt-2 space-y-2", className)} {...props}>
      <div className="bg-muted relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-lg p-3">
        {children}
      </div>
      {caption && <p className="text-muted-foreground text-xs">{caption}</p>}
    </div>
  )
);
ChainOfThoughtImage.displayName = "ChainOfThoughtImage";

export {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
};
