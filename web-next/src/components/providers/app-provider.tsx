"use client";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

/**
 * @description Combine all providers for the app
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SmoothScrollProvider>
  );
}
