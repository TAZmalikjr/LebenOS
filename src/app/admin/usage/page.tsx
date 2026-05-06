"use client";

import React from "react";
import { Activity, Brain, Database, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Usage Statistics
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitor platform usage and resource consumption
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="h-5 w-5 text-purple-400" />
              <p className="text-sm text-muted-foreground">AI Queries Today</p>
            </div>
            <p className="text-2xl font-bold">847</p>
            <p className="text-xs text-crow-success mt-1">+12% vs yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Database className="h-5 w-5 text-blue-400" />
              <p className="text-sm text-muted-foreground">Transactions Processed</p>
            </div>
            <p className="text-2xl font-bold">3,241</p>
            <p className="text-xs text-crow-success mt-1">+8% vs yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-yellow-400" />
              <p className="text-sm text-muted-foreground">API Calls (Plaid)</p>
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-muted-foreground mt-1">Within limits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="h-5 w-5 text-green-400" />
              <p className="text-sm text-muted-foreground">Active Sessions</p>
            </div>
            <p className="text-2xl font-bold">42</p>
            <p className="text-xs text-muted-foreground mt-1">Current</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage by Crow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Crow Usage (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Cashflow Crow", queries: 5420, pct: 44 },
              { name: "Expense Crow", queries: 3210, pct: 26 },
              { name: "Revenue Crow", queries: 2100, pct: 17 },
              { name: "Tax Crow", queries: 980, pct: 8 },
              { name: "Scout Crow", queries: 740, pct: 5 },
            ].map((crow) => (
              <div key={crow.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{crow.name}</span>
                  <span className="text-muted-foreground">
                    {crow.queries.toLocaleString()} queries ({crow.pct}%)
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${crow.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
