import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
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

export function UploadAndPreviewMediaFilesWithDragDrop() {
  // Selected media blob URL
  const [mediaBlobUrlForPreviewing, setMediaBlobUrlForPreviewing] = useState("");

  // Media blob URLs in browser memory
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // Store media blob URLs in browser memory inside a ref to clean up when this component unmounts
  const mediaBlobUrlsRef = useRef<MediaItem[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  const dropRef = useRef<HTMLDivElement | null>(null);

  function handleUploadMediaFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    processFiles(e.target.files);
  }

  function processFiles(files: FileList | null) {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const isValidType = ALLOWED_MEDIA_TYPES.includes(file.type);
      if (!isValidType) {
        setErrorMessage(`❌ File "${file.name}" is invalid: unsupported type.`);
        return;
      }

      const sizeInMB = file.size / (1024 * 1024);
      const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;
      if (!isValidSize) {
        setErrorMessage(
          `❌ File "${file.name}" is too large (${sizeInMB.toFixed(2)} MB).`
        );
        return;
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
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

      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setErrorMessage("");
    processFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleRemoveMediaFile(name: string) {
    setMediaItems((prev) => {
      const item = prev.find((item) => item.name === name);
      if (item?.url) URL.revokeObjectURL(item.url);
      return prev.filter((item) => item.name !== name);
    });

    mediaBlobUrlsRef.current = mediaBlobUrlsRef.current.filter(
      (item) => item.name !== name
    );
  }

  useEffect(() => {
    return () => {
      // Clean up media blob files from browser memory when this component unmounts to prevent memory leak
      mediaBlobUrlsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  function getFileIcon(type: string) {
    if (type.startsWith("image/")) return "📷";
    if (type.startsWith("video/")) return "🎞️";
    if (type.startsWith("audio/")) return "🔊";
    return "❓";
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl p-6">
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="mb-4 max-w-4xl rounded-md border-2 border-dashed border-zinc-400 p-6 text-center transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <p className="font-medium">Drag & Drop files here or select manually</p>
        <Input
          className="mt-4 w-full"
          type="file"
          multiple
          onChange={handleUploadMediaFiles}
          accept={ALLOWED_MEDIA_TYPES.join(",")}
        />
      </div>

      {errorMessage && <p className="mt-2 font-medium text-red-500">{errorMessage}</p>}

      <div className="truncate">
        <h2 className="mt-2 text-xl font-semibold">Show URLs for development</h2>
        <p className="mt-2 break-all text-sm">mediaUrl: {mediaBlobUrlForPreviewing}</p>
        <div className="mt-2 text-sm">
          <span>mediaUrlList:</span>
          {mediaItems.map(({ url }, index) => (
            <p key={index} className="truncate">
              {url}
            </p>
          ))}
        </div>
      </div>

      {/* Media List Preview */}
      <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mediaItems.map(({ url, type, isLoading, progress, name }, index) => (
          <div
            key={index}
            className="relative h-64 w-full overflow-hidden rounded-md bg-zinc-100 p-2 shadow"
          >
            <button
              className="absolute right-2 top-2 z-20 rounded-full bg-white p-1 shadow"
              onClick={() => handleRemoveMediaFile(name)}
            >
              <X className="h-4 w-4 text-zinc-600" />
            </button>

            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80">
                <p className="mb-2 text-sm font-medium text-zinc-800">Loading {name}</p>
                <div className="h-2 w-32 rounded bg-zinc-300">
                  <div
                    className="h-full rounded bg-blue-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {!isLoading && type.startsWith("image/") && (
              <img className="h-full w-full rounded object-cover" src={url} alt={name} />
            )}

            {!isLoading && type.startsWith("video/") && (
              <video controls className="h-full w-full rounded object-cover" src={url} />
            )}

            {!isLoading && type.startsWith("audio/") && (
              <div className="p-2">
                <p className="truncate text-sm font-medium">
                  {getFileIcon(type)} {name}
                </p>
                <audio controls className="mt-2 w-full" src={url} />
              </div>
            )}

            {!isLoading &&
              !type.startsWith("image/") &&
              !type.startsWith("video/") &&
              !type.startsWith("audio/") && (
                <div className="flex h-full flex-col items-center justify-center text-zinc-600">
                  <p className="text-3xl">{getFileIcon(type)}</p>
                  <p className="mt-2 truncate text-sm">{name}</p>
                </div>
              )}
          </div>
        ))}
      </div>

      <Button className="mt-4">Upload Media</Button>
    </div>
  );
}
