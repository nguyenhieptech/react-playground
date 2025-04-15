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

  function handleUploadMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    // Create files in browser memory from the media file object
    // so that we can access it with a URL
    if (files) {
      const mediaUrlInMemory = URL.createObjectURL(files[0]);
      setMediaBlobUrlForPreviewing(mediaUrlInMemory);
      setMediaBlobUrlsInMemory([...mediaBlobUrlsInMemory, mediaUrlInMemory]);
    }
  }

  useEffect(() => {
    return () => {
      // Remove media files (images) from browser memory when this component unmounts
      mediaBlobUrlsInMemory.forEach((mediaBlobUrl) => {
        URL.revokeObjectURL(mediaBlobUrl);
      });
    };
  }, []);

  return (
    <div className="w-[100rem]">
      <Input
        className="h-40 w-60"
        type="file"
        multiple
        onChange={handleUploadMedia}
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
