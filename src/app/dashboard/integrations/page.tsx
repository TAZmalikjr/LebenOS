"use client";

import React from "react";
import { Plug, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const integrations = [
  { name: "Plaid", desc: "Connect bank accounts for automatic transaction import", status: "available", category: "Banking" },
  { name: "Stripe", desc: "Accept payments and sync revenue data", status: "connected", category: "Payments" },
  { name: "PayPal", desc: "Import PayPal transactions and balances", status: "available", category: "Payments" },
  { name: "QuickBooks", desc: "Sync with your existing accounting data", status: "available", category: "Accounting" },
  { name: "Slack", desc: "Get Crow alerts delivered to your Slack channels", status: "available", category: "Notifications" },
  { name: "Google Sheets", desc: "Export financial data to spreadsheets", status: "available", category: "Export" },
  { name: "Zapier", desc: "Connect to 5,000+ apps with automation", status: "coming", category: "Automation" },
  { name: "Xero", desc: "Two-way sync with Xero accounting", status: "coming", category: "Accounting" },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect your tools and services</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((int) => (
          <Card key={int.name}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <Plug className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{int.name}</p>
                    <Badge variant="outline" className="text-[10px]">{int.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{int.desc}</p>
                </div>
              </div>
              {int.status === "connected" ? (
                <Button variant="outline" size="sm" className="h-7 text-xs text-emerald-600">
                  <Check className="mr-1 h-3 w-3" /> Connected
                </Button>
              ) : int.status === "coming" ? (
                <Badge variant="secondary" className="text-xs">Coming soon</Badge>
              ) : (
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Connect <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
