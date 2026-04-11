import type { ButtonHTMLAttributes, ReactNode } from "react";

type GradientButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled">;

export function GradientButton({
  children,
  type = "button",
  className = "",
  onClick,
  disabled,
}: GradientButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "bg-gradient-to-br from-indigo-700 to-indigo-500 font-bold text-white transition-all disabled:opacity-50",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
