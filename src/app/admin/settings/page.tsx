"use client";

import React from "react";
import { Settings, Key, Globe, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Platform Settings</h1>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Key className="h-4 w-4" /> API Keys</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "DeepSeek API", desc: "AI intelligence", status: "Connected" },
            { name: "Plaid API", desc: "Bank connections", status: "Connected" },
            { name: "Stripe API", desc: "Payments", status: "Sandbox" },
          ].map((api) => (
            <div key={api.name} className="flex items-center justify-between py-2 border-b last:border-0">
              <div><p className="text-sm font-medium">{api.name}</p><p className="text-xs text-muted-foreground">{api.desc}</p></div>
              <div className="flex items-center gap-2">
                <Badge variant={api.status === "Connected" ? "default" : "secondary"} className="text-[10px]">{api.status}</Badge>
                <Input value="sk-****...****" readOnly className="w-36 h-8 text-xs bg-muted" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Globe className="h-4 w-4" /> Feature Flags</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: "AI Chat", on: true },
            { name: "Plaid Integration", on: true },
            { name: "Invoice Sending", on: false },
            { name: "Gamification", on: false },
            { name: "Multi-business", on: true },
          ].map((f) => (
            <div key={f.name} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="text-sm font-medium">{f.name}</span>
              <Button variant={f.on ? "default" : "outline"} size="sm" className="h-7 text-xs">{f.on ? "Enabled" : "Disabled"}</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Database className="h-4 w-4" /> Database</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm"><span>Provider</span><Badge variant="secondary" className="text-xs">PostgreSQL</Badge></div>
          <div className="flex justify-between text-sm"><span>Status</span><Badge variant="default" className="text-xs">Connected</Badge></div>
          <div className="flex justify-between text-sm"><span>Records</span><span className="font-medium">48,291</span></div>
        </CardContent>
      </Card>
    </div>
  );
}
