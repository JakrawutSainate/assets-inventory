type FormInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="px-1 text-xs font-bold tracking-widest text-slate-500 uppercase"
      >
        {label}
      </label>
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
