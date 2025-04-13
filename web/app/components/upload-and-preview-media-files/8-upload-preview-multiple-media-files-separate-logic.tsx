import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useRef, useState } from "react";

// --------------------
// 📦 Constants & Types
// --------------------
interface MediaItem {
  file: File;
  url: string;
  type: string;
  name: string;
  isLoading: boolean;
  progress: number;
}

const MAX_FILE_SIZE_MB = 100;

const ALLOWED_TYPES = [
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
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
];

// ------------------------------
// 📁 Upload Validation & Progress
// ------------------------------
function validateAndPrepareFiles(
  files: File[],
  setError: (msg: string) => void
): MediaItem[] {
  const validated: MediaItem[] = [];

  files.forEach((file) => {
    const isValidType = ALLOWED_TYPES.includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setError(`❌ "${file.name}" is invalid: unsupported type or too large.`);
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

  return validated;
}

function simulateUploadProgress(
  item: MediaItem,
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>
) {
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

  setTimeout(() => clearInterval(interval), 4000);
}

// ------------------------
// 🖱️ Drag & Drop Feature
// ------------------------
function useDragAndDrop(handleFiles: (files: File[]) => void) {
  const dropRef = useRef<HTMLDivElement>(null);

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
    handleFiles(files);
  }

  return {
    dropRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

// ---------------------------
// 🎧 Media Preview & Playback
// ---------------------------
function useExclusivePlayback(mediaItems: MediaItem[]) {
  const mediaRefs = useRef<HTMLMediaElement[]>([]);

  function handleMediaPlay(current: HTMLMediaElement) {
    mediaRefs.current.forEach((media) => {
      if (media !== current) media.pause();
    });
  }

  useEffect(() => {
    mediaRefs.current = [];
  }, [mediaItems]);

  return { mediaRefs, handleMediaPlay };
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return "🖼️";
  if (type.startsWith("video/")) return "🎥";
  if (type.startsWith("audio/")) return "🎵";
  return "📁";
}

// -----------------------------
// 🧹 Cleanup Blob URLs on Exit
// -----------------------------
function useCleanupMediaUrls(mediaItems: MediaItem[]) {
  useEffect(() => {
    return () => {
      mediaItems.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, []);
}

// --------------------------
// ✅ Main Component
// --------------------------
export function UploadAndPreviewMediaFilesSeparateLogic() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { dropRef, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop(handleNewFiles);

  const { mediaRefs, handleMediaPlay } = useExclusivePlayback(mediaItems);

  useCleanupMediaUrls(mediaItems);

  function handleNewFiles(files: File[]) {
    setErrorMessage("");
    const validated = validateAndPrepareFiles(files, setErrorMessage);
    validated.forEach((item) => simulateUploadProgress(item, setMediaItems));
    setMediaItems((prev) => [...prev, ...validated]);
  }

  function handleUploadMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    handleNewFiles(files);
  }

  function handleRemoveFile(index: number) {
    const file = mediaItems[index];
    URL.revokeObjectURL(file.url);
    setMediaItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Upload Input */}
      <div className="mb-4 flex gap-4">
        <Input
          type="file"
          multiple
          onChange={handleUploadMedia}
          accept={ALLOWED_TYPES.join(",")}
        />
        <Button onClick={() => dropRef.current?.scrollIntoView({ behavior: "smooth" })}>
          Scroll to Dropzone
        </Button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 font-semibold text-red-600">{errorMessage}</div>
      )}

      {/* Dropzone */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="mb-6 flex h-32 w-full items-center justify-center rounded-lg border-4 border-dashed border-zinc-300 text-zinc-500"
      >
        Drag & Drop media files here
      </div>

      {/* Media Preview List */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    if (el && !mediaRefs.current.includes(el)) {
                      mediaRefs.current.push(el);
                    }
                  }}
                  onPlay={() =>
                    handleMediaPlay(mediaRefs.current.find((el) => el?.src === url)!)
                  }
                />
              )}

              {!isLoading && type.startsWith("audio/") && (
                <div className="mt-2">
                  <p className="truncate text-sm font-medium">
                    {getFileIcon(type)} {name}
                  </p>
                  <audio
                    controls
                    className="mt-1 w-full"
                    src={url}
                    ref={(el) => {
                      if (el && !mediaRefs.current.includes(el)) {
                        mediaRefs.current.push(el);
                      }
                    }}
                    onPlay={() =>
                      handleMediaPlay(mediaRefs.current.find((el) => el?.src === url)!)
                    }
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
