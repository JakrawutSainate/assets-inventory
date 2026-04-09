import { LoginBackground } from "@/components/login/LoginBackground";
import { LoginCard } from "@/components/login/LoginCard";
import { LoginHero } from "@/components/login/LoginHero";
import { LoginVisualPanel } from "@/components/login/LoginVisualPanel";

export default async function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-6 sm:p-12">
      <LoginBackground />

      <div className="w-full max-w-md">
        <LoginHero />
        <LoginCard />
      </div>

      <LoginVisualPanel />
    </main>
  );
}
