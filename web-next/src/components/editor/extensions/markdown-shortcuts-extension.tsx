import { defineExtension, safeCast } from "lexical";
import { effect, namedSignals } from "@lexical/extension";
import { type Transformer, registerMarkdownShortcuts } from "@lexical/markdown";

// This is not a published extension because markdown transformers
// should get a refactor to require less manual configuration
export const MarkdownShortcutsExtension = defineExtension({
  build: (_, config) => namedSignals(config),
  config: safeCast<{ transformers: Array<Transformer> }>({ transformers: [] }),
  name: "@shadcn-editor/MarkdownShortcuts",
  register: (editor, _, state) =>
    effect(() => {
      registerMarkdownShortcuts(editor, state.getOutput().transformers.value);
    }),
});
