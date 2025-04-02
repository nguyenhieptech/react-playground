import { ThemeProvider } from "@/providers/theme-provider";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Playground" },
    { name: "description", content: "React concepts and patterns" },
  ];
}

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Welcome />
    </ThemeProvider>
  );
}
