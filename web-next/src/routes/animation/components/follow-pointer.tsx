"use client";

import { frame, motion, useSpring, SpringOptions } from "motion/react";
import { RefObject, useEffect, useRef } from "react";

// See: https://motion.dev/docs/react-use-spring

export function FollowPointer() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div ref={ref} className="size-15 rounded-full bg-sky-500" style={{ x, y }} />
  );
}

const spring: SpringOptions = { damping: 15, stiffness: 300, restDelta: 0.2 };

function useFollowPointer(ref: RefObject<HTMLElement | null>) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    function handlePointerMove({ clientX, clientY }: MouseEvent) {
      const element = ref.current!;
      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}
