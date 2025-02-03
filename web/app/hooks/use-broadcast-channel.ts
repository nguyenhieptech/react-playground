import { useCallback, useEffect, useRef, useState } from "react";

interface UseBroadcastChannelOptions {
  name: string;
  onMessage?: (event: MessageEvent) => void;
  onMessageError?: (event: MessageEvent) => void;
}

interface UseBroadcastChannelReturn<D, P> {
  isSupported: boolean;
  channel: BroadcastChannel | undefined;
  data: D | undefined;
  post: (data: P) => void;
  close: () => void;
  messageError: Event | undefined;
  isClosed: boolean;
}

/**
 * @description A custom hook that allows you to send and receive messages between browser tabs or windows
 * @see https://gist.github.com/KristofferEriksson/e4c4cd9bcbe8e4a128eb5976fecfb7c9
 * @see https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
 * @example
 * ```tsx
  const { data, post, isSupported } = useBroadcastChannel<string, string>({
    name: 'theme-sync',
    onMessage: (event) => {
      console.log('Message received:', event.data);
    },
  });
 * ```
 */
export function useBroadcastChannel<D, P>(
  options: UseBroadcastChannelOptions
): UseBroadcastChannelReturn<D, P> {
  const [isSupported, setIsSupported] = useState(false);
  const channelRef = useRef<BroadcastChannel | undefined>(undefined);
  const [data, setData] = useState<D | undefined>();
  const [messageError, setMessageError] = useState<Event | undefined>(undefined);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "BroadcastChannel" in window);
  }, []);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      setData(event.data as D);
      options.onMessage?.(event);
    },
    [options.onMessage]
  );

  const handleMessageError = useCallback(
    (event: MessageEvent) => {
      setMessageError(event);
      options.onMessageError?.(event);
    },
    [options.onMessageError]
  );

  useEffect(() => {
    if (isSupported) {
      const newChannel = new BroadcastChannel(options.name);
      channelRef.current = newChannel;

      newChannel.addEventListener("message", handleMessage);
      newChannel.addEventListener("messageerror", handleMessageError);

      return () => {
        newChannel.removeEventListener("message", handleMessage);
        newChannel.removeEventListener("messageerror", handleMessageError);
        if (!isClosed) {
          newChannel.close();
        }
        channelRef.current = undefined;
      };
    }
  }, [isSupported, options.name, handleMessage, handleMessageError]);

  const post = useCallback(
    (messageData: P) => {
      if (channelRef.current && !isClosed) {
        channelRef.current.postMessage(messageData);
      }
    },
    [isClosed]
  );

  const close = useCallback(() => {
    if (channelRef.current && !isClosed) {
      channelRef.current.close();
      setIsClosed(true);
    }
  }, [isClosed]);

  return {
    isSupported,
    channel: channelRef.current,
    data,
    post,
    close,
    messageError,
    isClosed,
  };
}
