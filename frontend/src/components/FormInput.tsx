type FormInputProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

export function FormInput({ label, name, type = "text", placeholder }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border-b-2 border-transparent bg-surface-container-low px-4 py-3 font-medium text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-0"
      />
    </div>
  );
}
