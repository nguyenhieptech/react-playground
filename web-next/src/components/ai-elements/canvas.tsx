import * as React from "react";
import { Background, ReactFlow, type ReactFlowProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Canvas({
  children,
  ...props
}: ReactFlowProps & {
  children?: React.ReactNode;
}) {
  return (
    <ReactFlow
      deleteKeyCode={["Backspace", "Delete"]}
      fitView
      panOnDrag={false}
      panOnScroll
      selectionOnDrag={true}
      zoomOnDoubleClick={false}
      {...props}
    >
      <Background bgColor="var(--sidebar)" />
      {children}
    </ReactFlow>
  );
}

export { Canvas };
