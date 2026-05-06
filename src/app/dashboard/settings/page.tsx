"use client";

import React from "react";
import { Settings, Building2, CreditCard, Users, Bell, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your business and account</p>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business" className="text-xs">Business</TabsTrigger>
          <TabsTrigger value="billing" className="text-xs">Billing</TabsTrigger>
          <TabsTrigger value="team" className="text-xs">Team</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Business Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="text-xs font-medium mb-1 block">Business Name</label><Input defaultValue="Demo Business" className="h-9" /></div>
                <div><label className="text-xs font-medium mb-1 block">Industry</label>
                  <Select defaultValue="technology"><SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><label className="text-xs font-medium mb-1 block">Size</label>
                  <Select defaultValue="1-10"><SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-100">51-100 employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><label className="text-xs font-medium mb-1 block">Location</label><Input defaultValue="Atlanta, GA" className="h-9" /></div>
                <div><label className="text-xs font-medium mb-1 block">Currency</label>
                  <Select defaultValue="USD"><SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button size="sm">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Sparrow (Free)</span>
                    <Badge variant="secondary" className="text-[10px]">Current</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">1 bank, 100 txns/mo, basic Cashflow Crow</p>
                </div>
                <Button size="sm"><Sparkles className="mr-2 h-3.5 w-3.5" /> Upgrade</Button>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 space-y-2">
                  <p className="text-sm font-semibold">Crow Keeper</p>
                  <p className="text-xl font-bold">$29<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>Unlimited banks & transactions</li>
                    <li>Cashflow, Expense & Revenue Crows</li>
                    <li>Unlimited invoicing & POS</li>
                  </ul>
                  <Button variant="outline" size="sm" className="w-full">Choose</Button>
                </div>
                <div className="rounded-lg border border-amber-300 dark:border-amber-800 p-4 space-y-2">
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">The Murder</p>
                  <p className="text-xl font-bold">$79<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>Everything in Crow Keeper</li>
                    <li>Tax Crow & Scout Crow</li>
                    <li>Multi-business, what-if scenarios</li>
                  </ul>
                  <Button size="sm" className="w-full">Choose</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" /> Team
              </CardTitle>
              <Button variant="outline" size="sm" className="h-7 text-xs">Invite Member</Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">JD</div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@demo.com</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">Owner</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Crow Alerts", desc: "When Crows detect issues", on: true },
                { name: "Invoice Reminders", desc: "Overdue invoice alerts", on: true },
                { name: "Weekly Digest", desc: "Weekly email summary", on: false },
                { name: "Marketing", desc: "Product updates and tips", on: false },
              ].map((pref) => (
                <div key={pref.name} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{pref.name}</p>
                    <p className="text-xs text-muted-foreground">{pref.desc}</p>
                  </div>
                  <Button variant={pref.on ? "default" : "outline"} size="sm" className="h-7 text-xs">
                    {pref.on ? "On" : "Off"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
