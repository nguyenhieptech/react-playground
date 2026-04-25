"use client";

import { useState, useEffect } from "react";

// Build a Mask Cursor Effect With Nextjs and Framer Motion
// https://www.youtube.com/watch?v=momF_D4odCM
// https://blog.olivierlarose.com/tutorials/mask-cursor-effect

export function RevealTextCursorHoverMask() {
  return (
    <div>
      <p>Reveal Text Mask Cursor</p>
    </div>
  );
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function updateMousePosition(e: MouseEvent) {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}
