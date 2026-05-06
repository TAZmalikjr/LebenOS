"use client";

import React from "react";
import { BarChart, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  const monthly = [
    { month: "Sep", income: 9800, expenses: 7200 },
    { month: "Oct", income: 11200, expenses: 8100 },
    { month: "Nov", income: 10500, expenses: 7800 },
    { month: "Dec", income: 13100, expenses: 9200 },
    { month: "Jan", income: 12400, expenses: 8750 },
  ];

  const categories = [
    { name: "Software & Tools", amount: 2340, pct: 27 },
    { name: "Payroll", amount: 3400, pct: 39 },
    { name: "Marketing", amount: 1200, pct: 14 },
    { name: "Office & Utilities", amount: 890, pct: 10 },
    { name: "Other", amount: 920, pct: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">Financial analytics and summaries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="mr-2 h-3.5 w-3.5" /> Last 5 months</Button>
          <Button variant="outline" size="sm"><Download className="mr-2 h-3.5 w-3.5" /> Export</Button>
        </div>
      </div>

      {/* P&L Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Revenue (5mo)</p>
            <p className="text-2xl font-semibold mt-1">{formatCurrency(monthly.reduce((s, m) => s + m.income, 0))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Expenses (5mo)</p>
            <p className="text-2xl font-semibold mt-1">{formatCurrency(monthly.reduce((s, m) => s + m.expenses, 0))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Net Profit (5mo)</p>
            <p className="text-2xl font-semibold mt-1 text-emerald-600 dark:text-emerald-400">
              {formatCurrency(monthly.reduce((s, m) => s + m.income - m.expenses, 0))}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Monthly Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthly.map((m) => (
                <div key={m.month} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium w-8">{m.month}</span>
                    <span className="text-muted-foreground">{formatCurrency(m.income)} / {formatCurrency(m.expenses)}</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="bg-emerald-500/70 rounded-sm" style={{ width: `${(m.income / 15000) * 100}%` }} />
                    <div className="bg-red-500/40 rounded-sm" style={{ width: `${(m.expenses / 15000) * 100}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-500/70" /> Income</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-500/40" /> Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-muted-foreground">{formatCurrency(cat.amount)} ({cat.pct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-foreground/20 rounded-full" style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
