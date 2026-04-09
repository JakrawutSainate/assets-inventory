"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/models/User";
import { useAuthStore } from "@/store/useAuthStore";

export function LoginClientPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (role: UserRole) => {
    login(role);
    router.push(role === UserRole.ADMIN ? "/admin/dashboard" : "/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card>
          <CardHeader><CardTitle className="text-3xl font-black tracking-tight">Luminescent Access</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Mock mode: no password required, click any role button to continue.</p>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => onLogin(UserRole.ADMIN)}>Login as Admin</Button>
              <Button variant="outline" onClick={() => onLogin(UserRole.USER)}>Login as User</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
