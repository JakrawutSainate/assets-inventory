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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">128</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Borrowings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">37</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">11</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Borrowing Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="borrowings" fill="var(--color-chart-1)" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
