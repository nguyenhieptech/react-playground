"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import * as React from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

export type ConversationProps = React.ComponentProps<typeof StickToBottom>;

export function Conversation({ className, ...props }: ConversationProps) {
  return (
    <StickToBottom
      className={cn("relative flex-1 overflow-y-auto", className)}
      initial="smooth"
      resize="smooth"
      role="log"
      {...props}
    />
  );
}

export type ConversationContentProps = React.ComponentProps<typeof StickToBottom.Content>;

export function ConversationContent({ className, ...props }: ConversationContentProps) {
  return <StickToBottom.Content className={cn("p-4", className)} {...props} />;
}

export type ConversationScrollButtonProps = React.ComponentProps<typeof Button>;

export function ConversationScrollButton({
  className,
  ...props
}: ConversationScrollButtonProps) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = React.useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          "absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full",
          className
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
}
