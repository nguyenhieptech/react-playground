import React, { createRef, useEffect, useImperativeHandle, useRef } from "react";
import { videoRegistry } from "~/assets";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

/**
 * Các custom refs sử dụng `useImperativeHandle` thì phải export ra
 * 1 type để useRef của component khác dùng
 */
type VideoImperativeHandleRef = {
  pauseVideo: () => void;
  playVideo: () => void;
};

type VideoWatchProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  // Add more here if necessary
};

export const globalVideoRef = createRef<VideoImperativeHandleRef>();

export function GlobalVideo(props: VideoWatchProps) {
  const { className, ...otherProps } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  function pauseVideo() {
    videoRef.current?.pause();
  }

  function playVideo() {
    videoRef.current?.play();
  }

  useImperativeHandle(
    globalVideoRef,
    () => ({
      pauseVideo,
      playVideo,
    }),
    []
  );

  return (
    <video
      ref={videoRef}
      className={cn("h-96 w-48 bg-white", className)}
      {...otherProps}
    />
  );
}

export function VideoCreateRefWithoutForwardRef() {
  function handlePlay() {
    globalVideoRef.current?.playVideo();
  }

  function handlePause() {
    globalVideoRef.current?.pauseVideo();
  }

  useEffect(() => {
    console.log(globalVideoRef.current);
  }, []);

  return (
    <div>
      <GlobalVideo src={videoRegistry.video1} />
      <Button onClick={handlePlay}>Play Video</Button>
      <Button onClick={handlePause}>Pause Video</Button>
    </div>
  );
}
