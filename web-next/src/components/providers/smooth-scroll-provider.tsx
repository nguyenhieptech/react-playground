"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

/**
 * @description Creating smooth scrolling experiences on the web with Lenis
 * @see https://github.com/darkroomengineering/lenis/tree/main/packages/react
 * @see https://www.youtube.com/watch?v=fpyNjX-dVBs
 */
export function SmoothScrollProvider({ children }: { children?: React.ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
