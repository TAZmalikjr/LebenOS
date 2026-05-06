"use client";

import React, { useState } from "react";
import { ShoppingCart, Plus, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

interface PosEntry {
  id: string;
  amount: number;
  category: string;
  paymentMethod: string;
  note: string;
  createdAt: string;
}

export default function PosPage() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<PosEntry[]>([
    { id: "1", amount: 45.99, category: "Food & Beverage", paymentMethod: "CARD", note: "Lunch special x3", createdAt: new Date().toISOString() },
    { id: "2", amount: 12.5, category: "Food & Beverage", paymentMethod: "CASH", note: "Coffee and pastry", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: "3", amount: 89.0, category: "Retail", paymentMethod: "CARD", note: "T-shirt bundle", createdAt: new Date(Date.now() - 7200000).toISOString() },
  ]);

  const todayTotal = entries.reduce((sum, e) => sum + e.amount, 0);

  const handleAdd = () => {
    if (!amount || !paymentMethod) return;
    setEntries([{ id: Date.now().toString(), amount: parseFloat(amount), category: category || "General", paymentMethod, note, createdAt: new Date().toISOString() }, ...entries]);
    setAmount(""); setCategory(""); setNote("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Point of Sale</h1>
        <p className="text-sm text-muted-foreground">Record sales quickly</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Sale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="pl-8 h-9" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CARD">Card</SelectItem>
                  <SelectItem value="MOBILE">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Note</label>
              <Input placeholder="Description..." value={note} onChange={(e) => setNote(e.target.value)} className="h-9" />
            </div>
            <Button className="w-full" size="sm" onClick={handleAdd} disabled={!amount || !paymentMethod}>
              <Plus className="mr-2 h-3.5 w-3.5" /> Record Sale
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">Today&apos;s Sales</CardTitle>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(todayTotal)}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between py-2.5 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{entry.note || entry.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.category} <Badge variant="outline" className="ml-1 text-[10px] py-0">{entry.paymentMethod}</Badge>
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+{formatCurrency(entry.amount)}</span>
                </div>
              ))}
              {entries.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No sales today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
