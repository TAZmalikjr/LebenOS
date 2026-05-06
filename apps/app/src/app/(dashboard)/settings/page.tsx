"use client";

import React from "react";
import { Settings, CreditCard, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@walletcrow/ui";

export default function SettingsPage() {
  const handleUpgrade = async (planSlug: string) => {
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId: "current", planSlug }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Upgrade failed:", err);
    }
  };

  const handleManageBilling = async () => {
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId: "current" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Billing portal failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="h-6 w-6" /> Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your business profile and subscription</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Building2 className="h-5 w-5" /> Business Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1.5 block">Business Name</label><Input defaultValue="" placeholder="Your business name" /></div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Industry</label>
              <Select><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label className="text-sm font-medium mb-1.5 block">Location</label><Input placeholder="City, State" /></div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Currency</label>
              <Select defaultValue="USD"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Subscription</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <div className="flex items-center gap-2"><p className="font-semibold">Current Plan</p><Badge>Sparrow (Free)</Badge></div>
              <p className="text-sm text-muted-foreground mt-1">1 bank connection, 100 transactions/mo, basic Cashflow Crow</p>
            </div>
            <Button variant="outline" onClick={handleManageBilling}>Manage Billing</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="font-semibold">Crow Keeper</p>
              <p className="text-2xl font-bold mt-1">$29<span className="text-sm font-normal">/mo</span></p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>+ Unlimited everything</li>
                <li>+ Cashflow, Expense & Revenue Crows</li>
                <li>+ 100 AI queries/day</li>
              </ul>
              <Button className="w-full mt-4" variant="outline" onClick={() => handleUpgrade("crow-keeper")}>Upgrade</Button>
            </div>
            <div className="p-4 border border-crow-gold/30 rounded-lg">
              <p className="font-semibold text-crow-gold">The Murder</p>
              <p className="text-2xl font-bold mt-1">$79<span className="text-sm font-normal">/mo</span></p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>+ Everything in Crow Keeper</li>
                <li>+ Tax & Scout Crows</li>
                <li>+ 500 AI queries/day</li>
                <li>+ Multi-business view</li>
              </ul>
              <Button className="w-full mt-4" onClick={() => handleUpgrade("the-murder")}>Upgrade</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
