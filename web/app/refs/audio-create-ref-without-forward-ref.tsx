import React, { createRef, useEffect, useImperativeHandle, useRef } from "react";
import { audioRegistry } from "~/assets";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

/**
 * Khi dùng useImperativeHandle thì mẹo với createRef không chạy khi thử với DOM methods như là play, pause.
 * Với state thì có chạy, giống như các modal dùng useState để toggle đóng/mở.
 * 27/10/2023: ủa sao lại chạy được rồi nhỷ?
 */

type AudioRef = {
  pauseAudio: () => void;
  playAudio: () => void;
};

type AudioProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  // Add more props here if needed
};

export const globalAudioRef = createRef<AudioRef>();

/**
 * Các custom refs sử dụng `useImperativeHandle` thì phải export ra
 * 1 type để useRef của component khác dùng
 */

export function AppAudio(props: AudioProps) {
  const { className, ...otherProps } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  function pauseAudio() {
    audioRef.current?.pause();
  }

  function playAudio() {
    audioRef.current?.play();
  }

  useImperativeHandle(
    globalAudioRef,
    () => ({
      pauseAudio,
      playAudio,
    }),
    []
  );

  return (
    <audio
      ref={audioRef}
      className={cn("h-48 w-48 bg-white", className)}
      {...otherProps}
    />
  );
}

export function ConsumeAudioApp() {
  function handlePlay() {
    globalAudioRef.current?.playAudio();
  }

  function handlePause() {
    globalAudioRef.current?.pauseAudio();
  }

  useEffect(() => {
    console.log(globalAudioRef.current);
  }, []);

  return (
    <div>
      <AppAudio src={audioRegistry.audio1} controls />
      <Button variant="outline" onClick={handlePlay}>
        Play Audio
      </Button>
      <Button variant="outline" onClick={handlePause}>
        Pause Audio
      </Button>
    </div>
  );
}
