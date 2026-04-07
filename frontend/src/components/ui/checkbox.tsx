import * as React from "react";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

export function Checkbox(props: CheckboxProps) {
  return <input type="checkbox" className="h-4 w-4 rounded border border-input accent-primary" {...props} />;
}
