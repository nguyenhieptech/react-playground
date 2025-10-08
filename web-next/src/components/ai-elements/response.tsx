"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Streamdown } from "streamdown";

const Response = React.memo<React.ComponentProps<typeof Streamdown>>(
  ({ className, ...props }) => (
    <Streamdown
      className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
Response.displayName = "Response";

export { Response };
