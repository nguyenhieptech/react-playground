import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  BaseSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import * as React from "react";

export function useUpdateToolbarHandler(callback: (selection: BaseSelection) => void) {
  const [editor] = useLexicalComposerContext();
  const { activeEditor } = useToolbarContext();

  React.useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (selection) {
          callback(selection);
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, callback]);

  React.useEffect(() => {
    activeEditor.getEditorState().read(() => {
      const selection = $getSelection();
      if (selection) {
        callback(selection);
      }
    });
  }, [activeEditor, callback]);
}
