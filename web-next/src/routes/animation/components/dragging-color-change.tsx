"use client";

import { motion, useMotionValue, useTransform } from "motion/react";

export function DraggingColorChange() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const r = useTransform(x, [-200, 0, 200], [255, 255, 119]); // blend red and blue
  const g = useTransform(y, [-200, 0, 200], [255, 0, 0]); // blend white and black (affect green)
  const b = useTransform(x, [-200, 0, 200], [140, 255, 255]); // custom logic for b

  const backgroundColor = useTransform([r, g, b], ([r, g, b]) => {
    return `rgb(${r}, ${g}, ${b})`;
  });

  return (
    <div className="container mx-auto h-[40rem]">
      <motion.div
        className="flex size-32 cursor-pointer items-center justify-center rounded-lg text-white shadow-lg"
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        // dragMomentum={false}
        // dragDirectionLock
        style={{ x, y, backgroundColor }}
      >
        Drag me
      </motion.div>
    </div>
  );
}
