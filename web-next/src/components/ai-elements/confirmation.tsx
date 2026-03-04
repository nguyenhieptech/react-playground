"use client";

import type { ToolUIPart } from "ai";
import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToolUIPartApproval =
  | {
      id: string;
      approved?: never;
      reason?: never;
    }
  | {
      id: string;
      approved: boolean;
      reason?: string;
    }
  | {
      id: string;
      approved: true;
      reason?: string;
    }
  | {
      id: string;
      approved: true;
      reason?: string;
    }
  | {
      id: string;
      approved: false;
      reason?: string;
    }
  | undefined;

type ConfirmationContextValue = {
  approval: ToolUIPartApproval;
  state: ToolUIPart["state"];
};

const ConfirmationContext = React.createContext<ConfirmationContextValue | null>(null);

function useConfirmation() {
  const context = React.useContext(ConfirmationContext);

  if (!context) {
    throw new Error("Confirmation components must be used within Confirmation");
  }

  return context;
}

function Confirmation({
  className,
  approval,
  state,
  ...props
}: React.ComponentProps<typeof Alert> & {
  approval?: ToolUIPartApproval;
  state: ToolUIPart["state"];
}) {
  if (!approval || state === "input-streaming" || state === "input-available") {
    return null;
  }

  return (
    <ConfirmationContext.Provider value={{ approval, state }}>
      <Alert className={cn("flex flex-col gap-2", className)} {...props} />
    </ConfirmationContext.Provider>
  );
}

function ConfirmationTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDescription>) {
  return <AlertDescription className={cn("inline", className)} {...props} />;
}

function ConfirmationRequest({ children }: { children?: React.ReactNode }) {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== "approval-requested") {
    return null;
  }

  return children;
}

function ConfirmationAccepted({ children }: { children?: React.ReactNode }) {
  const { approval, state } = useConfirmation();

  // Only show when approved and in response states
  if (
    !approval?.approved ||
    (state !== "approval-responded" &&
      state !== "output-denied" &&
      state !== "output-available")
  ) {
    return null;
  }

  return children;
}

function ConfirmationRejected({ children }: { children?: React.ReactNode }) {
  const { approval, state } = useConfirmation();

  // Only show when rejected and in response states
  if (
    approval?.approved !== false ||
    (state !== "approval-responded" &&
      state !== "output-denied" &&
      state !== "output-available")
  ) {
    return null;
  }

  return children;
}

function ConfirmationActions({ className, ...props }: React.ComponentProps<"div">) {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== "approval-requested") {
    return null;
  }

  return (
    <div
      className={cn("flex items-center justify-end gap-2 self-end", className)}
      {...props}
    />
  );
}

function ConfirmationAction(props: React.ComponentProps<typeof Button>) {
  return <Button className="h-8 px-3 text-sm" type="button" {...props} />;
}

export {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
};
