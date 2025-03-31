import React, { forwardRef, useEffect } from "react";
import { videoRegistry } from "~/assets";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// https://github.com/facebook/react/blob/main/packages/shared/ReactTypes.js#L97C26-L97C26
export type RefObjectType<T> = {
  current: T | null;
};

// https://github.com/facebook/react/blob/main/packages/react/src/ReactCreateRef.js
export function createRefFunc<T>(): RefObjectType<T> {
  const refObject = {
    current: null,
  };
  return Object.seal(refObject);
}

export const videoRef = createRefFunc<HTMLVideoElement>();

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  // Add more props here if needed
};

export const CustomVideo = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <video ref={ref} className={cn("h-92 w-48 bg-white", className)} {...restProps} />
  );
});

CustomVideo.displayName = "CustomVideo";

export function UsingRefDirectly() {
  // const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    videoRef.current?.play();
  }

  function handlePause() {
    videoRef.current?.pause();
  }

  useEffect(() => {
    console.log(videoRef.current);
  }, []);

  return (
    <div>
      <CustomVideo ref={videoRef} controls src={videoRegistry.video1} />
      <Button onClick={handlePlay}>Play</Button>
      <Button onClick={handlePause}>Pause</Button>
    </div>
  );
}
