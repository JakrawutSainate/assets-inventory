"use client";

import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const requestList = [
  { id: "rq-1", user: "Uma User", asset: "MacBook Pro 16", date: "2026-04-08" },
  { id: "rq-2", user: "Uma User", asset: "DJI Mini Drone", date: "2026-04-09" },
];

export function RequestsClientPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Pending Approvals</h1>
        <p className="text-sm text-muted-foreground">Review and manage organizational asset requests.</p>
      </header>
      <Card>
        <CardHeader><CardTitle className="text-xl font-semibold">Approval Requests</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {requestList.length === 0 ? (
            <EmptyState title="No requests found" />
          ) : (
            requestList.map((request, index) => (
              <motion.div key={request.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ scale: 1.02 }} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div>
                  <p className="text-xl font-semibold">{request.asset}</p>
                  <p className="text-sm text-muted-foreground">{request.user} - Requested {request.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="px-6" onClick={() => Swal.fire("Approved", "Request approved", "success")}>Approve</Button>
                  <Button size="sm" variant="destructive" className="px-6" onClick={() => Swal.fire("Rejected", "Request rejected", "info")}>Reject</Button>
                </div>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
