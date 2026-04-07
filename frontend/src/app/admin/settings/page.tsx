"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [terms, setTerms] = useState("All borrowed assets must be returned in good condition.");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea value={terms} onChange={(event) => setTerms(event.target.value)} />
          <Button>Save Terms</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={darkMode}
              onChange={(event) => {
                const checked = event.target.checked;
                setDarkMode(checked);
                if (checked) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              }}
            />
            <Label>Enable Dark Mode</Label>
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
