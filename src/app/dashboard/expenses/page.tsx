"use client";

import React from "react";
import { Scissors, AlertTriangle, TrendingDown, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CrowChat } from "@/components/crow/crow-chat";
import { formatCurrency } from "@/lib/utils";

export default function ExpensesPage() {
  const subscriptions = [
    { name: "Zoom Pro", amount: 14.99, status: "active", usage: "Low", category: "Communication" },
    { name: "Google Meet Enterprise", amount: 12.0, status: "duplicate", usage: "Medium", category: "Communication" },
    { name: "Slack Business+", amount: 12.5, status: "active", usage: "High", category: "Communication" },
    { name: "Adobe Creative Cloud", amount: 54.99, status: "active", usage: "Low", category: "Design" },
    { name: "Dropbox Business", amount: 15.0, status: "unused", usage: "None", category: "Storage" },
    { name: "HubSpot CRM", amount: 45.0, status: "active", usage: "High", category: "Sales" },
  ];

  const expenseSpikes = [
    { category: "Marketing", current: 2400, average: 1200, change: 100 },
    { category: "Travel", current: 1800, average: 800, change: 125 },
    { category: "Office Supplies", current: 650, average: 400, change: 62.5 },
  ];

  const potentialSavings = subscriptions
    .filter((s) => s.status === "duplicate" || s.status === "unused")
    .reduce((total, s) => total + s.amount * 12, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Scissors className="h-6 w-6 text-red-400" />
          Expense Crow
        </h2>
        <p className="text-muted-foreground mt-1">
          Hunting waste and killing unnecessary subscriptions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Monthly Subscriptions</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(subscriptions.reduce((s, sub) => s + sub.amount, 0))}/mo
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {subscriptions.length} active subscriptions
            </p>
          </CardContent>
        </Card>
        <Card className="border-crow-warning/30">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Potential Annual Savings</p>
            <p className="text-2xl font-bold mt-1 text-crow-success">
              {formatCurrency(potentialSavings)}
            </p>
            <p className="text-xs text-crow-warning mt-1">
              From duplicates & unused tools
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Expense Anomalies</p>
            <p className="text-2xl font-bold mt-1">{expenseSpikes.length}</p>
            <p className="text-xs text-crow-danger mt-1">
              Categories over budget this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Audit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Repeat className="h-5 w-5" />
              Subscription Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subscriptions.map((sub, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{sub.name}</p>
                    {sub.status === "duplicate" && (
                      <Badge variant="warning">Duplicate</Badge>
                    )}
                    {sub.status === "unused" && (
                      <Badge variant="danger">Unused</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {sub.category} &middot; Usage: {sub.usage}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold">
                    {formatCurrency(sub.amount)}/mo
                  </p>
                  {(sub.status === "duplicate" || sub.status === "unused") && (
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expense Spikes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-crow-warning" />
              Expense Spikes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenseSpikes.map((spike, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{spike.category}</p>
                  <Badge variant="danger">+{spike.change}%</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Average: {formatCurrency(spike.average)}</span>
                  <span className="text-crow-danger font-medium">
                    Current: {formatCurrency(spike.current)}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-crow-danger rounded-full"
                    style={{
                      width: `${Math.min(100, (spike.current / (spike.average * 2)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Waste Report */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-crow-success" />
            Monthly Waste Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <p className="text-sm">
              <span className="font-semibold">Expense Crow found {formatCurrency(potentialSavings)}</span> in potential annual savings this month.
              Here is the breakdown:
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Duplicate video conferencing tools (Zoom + Google Meet)</span>
              <span className="font-semibold text-crow-success">Save {formatCurrency(144)}/yr</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Unused Dropbox Business subscription</span>
              <span className="font-semibold text-crow-success">Save {formatCurrency(180)}/yr</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Talk to Expense Crow</CardTitle>
        </CardHeader>
        <CardContent>
          <CrowChat crowType="EXPENSE" />
        </CardContent>
      </Card>
    </div>
  );
}
