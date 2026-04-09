"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { name: "Mon", borrowings: 4 },
  { name: "Tue", borrowings: 7 },
  { name: "Wed", borrowings: 3 },
  { name: "Thu", borrowings: 9 },
  { name: "Fri", borrowings: 6 },
];

export function AdminDashboardClientPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-2 text-5xl font-black tracking-tight text-white">Welcome back, Admin.</h1>
        <p className="text-sm text-muted-foreground">System operations are nominal. 3 assets require your immediate attention.</p>
      </section>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden"><div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" /><CardHeader><CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total Assets</CardTitle></CardHeader><CardContent className="text-4xl font-black">$4.2M</CardContent></Card>
        <Card className="relative overflow-hidden"><div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" /><CardHeader><CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Borrowed Assets</CardTitle></CardHeader><CardContent className="text-4xl font-black">$1.8M</CardContent></Card>
        <Card className="relative overflow-hidden"><div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" /><CardHeader><CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Available Assets</CardTitle></CardHeader><CardContent className="text-4xl font-black">$2.4M</CardContent></Card>
      </div>
      <Card className="min-w-0">
        <CardHeader><CardTitle className="text-xl font-semibold">Asset Activity</CardTitle><p className="text-sm text-muted-foreground">Real-time throughput and utilization metrics</p></CardHeader>
        <CardContent className="h-80 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /><XAxis dataKey="name" stroke="#a3a3a3" /><YAxis stroke="#a3a3a3" /><Tooltip /><Bar dataKey="borrowings" fill="var(--color-chart-1)" radius={8} /></BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
