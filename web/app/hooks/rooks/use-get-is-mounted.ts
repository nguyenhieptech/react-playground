import { useCallback, useEffect, useRef } from "react";

type UseGetIsMountedType = () => boolean;

/**
 * @description useGetIsMounted hook checks if a component is mounted or not at the time.
 * Useful for async effects. Returns a callback that returns a boolean representing if the component
 * is mounted at the time.
 * @returns () => boolean
 * @see https://rooks.vercel.app/docs/useGetIsMounted
 */
export function useGetIsMounted(): UseGetIsMountedType {
  const isMountedRef = useRef(false);
  const get = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return get;
}
