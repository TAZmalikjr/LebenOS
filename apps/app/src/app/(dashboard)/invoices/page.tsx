import { createServerClient } from "@walletcrow/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, Badge, formatCurrency } from "@walletcrow/ui";
import { FileText } from "lucide-react";

export default async function InvoicesPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: businesses } = await supabase.from("businesses").select("id").eq("owner_id", user!.id).limit(1);
  const businessId = businesses?.[0]?.id;

  const { data: invoices } = businessId
    ? await supabase.from("invoices").select("*").eq("business_id", businessId).order("created_at", { ascending: false })
    : { data: [] };

  const statusColors: Record<string, "success" | "warning" | "danger" | "secondary"> = {
    paid: "success", sent: "warning", overdue: "danger", draft: "secondary", cancelled: "secondary",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><FileText className="h-6 w-6 text-primary" /> Invoices</h2>
          <p className="text-muted-foreground mt-1">Create, send, and track invoices</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">All Invoices</CardTitle></CardHeader>
        <CardContent>
          {(!invoices || invoices.length === 0) ? (
            <p className="text-center py-8 text-muted-foreground text-sm">No invoices yet. Create your first invoice to get started.</p>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{inv.client_name}</p>
                      <Badge variant={statusColors[inv.status] || "secondary"}>{inv.status.toUpperCase()}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{inv.invoice_number} - Due: {new Date(inv.due_date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatCurrency(Number(inv.total))}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
