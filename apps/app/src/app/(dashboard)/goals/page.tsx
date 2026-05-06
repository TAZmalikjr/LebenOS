import { createServerClient } from "@walletcrow/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, Progress, formatCurrency } from "@walletcrow/ui";
import { Target, Egg } from "lucide-react";

export default async function GoalsPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: businesses } = await supabase.from("businesses").select("id").eq("owner_id", user!.id).limit(1);
  const businessId = businesses?.[0]?.id;

  const { data: goals } = businessId
    ? await supabase.from("budget_goals").select("*").eq("business_id", businessId).order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> Nest Eggs</h2>
        <p className="text-muted-foreground mt-1">Set financial goals and watch your golden eggs grow</p>
      </div>

      {(!goals || goals.length === 0) ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Egg className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No goals yet. Create your first Nest Egg to start saving.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100);
            const isComplete = progress >= 100;
            return (
              <Card key={goal.id} className={isComplete ? "border-crow-gold/30" : ""}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">{goal.name}</CardTitle>
                  <Egg className={`h-6 w-6 ${isComplete ? "text-crow-gold" : "text-muted-foreground"}`} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-muted-foreground">{formatCurrency(Number(goal.current_amount))} of {formatCurrency(Number(goal.target_amount))}</span>
                      <span className={isComplete ? "text-crow-gold font-semibold" : ""}>{progress}%</span>
                    </div>
                    <Progress value={Math.min(progress, 100)} />
                  </div>
                  {goal.deadline && <p className="text-xs text-muted-foreground">Target: {new Date(goal.deadline).toLocaleDateString()}</p>}
                  {isComplete && <div className="bg-crow-gold/10 rounded-lg p-3 text-center"><p className="text-sm font-semibold text-crow-gold">Goal reached!</p></div>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
