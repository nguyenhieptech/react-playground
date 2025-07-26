import * as React from "react";

type BaseEquationEditorProps = {
  equation: string;
  inline: boolean;
  setEquation: (equation: string) => void;
};

export const EquationEditor = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  BaseEquationEditorProps
>(({ equation, setEquation, inline }, ref) => {
  function onChange(event: React.ChangeEvent) {
    setEquation((event.target as HTMLInputElement).value);
  }

  return inline && ref instanceof HTMLInputElement ? (
    <span className="EquationEditor_inputBackground bg-background">
      <span className="EquationEditor_dollarSign text-muted-foreground text-left">$</span>
      <input
        className="EquationEditor_inlineEditor text-primary m-0 resize-none border-0 bg-inherit p-0 outline-none"
        value={equation}
        onChange={onChange}
        autoFocus={true}
        ref={ref as React.RefObject<HTMLInputElement>}
      />
      <span className="EquationEditor_dollarSign text-muted-foreground text-left">$</span>
    </span>
  ) : (
    <div className="EquationEditor_inputBackground bg-background">
      <span className="EquationEditor_dollarSign text-muted-foreground text-left">
        {"$$\n"}
      </span>
      <textarea
        className="EquationEditor_blockEditor text-primary m-0 w-full resize-none border-0 bg-inherit p-0 outline-none"
        value={equation}
        onChange={onChange}
        ref={ref as React.RefObject<HTMLTextAreaElement>}
      />
      <span className="EquationEditor_dollarSign text-muted-foreground text-left">
        {"\n$$"}
      </span>
    </div>
  );
});
