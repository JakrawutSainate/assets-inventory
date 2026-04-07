"use client";

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const utilizationData = [
  { name: "In Use", value: 42, color: "#4f46e5" },
  { name: "Available", value: 58, color: "#22c55e" },
];

const damageSummary = [
  { name: "Minor", count: 6 },
  { name: "Moderate", count: 2 },
  { name: "Severe", count: 1 },
];

export default function AdminReportsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Utilization</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={utilizationData} dataKey="value" nameKey="name" outerRadius={90} label>
                {utilizationData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Damage Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {damageSummary.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-md border px-3 py-2">
              <span>{item.name}</span>
              <span className="font-semibold">{item.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
