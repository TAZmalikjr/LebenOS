"use client";

import React from "react";
import { TrendingUp, Calendar, AlertTriangle, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CrowChat } from "@/components/crow/crow-chat";
import { formatCurrency } from "@/lib/utils";

export default function CashflowPage() {
  // Demo data
  const forecast = {
    current: 24350.75,
    day7: 21200,
    day14: 18050,
    day30: 12400,
    runway: 24,
  };

  const upcomingBills = [
    { name: "Office Rent", amount: 2500, dueDate: "2025-01-15", recurring: true },
    { name: "AWS Hosting", amount: 149.99, dueDate: "2025-01-20", recurring: true },
    { name: "Insurance", amount: 450, dueDate: "2025-01-25", recurring: true },
    { name: "Payroll", amount: 8500, dueDate: "2025-01-30", recurring: true },
  ];

  const overdueInvoices = [
    { client: "Acme Corp", amount: 2500, daysOverdue: 15 },
    { client: "Beta LLC", amount: 1200, daysOverdue: 8 },
    { client: "Gamma Inc", amount: 650, daysOverdue: 3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          Cashflow Crow
        </h2>
        <p className="text-muted-foreground mt-1">
          Forecasting and early-warning system for your cash position
        </p>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(forecast.current)}
            </p>
            <Badge variant="success" className="mt-2">Now</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">7-Day Forecast</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(forecast.day7)}
            </p>
            <Badge variant="warning" className="mt-2">-13%</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">14-Day Forecast</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(forecast.day14)}
            </p>
            <Badge variant="warning" className="mt-2">-26%</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Cash Runway</p>
            <p className="text-2xl font-bold mt-1">{forecast.runway} days</p>
            <Badge variant="danger" className="mt-2">Below 30 days</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Bills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBills.map((bill, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {bill.dueDate}
                    {bill.recurring && " (Recurring)"}
                  </p>
                </div>
                <p className="text-sm font-semibold text-crow-danger">
                  -{formatCurrency(bill.amount)}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 font-semibold">
              <span className="text-sm">Total upcoming</span>
              <span className="text-sm text-crow-danger">
                -{formatCurrency(upcomingBills.reduce((s, b) => s + b.amount, 0))}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-crow-warning" />
              Overdue Invoices
            </CardTitle>
            <Badge variant="danger">{overdueInvoices.length} overdue</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueInvoices.map((inv, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{inv.client}</p>
                  <p className="text-xs text-crow-danger">
                    {inv.daysOverdue} days overdue
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {formatCurrency(inv.amount)}
                  </p>
                  <button className="text-xs text-primary hover:underline">
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 font-semibold">
              <span className="text-sm">Total overdue</span>
              <span className="text-sm text-crow-warning">
                {formatCurrency(overdueInvoices.reduce((s, i) => s + i.amount, 0))}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat with Cashflow Crow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-400" />
            Talk to Cashflow Crow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CrowChat crowType="CASHFLOW" />
        </CardContent>
      </Card>
    </div>
  );
}
