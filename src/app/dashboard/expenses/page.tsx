"use client";

import React from "react";
import { Scissors, AlertTriangle, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CrowChat } from "@/components/crow/crow-chat";
import { formatCurrency } from "@/lib/utils";

export default function ExpensesPage() {
  const subscriptions = [
    { name: "Zoom Pro", amount: 14.99, status: "active", usage: "Low" },
    { name: "Google Meet Enterprise", amount: 12.0, status: "duplicate", usage: "Medium" },
    { name: "Slack Business+", amount: 12.5, status: "active", usage: "High" },
    { name: "Adobe Creative Cloud", amount: 54.99, status: "active", usage: "Low" },
    { name: "Dropbox Business", amount: 15.0, status: "unused", usage: "None" },
    { name: "HubSpot CRM", amount: 45.0, status: "active", usage: "High" },
  ];

  const spikes = [
    { category: "Marketing", current: 2400, average: 1200, pct: 100 },
    { category: "Travel", current: 1800, average: 800, pct: 125 },
    { category: "Office Supplies", current: 650, average: 400, pct: 63 },
  ];

  const savings = subscriptions
    .filter((s) => s.status === "duplicate" || s.status === "unused")
    .reduce((t, s) => t + s.amount * 12, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Expenses</h1>
        <p className="text-sm text-muted-foreground">Waste detection and subscription management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Monthly Subscriptions</p>
            <p className="text-2xl font-semibold mt-1">
              {formatCurrency(subscriptions.reduce((s, sub) => s + sub.amount, 0))}<span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{subscriptions.length} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Potential Annual Savings</p>
            <p className="text-2xl font-semibold mt-1 text-emerald-600 dark:text-emerald-400">
              {formatCurrency(savings)}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">From duplicates & unused</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Expense Anomalies</p>
            <p className="text-2xl font-semibold mt-1">{spikes.length}</p>
            <p className="text-xs text-destructive mt-1">Categories over budget</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subscriptions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Repeat className="h-4 w-4" />
              Subscription Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {subscriptions.map((sub, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{sub.name}</p>
                    {sub.status === "duplicate" && <Badge variant="outline" className="text-amber-600 border-amber-300 text-[10px]">Duplicate</Badge>}
                    {sub.status === "unused" && <Badge variant="outline" className="text-destructive border-destructive/30 text-[10px]">Unused</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">Usage: {sub.usage}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{formatCurrency(sub.amount)}/mo</span>
                  {(sub.status === "duplicate" || sub.status === "unused") && (
                    <Button variant="outline" size="sm" className="h-7 text-xs">Cancel</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Spikes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Expense Spikes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {spikes.map((spike, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{spike.category}</p>
                  <Badge variant="destructive" className="text-[10px]">+{spike.pct}%</Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg: {formatCurrency(spike.average)}</span>
                  <span className="font-medium text-foreground">Now: {formatCurrency(spike.current)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: `${Math.min(100, (spike.current / (spike.average * 2)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Scissors className="h-4 w-4" />
            Talk to Expense Crow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CrowChat crowType="EXPENSE" />
        </CardContent>
      </Card>
    </div>
  );
}
