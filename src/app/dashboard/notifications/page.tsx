"use client";

import React from "react";
import { Bell, Bird, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: "1", crow: "Cashflow", icon: AlertTriangle, severity: "warning", title: "Cash runway below 30 days", message: "At current spending rate, ~24 days remaining.", time: "2 hours ago", read: false },
  { id: "2", crow: "Expense", icon: Info, severity: "info", title: "Duplicate subscription detected", message: "Zoom Pro and Google Meet Enterprise overlap.", time: "5 hours ago", read: false },
  { id: "3", crow: "Cashflow", icon: AlertTriangle, severity: "danger", title: "3 invoices overdue", message: "Total overdue: $4,350. Chase immediately.", time: "1 day ago", read: false },
  { id: "4", crow: "System", icon: CheckCircle2, severity: "success", title: "Invoice paid", message: "Gamma Inc paid $3,800 (WC-M0H5P).", time: "2 days ago", read: true },
  { id: "5", crow: "Expense", icon: Info, severity: "info", title: "Monthly waste report ready", message: "Found $324 in potential savings.", time: "3 days ago", read: true },
  { id: "6", crow: "System", icon: CheckCircle2, severity: "success", title: "Bank connected", message: "Chase Business checking synced.", time: "5 days ago", read: true },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">Alerts from your Crows</p>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bell className="h-4 w-4" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className={`flex gap-3 rounded-lg p-3 transition-colors ${!n.read ? "bg-muted/50" : ""}`}>
                <div className="mt-0.5">
                  <Icon className={`h-4 w-4 ${
                    n.severity === "danger" ? "text-destructive" :
                    n.severity === "warning" ? "text-amber-500" :
                    n.severity === "success" ? "text-emerald-500" :
                    "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{n.title}</span>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Bird className="h-3 w-3" /> {n.crow}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
