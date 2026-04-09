import { FormInput } from "@/components/FormInput";
import { LoginActions } from "@/components/login/LoginActions";

export function LoginForm() {
  return (
    <form className="space-y-6">
      <FormInput label="Email Address" name="email" type="email" placeholder="name@organization.com" />
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="password">
            Password
          </label>
          <a className="text-xs font-bold text-primary transition-colors hover:text-primary-container" href="#">
            Forgot Access?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg border-b-2 border-transparent bg-surface-container-low px-4 py-3 font-medium text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-0"
        />
      </div>
      <LoginActions />
    </form>
  );
}
