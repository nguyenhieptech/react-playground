import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface MediaItem {
  url: string;
  type: string;
  name: string;
  progress: number;
  isLoading: boolean;
}

const MAX_FILE_SIZE_MB = 10;

const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/bmp",
  "image/webp",
  "image/gif",
  "video/x-msvideo",
  "video/mp4",
  "video/x-ms-wmv",
  "video/3gpp",
  "audio/mpeg",
  "audio/wav",
];

export function UploadAndPreviewMediaFilesWithProgressBar() {
  // Selected media blob URL
  const [mediaBlobUrlForPreviewing, setMediaBlobUrlForPreviewing] = useState("");

  // Media blob URLs in browser memory
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // Store media blob URLs in browser memory inside a ref to clean up when this component unmounts
  const mediaBlobUrlsRef = useRef<MediaItem[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  function handleUploadMediaFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Check type
      if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
        setErrorMessage(`Unsupported file type: ${file.name}`);
        return;
      }

      // Check size
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > MAX_FILE_SIZE_MB) {
        setErrorMessage(`File too large: ${file.name} (${sizeInMB.toFixed(2)} MB)`);
        return;
      }

      // Progress bar
      const reader = new FileReader();
      const newMediaFile: MediaItem = {
        url: "",
        type: file.type,
        name: file.name,
        progress: 0,
        isLoading: true,
      };

      setMediaItems((prev) => [...prev, newMediaFile]);

      // Add media file blob URLs to ref to clean them up from browser memory when this component unmounts
      mediaBlobUrlsRef.current.push(newMediaFile);

      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/progress_event
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setMediaItems((prev) =>
            prev.map((item) =>
              item.name === file.name ? { ...item, progress: percent } : item
            )
          );
        }
      };

      reader.onloadend = () => {
        const blobUrl = URL.createObjectURL(file);

        setMediaBlobUrlForPreviewing(blobUrl);
        setMediaItems((prev) =>
          prev.map((item) =>
            item.name === file.name
              ? { ...item, url: blobUrl, isLoading: false, progress: 100 }
              : item
          )
        );

        mediaBlobUrlsRef.current = mediaBlobUrlsRef.current.map((item) =>
          item.name === file.name
            ? { ...item, url: blobUrl, isLoading: false, progress: 100 }
            : item
        );
      };

      reader.readAsArrayBuffer(file);
    });
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
          <span>mediaUrlList:</span>
          {mediaItems.map(({ url }, index) => (
            <div key={index} className="truncate">
              {url}
            </div>
          ))}
        </div>
      </div>

      {/* Previews */}
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {mediaItems.map(({ url, type, isLoading, progress, name }, index) => (
          <div
            key={index}
            className="relative h-60 w-60 overflow-hidden rounded-md bg-zinc-100 shadow"
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80">
                <p className="mb-2 text-sm font-medium text-zinc-800">Loading {name}</p>
                <div className="h-2 w-32 rounded bg-zinc-300">
                  <div
                    className="h-full rounded bg-blue-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            {!isLoading && type.startsWith("image/") && (
              <img className="h-full w-full object-cover" src={url} alt={name} />
            )}
            {!isLoading && type.startsWith("video/") && (
              <video controls className="h-full w-full object-cover" src={url} />
            )}
            {!isLoading && type.startsWith("audio/") && (
              <div className="p-2">
                <p className="truncate text-sm font-medium">{name}</p>
                <audio controls className="mt-2 w-full" src={url} />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button>Upload Media</Button>
    </div>
  );
}
