import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface MediaItem {
  url: string;
  type: string;
}

const MAX_FILE_SIZE_MB = 10;

const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/bmp",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/x-ms-wmv",
  "video/3gpp",
  "audio/mpeg",
  "audio/wav",
];

export function UploadAndPreviewMediaFiles() {
  // Selected media blob URL
  const [mediaBlobUrlForPreviewing, setMediaBlobUrlForPreviewing] = useState("");

  // Media blob URLs in browser memory
  const [mediaBlobItemsInMemory, setMediaBlobItemsInMemory] = useState<MediaItem[]>([]);

  // Store media blob URLs in browser memory inside a ref to clean up when this component unmounts
  const mediaBlobUrlsRef = useRef<MediaItem[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  function handleUploadMediaFiles(e: React.ChangeEvent<HTMLInputElement>) {
    // If upload 4 files, this function will be called one time only, try it with console.log

    setErrorMessage(""); // reset

    const files = e.target.files;
    if (!files) return;

    const newMediaFiles: MediaItem[] = [];

    for (const file of files) {
      // Check type
      if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
        setErrorMessage(`Unsupported file type: ${file.name}`);
        continue;
      }

      // Check size
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > MAX_FILE_SIZE_MB) {
        setErrorMessage(`File too large: ${file.name} (${sizeInMB.toFixed(2)} MB)`);
        continue;
      }

      const url = URL.createObjectURL(file);
      newMediaFiles.push({ url, type: file.type });
    }

    if (newMediaFiles.length > 0) {
      setMediaBlobUrlForPreviewing(newMediaFiles[0].url);
      setMediaBlobItemsInMemory((prev) => [...prev, ...newMediaFiles]);

      // Add media file blob URLs to ref to clean them up from browser memory when this component unmounts
      mediaBlobUrlsRef.current.push(...newMediaFiles);
    }
  }

  useEffect(() => {
    return () => {
      // Clean up media blob files from browser memory when this component unmounts to prevent memory leak
      mediaBlobUrlsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div>
      <Input
        className="h-40 w-60"
        type="file"
        multiple
        onChange={handleUploadMediaFiles}
        accept={ALLOWED_MEDIA_TYPES.join(",")}
      />

      {errorMessage && <p className="mt-2 font-medium text-red-500">{errorMessage}</p>}

      <div className="truncate">
        <h2 className="mt-2 text-xl font-semibold">Show URLs for development</h2>
        <p className="mt-2 break-all text-sm">mediaUrl: {mediaBlobUrlForPreviewing}</p>
        <div className="mt-2 text-sm">
          <p>mediaUrlList:</p>
          {mediaBlobItemsInMemory.map(({ url }, index) => (
            <div key={index} className="truncate">
              {url}
            </div>
          ))}
        </div>
      </div>

      {/* Previews */}
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {mediaBlobItemsInMemory.map(({ url, type }, index) => {
          if (type.startsWith("image/")) {
            return (
              <img
                key={index}
                className="aspect-h-1 aspect-w-1 h-60 w-60 rounded-md bg-zinc-300 object-cover"
                src={url}
                alt="media"
              />
            );
          }

          if (type.startsWith("video/")) {
            return (
              <video
                key={index}
                controls
                className="aspect-h-1 aspect-w-1 h-60 w-60 rounded-md bg-black object-cover"
                src={url}
              />
            );
          }

          if (type.startsWith("audio/")) {
            return (
              <audio
                key={index}
                controls
                className="w-full rounded-md bg-zinc-100"
                src={url}
              />
            );
          }

          return null;
        })}
      </div>

      <Button>Upload Media</Button>
    </div>
  );
}
