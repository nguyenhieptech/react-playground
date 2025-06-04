import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="mt-32 flex items-center justify-center space-x-4">
      <p>Hello React Playground - NextJS</p>
      <ThemeToggle />
    </div>
  );
}
