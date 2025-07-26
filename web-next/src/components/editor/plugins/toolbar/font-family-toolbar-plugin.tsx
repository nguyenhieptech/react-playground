"use client";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { $getSelectionStyleValueForProperty, $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection, BaseSelection } from "lexical";
import { TypeIcon } from "lucide-react";
import { useCallback, useState } from "react";

const FONT_FAMILY_OPTIONS = [
  "Inter",
  "Arial",
  "Verdana",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Trebuchet MS",
];

export function FontFamilyToolbarPlugin() {
  const style = "font-family";
  const [fontFamily, setFontFamily] = useState("Inter");
  const { activeEditor } = useToolbarContext();

  function $updateToolbar(selection: BaseSelection) {
    if ($isRangeSelection(selection)) {
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Inter")
      );
    }
  }

  useUpdateToolbarHandler($updateToolbar);

  const handleClick = useCallback(
    (option: string) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [activeEditor, style]
  );

  const buttonAriaLabel = "Formatting options for font family";

  return (
    <Select
      value={fontFamily}
      onValueChange={(value) => {
        setFontFamily(value);
        handleClick(value);
      }}
      aria-label={buttonAriaLabel}
    >
      <SelectTrigger className="!h-8 w-min gap-1">
        <TypeIcon className="size-4" />
        <span>{fontFamily}</span>
      </SelectTrigger>
      <SelectContent>
        {FONT_FAMILY_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
