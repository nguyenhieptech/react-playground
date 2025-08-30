"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

type BranchContextType = {
  currentBranch: number;
  totalBranches: number;
  goToPrevious: () => void;
  goToNext: () => void;
  branches: React.ReactElement[];
  setBranches: (branches: React.ReactElement[]) => void;
};

const BranchContext = React.createContext<BranchContextType | null>(null);

function useBranch() {
  const context = React.useContext(BranchContext);

  if (!context) {
    throw new Error("Branch components must be used within Branch");
  }

  return context;
}

export type BranchProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultBranch?: number;
  onBranchChange?: (branchIndex: number) => void;
};

export function Branch({
  defaultBranch = 0,
  onBranchChange,
  className,
  ...props
}: BranchProps) {
  const [currentBranch, setCurrentBranch] = React.useState(defaultBranch);
  const [branches, setBranches] = React.useState<React.ReactElement[]>([]);

  function handleBranchChange(newBranch: number) {
    setCurrentBranch(newBranch);
    onBranchChange?.(newBranch);
  }

  function goToPrevious() {
    const newBranch = currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
    handleBranchChange(newBranch);
  }

  function goToNext() {
    const newBranch = currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
    handleBranchChange(newBranch);
  }

  const contextValue: BranchContextType = {
    currentBranch,
    totalBranches: branches.length,
    goToPrevious,
    goToNext,
    branches,
    setBranches,
  };

  return (
    <BranchContext.Provider value={contextValue}>
      <div className={cn("grid w-full gap-2 [&>div]:pb-0", className)} {...props} />
    </BranchContext.Provider>
  );
}

export type BranchMessagesProps = React.HTMLAttributes<HTMLDivElement>;

export function BranchMessages({ children, ...props }: BranchMessagesProps) {
  const { currentBranch, setBranches, branches } = useBranch();
  const childrenArray = Array.isArray(children) ? children : [children];

  // Use React.useEffect to update branches when they change
  React.useEffect(() => {
    if (branches.length !== childrenArray.length) {
      setBranches(childrenArray);
    }
  }, [childrenArray, branches, setBranches]);

  return childrenArray.map((branch, index) => (
    <div
      className={cn(
        "grid gap-2 overflow-hidden [&>div]:pb-0",
        index === currentBranch ? "block" : "hidden"
      )}
      key={branch.key}
      {...props}
    >
      {branch}
    </div>
  ));
}

export type BranchSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export function BranchSelector({ className, from, ...props }: BranchSelectorProps) {
  const { totalBranches } = useBranch();

  // Don't render if there's only one branch
  if (totalBranches <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 self-end px-10",
        from === "assistant" ? "justify-start" : "justify-end",
        className
      )}
      {...props}
    />
  );
}

export type BranchPreviousProps = React.ComponentProps<typeof Button>;

export function BranchPrevious({ className, children, ...props }: BranchPreviousProps) {
  const { goToPrevious, totalBranches } = useBranch();

  return (
    <Button
      aria-label="Previous branch"
      className={cn(
        "text-muted-foreground size-7 shrink-0 rounded-full transition-colors",
        "hover:bg-accent hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={totalBranches <= 1}
      onClick={goToPrevious}
      size="icon"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <ChevronLeftIcon size={14} />}
    </Button>
  );
}

export type BranchNextProps = React.ComponentProps<typeof Button>;

export function BranchNext({ className, children, ...props }: BranchNextProps) {
  const { goToNext, totalBranches } = useBranch();

  return (
    <Button
      aria-label="Next branch"
      className={cn(
        "text-muted-foreground size-7 shrink-0 rounded-full transition-colors",
        "hover:bg-accent hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={totalBranches <= 1}
      onClick={goToNext}
      size="icon"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <ChevronRightIcon size={14} />}
    </Button>
  );
}

export type BranchPageProps = React.HTMLAttributes<HTMLSpanElement>;

export function BranchPage({ className, ...props }: BranchPageProps) {
  const { currentBranch, totalBranches } = useBranch();

  return (
    <span
      className={cn("text-muted-foreground text-xs font-medium tabular-nums", className)}
      {...props}
    >
      {currentBranch + 1} of {totalBranches}
    </span>
  );
}
