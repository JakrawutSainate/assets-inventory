"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SettingsClientPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [terms, setTerms] = useState("All borrowed assets must be returned in good condition.");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure policy and admin workspace preferences.</p>
      </header>
      <Card>
        <CardHeader><CardTitle>Edit Terms & Conditions</CardTitle></CardHeader>
        <CardContent className="space-y-4"><Textarea value={terms} onChange={(event) => setTerms(event.target.value)} className="border-white/10 bg-white/5" /><Button>Save Terms</Button></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Theme</CardTitle></CardHeader>
        <CardContent>
          <label className="flex items-center gap-2">
            <Checkbox checked={darkMode} onChange={(event) => { const checked = event.target.checked; setDarkMode(checked); document.documentElement.classList.toggle("dark", checked); }} />
            <Label>Enable Dark Mode</Label>
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
