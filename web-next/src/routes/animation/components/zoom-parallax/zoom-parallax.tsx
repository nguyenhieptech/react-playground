"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import Picture1 from "../../../../public/images/parallax/background.jpeg";
import Picture2 from "../../../../public/images/parallax/background.jpeg";
import Picture3 from "../../../../public/images/parallax/background.jpeg";
import styles from "./zoom-parallax.module.css";

// How to Make a Zoom Parallax using Next.js and Framer Motion
// https://www.youtube.com/watch?v=pEt0eiArTSg
// https://blog.olivierlarose.com/tutorials/zoom-parallax

export function ZoomParallax() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture2,
      scale: scale8,
    },
    {
      src: Picture1,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              className="absolute top-0 flex h-full w-full items-center justify-center"
              style={{ scale }}
            >
              <div
                // className="relative h-[25vh] w-[25vw]"
                className={styles.imageContainer}
              >
                <Image
                  className="object-cover"
                  src={src}
                  fill
                  alt="image"
                  placeholder="blur"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
