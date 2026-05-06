# WalletCrow - Turborepo Monorepo

AI-powered financial command center where specialized AI Crows guard, predict, and grow your business money.

## Architecture

```
walletcrow/
  apps/
    web/          # Marketing website (walletcrow.com)
    app/          # Dashboard + Super Admin (app.walletcrow.com)
    accounts/     # Auth pages (accounts.walletcrow.com)
  packages/
    ui/           # Shared UI components (shadcn/ui + custom)
    config/       # Shared Tailwind, PostCSS, domain config
    supabase/     # Shared Supabase client (browser, server, middleware)
    types/        # Shared TypeScript types and plan definitions
```

## Tech Stack

- **Monorepo:** Turborepo with npm workspaces
- **Framework:** Next.js 15 (App Router) x3 apps
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** Supabase (PostgreSQL + Row Level Security)
- **Auth:** Supabase Auth (Google OAuth + Email/Password)
- **AI:** DeepSeek API with per-plan rate limiting
- **Billing:** Stripe Checkout + Customer Portal + Webhooks
- **Deployment:** Cloudflare Pages

## Features (Alpha)

### Authentication (accounts.walletcrow.com)
- Sign in with Google (OAuth)
- Sign in with Email/Password
- Sign up with email confirmation
- Password reset flow
- Auto-redirect between subdomains
- Secure middleware-based session management

### Dashboard (app.walletcrow.com)
- Wallet Nest dashboard with financial overview
- Cashflow Crow with AI chat (rate limited)
- Expense Crow and Revenue Crow (plan-gated)
- Lightweight POS module
- Invoice management
- Nest Egg budget goals
- Business settings with plan management
- Stripe-powered billing (checkout + portal)

### Super Admin (app.walletcrow.com/superadmin)
- Platform-wide stats (businesses, users, AI queries)
- Business management table
- Access restricted to SUPER_ADMIN_EMAILS

### Marketing (walletcrow.com)
- Full landing page with hero, features, pricing, security sections
- SEO-optimized metadata
- Conversion-focused copy and CTAs

## Security

- Supabase Row Level Security on all tables
- Middleware auth checks on all protected routes
- Super admin access controlled by email whitelist
- AI rate limiting per plan (10/100/500 queries/day)
- Stripe webhook signature verification
- Secure cross-subdomain session management

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase, Stripe, and DeepSeek credentials

# Run the Supabase migration
# Copy packages/supabase/migrations/init.sql into Supabase SQL Editor

# Run all apps
npx turbo dev
```

## Environment Variables

See `.env.example` for all required variables.

## Pricing Plans

| Feature | Sparrow (Free) | Crow Keeper ($29/mo) | The Murder ($79/mo) |
|---------|----------------|---------------------|---------------------|
| Cashflow Crow | Basic | Full | Full + What-if |
| Expense Crow | -- | Full | Full |
| Revenue Crow | -- | Full | Full |
| Tax Crow | -- | -- | Full |
| Scout Crow | -- | -- | Full |
| AI Queries/Day | 10 | 100 | 500 |
| Transactions | 100/mo | Unlimited | Unlimited |
| Multi-business | -- | -- | Yes |

## Design Guide

See `design-guide.md` for the complete visual language, component patterns, and UX principles.
