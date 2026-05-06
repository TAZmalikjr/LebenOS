import Link from "next/link";
import { Bird, TrendingUp, Scissors, BarChart3, Shield, ShoppingCart, FileText } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Bird className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">WalletCrow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
          <Bird className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            Your wallet&apos;s smartest flock
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          AI-Powered Financial
          <br />
          <span className="text-primary">Guardian for Your Business</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          WalletCrow is not accounting software. It&apos;s an AI command center where
          specialized Crows guard, predict, and grow your business money.
          Proactive, personality-driven, and always watching.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Explore the Nest
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Super Admin
          </Link>
        </div>
      </section>

      {/* Crows Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">
          Meet Your Murder of Crows
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Each Crow is a specialized AI persona that guards a different aspect of your finances
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <TrendingUp className="h-6 w-6" />,
              name: "Cashflow Crow",
              role: "Forecaster & Early Warning",
              desc: "Predicts future balances, alerts about shortfalls, and runs what-if scenarios.",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
            },
            {
              icon: <Scissors className="h-6 w-6" />,
              name: "Expense Crow",
              role: "Waste Hunter & Subscription Killer",
              desc: "Scans for duplicates, unused subscriptions, and abnormal spending spikes.",
              color: "text-red-400",
              bg: "bg-red-500/10",
            },
            {
              icon: <BarChart3 className="h-6 w-6" />,
              name: "Revenue Crow",
              role: "Growth Optimist",
              desc: "Identifies top performers, compares campaigns, and suggests growth opportunities.",
              color: "text-green-400",
              bg: "bg-green-500/10",
            },
            {
              icon: <FileText className="h-6 w-6" />,
              name: "Tax Crow",
              role: "Meticulous Hoarder",
              desc: "Estimates tax obligations, tracks deductions, and prepares for tax season.",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
            },
            {
              icon: <Shield className="h-6 w-6" />,
              name: "Scout Crow",
              role: "External Investigator",
              desc: "Finds grants, benchmarks, competitor insights, and relevant market data.",
              color: "text-yellow-400",
              bg: "bg-yellow-500/10",
            },
            {
              icon: <ShoppingCart className="h-6 w-6" />,
              name: "POS & Invoicing",
              role: "Built-in Tools",
              desc: "Lightweight point of sale and smart invoicing that feed directly into your wallet.",
              color: "text-cyan-400",
              bg: "bg-cyan-500/10",
            },
          ].map((crow) => (
            <div
              key={crow.name}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <div
                className={`h-12 w-12 rounded-lg ${crow.bg} flex items-center justify-center ${crow.color} mb-4`}
              >
                {crow.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{crow.name}</h3>
              <p className={`text-xs ${crow.color} font-medium mb-2`}>
                {crow.role}
              </p>
              <p className="text-sm text-muted-foreground">{crow.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Start free. Upgrade when you need more Crows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Sparrow</h3>
            <p className="text-3xl font-bold mt-2">
              Free<span className="text-sm font-normal text-muted-foreground"> forever</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>1 bank connection</li>
              <li>100 transactions/month</li>
              <li>Basic Cashflow Crow</li>
              <li>5 invoices/month</li>
              <li>50 POS transactions/month</li>
            </ul>
            <Link
              href="/dashboard"
              className="mt-6 block text-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          <div className="rounded-lg border-2 border-primary bg-card p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold">Crow Keeper</h3>
            <p className="text-3xl font-bold mt-2">
              $29<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>Unlimited bank connections</li>
              <li>Unlimited transactions</li>
              <li>Full Cashflow, Expense & Revenue Crows</li>
              <li>Unlimited invoicing</li>
              <li>Unlimited POS</li>
              <li>Email support</li>
            </ul>
            <Link
              href="/dashboard"
              className="mt-6 block text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Crow Keeper
            </Link>
          </div>

          <div className="rounded-lg border border-crow-gold/30 bg-card p-6">
            <h3 className="text-lg font-semibold text-crow-gold">The Murder</h3>
            <p className="text-3xl font-bold mt-2">
              $79<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>Everything in Crow Keeper</li>
              <li>Tax Crow & Scout Crow</li>
              <li>What-if scenarios</li>
              <li>Multi-business view</li>
              <li>White-label option</li>
              <li>Priority chat support</li>
            </ul>
            <Link
              href="/dashboard"
              className="mt-6 block text-center rounded-md border border-crow-gold/30 bg-crow-gold/10 px-4 py-2 text-sm font-medium text-crow-gold hover:bg-crow-gold/20 transition-colors"
            >
              Unleash The Murder
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bird className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">WalletCrow</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your wallet&apos;s smartest flock. Built for businesses that deserve a financial ally.
          </p>
        </div>
      </footer>
    </div>
  );
}
