"use client";

import { type LucideIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function Artifact({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-background flex flex-col overflow-hidden rounded-lg border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function ArtifactHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted/50 flex items-center justify-between border-b px-4 py-3",
        className
      )}
      {...props}
    />
  );
}

function ArtifactClose({
  className,
  children,
  size = "sm",
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn("text-muted-foreground hover:text-foreground size-8 p-0", className)}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children ?? <XIcon className="size-4" />}
      <span className="sr-only">Close</span>
    </Button>
  );
}

function ArtifactTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-foreground text-sm font-medium", className)} {...props} />
  );
}

function ArtifactDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function ArtifactActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-1", className)} {...props} />;
}

function ArtifactAction({
  tooltip,
  label,
  icon: Icon,
  children,
  className,
  size = "sm",
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
  icon?: LucideIcon;
}) {
  const button = (
    <Button
      className={cn("text-muted-foreground hover:text-foreground size-8 p-0", className)}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {Icon ? <Icon className="size-4" /> : children}
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

function ArtifactContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto p-4", className)} {...props} />;
}

export {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
};
