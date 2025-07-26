import { LexicalEditor } from "lexical";
import * as React from "react";

const Context = React.createContext<{
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (
    title: string,
    showModal: (onClose: () => void) => React.JSX.Element
  ) => void;
}>({
  activeEditor: {} as LexicalEditor,
  $updateToolbar: () => {},
  blockType: "paragraph",
  setBlockType: () => {},
  showModal: () => {},
});

export function ToolbarContext({
  activeEditor,
  $updateToolbar,
  blockType,
  setBlockType,
  showModal,
  children,
}: {
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (
    title: string,
    showModal: (onClose: () => void) => React.JSX.Element
  ) => void;
  children: React.ReactNode;
}) {
  return (
    <Context.Provider
      value={{
        activeEditor,
        $updateToolbar,
        blockType,
        setBlockType,
        showModal,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useToolbarContext() {
  return React.useContext(Context);
}
