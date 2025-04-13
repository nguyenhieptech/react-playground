import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useRef, useState } from "react";

interface MediaItem {
  file: File;
  url: string;
  type: string;
  name: string;
  isLoading: boolean;
  progress: number;
}

const MAX_FILE_SIZE_MB = 100;

const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "video/mp4",
  "video/x-msvideo",
  "video/3gpp",
  "video/x-ms-wmv",
  "video/mov",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
];

// -------------------------
// 📦 State & Refs
// -------------------------
export function UploadPreviewMultipleMediaFilesSinglePlayback() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<HTMLMediaElement[]>([]); // Tracks all audio/video elements
  const [currentlyPlaying, setCurrentlyPlaying] = useState<HTMLMediaElement | null>(null);

  // -------------------------
  // 🛠 Handlers
  // -------------------------

  function handleUploadMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    handleNewFiles(files);
  }

  function handleNewFiles(files: File[]) {
    const validated: MediaItem[] = [];

    files.forEach((file) => {
      const isValidType = ALLOWED_MEDIA_TYPES.includes(file.type);
      const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      if (!isValidType) {
        setErrorMessage(`❌ File "${file.name}" is invalid: unsupported type.`);
        return;
      }

      if (!isValidSize) {
        setErrorMessage(`❌ File "${file.name}" is invalid: size too large.`);
        return;
      }

      const url = URL.createObjectURL(file);
      validated.push({
        file,
        url,
        type: file.type,
        name: file.name,
        isLoading: file.size > 5 * 1024 * 1024,
        progress: 0,
      });
    });

    validated.forEach(simulateUploadProgress);
    setMediaItems((prev) => [...prev, ...validated]);
  }

  function handleRemoveFile(index: number) {
    const file = mediaItems[index];
    URL.revokeObjectURL(file.url);
    setMediaItems((prev) => prev.filter((_, i) => i !== index));
  }

  function simulateUploadProgress(item: MediaItem) {
    if (!item.isLoading) return;

    const interval = setInterval(() => {
      setMediaItems((prev) =>
        prev.map((m) =>
          m.url === item.url
            ? {
                ...m,
                progress: Math.min(m.progress + 10, 100),
                isLoading: m.progress + 10 < 100,
              }
            : m
        )
      );
    }, 300);

    setTimeout(() => clearInterval(interval), 4000); // Auto clear after max timeout
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dropRef.current?.classList.add("border-blue-400");
  }

  function handleDragLeave() {
    dropRef.current?.classList.remove("border-blue-400");
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dropRef.current?.classList.remove("border-blue-400");
    const files = Array.from(e.dataTransfer.files);
    handleNewFiles(files);
  }

  function handleMediaPlay(current: HTMLMediaElement) {
    // Pause other media, only one video or audio can play at a time
    if (currentlyPlaying && currentlyPlaying !== current) {
      currentlyPlaying.pause();
    }
    setCurrentlyPlaying(current);
  }

  function getFileIcon(type: string) {
    if (type.startsWith("image/")) return "🖼️";
    if (type.startsWith("video/")) return "🎥";
    if (type.startsWith("audio/")) return "🎵";
    return "📁";
  }

  // -------------------------
  // 🌀 Effects
  // -------------------------
  useEffect(() => {
    return () => {
      mediaItems.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, []);

  useEffect(() => {
    mediaRefs.current = [];
  }, [mediaItems]);

  // -------------------------
  // 📦 Render
  // -------------------------
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-4 flex gap-4">
        <Input
          type="file"
          multiple
          onChange={handleUploadMedia}
          accept={ALLOWED_MEDIA_TYPES.join(",")}
        />
        <Button onClick={() => dropRef.current?.scrollIntoView({ behavior: "smooth" })}>
          Scroll to Dropzone
        </Button>
      </div>

      {errorMessage && (
        <div className="mb-4 font-semibold text-red-600">{errorMessage}</div>
      )}

      <div className="my-4 truncate">
        <h2 className="text-xl font-semibold">Show URLs for development</h2>
        <p className="mt-2 break-all text-sm">
          currentlyPlaying: {currentlyPlaying?.src}
        </p>
        <div className="mt-2 text-sm">
          <p>mediaUrlList:</p>
          {mediaItems.map(({ url, name }, index) => (
            <p key={index} className="truncate">
              {name}: {url}
            </p>
          ))}
        </div>
      </div>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="mb-6 flex h-32 w-full items-center justify-center rounded-lg border-4 border-dashed border-zinc-300 text-zinc-500"
      >
        Drag & Drop media files here
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
        {mediaItems.map((item, index) => {
          const { type, url, name, isLoading, progress } = item;

          return (
            <div key={url} className="relative rounded-md border p-3 shadow">
              <div className="absolute right-2 top-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveFile(index)}
                >
                  ✖
                </Button>
              </div>

              {isLoading && (
                <div className="mb-2">
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {!isLoading && type.startsWith("image/") && (
                <img
                  src={url}
                  alt="preview"
                  className="h-60 w-full rounded object-cover"
                />
              )}

              {!isLoading && type.startsWith("video/") && (
                <video
                  controls
                  src={url}
                  className="h-60 w-full rounded"
                  ref={(el) => {
                    if (el) mediaRefs.current[index] = el;
                  }}
                  onPlay={(e) => handleMediaPlay(e.currentTarget)}
                />
              )}

              {!isLoading && type.startsWith("audio/") && (
                <div className="mt-2">
                  <p className="truncate text-sm font-medium">
                    {getFileIcon(type)} {name}
                  </p>
                  <audio
                    controls
                    src={url}
                    ref={(el) => {
                      if (el) mediaRefs.current[index] = el;
                    }}
                    onPlay={(e) => handleMediaPlay(e.currentTarget)}
                    className="mt-1 w-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
