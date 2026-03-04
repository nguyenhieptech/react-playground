import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { AppProvider } from "@/components/providers/app-provider";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Playground - NextJS",
  description: "React Playground - NextJS repo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} scroll-smooth antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
