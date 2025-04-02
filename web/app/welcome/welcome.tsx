import { ThemeToggle } from "@/components/theme-toggle";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pb-4 pt-16">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img src={logoDark} alt="React Router" className="hidden w-full dark:block" />
          </div>
        </header>
        <ThemeToggle />
      </div>
    </main>
  );
}
