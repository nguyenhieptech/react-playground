// https://ui.shadcn.com/docs/dark-mode/next#wrap-your-root-layout

"use client";

import { ThemeProvider } from "@/components/theme-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
