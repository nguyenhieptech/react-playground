"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function AnimateOpacityAsUserScrolls() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="h-[200vh]">
      <div className="h-3/4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus vero, aliquam
        id alias harum laborum nam molestias natus. Ipsa cupiditate error repudiandae
        neque, quidem nihil expedita quas ab aut! Hic! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Temporibus vero, aliquam id alias harum laborum nam
        molestias natus. Ipsa cupiditate error repudiandae neque, quidem nihil expedita
        quas ab aut! Hic! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Temporibus vero, aliquam id alias harum laborum nam molestias natus. Ipsa
        cupiditate error repudiandae neque, quidem nihil expedita quas ab aut! Hic!
      </div>
      <motion.div ref={ref} className="bg-sky-500 p-4 text-zinc-50" style={{ opacity }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus vero, aliquam
        id alias harum laborum nam molestias natus. Ipsa cupiditate error repudiandae
        neque, quidem nihil expedita quas ab aut! Hic! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Temporibus vero, aliquam id alias harum laborum nam
        molestias natus. Ipsa cupiditate error repudiandae neque, quidem nihil expedita
        quas ab aut! Hic! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Temporibus vero, aliquam id alias harum laborum nam molestias natus. Ipsa
        cupiditate error repudiandae neque, quidem nihil expedita quas ab aut! Hic!
      </motion.div>
    </div>
  );
}
