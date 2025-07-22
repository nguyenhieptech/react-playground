"use client";

import { cn } from "@/lib/utils";
import { GripVerticalIcon } from "lucide-react";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

// https://www.kibo-ui.com/components/comparison

interface ImageComparisonContextType {
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  motionSliderPosition: MotionValue<number>;
  mode: "hover" | "drag";
}

const ImageComparisonContext = React.createContext<
  ImageComparisonContextType | undefined
>(undefined);

function useImageComparisonContext() {
  const context = React.useContext(ImageComparisonContext);
  if (!context) {
    throw new Error("useImageComparisonContext must be used within a ImageComparison");
  }
  return context;
}

interface ComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "hover" | "drag";
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

// Original version from the docs uses onMouseDown, onMouseMove, onMouseUp, onMouseLeave, etc
// Modernized with onPointerDown, onPointerMove, onPointerUp, onPointerLeave
function Comparison({
  className,
  mode = "drag",
  onDragStart,
  onDragEnd,
  ...props
}: ComparisonProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, {
    bounce: 0,
    duration: 0,
  });
  const [sliderPosition, setSliderPosition] = React.useState(50);

  function handleDrag(domRect: DOMRect, clientX: number) {
    if (!isDragging && mode === "drag") return;
    const x = clientX - domRect.left;
    const percentage = Math.min(Math.max((x / domRect.width) * 100, 0), 100);
    motionValue.set(percentage);
    setSliderPosition(percentage);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || !event.currentTarget) return;
    const containerRect = event.currentTarget.getBoundingClientRect();
    handleDrag(containerRect, event.clientX);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (mode !== "drag") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    onDragStart?.();
    const containerRect = event.currentTarget.getBoundingClientRect();
    handleDrag(containerRect, event.clientX);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (mode !== "drag") return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    onDragEnd?.();
  }

  function handlePointerLeave() {
    if (!isDragging) return;
    setIsDragging(false);
    onDragEnd?.();
  }

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition, mode }}
    >
      <div
        aria-label="Comparison slider"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={sliderPosition}
        className={cn(
          // touch-none is here to prevent the browser's default touch behavior
          "relative isolate w-full touch-none overflow-hidden select-none",
          className
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        role="slider"
        tabIndex={0}
        {...props}
      />
    </ImageComparisonContext.Provider>
  );
}

interface ComparisonItemProps extends React.ComponentProps<typeof motion.div> {
  position: "left" | "right";
}

function ComparisonItem({ className, position, ...props }: ComparisonItemProps) {
  const { motionSliderPosition } = useImageComparisonContext();

  const leftClipPath = useTransform(
    motionSliderPosition,
    (value: number) => `inset(0 0 0 ${value}%)`
  );

  const rightClipPath = useTransform(
    motionSliderPosition,
    (value: number) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      role="img"
      style={{
        clipPath: position === "left" ? leftClipPath : rightClipPath,
      }}
      {...props}
    />
  );
}

interface ComparisonHandleProps extends React.ComponentProps<typeof motion.div> {
  children?: React.ReactNode;
}

function ComparisonHandle({ className, children, ...props }: ComparisonHandleProps) {
  const { motionSliderPosition, mode } = useImageComparisonContext();
  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute top-0 z-50 flex h-full w-10 -translate-x-1/2 items-center justify-center",
        mode === "drag" && "cursor-grab active:cursor-grabbing",
        className
      )}
      role="presentation"
      style={{ left }}
      {...props}
    >
      {children ?? (
        <>
          <div className="bg-background absolute left-1/2 h-full w-1 -translate-x-1/2" />
          {mode === "drag" && (
            <div className="bg-background z-50 flex items-center justify-center rounded-sm px-0.5 py-1">
              <GripVerticalIcon className="text-muted-foreground h-4 w-4 select-none" />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export {
  Comparison,
  ComparisonItem,
  ComparisonHandle,
  type ComparisonItemProps,
  type ComparisonHandleProps,
};
