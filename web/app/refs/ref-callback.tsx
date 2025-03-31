import { useCallback, useState } from "react";

export function RefCallback() {
  const [iter, rerender] = useState(0);

  const divElementRef = useCallback((e: HTMLDivElement) => {
    console.log("ref", e);
    console.log(typeof e); // object
  }, []);

  return (
    <div key={iter} ref={divElementRef} onClick={() => rerender(iter + 1)}>
      Click to remount
    </div>
  );
}
