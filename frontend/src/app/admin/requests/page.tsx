"use client";

import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const requestList = [
  { id: "rq-1", user: "Uma User", asset: "MacBook Pro 16", date: "2026-04-08" },
  { id: "rq-2", user: "Uma User", asset: "DJI Mini Drone", date: "2026-04-09" },
];

export default function AdminRequestsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {requestList.map((request) => (
          <div key={request.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="font-medium">{request.asset}</p>
              <p className="text-sm text-muted-foreground">
                {request.user} - {request.date}
              </p>
            </div>
            <div className="space-x-2">
              <Button size="sm" onClick={() => Swal.fire("Approved", "Request approved", "success")}>
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => Swal.fire("Rejected", "Request rejected", "info")}>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
