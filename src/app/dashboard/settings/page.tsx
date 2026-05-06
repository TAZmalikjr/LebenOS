"use client";

import React from "react";
import { Settings, Building2, CreditCard, Users, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your business profile and preferences
        </p>
      </div>

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block">
                Business Name
              </Label>
              <Input defaultValue="Demo Business" />
            </div>
            <div>
              <Label className="mb-1.5 block">
                Industry
              </Label>
              <Select defaultValue="technology">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="services">Professional Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block">
                Business Size
              </Label>
              <Select defaultValue="1-10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-100">51-100 employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block">
                Location
              </Label>
              <Input defaultValue="Atlanta, GA" />
            </div>
            <div>
              <Label className="mb-1.5 block">
                Currency
              </Label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (&euro;)</SelectItem>
                  <SelectItem value="GBP">GBP (&pound;)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Subscription Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">Sparrow (Free)</p>
                <Badge>Current Plan</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                1 bank connection, 100 transactions/mo, basic Cashflow Crow
              </p>
            </div>
            <Button>Upgrade</Button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="font-semibold">Crow Keeper</p>
              <p className="text-2xl font-bold mt-1">
                $29<span className="text-sm font-normal">/mo</span>
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>+ Unlimited bank connections</li>
                <li>+ Unlimited transactions</li>
                <li>+ Full Cashflow & Expense Crows</li>
                <li>+ Revenue Crow</li>
                <li>+ Unlimited invoicing</li>
              </ul>
              <Button className="w-full mt-4" variant="outline">
                Choose Plan
              </Button>
            </div>
            <div className="p-4 border border-crow-gold/30 rounded-lg">
              <p className="font-semibold text-crow-gold">The Murder</p>
              <p className="text-2xl font-bold mt-1">
                $79<span className="text-sm font-normal">/mo</span>
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>+ Everything in Crow Keeper</li>
                <li>+ Tax Crow & Scout Crow</li>
                <li>+ Multi-business view</li>
                <li>+ What-if scenarios</li>
                <li>+ Priority support</li>
              </ul>
              <Button className="w-full mt-4">Choose Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Crow Alerts</p>
              <p className="text-xs text-muted-foreground">
                Get notified when Crows detect issues
              </p>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Invoice Reminders</p>
              <p className="text-xs text-muted-foreground">
                Automatic reminders for overdue invoices
              </p>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly Summary</p>
              <p className="text-xs text-muted-foreground">
                Weekly email digest of your financial health
              </p>
            </div>
            <Badge variant="secondary">Disabled</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <Button variant="outline" size="sm">
            Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                DB
              </div>
              <div>
                <p className="text-sm font-medium">Demo Business Owner</p>
                <p className="text-xs text-muted-foreground">
                  owner@demo.com
                </p>
              </div>
            </div>
            <Badge>Owner</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
