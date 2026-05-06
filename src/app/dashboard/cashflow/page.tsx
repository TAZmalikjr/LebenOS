"use client";

import React from "react";
import { TrendingUp, Calendar, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CrowChat } from "@/components/crow/crow-chat";
import { formatCurrency } from "@/lib/utils";

export default function CashflowPage() {
  const forecast = [
    { label: "Current", value: 24350.75, period: "Now" },
    { label: "7 days", value: 21200, change: -13 },
    { label: "14 days", value: 18050, change: -26 },
    { label: "30 days", value: 12400, change: -49 },
  ];

  const upcomingBills = [
    { name: "Office Rent", amount: 2500, due: "Jan 15", recurring: true },
    { name: "AWS Hosting", amount: 149.99, due: "Jan 20", recurring: true },
    { name: "Insurance", amount: 450, due: "Jan 25", recurring: true },
    { name: "Payroll", amount: 8500, due: "Jan 30", recurring: true },
  ];

  const overdueInvoices = [
    { client: "Acme Corp", amount: 2500, days: 15 },
    { client: "Beta LLC", amount: 1200, days: 8 },
    { client: "Gamma Inc", amount: 650, days: 3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cashflow</h1>
        <p className="text-sm text-muted-foreground">Forecasting and early-warning system</p>
      </div>

      {/* Forecast */}
      <div className="grid gap-4 md:grid-cols-4">
        {forecast.map((f) => (
          <Card key={f.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{f.label}</p>
              <p className="text-2xl font-semibold mt-1">{formatCurrency(f.value)}</p>
              {f.change !== undefined ? (
                <p className={`text-xs mt-1 ${f.change < -20 ? "text-destructive" : "text-amber-600 dark:text-amber-400"}`}>
                  {f.change}% projected
                </p>
              ) : (
                <Badge variant="secondary" className="mt-1 text-xs">{f.period}</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cash Runway */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Cash Runway</p>
              <p className="text-3xl font-semibold mt-1">24 days</p>
              <p className="text-xs text-muted-foreground mt-1">At current spending rate</p>
            </div>
            <div className="h-20 w-20 rounded-full border-4 border-amber-500 flex items-center justify-center">
              <span className="text-lg font-semibold">24d</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Bills */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Bills
              </CardTitle>
              <span className="text-sm font-semibold text-destructive">
                -{formatCurrency(upcomingBills.reduce((s, b) => s + b.amount, 0))}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {upcomingBills.map((bill, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">Due {bill.due} {bill.recurring && "(recurring)"}</p>
                </div>
                <span className="text-sm font-medium">-{formatCurrency(bill.amount)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overdue Invoices */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Overdue Invoices
              </CardTitle>
              <Badge variant="destructive" className="text-xs">{overdueInvoices.length} overdue</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {overdueInvoices.map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{inv.client}</p>
                  <p className="text-xs text-destructive">{inv.days} days overdue</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{formatCurrency(inv.amount)}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Remind <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Crow Chat */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
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
