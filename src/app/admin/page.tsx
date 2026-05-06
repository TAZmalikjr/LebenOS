"use client";

import React from "react";
import { Users, Building2, DollarSign, Activity, Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  const stats = [
    { label: "Businesses", value: "142", icon: Building2 },
    { label: "Active Users", value: "234", icon: Users },
    { label: "Monthly Revenue", value: formatCurrency(8420), icon: DollarSign },
    { label: "Connected Accounts", value: "89", icon: Activity },
    { label: "AI Queries (30d)", value: "12,450", icon: Brain },
    { label: "Active Trials", value: "28", icon: TrendingUp },
  ];

  const recent = [
    { name: "Joe's Coffee Shop", plan: "Sparrow", users: 1, date: "Jan 10" },
    { name: "TechFlow Agency", plan: "Crow Keeper", users: 3, date: "Jan 9" },
    { name: "Green Gardens", plan: "Sparrow", users: 1, date: "Jan 8" },
    { name: "Metro Plumbing", plan: "Crow Keeper", users: 2, date: "Jan 7" },
    { name: "Bright Ideas Marketing", plan: "The Murder", users: 5, date: "Jan 6" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Platform Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <s.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-xl font-semibold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Recent Businesses</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          {recent.map((b, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.users} user(s) &middot; Joined {b.date}</p>
              </div>
              <Badge variant={b.plan === "The Murder" ? "default" : "secondary"} className="text-xs">{b.plan}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
