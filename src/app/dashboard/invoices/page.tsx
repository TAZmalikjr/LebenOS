"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Send,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatCurrency, generateInvoiceNumber } from "@/lib/utils";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  total: number;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  dueDate: string;
  createdAt: string;
}

export default function InvoicesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "WC-K8F3M-A2B",
      clientName: "Acme Corp",
      clientEmail: "billing@acme.com",
      total: 2500,
      status: "OVERDUE",
      dueDate: "2025-01-01",
      createdAt: "2024-12-15",
    },
    {
      id: "2",
      invoiceNumber: "WC-L9G4N-C3D",
      clientName: "Beta LLC",
      clientEmail: "accounts@beta.io",
      total: 1200,
      status: "SENT",
      dueDate: "2025-01-20",
      createdAt: "2025-01-05",
    },
    {
      id: "3",
      invoiceNumber: "WC-M0H5P-E4F",
      clientName: "Gamma Inc",
      clientEmail: "pay@gamma.co",
      total: 3800,
      status: "PAID",
      dueDate: "2025-01-10",
      createdAt: "2024-12-20",
    },
    {
      id: "4",
      invoiceNumber: "WC-N1I6Q-G5H",
      clientName: "Delta Partners",
      clientEmail: "finance@delta.com",
      total: 650,
      status: "DRAFT",
      dueDate: "2025-02-01",
      createdAt: "2025-01-10",
    },
  ]);

  const statusColors = {
    DRAFT: "secondary",
    SENT: "warning",
    PAID: "success",
    OVERDUE: "danger",
  } as const;

  const totalOutstanding = invoices
    .filter((inv) => inv.status !== "PAID")
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalOverdue = invoices
    .filter((inv) => inv.status === "OVERDUE")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Invoices
          </h2>
          <p className="text-muted-foreground mt-1">
            Create, send, and track invoices with Cashflow Crow integration
          </p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new invoice.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="mb-1.5 block">
                  Invoice Number
                </Label>
                <Input value={generateInvoiceNumber()} readOnly className="bg-secondary" />
              </div>
              <div>
                <Label className="mb-1.5 block">
                  Client Name
                </Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client name"
                />
              </div>
              <div>
                <Label className="mb-1.5 block">
                  Client Email
                </Label>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <Label className="mb-1.5 block">
                  Description
                </Label>
                <Textarea
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  placeholder="Service or product description"
                />
              </div>
              <div>
                <Label className="mb-1.5 block">
                  Amount
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreate(false)}>
                Create Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Outstanding</p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(totalOutstanding)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-crow-danger/30">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Overdue Amount</p>
            <p className="text-2xl font-bold mt-1 text-crow-danger">
              {formatCurrency(totalOverdue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Invoices This Month</p>
            <p className="text-2xl font-bold mt-1">{invoices.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{inv.clientName}</p>
                      <Badge variant={statusColors[inv.status]}>
                        {inv.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {inv.invoiceNumber} &middot; Due: {inv.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold">
                    {formatCurrency(inv.total)}
                  </p>
                  <div className="flex gap-1">
                    {inv.status === "DRAFT" && (
                      <Button variant="ghost" size="icon" title="Send">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="More">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
