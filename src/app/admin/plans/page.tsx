"use client";

import React from "react";
import { CreditCard, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminPlansPage() {
  const plans = [
    {
      name: "Sparrow (Free)",
      slug: "sparrow",
      price: 0,
      subscribers: 98,
      isActive: true,
      features: {
        bankConnections: 1,
        transactions: 100,
        invoices: 5,
        pos: 50,
        crows: ["Cashflow (Basic)"],
      },
    },
    {
      name: "Crow Keeper",
      slug: "crow-keeper",
      price: 29,
      subscribers: 38,
      isActive: true,
      features: {
        bankConnections: -1,
        transactions: -1,
        invoices: -1,
        pos: -1,
        crows: ["Cashflow (Full)", "Expense", "Revenue"],
      },
    },
    {
      name: "The Murder",
      slug: "the-murder",
      price: 79,
      subscribers: 6,
      isActive: true,
      features: {
        bankConnections: -1,
        transactions: -1,
        invoices: -1,
        pos: -1,
        crows: ["Cashflow (Advanced)", "Expense", "Revenue", "Tax", "Scout"],
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Pricing Plans
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage subscription plans and feature gating
          </p>
        </div>
        <Button>Add New Plan</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.slug} className={plan.price === 79 ? "border-crow-gold/30" : ""}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-2xl font-bold mt-1">
                  {plan.price === 0
                    ? "Free"
                    : `${formatCurrency(plan.price)}/mo`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {plan.isActive ? (
                  <ToggleRight className="h-6 w-6 text-crow-success" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subscribers</span>
                <Badge variant="secondary">{plan.subscribers}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Limits</p>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Bank connections</span>
                    <span>
                      {plan.features.bankConnections === -1
                        ? "Unlimited"
                        : plan.features.bankConnections}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transactions/mo</span>
                    <span>
                      {plan.features.transactions === -1
                        ? "Unlimited"
                        : plan.features.transactions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Invoices/mo</span>
                    <span>
                      {plan.features.invoices === -1
                        ? "Unlimited"
                        : plan.features.invoices}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>POS transactions/mo</span>
                    <span>
                      {plan.features.pos === -1
                        ? "Unlimited"
                        : plan.features.pos}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">AI Crows</p>
                <div className="flex flex-wrap gap-1">
                  {plan.features.crows.map((crow) => (
                    <Badge key={crow} variant="outline" className="text-xs">
                      {crow}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" size="sm">
                <Edit className="h-3 w-3 mr-2" />
                Edit Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
