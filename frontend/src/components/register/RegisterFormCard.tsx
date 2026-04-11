"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormInput } from "@/components/FormInput";

export function RegisterFormCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: name.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setError(
          data.message ??
            (res.status === 409 ? "Email already registered" : `Registration failed (${res.status})`),
        );
        setPending(false);
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
      setPending(false);
    }
  }

  return (
    <div className="group relative rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] transition-colors duration-200 dark:bg-slate-900 dark:shadow-none">
      <div className="absolute -top-3 -right-3 rounded-full bg-linear-to-br from-emerald-700 to-emerald-500 px-4 py-1.5 shadow-lg">
        <span className="text-[10px] font-bold tracking-widest text-white uppercase">New account</span>
      </div>

      <form className="space-y-6" onSubmit={(e) => void onSubmit(e)}>
        <FormInput
          id="name"
          label="Display name"
          type="text"
          placeholder="Alex Sterling"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@organization.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          labelAction={<span className="text-xs font-bold text-slate-400">Min. 8 characters</span>}
        />

        {error ? (
          <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="space-y-4 pt-4">
          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-emerald-700 to-emerald-500 px-6 py-4 font-bold text-white shadow-lg transition-all hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-60"
          >
            {pending ? "Creating account…" : "Create account"}
          </button>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-indigo-700 hover:underline dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
