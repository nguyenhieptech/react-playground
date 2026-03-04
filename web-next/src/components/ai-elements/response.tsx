"use client";

import * as React from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

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
