"use client";

import React from "react";
import { CreditCard, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminPlansPage() {
  const plans = [
    { name: "Sparrow", price: 0, subs: 98, banks: 1, txns: 100, crows: ["Cashflow (Basic)"] },
    { name: "Crow Keeper", price: 29, subs: 38, banks: -1, txns: -1, crows: ["Cashflow", "Expense", "Revenue"] },
    { name: "The Murder", price: 79, subs: 6, banks: -1, txns: -1, crows: ["All Crows"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Plans</h1>
        <Button size="sm">Add Plan</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{p.name}</CardTitle>
              <p className="text-xl font-bold">{p.price === 0 ? "Free" : `${formatCurrency(p.price)}/mo`}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Subscribers</span><Badge variant="secondary" className="text-[10px]">{p.subs}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Banks</span><span>{p.banks === -1 ? "Unlimited" : p.banks}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Txns/mo</span><span>{p.txns === -1 ? "Unlimited" : p.txns}</span></div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Crows</span>
                <div className="flex flex-wrap gap-1">{p.crows.map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}</div>
              </div>
              <Button variant="outline" size="sm" className="w-full"><Edit className="mr-2 h-3 w-3" /> Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
