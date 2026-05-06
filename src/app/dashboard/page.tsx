"use client";

import React from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NestVisualization } from "@/components/nest/nest-visualization";
import { CrowAlertCard } from "@/components/crow/crow-alert-card";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";
import { CrowAlertData, TransactionData } from "@/types";

// Demo data for the MVP
const demoAlerts: CrowAlertData[] = [
  {
    id: "1",
    crowType: "CASHFLOW",
    severity: "WARNING",
    title: "Cash runway dropping below 30 days",
    message:
      "At current spending rate, you will have approximately 24 days of cash remaining. Consider collecting on overdue invoices.",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    crowType: "EXPENSE",
    severity: "INFO",
    title: "Duplicate subscription detected",
    message:
      'You appear to be paying for both "Zoom Pro" ($14.99/mo) and "Google Meet Enterprise" ($12/mo). Consider consolidating.',
    isRead: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    crowType: "CASHFLOW",
    severity: "DANGER",
    title: "3 invoices overdue",
    message:
      "Total overdue amount: $4,350. The oldest invoice is 15 days past due. Chase these immediately.",
    isRead: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const demoTransactions: TransactionData[] = [
  {
    id: "t1",
    amount: 2500,
    type: "INCOME",
    category: "Services",
    description: "Website design project - Phase 2",
    vendor: "Acme Corp",
    date: new Date().toISOString(),
  },
  {
    id: "t2",
    amount: -149.99,
    type: "EXPENSE",
    category: "Software",
    description: "Monthly hosting fees",
    vendor: "AWS",
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "t3",
    amount: -89.0,
    type: "EXPENSE",
    category: "Marketing",
    description: "Facebook Ads",
    vendor: "Meta",
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "t4",
    amount: 1200,
    type: "INCOME",
    category: "Products",
    description: "Product sale - Widget Pack",
    vendor: "Direct sale",
    date: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "t5",
    amount: -450,
    type: "EXPENSE",
    category: "Office",
    description: "Office supplies",
    vendor: "Staples",
    date: new Date(Date.now() - 345600000).toISOString(),
  },
];

export default function DashboardPage() {
  const totalBalance = 24350.75;
  const monthlyIncome = 12400;
  const monthlyExpenses = 8750;
  const pendingInvoices = 5;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-crow-gold/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-crow-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-crow-success/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-crow-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-crow-danger/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-crow-danger" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              <p className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-crow-info/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-crow-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Invoices</p>
              <p className="text-2xl font-bold">{pendingInvoices}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nest Visualization */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">The Wallet Nest</CardTitle>
          </CardHeader>
          <CardContent>
            <NestVisualization
              totalBalance={totalBalance}
              health="caution"
              crowStatuses={{
                cashflow: "alert",
                expense: "alert",
                revenue: "calm",
                tax: "calm",
                scout: "calm",
              }}
            />
          </CardContent>
        </Card>

        {/* Crow Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Crow Alerts</CardTitle>
            <Badge variant="secondary">{demoAlerts.length} active</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAlerts.map((alert) => (
              <CrowAlertCard key={alert.id} alert={alert} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Last 7 days
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      tx.type === "INCOME"
                        ? "bg-crow-success/10"
                        : "bg-crow-danger/10"
                    }`}
                  >
                    {tx.type === "INCOME" ? (
                      <ArrowUpRight className="h-4 w-4 text-crow-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-crow-danger" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.vendor} &middot; {tx.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      tx.type === "INCOME"
                        ? "text-crow-success"
                        : "text-crow-danger"
                    }`}
                  >
                    {tx.type === "INCOME" ? "+" : ""}
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
  );
}
