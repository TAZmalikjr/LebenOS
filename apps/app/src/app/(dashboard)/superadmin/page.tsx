import { createServerClient } from "@walletcrow/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, Badge, formatCurrency } from "@walletcrow/ui";
import { Shield, Users, Building2, DollarSign, Activity, Brain } from "lucide-react";

export default async function SuperAdminPage() {
  const supabase = await createServerClient();

  const { count: businessCount } = await supabase.from("businesses").select("*", { count: "exact", head: true });
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: aiCount } = await supabase.from("ai_usage").select("*", { count: "exact", head: true });

  const { data: recentBusinesses } = await supabase
    .from("businesses")
    .select("*, profiles!businesses_owner_id_fkey(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-crow-danger flex items-center justify-center">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Super Admin</h2>
          <p className="text-muted-foreground">Platform-wide management and monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center"><Building2 className="h-6 w-6 text-blue-400" /></div>
            <div><p className="text-sm text-muted-foreground">Total Businesses</p><p className="text-2xl font-bold">{businessCount || 0}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center"><Users className="h-6 w-6 text-green-400" /></div>
            <div><p className="text-sm text-muted-foreground">Total Users</p><p className="text-2xl font-bold">{userCount || 0}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center"><Brain className="h-6 w-6 text-purple-400" /></div>
            <div><p className="text-sm text-muted-foreground">AI Queries (All Time)</p><p className="text-2xl font-bold">{aiCount || 0}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Businesses</CardTitle></CardHeader>
        <CardContent>
          {(!recentBusinesses || recentBusinesses.length === 0) ? (
            <p className="text-center py-8 text-muted-foreground text-sm">No businesses registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Business</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Owner</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Plan</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Industry</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBusinesses.map((biz: Record<string, unknown>) => (
                    <tr key={biz.id as string} className="border-b border-border last:border-0 hover:bg-accent/50">
                      <td className="py-3 px-4 font-medium">{biz.name as string}</td>
                      <td className="py-3 px-4 text-muted-foreground">{(biz as Record<string, unknown>).owner_id as string}</td>
                      <td className="py-3 px-4"><Badge variant={biz.plan_slug === "the-murder" ? "default" : biz.plan_slug === "crow-keeper" ? "secondary" : "outline"}>{(biz.plan_slug as string || "sparrow").replace("-", " ")}</Badge></td>
                      <td className="py-3 px-4 text-muted-foreground">{(biz.industry as string) || "N/A"}</td>
                      <td className="py-3 px-4 text-muted-foreground">{new Date(biz.created_at as string).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
