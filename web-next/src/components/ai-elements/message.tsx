import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import * as React from "react";

export type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export function Message({ className, from, ...props }: MessageProps) {
  return (
    <div
      className={cn(
        "group flex w-full items-end justify-end gap-2 py-4",
        from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
        "[&>div]:max-w-[80%]",
        className
      )}
      {...props}
    />
  );
}

export type MessageContentProps = React.HTMLAttributes<HTMLDivElement>;

export function MessageContent({ children, className, ...props }: MessageContentProps) {
  return (
    <div
      className={cn(
        "text-foreground flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm",
        "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
        "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
        "is-user:dark",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type MessageAvatarProps = React.ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export function MessageAvatar({ src, name, className, ...props }: MessageAvatarProps) {
  return (
    <Avatar className={cn("ring-border size-8 ring-1", className)} {...props}>
      <AvatarImage alt="" className="mt-0 mb-0" src={src} />
      <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
    </Avatar>
  );
}
