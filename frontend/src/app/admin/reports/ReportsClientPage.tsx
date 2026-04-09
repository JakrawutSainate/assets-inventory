"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const utilizationData = [
  { name: "In Use", value: 42, color: "#ffffff" },
  { name: "Available", value: 58, color: "#525252" },
];
const damageSummary = [{ name: "Minor", count: 6 }, { name: "Moderate", count: 2 }, { name: "Severe", count: 1 }];

export function ReportsClientPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Reports</h1>
        <p className="text-sm text-muted-foreground">Utilization trends and damage overview.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader><CardTitle>Utilization</CardTitle></CardHeader>
          <CardContent className="h-72 min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}><PieChart><Pie data={utilizationData} dataKey="value" nameKey="name" outerRadius={90} label>{utilizationData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Damage Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {damageSummary.map((item) => <div key={item.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"><span>{item.name}</span><span className="font-semibold">{item.count}</span></div>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
