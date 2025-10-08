import { cn } from "@/lib/utils";
import type { Experimental_GeneratedImage } from "ai";

function Image({
  base64,
  uint8Array,
  mediaType,
  ...props
}: Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      {...props}
      alt={props.alt}
      className={cn("h-auto max-w-full overflow-hidden rounded-md", props.className)}
      src={`data:${mediaType};base64,${base64}`}
    />
  );
}

export { Image };
