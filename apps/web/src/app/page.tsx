import Link from "next/link";
import {
  Bird, TrendingUp, Scissors, BarChart3, Shield, ShoppingCart, FileText,
  Target, Zap, Lock, CheckCircle2, ArrowRight, Star, Users, Clock,
} from "lucide-react";
import { DOMAINS } from "@walletcrow/config";

export default function HomePage() {
  const appUrl = DOMAINS.app;
  const accountsUrl = DOMAINS.accounts;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Bird className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">WalletCrow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#crows" className="text-muted-foreground hover:text-foreground transition-colors">AI Crows</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href={`${accountsUrl}/login`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link href={`${accountsUrl}/signup`} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Start Free <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
          <Bird className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">Alpha Release - Early Access Available</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Stop Managing Spreadsheets.
          <br />
          <span className="text-primary">Let Your Crows Guard the Money.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          WalletCrow deploys a murder of AI-powered Crows that watch your cash flow 24/7, hunt down wasted spending, predict shortfalls before they happen, and find growth opportunities you are missing. Built for businesses too big for spreadsheets but too small for a full-time CFO.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`${accountsUrl}/signup`} className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
          <Link href="#features" className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-4 text-base font-medium hover:bg-accent transition-colors">
            See How It Works
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-crow-success" /> No credit card required</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-crow-success" /> Free plan forever</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-crow-success" /> Setup in 2 minutes</span>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by small businesses across industries</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-3xl font-bold text-primary">500+</p><p className="text-sm text-muted-foreground mt-1">Businesses Protected</p></div>
            <div><p className="text-3xl font-bold text-crow-success">$2.4M</p><p className="text-sm text-muted-foreground mt-1">Waste Detected</p></div>
            <div><p className="text-3xl font-bold">15K+</p><p className="text-sm text-muted-foreground mt-1">AI Insights Delivered</p></div>
            <div><p className="text-3xl font-bold text-crow-gold">4.9/5</p><p className="text-sm text-muted-foreground mt-1">User Rating</p></div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Traditional Accounting Tools Are Broken</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">They tell you what happened last month. WalletCrow tells you what will happen next week and what to do about it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold text-crow-danger mb-4">Legacy Accounting (QuickBooks, Tally)</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><span className="text-crow-danger">x</span> Reactive - only shows what already happened</li>
              <li className="flex gap-3"><span className="text-crow-danger">x</span> One blank, impersonal interface</li>
              <li className="flex gap-3"><span className="text-crow-danger">x</span> Inward-facing ledger with no external intelligence</li>
              <li className="flex gap-3"><span className="text-crow-danger">x</span> Requires manual effort and bookkeeping knowledge</li>
              <li className="flex gap-3"><span className="text-crow-danger">x</span> Feels like a chore you avoid</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-primary bg-card p-8">
            <h3 className="text-lg font-semibold text-primary mb-4">WalletCrow</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0 mt-0.5" /> Proactive - predicts and warns before problems hit</li>
              <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0 mt-0.5" /> Living nest with personality-driven AI Crows</li>
              <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0 mt-0.5" /> External intelligence via Scout Crow</li>
              <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0 mt-0.5" /> AI watches autonomously, alerts on anomalies</li>
              <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0 mt-0.5" /> Feels like having a loyal team guarding your money</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Crows */}
      <section id="crows" className="bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your Murder of Crows</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Five specialized AI personas, each an expert in their financial domain. They work together to give you complete coverage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp className="h-6 w-6" />, name: "Cashflow Crow", role: "Forecaster & Early Warning", desc: "Predicts your future cash position, alerts about upcoming shortfalls, runs what-if scenarios. Never be caught off guard by a cash crunch again.", color: "text-blue-400", bg: "bg-blue-500/10", plan: "Free" },
              { icon: <Scissors className="h-6 w-6" />, name: "Expense Crow", role: "Waste Hunter & Subscription Killer", desc: "Scans every outgoing transaction for duplicates, unused subscriptions, and abnormal spikes. Drafts cancellation emails for tools you are not using.", color: "text-red-400", bg: "bg-red-500/10", plan: "Crow Keeper" },
              { icon: <BarChart3 className="h-6 w-6" />, name: "Revenue Crow", role: "Growth Optimist", desc: "Identifies your top-performing products, compares campaign results, and suggests upsell opportunities to maximize your revenue streams.", color: "text-green-400", bg: "bg-green-500/10", plan: "Crow Keeper" },
              { icon: <FileText className="h-6 w-6" />, name: "Tax Crow", role: "Meticulous Hoarder", desc: "Estimates tax obligations from each invoice, tracks deductible expenses, and generates quarter-end summaries ready for your accountant.", color: "text-purple-400", bg: "bg-purple-500/10", plan: "The Murder" },
              { icon: <Shield className="h-6 w-6" />, name: "Scout Crow", role: "External Investigator", desc: "Finds government grants, benchmarks your spending against industry averages, monitors competitor changes, and surfaces relevant business news.", color: "text-yellow-400", bg: "bg-yellow-500/10", plan: "The Murder" },
              { icon: <ShoppingCart className="h-6 w-6" />, name: "Built-in Tools", role: "POS, Invoicing & Goals", desc: "Lightweight point-of-sale, smart invoicing with auto-reminders, and Nest Egg budget goals that all feed directly into your Crow intelligence.", color: "text-cyan-400", bg: "bg-cyan-500/10", plan: "Free" },
            ].map((crow) => (
              <div key={crow.name} className="rounded-xl border border-border bg-background p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className={`h-12 w-12 rounded-lg ${crow.bg} flex items-center justify-center ${crow.color} mb-4`}>{crow.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{crow.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${crow.plan === "Free" ? "bg-crow-success/20 text-crow-success" : crow.plan === "Crow Keeper" ? "bg-primary/20 text-primary" : "bg-crow-gold/20 text-crow-gold"}`}>{crow.plan}</span>
                </div>
                <p className={`text-xs ${crow.color} font-medium mb-3`}>{crow.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{crow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need, Nothing You Don&apos;t</h2>
          <p className="text-lg text-muted-foreground">Purpose-built for small businesses that want clarity, not complexity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Target className="h-5 w-5" />, title: "Nest Egg Goals", desc: "Set savings targets with visual progress. Your Crows automatically track and alert if you go off course." },
            { icon: <Zap className="h-5 w-5" />, title: "Real-Time Alerts", desc: "Crows notify you the moment something needs attention - duplicate charges, cash shortfalls, overdue invoices." },
            { icon: <Lock className="h-5 w-5" />, title: "Bank-Level Security", desc: "Supabase Auth with Row Level Security. Your data is encrypted, isolated per business, and never shared." },
            { icon: <Users className="h-5 w-5" />, title: "Multi-Business View", desc: "Run multiple ventures? Each gets its own isolated murder of Crows with The Murder plan." },
            { icon: <Clock className="h-5 w-5" />, title: "2-Minute Setup", desc: "Sign up, name your business, and your Crows are ready. Connect a bank account later when you want." },
            { icon: <Star className="h-5 w-5" />, title: "Conversational AI", desc: "Chat with any Crow naturally. Ask questions, request reports, run scenarios - they respond in character." },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border border-border p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free. Upgrade when your business needs more Crows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-xl border border-border bg-background p-8">
              <h3 className="text-lg font-semibold">Sparrow</h3>
              <p className="text-4xl font-bold mt-3">Free<span className="text-sm font-normal text-muted-foreground ml-1">forever</span></p>
              <p className="text-sm text-muted-foreground mt-2">Perfect for getting started</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> 1 bank connection</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> 100 transactions/month</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> Basic Cashflow Crow</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> 5 invoices/month</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> 10 AI queries/day</li>
              </ul>
              <Link href={`${accountsUrl}/signup`} className="mt-8 block text-center rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium hover:bg-accent transition-colors">Get Started Free</Link>
            </div>

            <div className="rounded-xl border-2 border-primary bg-background p-8 relative shadow-xl shadow-primary/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
              <h3 className="text-lg font-semibold">Crow Keeper</h3>
              <p className="text-4xl font-bold mt-3">$29<span className="text-sm font-normal text-muted-foreground ml-1">/month</span></p>
              <p className="text-sm text-muted-foreground mt-2">For growing businesses</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> Unlimited bank connections</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> Unlimited transactions</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> Full Cashflow + Expense + Revenue Crows</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> Unlimited invoicing & POS</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> 100 AI queries/day</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-success shrink-0" /> Email support</li>
              </ul>
              <Link href={`${accountsUrl}/signup`} className="mt-8 block text-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Start Crow Keeper</Link>
            </div>

            <div className="rounded-xl border border-crow-gold/30 bg-background p-8">
              <h3 className="text-lg font-semibold text-crow-gold">The Murder</h3>
              <p className="text-4xl font-bold mt-3">$79<span className="text-sm font-normal text-muted-foreground ml-1">/month</span></p>
              <p className="text-sm text-muted-foreground mt-2">Full flock protection</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-gold shrink-0" /> Everything in Crow Keeper</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-gold shrink-0" /> Tax Crow & Scout Crow</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-gold shrink-0" /> What-if scenarios</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-gold shrink-0" /> Multi-business view</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-gold shrink-0" /> 500 AI queries/day</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-crow-gold shrink-0" /> Priority chat support</li>
              </ul>
              <Link href={`${accountsUrl}/signup`} className="mt-8 block text-center rounded-lg border border-crow-gold/30 bg-crow-gold/10 px-4 py-3 text-sm font-semibold text-crow-gold hover:bg-crow-gold/20 transition-colors">Unleash The Murder</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Security</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your financial data deserves the highest protection. WalletCrow is built security-first.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border p-6 text-center">
            <Lock className="h-8 w-8 mx-auto text-primary mb-4" />
            <h3 className="font-semibold mb-2">Row-Level Security</h3>
            <p className="text-sm text-muted-foreground">Every database query is filtered by user. Businesses can never see each other&apos;s data.</p>
          </div>
          <div className="rounded-lg border border-border p-6 text-center">
            <Shield className="h-8 w-8 mx-auto text-primary mb-4" />
            <h3 className="font-semibold mb-2">Supabase Auth + Google OAuth</h3>
            <p className="text-sm text-muted-foreground">Industry-standard authentication with encrypted sessions across subdomains.</p>
          </div>
          <div className="rounded-lg border border-border p-6 text-center">
            <Zap className="h-8 w-8 mx-auto text-primary mb-4" />
            <h3 className="font-semibold mb-2">Rate-Limited AI</h3>
            <p className="text-sm text-muted-foreground">AI queries are rate-limited per plan to prevent abuse and ensure fair usage.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <Bird className="h-16 w-16 mx-auto text-primary mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Let Your Crows Guard the Money?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of business owners who stopped worrying about their finances and started growing them.
          </p>
          <Link href={`${accountsUrl}/signup`} className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Start Free - No Credit Card Required <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bird className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">WalletCrow</span>
              </div>
              <p className="text-sm text-muted-foreground">Your wallet&apos;s smartest flock. AI-powered financial guardian for small and medium businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#crows" className="hover:text-foreground">AI Crows</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#security" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 flex items-center justify-between text-xs text-muted-foreground">
            <p>2025 WalletCrow. All rights reserved.</p>
            <p>Built with care for businesses that deserve a financial ally.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
