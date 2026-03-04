"use client";

import type { FileUIPart, UIMessage } from "ai";
import { ChevronLeftIcon, ChevronRightIcon, PaperclipIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function Message({
  className,
  from,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
}) {
  return (
    <div
      className={cn(
        "group flex w-full max-w-[95%] flex-col gap-2",
        from === "user" ? "is-user ml-auto justify-end" : "is-assistant",
        className
      )}
      {...props}
    />
  );
}

function MessageContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "is-user:dark flex w-fit max-w-full min-w-0 flex-col gap-2 overflow-hidden text-sm",
        "group-[.is-user]:bg-secondary group-[.is-user]:text-foreground group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:px-4 group-[.is-user]:py-3",
        "group-[.is-assistant]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function MessageActions({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  );
}

function MessageAction({
  tooltip,
  children,
  label,
  variant = "ghost",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
}) {
  const button = (
    <Button size={size} type="button" variant={variant} {...props}>
      {children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}

type MessageBranchContextType = {
  currentBranch: number;
  totalBranches: number;
  goToPrevious: () => void;
  goToNext: () => void;
  branches: React.ReactElement[];
  setBranches: (branches: React.ReactElement[]) => void;
};

const MessageBranchContext = React.createContext<MessageBranchContextType | null>(null);

function useMessageBranch() {
  const context = React.useContext(MessageBranchContext);

  if (!context) {
    throw new Error("MessageBranch components must be used within MessageBranch");
  }

  return context;
}

function MessageBranch({
  defaultBranch = 0,
  onBranchChange,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultBranch?: number;
  onBranchChange?: (branchIndex: number) => void;
}) {
  const [currentBranch, setCurrentBranch] = React.useState(defaultBranch);
  const [branches, setBranches] = React.useState<React.ReactElement[]>([]);

  const handleBranchChange = (newBranch: number) => {
    setCurrentBranch(newBranch);
    onBranchChange?.(newBranch);
  };

  const goToPrevious = () => {
    const newBranch = currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
    handleBranchChange(newBranch);
  };

  const goToNext = () => {
    const newBranch = currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
    handleBranchChange(newBranch);
  };

  const contextValue: MessageBranchContextType = {
    currentBranch,
    totalBranches: branches.length,
    goToPrevious,
    goToNext,
    branches,
    setBranches,
  };

  return (
    <MessageBranchContext.Provider value={contextValue}>
      <div className={cn("grid w-full gap-2 [&>div]:pb-0", className)} {...props} />
    </MessageBranchContext.Provider>
  );
}

function MessageBranchContent({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { currentBranch, setBranches, branches } = useMessageBranch();
  const childrenArray = Array.isArray(children) ? children : [children];

  // Use useEffect to update branches when they change
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

function MessageBranchSelector({
  className,
  from,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
}) {
  const { totalBranches } = useMessageBranch();

  // Don't render if there's only one branch
  if (totalBranches <= 1) {
    return null;
  }

  return (
    <ButtonGroup
      className="[&>*:not(:first-child)]:rounded-l-md [&>*:not(:last-child)]:rounded-r-md"
      orientation="horizontal"
      {...props}
    />
  );
}

function MessageBranchPrevious({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { goToPrevious, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Previous branch"
      disabled={totalBranches <= 1}
      onClick={goToPrevious}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <ChevronLeftIcon size={14} />}
    </Button>
  );
}

function MessageBranchNext({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { goToNext, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Next branch"
      disabled={totalBranches <= 1}
      onClick={goToNext}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <ChevronRightIcon size={14} />}
    </Button>
  );
}

function MessageBranchPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <ButtonGroupText
      className={cn(
        "text-muted-foreground border-none bg-transparent shadow-none",
        className
      )}
      {...props}
    >
      {currentBranch + 1} of {totalBranches}
    </ButtonGroupText>
  );
}

const MessageResponse = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof Streamdown>) => (
    <Streamdown
      className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
MessageResponse.displayName = "MessageResponse";

function MessageAttachment({
  data,
  className,
  onRemove,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  data: FileUIPart;
  className?: string;
  onRemove?: () => void;
}) {
  const filename = data.filename || "";
  const mediaType = data.mediaType?.startsWith("image/") && data.url ? "image" : "file";
  const isImage = mediaType === "image";
  const attachmentLabel = filename || (isImage ? "Image" : "Attachment");

  return (
    <div
      className={cn("group relative size-24 overflow-hidden rounded-lg", className)}
      {...props}
    >
      {isImage ? (
        <>
          <img
            alt={filename || "attachment"}
            className="size-full object-cover"
            height={100}
            src={data.url}
            width={100}
          />
          {onRemove && (
            <Button
              aria-label="Remove attachment"
              className="bg-background/80 hover:bg-background absolute top-2 right-2 size-6 rounded-full p-0 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 [&>svg]:size-3"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              variant="ghost"
            >
              <XIcon />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </>
      ) : (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-muted text-muted-foreground flex size-full shrink-0 items-center justify-center rounded-lg">
                <PaperclipIcon className="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{attachmentLabel}</p>
            </TooltipContent>
          </Tooltip>
          {onRemove && (
            <Button
              aria-label="Remove attachment"
              className="hover:bg-accent size-6 shrink-0 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100 [&>svg]:size-3"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              variant="ghost"
            >
              <XIcon />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function MessageAttachments({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (!children) {
    return null;
  }

  return (
    <div
      className={cn("ml-auto flex w-fit flex-wrap items-start gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function MessageToolbar({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-4 flex w-full items-center justify-between gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Message,
  MessageAction,
  MessageActions,
  MessageAttachment,
  MessageAttachments,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
};
