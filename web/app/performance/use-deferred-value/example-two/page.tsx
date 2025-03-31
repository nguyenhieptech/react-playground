// https://github.com/cosdensolutions/code/blob/master/videos/long/learn-react-hooks-useDeferredValue/index.tsx

import { useDeferredValue, useState } from "react";
import { Input } from "~/components/ui/input";
import { SlowList } from "./show-list";

export function DemoUseDeferredValue() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <SlowList text={deferredQuery} />
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </>
  );
}
