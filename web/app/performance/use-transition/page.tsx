// useTransition in NextJs 14 with 3 Example use cases
// https://www.youtube.com/watch?v=SFZrHMZQon8

import { useState, useTransition } from "react";
import { About } from "./about";
import { Contact } from "./contact";
import { TabButton } from "./tab-button";
import { Team } from "./team";

export function UseTransitionExample() {
  const [activeTab, setActiveTab] = useState("about");
  const [isPending, startTransition] = useTransition();

  function selectTab(tab: string) {
    startTransition(() => {
      setActiveTab(tab);
    });
  }

  return (
    <section className="py-24">
      <div className="container sm:max-w-2xl">
        <h1 className="font-serif text-3xl font-bold">State Transitions</h1>

        <section className="mt-16">
          <div className="grid w-full grid-cols-3 items-center justify-center gap-1.5 rounded-lg bg-gray-100 p-1.5 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <TabButton
              value="about"
              activeTab={activeTab}
              onClick={() => selectTab("about")}
            >
              About
            </TabButton>
            <TabButton
              value="team"
              isPending={isPending}
              activeTab={activeTab}
              onClick={() => selectTab("team")}
            >
              Team
            </TabButton>
            <TabButton
              value="contact"
              activeTab={activeTab}
              onClick={() => selectTab("contact")}
            >
              Contact
            </TabButton>
          </div>

          <div className="mt-3">
            {activeTab === "about" && <About />}
            {activeTab === "team" && <Team />}
            {activeTab === "contact" && <Contact />}
          </div>
        </section>
      </div>
    </section>
  );
}
