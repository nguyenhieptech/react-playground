import { useEffect, useRef } from "react";

type GestureType =
  | "swipeUp"
  | "swipeDown"
  | "swipeLeft"
  | "swipeRight"
  | "tap"
  | "pinch"
  | "zoom";

interface GestureConfig {
  gesture: GestureType;
  touchCount: number;
  callback: () => void;
  elementRef?: React.RefObject<HTMLElement>;
}

/**
 *
 * @description A custom hook for advanced touch gestures in UI
 * @see https://gist.github.com/noahsark769/cab946c5bd07b75f4adf389c775fec955
 */
export function useGesture(config: GestureConfig) {
  // Use a function to lazily get the target element in a client-side environment
  function getTargetElement() {
    if (typeof window !== "undefined") {
      return config.elementRef?.current || document;
    }
    // Return a dummy object for SSR
    return {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  }

  const targetElement = getTargetElement();

  const gestureStateRef = useRef({
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0,
    touchTime: 0,
    initialDistance: 0,
    finalDistance: 0,
    gestureTriggered: false,
  });

  useEffect(() => {
    function onTouchStart(e: Event) {
      const touchEvent = e as TouchEvent;
      if (touchEvent.touches.length === config.touchCount) {
        e.preventDefault();
        const touch = touchEvent.touches[0];
        if (!touch) return;

        gestureStateRef.current = {
          ...gestureStateRef.current,
          touchStartX: touch.clientX,
          touchStartY: touch.clientY,
          touchEndX: touch.clientX,
          touchEndY: touch.clientY,
          touchTime: Date.now(),
          gestureTriggered: false,
        };

        if (config.gesture === "pinch" || config.gesture === "zoom") {
          const touch2 = touchEvent.touches[1];
          if (!touch2) return;

          gestureStateRef.current.initialDistance = Math.hypot(
            touch2.clientX - touch.clientX,
            touch2.clientY - touch.clientY
          );
        }
      }
    }

    function onTouchMove(e: Event) {
      const touchEvent = e as TouchEvent;
      if (
        touchEvent.touches.length === config.touchCount &&
        !gestureStateRef.current.gestureTriggered
      ) {
        e.preventDefault();
        const touch = touchEvent.touches[0];
        if (!touch) return;

        gestureStateRef.current.touchEndX = touch.clientX;
        gestureStateRef.current.touchEndY = touch.clientY;

        if (config.gesture === "pinch" || config.gesture === "zoom") {
          const touch2 = touchEvent.touches[1];
          if (!touch2) return;

          gestureStateRef.current.finalDistance = Math.hypot(
            touch2.clientX - touch.clientX,
            touch2.clientY - touch.clientY
          );
        }
      }
    }

    function triggerGesture() {
      config.callback();
    }

    function onTouchEnd() {
      handleGesture();
    }

    function handleGesture() {
      if (gestureStateRef.current.gestureTriggered) return;

      const {
        touchStartX,
        touchStartY,
        touchEndX,
        touchEndY,
        touchTime,
        initialDistance,
        finalDistance,
      } = gestureStateRef.current;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      const timeDiff = Date.now() - touchTime;
      const distance = Math.hypot(dx, dy);

      switch (config.gesture) {
        case "swipeUp":
          if (dy < -50 && Math.abs(dx) < 50) triggerGesture();
          break;
        case "swipeDown":
          if (dy > 50 && Math.abs(dx) < 50) triggerGesture();
          break;
        case "swipeLeft":
          if (dx < -50 && Math.abs(dy) < 50) triggerGesture();
          break;
        case "swipeRight":
          if (dx > 50 && Math.abs(dy) < 50) triggerGesture();
          break;
        case "tap":
          if (distance < 30 && timeDiff < 200) triggerGesture();
          break;
        case "pinch":
          if (finalDistance < initialDistance) triggerGesture();
          break;
        case "zoom":
          if (finalDistance > initialDistance) triggerGesture();
          break;
      }

      gestureStateRef.current.gestureTriggered = true;
    }

    // Only attach event listeners in the browser environment
    if (typeof window !== "undefined" || typeof document !== "undefined") {
      targetElement.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      targetElement.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });
      targetElement.addEventListener("touchend", onTouchEnd, {
        passive: false,
      });

      return () => {
        targetElement.removeEventListener("touchstart", onTouchStart);
        targetElement.removeEventListener("touchmove", onTouchMove);
        targetElement.removeEventListener("touchend", onTouchEnd);
      };
    }
  }, [config, targetElement]);

  return gestureStateRef.current;
}
