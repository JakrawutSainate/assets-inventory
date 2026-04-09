import type { ReactNode } from "react";

type GradientButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
};

export function GradientButton({
  children,
  type = "button",
  className = "",
}: GradientButtonProps) {
  return (
    <button
      type={type}
      className={[
        "bg-gradient-to-br from-indigo-700 to-indigo-500 font-bold text-white transition-all",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
