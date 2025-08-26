import "./globals.css";
import { AppProvider } from "@/components/providers/app-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
