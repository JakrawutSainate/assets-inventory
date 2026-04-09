"use client";

import { mockAssets } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminAssetsClientPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Assets</h1>
        <p className="text-sm text-muted-foreground">Inventory table with quick management actions.</p>
      </header>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Assets</CardTitle>
          <Button>Add Asset</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Location</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell><StatusBadge status={asset.status} /></TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell className="space-x-2"><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="destructive">Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
