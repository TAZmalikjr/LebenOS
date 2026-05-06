import { createServerClient } from "@walletcrow/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, Badge, formatCurrency, formatRelativeDate } from "@walletcrow/ui";
import { DollarSign, TrendingUp, TrendingDown, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user!.id)
    .limit(1);

  const business = businesses?.[0];
  if (!business) {
    return <div className="text-center py-20 text-muted-foreground">No business found. Create one in settings.</div>;
  }

  // Fetch dashboard data
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("business_id", business.id)
    .order("date", { ascending: false })
    .limit(10);

  const { data: alerts } = await supabase
    .from("crow_alerts")
    .select("*")
    .eq("business_id", business.id)
    .eq("is_dismissed", false)
    .order("created_at", { ascending: false })
    .limit(5);

  // Calculate totals
  const txList = transactions || [];
  const income = txList.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expenses = txList.filter((t) => t.type === "expense").reduce((s, t) => s + Math.abs(Number(t.amount)), 0);

  const { count: invoiceCount } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business.id)
    .in("status", ["sent", "overdue"]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<DollarSign className="h-6 w-6 text-crow-gold" />} label="Balance" value={formatCurrency(income - expenses, business.currency)} bgColor="bg-crow-gold/10" />
        <StatCard icon={<TrendingUp className="h-6 w-6 text-crow-success" />} label="Income" value={formatCurrency(income, business.currency)} bgColor="bg-crow-success/10" />
        <StatCard icon={<TrendingDown className="h-6 w-6 text-crow-danger" />} label="Expenses" value={formatCurrency(expenses, business.currency)} bgColor="bg-crow-danger/10" />
        <StatCard icon={<FileText className="h-6 w-6 text-crow-info" />} label="Pending Invoices" value={String(invoiceCount || 0)} bgColor="bg-crow-info/10" />
      </div>

      {/* Alerts */}
      {alerts && alerts.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Crow Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Badge variant={alert.severity === "DANGER" ? "danger" : alert.severity === "WARNING" ? "warning" : "secondary"}>
                  {alert.crow_type}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Transactions */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          {txList.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">No transactions yet. Add one from POS or record manually.</p>
          ) : (
            <div className="space-y-2">
              {txList.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${tx.type === "income" ? "bg-crow-success/10" : "bg-crow-danger/10"}`}>
                      {tx.type === "income" ? <ArrowUpRight className="h-4 w-4 text-crow-success" /> : <ArrowDownRight className="h-4 w-4 text-crow-danger" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description || tx.category || "Transaction"}</p>
                      <p className="text-xs text-muted-foreground">{tx.vendor || ""} {tx.category ? `- ${tx.category}` : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${tx.type === "income" ? "text-crow-success" : "text-crow-danger"}`}>
                      {tx.type === "income" ? "+" : "-"}{formatCurrency(Math.abs(Number(tx.amount)), business.currency)}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatRelativeDate(tx.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, bgColor }: { icon: React.ReactNode; label: string; value: string; bgColor: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`h-12 w-12 rounded-lg ${bgColor} flex items-center justify-center`}>{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
