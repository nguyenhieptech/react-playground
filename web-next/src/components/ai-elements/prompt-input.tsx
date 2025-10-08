"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ChatStatus } from "ai";
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react";
import * as React from "react";

function PromptInput({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn(
        "bg-background w-full divide-y overflow-hidden rounded-xl border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function PromptInputTextarea({
  onChange,
  className,
  placeholder = "What would you like to know?",
  minHeight = 48,
  maxHeight = 164,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      // Don't submit if IME composition is in progress
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.shiftKey) {
        // Allow newline
        return;
      }

      // Submit on Enter (without Shift)
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  }

  return (
    <Textarea
      className={cn(
        "w-full resize-none rounded-none border-none p-3 shadow-none ring-0 outline-none",
        "field-sizing-content max-h-[6lh] bg-transparent dark:bg-transparent",
        "focus-visible:ring-0",
        className
      )}
      name="message"
      onChange={(e) => {
        onChange?.(e);
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  );
}

function PromptInputToolbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between p-1", className)} {...props} />
  );
}

function PromptInputTools({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-1",
        "[&_button:first-child]:rounded-bl-xl",
        className
      )}
      {...props}
    />
  );
}

function PromptInputButton({
  variant = "ghost",
  className,
  size,
  ...props
}: React.ComponentProps<typeof Button>) {
  const newSize = (size ?? React.Children.count(props.children) > 1) ? "default" : "icon";

  return (
    <Button
      className={cn(
        "shrink-0 gap-1.5 rounded-lg",
        variant === "ghost" && "text-muted-foreground",
        newSize === "default" && "px-3",
        className
      )}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
}

function PromptInputSubmit({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  status?: ChatStatus;
}) {
  let Icon = <SendIcon className="size-4" />;

  if (status === "submitted") {
    Icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />;
  }

  return (
    <Button
      className={cn("gap-1.5 rounded-lg", className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
}

function PromptInputModelSelect(props: React.ComponentProps<typeof Select>) {
  return <Select {...props} />;
}

function PromptInputModelSelectTrigger({
  className,
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  return (
    <SelectTrigger
      className={cn(
        "text-muted-foreground border-none bg-transparent font-medium shadow-none transition-colors",
        'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
        className
      )}
      {...props}
    />
  );
}

function PromptInputModelSelectContent({
  className,
  ...props
}: React.ComponentProps<typeof SelectContent>) {
  return <SelectContent className={cn(className)} {...props} />;
}

function PromptInputModelSelectItem({
  className,
  ...props
}: React.ComponentProps<typeof SelectItem>) {
  return <SelectItem className={cn(className)} {...props} />;
}

function PromptInputModelSelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectValue>) {
  return <SelectValue className={cn(className)} {...props} />;
}

export {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
};
