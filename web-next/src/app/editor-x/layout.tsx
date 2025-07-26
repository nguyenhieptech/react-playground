import { Suspense } from "react";

export default function EditorXLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
