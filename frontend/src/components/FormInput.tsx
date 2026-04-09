import type { ReactNode } from "react";

type FormInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  labelAction?: ReactNode;
};

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  labelAction,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <label
          htmlFor={id}
          className="text-xs font-bold tracking-widest text-slate-500 uppercase"
        >
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border-0 border-b-2 border-transparent bg-slate-100 px-4 py-3 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-600 focus:ring-0"
      />
    </div>
  );
}
