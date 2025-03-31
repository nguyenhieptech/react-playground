import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { audioRegistry, videoRegistry } from "~/assets";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type AppVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  // Add props here if needed
};

type AppVideoImperativeHandleRef = {
  pauseVideo: () => void;
  playVideo: () => void;
};

export const AppVideo = forwardRef<AppVideoImperativeHandleRef, AppVideoProps>(
  (props, ref) => {
    const { className, ...otherProps } = props;
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        pauseVideo() {
          videoRef.current?.pause();
        },
        playVideo() {
          videoRef.current?.play();
        },
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
);
AppVideo.displayName = "AppVideo";

type AppAudioRef = {
  pauseAudio: () => void;
  playAudio: () => void;
};

type AppAudioProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  // Add props here if needed
};

export const appAudioRef = createRef<AppAudioRef>();

/**
 * Các custom refs sử dụng `useImperativeHandle` thì phải export ra
 * 1 type để useRef của component khác dùng
 */

export function AppAudio(props: AppAudioProps) {
  const { className, ...otherProps } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  function pauseAudio() {
    audioRef.current?.pause();
  }

  function playAudio() {
    audioRef.current?.play();
  }

  useImperativeHandle(
    appAudioRef,
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

export function ConsumeAppAudioAppVideo() {
  // 1. Audio Ref
  function handlePlayAudio() {
    appAudioRef.current?.playAudio();
  }

  function handlePauseAudio() {
    appAudioRef.current?.pauseAudio();
  }

  useEffect(() => {
    console.log(appAudioRef.current);
  }, []);

  // Refs only return valid values after components mounting.
  console.log(appAudioRef.current); // null

  // 2. Video Ref
  const appVideoRef = useRef<AppVideoImperativeHandleRef>(null);

  function handlePlayVideo() {
    appVideoRef.current?.playVideo();
  }

  function handlePauseVideo() {
    appVideoRef.current?.pauseVideo();
  }

  useEffect(() => {
    console.log(appVideoRef.current);
  }, []);

  // Refs only return valid values after components mounting.
  console.log(appVideoRef.current); // null

  return (
    <div>
      <AppAudio src={audioRegistry.audio1} controls />
      <Button variant="outline" onClick={handlePlayAudio}>
        Play Audio
      </Button>
      <Button variant="outline" onClick={handlePauseAudio}>
        Pause Audio
      </Button>

      <AppVideo ref={appVideoRef} src={videoRegistry.video1} controls />
      <Button variant="secondary" onClick={handlePlayVideo}>
        Play Video
      </Button>
      <Button variant="secondary" onClick={handlePauseVideo}>
        Pause Video
      </Button>
    </div>
  );
}
