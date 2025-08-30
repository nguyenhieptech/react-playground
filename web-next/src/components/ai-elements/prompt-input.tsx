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

export type PromptInputProps = React.HTMLAttributes<HTMLFormElement>;

export function PromptInput({ className, ...props }: PromptInputProps) {
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

export type PromptInputTextareaProps = React.ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};

export function PromptInputTextarea({
  onChange,
  className,
  placeholder = "What would you like to know?",
  minHeight = 48,
  maxHeight = 164,
  ...props
}: PromptInputTextareaProps) {
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

export type PromptInputToolbarProps = React.HTMLAttributes<HTMLDivElement>;

export function PromptInputToolbar({ className, ...props }: PromptInputToolbarProps) {
  return (
    <div className={cn("flex items-center justify-between p-1", className)} {...props} />
  );
}

export type PromptInputToolsProps = React.HTMLAttributes<HTMLDivElement>;

export function PromptInputTools({ className, ...props }: PromptInputToolsProps) {
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

export type PromptInputButtonProps = React.ComponentProps<typeof Button>;

export function PromptInputButton({
  variant = "ghost",
  className,
  size,
  ...props
}: PromptInputButtonProps) {
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

export type PromptInputSubmitProps = React.ComponentProps<typeof Button> & {
  status?: ChatStatus;
};

export function PromptInputSubmit({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}: PromptInputSubmitProps) {
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

export type PromptInputModelSelectProps = React.ComponentProps<typeof Select>;

export function PromptInputModelSelect(props: PromptInputModelSelectProps) {
  return <Select {...props} />;
}

export type PromptInputModelSelectTriggerProps = React.ComponentProps<
  typeof SelectTrigger
>;

export function PromptInputModelSelectTrigger({
  className,
  ...props
}: PromptInputModelSelectTriggerProps) {
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

export type PromptInputModelSelectContentProps = React.ComponentProps<
  typeof SelectContent
>;

export function PromptInputModelSelectContent({
  className,
  ...props
}: PromptInputModelSelectContentProps) {
  return <SelectContent className={cn(className)} {...props} />;
}

export type PromptInputModelSelectItemProps = React.ComponentProps<typeof SelectItem>;

export function PromptInputModelSelectItem({
  className,
  ...props
}: PromptInputModelSelectItemProps) {
  return <SelectItem className={cn(className)} {...props} />;
}

export type PromptInputModelSelectValueProps = React.ComponentProps<typeof SelectValue>;

export function PromptInputModelSelectValue({
  className,
  ...props
}: PromptInputModelSelectValueProps) {
  return <SelectValue className={cn(className)} {...props} />;
}
