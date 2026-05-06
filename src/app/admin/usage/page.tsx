"use client";

import React from "react";
import { Activity, Brain, Database, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsagePage() {
  const crowUsage = [
    { name: "Cashflow Crow", queries: 5420, pct: 44 },
    { name: "Expense Crow", queries: 3210, pct: 26 },
    { name: "Revenue Crow", queries: 2100, pct: 17 },
    { name: "Tax Crow", queries: 980, pct: 8 },
    { name: "Scout Crow", queries: 740, pct: 5 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Usage</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "AI Queries Today", value: "847", icon: Brain, sub: "+12% vs yesterday" },
          { label: "Transactions", value: "3,241", icon: Database, sub: "+8% vs yesterday" },
          { label: "Plaid API Calls", value: "156", icon: Zap, sub: "Within limits" },
          { label: "Active Sessions", value: "42", icon: Activity, sub: "Current" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2"><s.icon className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">{s.label}</span></div>
              <p className="text-xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Crow Usage (30 days)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {crowUsage.map((c) => (
            <div key={c.name} className="space-y-1">
              <div className="flex justify-between text-xs"><span className="font-medium">{c.name}</span><span className="text-muted-foreground">{c.queries.toLocaleString()} ({c.pct}%)</span></div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-foreground/20 rounded-full" style={{ width: `${c.pct}%` }} /></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
