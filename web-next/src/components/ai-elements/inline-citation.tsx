"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import * as React from "react";

function InlineCitation({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("group inline items-center gap-1", className)} {...props} />;
}

function InlineCitationText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("group-hover:bg-accent transition-colors", className)}
      {...props}
    />
  );
}

function InlineCitationCard(props: React.ComponentProps<typeof HoverCard>) {
  return <HoverCard closeDelay={0} openDelay={0} {...props} />;
}

function InlineCitationCardTrigger({
  sources,
  className,
  ...props
}: React.ComponentProps<typeof Badge> & {
  sources: string[];
}) {
  return (
    <HoverCardTrigger asChild>
      <Badge
        className={cn("ml-1 rounded-full", className)}
        variant="secondary"
        {...props}
      >
        {sources.length ? (
          <>
            {new URL(sources[0]).hostname}{" "}
            {sources.length > 1 && `+${sources.length - 1}`}
          </>
        ) : (
          "unknown"
        )}
      </Badge>
    </HoverCardTrigger>
  );
}

function InlineCitationCardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />;
}

const CarouselApiContext = React.createContext<CarouselApi | undefined>(undefined);

function useCarouselApi() {
  const context = React.useContext(CarouselApiContext);
  return context;
}

function InlineCitationCarousel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Carousel>) {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
}

function InlineCitationCarouselContent(props: React.ComponentProps<"div">) {
  return <CarouselContent {...props} />;
}

function InlineCitationCarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CarouselItem className={cn("w-full space-y-2 p-4 pl-8", className)} {...props} />
  );
}

function InlineCitationCarouselHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-secondary flex items-center justify-between gap-2 rounded-t-md p-2",
        className
      )}
      {...props}
    />
  );
}

function InlineCitationCarouselIndex({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const api = useCarouselApi();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn(
        "text-muted-foreground flex flex-1 items-center justify-end px-3 py-1 text-xs",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
}

function InlineCitationCarouselPrev({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const api = useCarouselApi();

  const handleClick = React.useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <button
      aria-label="Previous"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowLeftIcon className="text-muted-foreground size-4" />
    </button>
  );
}

function InlineCitationCarouselNext({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const api = useCarouselApi();

  const handleClick = React.useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <button
      aria-label="Next"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowRightIcon className="text-muted-foreground size-4" />
    </button>
  );
}

function InlineCitationSource({
  title,
  url,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
}) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {title && <h4 className="truncate text-sm leading-tight font-medium">{title}</h4>}
      {url && <p className="text-muted-foreground truncate text-xs break-all">{url}</p>}
      {description && (
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

function InlineCitationQuote({
  children,
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-muted text-muted-foreground border-l-2 pl-3 text-sm italic",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText,
};
