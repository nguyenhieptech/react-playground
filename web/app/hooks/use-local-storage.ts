import { useEffect, useState } from "react";

/**
 * @description A custom hook for storing and retrieving data from localStorage, with built-in real-time synchronization
 * @see https://gist.github.com/KristofferEriksson/4a948a1572f5eb7907c3430b58845a9a
 */
export function useLocalStorage() {
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(new Map());

  function setStorageValue<T>(key: string, value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }

  function getStorageValue<T>(key: string, fallbackValue?: T): [T | undefined, boolean] {
    const [value, setStorageValue] = useState<T | undefined>(fallbackValue);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      setIsLoading(loadingStates.get(key) ?? true);

      try {
        const item = window.localStorage.getItem(key);
        setStorageValue(item !== null ? JSON.parse(item) : fallbackValue);
      } catch (error) {
        console.error(error);
        setStorageValue(fallbackValue);
      } finally {
        setIsLoading(false);
        setLoadingStates((prev) => new Map(prev).set(key, false));
      }
    }, [key, fallbackValue, loadingStates]);

    return [value, isLoading];
  }

  // Effect to update component when localStorage changes
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key) {
        setLoadingStates((prev) => new Map(prev).set(event.key as string, true));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { getStorageValue, setStorageValue };
}
