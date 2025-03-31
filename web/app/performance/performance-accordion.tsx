import { memo, useCallback, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { makeData } from "~/lib/make-data";

const peopleData = makeData(2000);

const mockData = [
  {
    id: 1,
    title: "What is your refund policy?",
    content:
      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
  },
  {
    id: 2,
    title: "Do you offer technical support?",
    content: "No. We don't support it yet",
  },
  // {
  //   id: 3,
  //   title: 'Do you offer technical support?',
  //   content: "No. We don't support it yet",
  // },
  // {
  //   id: 4,
  //   title: 'Do you offer technical support?',
  //   content: "No. We don't support it yet",
  // },
  // {
  //   id: 5,
  //   title: 'Do you offer technical support?',
  //   content: "No. We don't support it yet",
  // },
];

type MockData = (typeof mockData)[0];
type PeopleData = (typeof peopleData)[0];

export function DemoAccordionPerformance() {
  const [name, setName] = useState("");

  const handleName = useCallback((name: string) => {
    setName(name);
  }, []);

  // When DemoAccordionAndPerformance re-renders, function handleName will be called again
  // It will be another handleName which differs with handleName from the previous render (because of how JS works)
  // So all the AccordionItem being rendered is going to re-render as well
  // So this will be a problem to performance if we have a lot of AccordionItem being rendered
  // function handleName(name: string) {
  //   setName(name);
  // }

  return (
    <div className="w-full px-4 pt-16">
      <div>{name}</div>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Accordion type="single" collapsible className="w-full">
          {peopleData.map((data) => {
            return (
              <AccordionItemMemo key={data.id} item={data} handleName={handleName} />
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export type AccordionItemProps = {
  item: PeopleData;
  handleName: (name: string) => void;
};

export const AccordionItemMemo = memo<AccordionItemProps>((props) => {
  const { item, handleName } = props;

  console.log("AccordionItemMemo render");

  return (
    <AccordionItem value={item.firstName}>
      <AccordionTrigger onClick={() => handleName(item.firstName)}>
        {item.firstName}
      </AccordionTrigger>
      <AccordionContent>{item.lastName}</AccordionContent>
    </AccordionItem>
  );
});
AccordionItemMemo.displayName = "AccordionItemMemo";
