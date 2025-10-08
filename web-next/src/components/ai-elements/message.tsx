import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import * as React from "react";

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
        "group flex w-full items-end justify-end gap-2 py-4",
        from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
        "[&>div]:max-w-[80%]",
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

function MessageAvatar({
  src,
  name,
  className,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
}) {
  return (
    <Avatar className={cn("ring-border size-8 ring-1", className)} {...props}>
      <AvatarImage alt="" className="mt-0 mb-0" src={src} />
      <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
    </Avatar>
  );
}

export { Message, MessageAvatar, MessageContent };
