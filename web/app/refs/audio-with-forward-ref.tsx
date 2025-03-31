import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { audioRegistry } from "~/assets";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type AudioProps = React.AudioHTMLAttributes<HTMLAudioElement> & {
  // Add more props here if needed
};

/**
 * Các custom refs sử dụng `useImperativeHandle` thì phải export ra
 * 1 type để useRef của component khác dùng
 * Define the handle types which will be passed to the forwardRef
 *
 * Note: From React 19, ref is a part of prop, so forwardRef is not needed
 * @see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#useimperativehandle
 */
export type AudioImperativeHandleRef = {
  pauseAudio: () => void;
  playAudio: () => void;
};

export const Audio = forwardRef<AudioImperativeHandleRef, AudioProps>((props, ref) => {
  const { className, ...otherProps } = props;
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      pauseAudio() {
        audioRef.current?.pause();
      },
      playAudio() {
        audioRef.current?.play();
      },
      changeSound() {
        audioRef.current?.volume;
      },
    }),
    []
  );

  useEffect(() => {
    const rect = audioRef.current?.getBoundingClientRect();
    console.log(rect);
  }, []);

  return (
    <audio
      ref={audioRef}
      className={cn("h-96 w-48 bg-white", className)}
      {...otherProps}
    />
  );
});

Audio.displayName = "Audio";

// The component uses the Audio component
export function AudioWithForwardRef() {
  const audioRef = useRef<AudioImperativeHandleRef>(null);

  function handlePlay() {
    audioRef.current?.playAudio();
  }

  function handlePause() {
    audioRef.current?.pauseAudio();
  }

  return (
    <div className="mt-8">
      <Audio ref={audioRef} src={audioRegistry.audio1} controls />
      <Button variant="secondary" onClick={handlePlay}>
        Play Audio
      </Button>
      <Button variant="secondary" onClick={handlePause}>
        Pause Audio
      </Button>
    </div>
  );
}
