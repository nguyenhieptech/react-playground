"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// Build a Parallax Section Transition with React and Framer Motion
// https://www.youtube.com/watch?v=nZ2LDB7Q7Rk
// https://blog.olivierlarose.com/tutorials/perspective-section-transition

export function ParallaxSectionTransition() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

function Section1({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      className="sticky top-0 flex h-screen flex-col items-center justify-center bg-sky-500 pb-[10vh] text-6xl font-bold text-white"
      style={{ scale, rotate }}
    >
      <p>Scroll Perspective</p>
      <p>Section Transition</p>
    </motion.div>
  );
}

function Section2({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div className="relative h-screen" style={{ scale, rotate }}>
      <Image src={"/images/parallax/background.jpeg"} alt="img" fill />
    </motion.div>
  );
}
