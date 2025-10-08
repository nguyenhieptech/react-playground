"use client";

import { Editor } from "@/blocks/editor-x/editor";
import { SerializedEditorState } from "lexical";
import * as React from "react";

// Lexical base rich text editor using shadcn/ui components
// https://github.com/htmujahid/shadcn-editor

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Hello React Playground 🚀",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function EditorPage() {
  const [editorState, setEditorState] =
    React.useState<SerializedEditorState>(initialValue);

  return (
    <div className="container mx-auto">
      <div>
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
        />
      </div>
    </div>
  );
}
