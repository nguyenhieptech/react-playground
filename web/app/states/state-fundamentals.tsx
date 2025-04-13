import { cn } from "@/lib/utils";
import { useState } from "react";

const orders = [100, 200, 300];

export function StateFundamentals() {
  const [counter, setCounter] = useState(0);

  // https://react.dev/reference/react/useState#usestate
  const [total, setTotal] = useState(() => {
    // Initial state is the value you want the state to be initially.
    // It can be a value of any type, but there is a special behavior for functions.
    // This argument is ignored after the initial render.

    // If initial state has a complex logic, use a callback function inside
    const initialTotal = orders.reduce((total, current) => total + current);
    return initialTotal;
  });

  // https://react.dev/learn/queueing-a-series-of-state-updates
  function handleIncrement() {
    // Each render’s state values are fixed,
    // so the value of counter inside the first render’s event handler is always 0,
    // no matter how many times you call setCounter(1):
    // React waits until all code in the event handlers has run before processing your state updates.
    // This is why the re-render only happens after all these setCounter() calls.
    // counter is still the same (1), so after re-render, counter will increment only 1

    setCounter(counter + 1); // setCounter(0 + 1);
    setCounter(counter + 1); // setCounter(0 + 1);
    setCounter(counter + 1); // setCounter(0 + 1);
  }

  // https://react.dev/learn/queueing-a-series-of-state-updates#updating-the-same-state-multiple-times-before-the-next-render
  // https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  function handleIncrementWithUpdaterFunction() {
    setCounter((previousCounter) => previousCounter + 1); // setCounter(0 + 1);
    setCounter((previousCounter) => previousCounter + 1); // setCounter(1 + 1);
    setCounter((previousCounter) => previousCounter + 1); // setCounter(2 + 1);

    // Here, previousCounter => previousCounter + 1 is your updater function.
    // It takes the pending state and calculates the next state from it.
    // React puts your updater functions in a queue. Then, during the next render, it will call them in the same order:

    // previousCounter => previousCounter + 1 will receive 1 as the pending state and return 2 as the next state.
    // previousCounter => previousCounter + 1 will receive 2 as the pending state and return 3 as the next state.
    // previousCounter => previousCounter + 1 will receive 3 as the pending state and return 4 as the next state.
    // It will re-render only once, but value will be from 1 to 4
  }

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleIncrementWithUpdaterFunction}>Multiple increment</button>
      <p>{counter}</p>
      <p>{total}</p>
    </div>
  );
}
