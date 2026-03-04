import * as React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";

function Node({
  handles,
  className,
  ...props
}: React.ComponentProps<typeof Card> & {
  handles: {
    target: boolean;
    source: boolean;
  };
}) {
  return (
    <Card
      className={cn(
        "node-container relative size-full h-auto w-sm gap-0 rounded-md p-0",
        className
      )}
      {...props}
    >
      {handles.target && <Handle position={Position.Left} type="target" />}
      {handles.source && <Handle position={Position.Right} type="source" />}
      {props.children}
    </Card>
  );
}

function NodeHeader({ className, ...props }: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      className={cn("bg-secondary gap-0.5 rounded-t-md border-b p-3!", className)}
      {...props}
    />
  );
}

function NodeTitle(props: React.ComponentProps<typeof CardTitle>) {
  return <CardTitle {...props} />;
}

type NodeDescriptionProps = React.ComponentProps<typeof CardDescription>;

function NodeDescription(props: NodeDescriptionProps) {
  return <CardDescription {...props} />;
}

function NodeAction(props: React.ComponentProps<typeof CardAction>) {
  return <CardAction {...props} />;
}

function NodeContent({ className, ...props }: React.ComponentProps<typeof CardContent>) {
  return <CardContent className={cn("p-3", className)} {...props} />;
}

function NodeFooter({ className, ...props }: React.ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter
      className={cn("bg-secondary rounded-b-md border-t p-3!", className)}
      {...props}
    />
  );
}

export {
  Node,
  NodeAction,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
};
