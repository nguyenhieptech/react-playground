import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/bmp",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/3gpp",
];

export function UploadAndPreviewImagesVideos() {
  // Selected media blob URL
  const [mediaBlobUrlForPreviewing, setMediaBlobUrlForPreviewing] = useState("");
  // Media blob URLs in browser memory
  const [mediaBlobUrlsInMemory, setMediaBlobUrlsInMemory] = useState<
    { url: string; type: string }[]
  >([]);

  function handleUploadMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newMedia = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      return { url, type: file.type };
    });

    if (newMedia.length > 0) {
      setMediaBlobUrlForPreviewing(newMedia[0].url);
    }

    setMediaBlobUrlsInMemory((prev) => [...prev, ...newMedia]);
  }

  useEffect(() => {
    return () => {
      // Clean up all object URLs when component unmounts
      mediaBlobUrlsInMemory.forEach(({ url }) => {
        URL.revokeObjectURL(url);
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
          {mediaBlobUrlsInMemory.map(({ url }, index) => (
            <p key={index} className="truncate">
              {url}
            </p>
          ))}
        </div>
      </div>

      {/* Media Previews */}
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {mediaBlobUrlsInMemory.map(({ url, type }, index) => {
          const isVideo = type.startsWith("video/");
          return isVideo ? (
            <video
              key={index}
              controls
              className="aspect-h-1 aspect-w-1 lg:aspect-none h-60 w-60 rounded-md bg-black object-cover"
              src={url}
            />
          ) : (
            <img
              key={index}
              className="aspect-h-1 aspect-w-1 lg:aspect-none h-60 w-60 rounded-md bg-zinc-300 object-cover"
              src={url}
              alt="media"
            />
          );
        })}
      </div>

      <Button>Upload Media</Button>
    </div>
  );
}
