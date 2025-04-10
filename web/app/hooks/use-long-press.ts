import { useCallback, useEffect, useRef } from "react";

/**
 * @see https://gist.github.com/KristofferEriksson/098c48029874c46b5ef73d159f3c7c1a
 */
export function useLongPress({
  delay,
  onLongPress,
  onClick,
  onCancel,
  onFinish,
  onStart,
}: {
  delay: number;
  onLongPress: () => void;
  onClick?: () => void;
  onCancel?: () => void;
  onFinish?: () => void;
  onStart?: () => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const pressTriggeredRef = useRef<boolean>(false);
  const pressInitiatedRef = useRef<boolean>(false);

  const start = useCallback(
    (event: React.MouseEvent<any, MouseEvent> | React.TouchEvent<any>) => {
      // Only left clicks (button 0)
      if ("button" in event && event.button !== 0) return;
      pressTriggeredRef.current = false;
      pressInitiatedRef.current = true;
      if (onStart) onStart();

      timerRef.current = setTimeout(() => {
        if (pressInitiatedRef.current) {
          onLongPress();
          if (onFinish) onFinish();
          pressTriggeredRef.current = true;
        }
      }, delay);
    },
    [onLongPress, delay, onFinish, onStart]
  );

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!pressTriggeredRef.current && pressInitiatedRef.current && onClick) {
      onClick();
    }
    pressInitiatedRef.current = false;
    timerRef.current = undefined;
    if (!pressTriggeredRef.current) {
      if (onCancel) onCancel();
    }
  }, [onClick, onCancel]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  };
}
