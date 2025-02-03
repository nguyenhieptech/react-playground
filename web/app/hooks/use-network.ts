import { useEffect, useState } from "react";

interface NetworkInformation extends EventTarget {
  downlink?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  onchange?: EventListener;
}

interface NavigatorWithNetworkInformation extends Navigator {
  connection?: NetworkInformation;
}

interface NetworkState {
  downlink?: number | null;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | null;
  rtt?: number | null;
  saveData?: boolean | null;
  isOnline: boolean;
}

/**
 * @description A custom hook to get real-time network insights
 * @see https://gist.github.com/KristofferEriksson/7e3de25dfa587943abc04841f57d635c
 */
export function useNetwork(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>({
    downlink: null,
    effectiveType: null,
    rtt: null,
    saveData: null,
    isOnline: false, // Default to false; updated correctly on the client-side
  });

  useEffect(() => {
    // Ensure we are in the browser environment
    if (typeof window === "undefined") {
      return;
    }

    const nav = navigator as NavigatorWithNetworkInformation;

    if (!nav.connection) {
      setNetworkState((prevState) => ({
        ...prevState,
        downlink: null,
        effectiveType: null,
        rtt: null,
        saveData: null,
        isOnline: navigator.onLine, // Update online status in the browser
      }));
      return;
    }

    function updateNetworkInfo() {
      const { downlink, effectiveType, rtt, saveData } = nav.connection!;
      setNetworkState((prevState) => ({
        ...prevState,
        downlink,
        effectiveType,
        rtt,
        saveData,
        isOnline: navigator.onLine,
      }));
    }

    updateNetworkInfo();
    nav.connection!.addEventListener("change", updateNetworkInfo);
    window.addEventListener("online", () =>
      setNetworkState((prevState) => ({ ...prevState, isOnline: true }))
    );
    window.addEventListener("offline", () =>
      setNetworkState((prevState) => ({ ...prevState, isOnline: false }))
    );

    return () => {
      if (nav.connection) {
        nav.connection.removeEventListener("change", updateNetworkInfo);
      }
      window.removeEventListener("online", () =>
        setNetworkState((prevState) => ({ ...prevState, isOnline: true }))
      );
      window.removeEventListener("offline", () =>
        setNetworkState((prevState) => ({ ...prevState, isOnline: false }))
      );
    };
  }, []);

  return networkState;
}
