import Link from "next/link";
import { Bird, TrendingUp, Scissors, BarChart3, Shield, ShoppingCart, FileText, ArrowRight, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-5xl flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
              <Bird className="h-4 w-4" />
            </div>
            <span className="font-semibold">WalletCrow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
            <Link href="/dashboard" className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90">Try Demo</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-4">AI-powered financial guardian</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Stop managing money.<br />Let your Crows do it.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          WalletCrow deploys specialized AI Crows that watch your wallet, predict cash shortfalls, hunt waste, and grow revenue. Built for businesses that deserve a financial ally.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard" className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/admin" className="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium hover:bg-accent">Super Admin</Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 border-t">
        <h2 className="text-xl font-semibold text-center mb-2">Your murder of Crows</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Each Crow guards a different piece of your finances</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: TrendingUp, name: "Cashflow Crow", desc: "Predicts balances, alerts on shortfalls, runs what-if scenarios." },
            { icon: Scissors, name: "Expense Crow", desc: "Hunts duplicates, unused subscriptions, and spending spikes." },
            { icon: BarChart3, name: "Revenue Crow", desc: "Identifies top performers and growth opportunities." },
            { icon: FileText, name: "Tax Crow", desc: "Estimates obligations and tracks deductions automatically." },
            { icon: Shield, name: "Scout Crow", desc: "Finds grants, benchmarks, and competitor insights." },
            { icon: ShoppingCart, name: "POS & Invoicing", desc: "Lightweight sales and invoicing built right in." },
          ].map((c) => (
            <div key={c.name} className="rounded-lg border p-5 hover:bg-accent/50 transition-colors">
              <c.icon className="h-5 w-5 text-muted-foreground mb-3" />
              <h3 className="text-sm font-semibold">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 border-t">
        <h2 className="text-xl font-semibold text-center mb-10">Simple pricing</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Sparrow", price: "Free", desc: "For getting started", features: ["1 bank connection", "100 transactions/mo", "Basic Cashflow Crow", "5 invoices/mo"] },
            { name: "Crow Keeper", price: "$29", desc: "For growing businesses", popular: true, features: ["Unlimited connections", "Unlimited transactions", "Cashflow + Expense + Revenue Crows", "Unlimited invoicing & POS"] },
            { name: "The Murder", price: "$79", desc: "Full flock protection", features: ["Everything in Crow Keeper", "Tax Crow & Scout Crow", "Multi-business view", "What-if scenarios", "Priority support"] },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-lg border p-6 ${plan.popular ? "border-foreground" : ""}`}>
              {plan.popular && <p className="text-[10px] font-bold uppercase tracking-wider mb-3">Most Popular</p>}
              <h3 className="text-sm font-semibold">{plan.name}</h3>
              <p className="text-2xl font-bold mt-1">{plan.price}{plan.price !== "Free" && <span className="text-sm font-normal text-muted-foreground">/mo</span>}</p>
              <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-foreground" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className={`mt-4 flex h-8 items-center justify-center rounded-md text-xs font-medium ${plan.popular ? "bg-primary text-primary-foreground" : "border hover:bg-accent"}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <Bird className="h-4 w-4" />
            <span className="text-xs font-medium">WalletCrow</span>
          </div>
          <p className="text-xs text-muted-foreground">Your wallet&apos;s smartest flock.</p>
        </div>
      </footer>
    </div>
  );
}
