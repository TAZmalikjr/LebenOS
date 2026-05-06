"use client";

import React, { useState } from "react";
import { FileText, Plus, Send, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency, generateInvoiceNumber } from "@/lib/utils";

export default function InvoicesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const invoices = [
    { id: "1", number: "WC-K8F3M", client: "Acme Corp", total: 2500, status: "OVERDUE" as const, due: "Jan 1" },
    { id: "2", number: "WC-L9G4N", client: "Beta LLC", total: 1200, status: "SENT" as const, due: "Jan 20" },
    { id: "3", number: "WC-M0H5P", client: "Gamma Inc", total: 3800, status: "PAID" as const, due: "Jan 10" },
    { id: "4", number: "WC-N1I6Q", client: "Delta Partners", total: 650, status: "DRAFT" as const, due: "Feb 1" },
    { id: "5", number: "WC-O2J7R", client: "Echo Systems", total: 4200, status: "SENT" as const, due: "Jan 28" },
  ];

  const statusStyle = {
    DRAFT: "bg-secondary text-secondary-foreground",
    SENT: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    PAID: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    OVERDUE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const outstanding = invoices.filter((i) => i.status !== "PAID").reduce((s, i) => s + i.total, 0);
  const overdue = invoices.filter((i) => i.status === "OVERDUE").reduce((s, i) => s + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground">Create, send, and track invoices</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="mr-2 h-3.5 w-3.5" /> New Invoice</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>Fill in the details to create a new invoice.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div>
                <label className="text-xs font-medium mb-1 block">Invoice #</label>
                <Input value={generateInvoiceNumber()} readOnly className="h-9 bg-muted" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Client Name</label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Client Email</label>
                <Input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@example.com" className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Description</label>
                <Textarea value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="Service description" className="min-h-[60px]" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Amount</label>
                <Input type="number" step="0.01" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} placeholder="0.00" className="h-9" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setShowCreate(false)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Outstanding</p>
            <p className="text-2xl font-semibold mt-1">{formatCurrency(outstanding)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-semibold mt-1 text-destructive">{formatCurrency(overdue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-semibold mt-1">{invoices.length} invoices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-2.5 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{inv.client}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle[inv.status]}`}>
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{inv.number} &middot; Due {inv.due}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{formatCurrency(inv.total)}</span>
                  {inv.status === "DRAFT" && <Button variant="ghost" size="icon" className="h-7 w-7"><Send className="h-3.5 w-3.5" /></Button>}
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
