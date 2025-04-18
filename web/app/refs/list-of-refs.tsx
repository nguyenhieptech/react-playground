// https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
// How to manage a list of refs using a ref callback

import { Button } from "@/components/ui/button";
import { useRef } from "react";

type Cat = {
  id: number;
  imageUrl: string;
};

const catList: Cat[] = [];

for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: `https://placekitten.com/250/200?image=${i}`,
  });
}

export function RefsCallbackWithMap() {
  const itemsRef = useRef<Map<number, HTMLLIElement>>(null);

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function scrollToId(itemId: number) {
    const map = getMap();
    const node = map?.get(itemId);
    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <Button onClick={() => scrollToId(0)}>Tom</Button>
        <Button onClick={() => scrollToId(5)}>Jerry</Button>
        <Button onClick={() => scrollToId(9)}>Watermelon</Button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <img src={cat.imageUrl} alt={"Cat #" + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Generated by ChatGPT
export function RefsCallbackWithArray() {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  function scrollToId(itemId: number) {
    const node = itemsRef.current[itemId];
    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <Button onClick={() => scrollToId(0)}>Tom</Button>
        <Button onClick={() => scrollToId(5)}>Jerry</Button>
        <Button onClick={() => scrollToId(9)}>Watermelon</Button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, index) => (
            <li
              key={cat.id}
              ref={(node) => {
                itemsRef.current[index] = node;
              }}
            >
              <img src={cat.imageUrl} alt={"Cat #" + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
