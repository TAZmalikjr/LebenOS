"use client";

import React, { useState } from "react";
import { ShoppingCart, Plus, DollarSign } from "lucide-react";
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
    {
      id: "1",
      amount: 45.99,
      category: "Food & Beverage",
      paymentMethod: "CARD",
      note: "Lunch special x3",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      amount: 12.5,
      category: "Food & Beverage",
      paymentMethod: "CASH",
      note: "Coffee and pastry",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "3",
      amount: 89.0,
      category: "Retail",
      paymentMethod: "CARD",
      note: "T-shirt bundle",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);

  const todayTotal = entries.reduce((sum, e) => sum + e.amount, 0);

  const handleAddEntry = () => {
    if (!amount || !paymentMethod) return;

    const newEntry: PosEntry = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category: category || "General",
      paymentMethod,
      note,
      createdAt: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          Point of Sale
        </h2>
        <p className="text-muted-foreground mt-1">
          Quick sales entry that feeds directly into your wallet
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Entry Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Sale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-1.5 block">
                Amount
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CARD">Card</SelectItem>
                  <SelectItem value="MOBILE">Mobile Payment</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">
                Note (optional)
              </Label>
              <Input
                placeholder="Sale description..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleAddEntry}
              disabled={!amount || !paymentMethod}
            >
              <Plus className="h-4 w-4 mr-2" />
              Record Sale
            </Button>
          </CardContent>
        </Card>

        {/* Today's Sales */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Today&apos;s Sales</CardTitle>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today&apos;s Total</p>
              <p className="text-xl font-bold text-crow-success">
                {formatCurrency(todayTotal)}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-crow-success/10 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-crow-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {entry.note || entry.category}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.category} &middot;{" "}
                        <Badge variant="outline" className="text-[10px] py-0">
                          {entry.paymentMethod}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-crow-success">
                    +{formatCurrency(entry.amount)}
                  </p>
                </div>
              ))}

              {entries.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No sales recorded today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
