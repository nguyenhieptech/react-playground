import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function ModelSelector(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />;
}

function ModelSelectorTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger {...props} />;
}

function ModelSelectorContent({
  className,
  children,
  title = "Model Selector",
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  title?: React.ReactNode;
}) {
  return (
    <DialogContent className={cn("p-0", className)} {...props}>
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <Command className="**:data-[slot=command-input-wrapper]:h-auto">
        {children}
      </Command>
    </DialogContent>
  );
}

function ModelSelectorDialog(props: React.ComponentProps<typeof CommandDialog>) {
  return <CommandDialog {...props} />;
}

function ModelSelectorInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandInput>) {
  return <CommandInput className={cn("h-auto py-3.5", className)} {...props} />;
}

function ModelSelectorList(props: React.ComponentProps<typeof CommandList>) {
  return <CommandList {...props} />;
}

function ModelSelectorEmpty(props: React.ComponentProps<typeof CommandEmpty>) {
  return <CommandEmpty {...props} />;
}

function ModelSelectorGroup(props: React.ComponentProps<typeof CommandGroup>) {
  return <CommandGroup {...props} />;
}

function ModelSelectorItem(props: React.ComponentProps<typeof CommandItem>) {
  return <CommandItem {...props} />;
}

function ModelSelectorShortcut(props: React.ComponentProps<typeof CommandShortcut>) {
  return <CommandShortcut {...props} />;
}

function ModelSelectorSeparator(props: React.ComponentProps<typeof CommandSeparator>) {
  return <CommandSeparator {...props} />;
}

function ModelSelectorLogo({
  provider,
  className,
  ...props
}: Omit<React.ComponentProps<"img">, "src" | "alt"> & {
  provider:
    | "moonshotai-cn"
    | "lucidquery"
    | "moonshotai"
    | "zai-coding-plan"
    | "alibaba"
    | "xai"
    | "vultr"
    | "nvidia"
    | "upstage"
    | "groq"
    | "github-copilot"
    | "mistral"
    | "vercel"
    | "nebius"
    | "deepseek"
    | "alibaba-cn"
    | "google-vertex-anthropic"
    | "venice"
    | "chutes"
    | "cortecs"
    | "github-models"
    | "togetherai"
    | "azure"
    | "baseten"
    | "huggingface"
    | "opencode"
    | "fastrouter"
    | "google"
    | "google-vertex"
    | "cloudflare-workers-ai"
    | "inception"
    | "wandb"
    | "openai"
    | "zhipuai-coding-plan"
    | "perplexity"
    | "openrouter"
    | "zenmux"
    | "v0"
    | "iflowcn"
    | "synthetic"
    | "deepinfra"
    | "zhipuai"
    | "submodel"
    | "zai"
    | "inference"
    | "requesty"
    | "morph"
    | "lmstudio"
    | "anthropic"
    | "aihubmix"
    | "fireworks-ai"
    | "modelscope"
    | "llama"
    | "scaleway"
    | "amazon-bedrock"
    | "cerebras"
    | (string & {});
}) {
  return (
    <img
      {...props}
      alt={`${provider} logo`}
      className={cn("size-3 dark:invert", className)}
      height={12}
      src={`https://models.dev/logos/${provider}` + ".svg"}
      width={12}
    />
  );
}

function ModelSelectorLogoGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[&>img]:bg-background dark:[&>img]:bg-foreground flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:p-px [&>img]:ring-1",
        className
      )}
      {...props}
    />
  );
}

function ModelSelectorName({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("flex-1 truncate text-left", className)} {...props} />;
}

export {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorDialog,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorSeparator,
  ModelSelectorShortcut,
  ModelSelectorTrigger,
};
