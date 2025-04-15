// https://www.youtube.com/watch?v=Fnb3GbY9FUY&list=PL_-VfJajZj0W8-gf0g3YCCyFh-pVFMOgy&index=10

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/bmp",
  "image/webp",
  "image/gif",
];

export function UploadAndPreviewImages() {
  // Selected media blob URL
  const [mediaBlobUrlForPreviewing, setMediaBlobUrlForPreviewing] = useState("");

  // Media blob URLs in browser memory (for rendering URLs in development)
  const [mediaBlobUrlsInMemory, setMediaBlobUrlsInMemory] = useState([""]);

  // Store media blob URLs in browser memory inside a ref to clean up when this component unmounts
  const mediaBlobUrlsRef = useRef<string[]>([]);

  function handleUploadMediaFiles(e: React.ChangeEvent<HTMLInputElement>) {
    // If upload 4 files, this function will be called one time only, try it with console.log

    const files = e.target.files;
    if (!files) return;
    // Create files in browser memory from the media file object
    // so that we can access it with a URL
    const mediaUrlInMemory = URL.createObjectURL(files[0]);
    setMediaBlobUrlForPreviewing(mediaUrlInMemory);
    setMediaBlobUrlsInMemory((prev) => [...prev, mediaUrlInMemory]);

    // Add media file blob URLs to ref to clean them up from browser memory when this component unmounts
    mediaBlobUrlsRef.current.push(mediaUrlInMemory);
  }

  useEffect(() => {
    return () => {
      // Clean up media blob files from browser memory when this component unmounts to prevent memory leak
      mediaBlobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
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

      <div className="truncate">
        <h2 className="mt-2 text-xl font-semibold">Show URLs for development</h2>
        <p className="mt-2 break-all text-sm">mediaUrl: {mediaBlobUrlForPreviewing}</p>
        <div className="mt-2 text-sm">
          <span>mediaUrlList:</span>
          {mediaBlobUrlsInMemory.map((mediaBlobUrl, index) => (
            <p key={index} className="truncate">
              {mediaBlobUrl}
            </p>
          ))}
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {mediaBlobUrlsInMemory.map((mediaBlobUrl, index) => {
          if (mediaBlobUrl) {
            return (
              <img
                key={index}
                className="aspect-h-1 aspect-w-1 lg:aspect-none h-60 w-60 rounded-md bg-zinc-300 object-cover"
                src={mediaBlobUrl}
                alt="image"
              />
            );
          }
        })}
      </div>

      <Button>Upload images</Button>
    </div>
  );
}
