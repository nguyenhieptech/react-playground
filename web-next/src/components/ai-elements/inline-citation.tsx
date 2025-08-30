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

export type InlineCitationProps = React.ComponentProps<"span">;

export function InlineCitation({ className, ...props }: InlineCitationProps) {
  return <span className={cn("group inline items-center gap-1", className)} {...props} />;
}

export type InlineCitationTextProps = React.ComponentProps<"span">;

export function InlineCitationText({ className, ...props }: InlineCitationTextProps) {
  return (
    <span
      className={cn("group-hover:bg-accent transition-colors", className)}
      {...props}
    />
  );
}

export type InlineCitationCardProps = React.ComponentProps<typeof HoverCard>;

export function InlineCitationCard(props: InlineCitationCardProps) {
  return <HoverCard closeDelay={0} openDelay={0} {...props} />;
}

export type InlineCitationCardTriggerProps = React.ComponentProps<typeof Badge> & {
  sources: string[];
};

export function InlineCitationCardTrigger({
  sources,
  className,
  ...props
}: InlineCitationCardTriggerProps) {
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

export type InlineCitationCardBodyProps = React.ComponentProps<"div">;

export function InlineCitationCardBody({
  className,
  ...props
}: InlineCitationCardBodyProps) {
  return <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />;
}

const CarouselApiContext = React.createContext<CarouselApi | undefined>(undefined);

function useCarouselApi() {
  const context = React.useContext(CarouselApiContext);
  return context;
}

export type InlineCitationCarouselProps = React.ComponentProps<typeof Carousel>;

export function InlineCitationCarousel({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
}

export type InlineCitationCarouselContentProps = React.ComponentProps<"div">;

export function InlineCitationCarouselContent(props: InlineCitationCarouselContentProps) {
  return <CarouselContent {...props} />;
}

export type InlineCitationCarouselItemProps = React.ComponentProps<"div">;

export function InlineCitationCarouselItem({
  className,
  ...props
}: InlineCitationCarouselItemProps) {
  return (
    <CarouselItem className={cn("w-full space-y-2 p-4 pl-8", className)} {...props} />
  );
}

export type InlineCitationCarouselHeaderProps = React.ComponentProps<"div">;

export function InlineCitationCarouselHeader({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) {
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

export type InlineCitationCarouselIndexProps = React.ComponentProps<"div">;

export function InlineCitationCarouselIndex({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) {
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

export type InlineCitationCarouselPrevProps = React.ComponentProps<"button">;

export function InlineCitationCarouselPrev({
  className,
  ...props
}: InlineCitationCarouselPrevProps) {
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

export type InlineCitationCarouselNextProps = React.ComponentProps<"button">;

export function InlineCitationCarouselNext({
  className,
  ...props
}: InlineCitationCarouselNextProps) {
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

export type InlineCitationSourceProps = React.ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

export function InlineCitationSource({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) {
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

export type InlineCitationQuoteProps = React.ComponentProps<"blockquote">;

export function InlineCitationQuote({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) {
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
