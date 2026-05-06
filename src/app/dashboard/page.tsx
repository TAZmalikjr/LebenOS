"use client";

import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  AlertTriangle,
  Bird,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";

const stats = [
  {
    label: "Total Balance",
    value: 24350.75,
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Monthly Income",
    value: 12400,
    change: "+8.2%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    label: "Monthly Expenses",
    value: 8750,
    change: "+3.1%",
    trend: "down" as const,
    icon: TrendingDown,
  },
  {
    label: "Pending Invoices",
    value: 4350,
    change: "5 invoices",
    trend: "neutral" as const,
    icon: FileText,
  },
];

const alerts = [
  {
    id: "1",
    crow: "Cashflow",
    severity: "warning",
    title: "Cash runway below 30 days",
    message: "At current rate, ~24 days of cash remaining. Chase overdue invoices.",
    time: "2h ago",
  },
  {
    id: "2",
    crow: "Expense",
    severity: "info",
    title: "Duplicate subscription found",
    message: "Zoom Pro ($14.99) and Google Meet ($12) - consider consolidating.",
    time: "5h ago",
  },
  {
    id: "3",
    crow: "Cashflow",
    severity: "danger",
    title: "3 invoices overdue",
    message: "Total: $4,350 overdue. Oldest is 15 days past due.",
    time: "1d ago",
  },
];

const transactions = [
  { id: "t1", desc: "Website design - Phase 2", vendor: "Acme Corp", amount: 2500, type: "income", date: new Date().toISOString(), category: "Services" },
  { id: "t2", desc: "Monthly hosting fees", vendor: "AWS", amount: -149.99, type: "expense", date: new Date(Date.now() - 86400000).toISOString(), category: "Software" },
  { id: "t3", desc: "Facebook Ads", vendor: "Meta", amount: -89, type: "expense", date: new Date(Date.now() - 172800000).toISOString(), category: "Marketing" },
  { id: "t4", desc: "Product sale - Widget Pack", vendor: "Direct", amount: 1200, type: "income", date: new Date(Date.now() - 259200000).toISOString(), category: "Products" },
  { id: "t5", desc: "Office supplies", vendor: "Staples", amount: -450, type: "expense", date: new Date(Date.now() - 345600000).toISOString(), category: "Office" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your financial health
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-3.5 w-3.5" />
            Last 30 days
          </Button>
          <Button size="sm">Download Report</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-semibold">
                    {typeof stat.value === "number"
                      ? formatCurrency(stat.value)
                      : stat.value}
                  </span>
                </div>
                <p className={`mt-1 text-xs ${
                  stat.trend === "up"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : stat.trend === "down"
                      ? "text-red-600 dark:text-red-400"
                      : "text-muted-foreground"
                }`}>
                  {stat.change}
                  {stat.trend !== "neutral" && " from last month"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">Crow Alerts</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {alerts.length} active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex gap-3 rounded-lg border p-3 text-sm"
              >
                <div className="mt-0.5">
                  {alert.severity === "danger" ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : alert.severity === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Bird className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">{alert.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-muted-foreground">{alert.crow} Crow</span>
                    <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View all alerts
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Recent Transactions
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="/dashboard/cashflow">
                View all <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-2.5 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        tx.type === "income"
                          ? "bg-emerald-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {tx.type === "income" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.desc}</p>
                      <p className="text-xs text-muted-foreground">
                        {tx.vendor} &middot; {tx.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        tx.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : ""
                      }`}
                    >
                      {tx.type === "income" ? "+" : ""}
                      {formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeDate(tx.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/dashboard/invoices">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 p-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Create Invoice</p>
                <p className="text-xs text-muted-foreground">Send to clients</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/pos">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 p-4">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Record Sale</p>
                <p className="text-xs text-muted-foreground">Quick POS entry</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/cashflow">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 p-4">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Cash Forecast</p>
                <p className="text-xs text-muted-foreground">Talk to Cashflow Crow</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/reports">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 p-4">
              <TrendingDown className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">View Reports</p>
                <p className="text-xs text-muted-foreground">Financial analytics</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
