"use client";

import React from "react";
import { Settings, Key, Globe, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Platform Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Configure API keys, integrations, and platform behavior
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">DeepSeek API</p>
              <p className="text-xs text-muted-foreground">AI Crow intelligence</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">Connected</Badge>
              <Input value="sk-****...****" readOnly className="w-48 bg-secondary" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Plaid API</p>
              <p className="text-xs text-muted-foreground">Bank account connections</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">Connected</Badge>
              <Input value="pk-****...****" readOnly className="w-48 bg-secondary" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Stripe API</p>
              <p className="text-xs text-muted-foreground">Payment processing</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning">Sandbox</Badge>
              <Input value="sk-****...****" readOnly className="w-48 bg-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Feature Flags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "AI Chat", description: "Enable conversational AI with Crows", enabled: true },
            { name: "Plaid Integration", description: "Allow bank account connections", enabled: true },
            { name: "Invoice Sending", description: "Allow sending invoices via email", enabled: false },
            { name: "Gamification", description: "Enable Golden Worms rewards", enabled: false },
            { name: "Multi-business", description: "Allow multiple businesses per user", enabled: true },
          ].map((flag) => (
            <div key={flag.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="space-y-0.5">
                <Label>{flag.name}</Label>
                <p className="text-xs text-muted-foreground">{flag.description}</p>
              </div>
              <Switch
                defaultChecked={flag.enabled}
                aria-label={`Toggle ${flag.name}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Database Provider</span>
            <Badge variant="secondary">PostgreSQL</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Connection Status</span>
            <Badge variant="success">Connected</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Records</span>
            <span className="text-sm font-medium">48,291</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
