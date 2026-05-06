# WalletCrow - Your Wallet's Smartest Flock

WalletCrow is an AI-powered financial command center where a "murder" of specialized, personality-driven AI Crows guard, predict, and grow a business's money. It connects to bank accounts, payment processors, and invoicing tools, then deploys intelligent Crows that proactively watch the wallet, scout for opportunities, hunt down waste, and warn of danger before it strikes.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Credentials provider)
- **AI:** DeepSeek API integration
- **Financial Data:** Plaid API (prepared)
- **Payments:** Stripe (prepared)

## MVP Features

### The Wallet Nest Dashboard
- At-a-glance financial health visualization
- Central nest graphic showing total liquid assets
- Crow status indicators around the rim
- Health states: healthy (golden), caution (warning), danger (red)

### AI Crow System
- **Cashflow Crow** - Forecasting, cash runway, bill tracking, overdue invoice alerts
- **Expense Crow** - Subscription auditing, waste detection, expense spike analysis
- **Revenue Crow** - Growth insights (Pro feature, gated)
- **Tax Crow** - Tax preparation (The Murder plan)
- **Scout Crow** - External intelligence (The Murder plan)

Each Crow has a distinct personality, visual identity, and conversational AI interface powered by DeepSeek.

### Lightweight POS Module
- Quick sales entry with amount, category, payment method
- Today's sales summary
- Feeds directly into Revenue Crow analysis

### Smart Invoicing
- Create, send, and track branded invoices
- Status tracking (Draft, Sent, Paid, Overdue)
- Cashflow Crow integration for overdue alerts

### Budget Goals ("Nest Eggs")
- Set financial goals with target amounts and deadlines
- Visual progress tracking with golden egg metaphor
- Auto-alerts when goals go off track

### Super Admin Dashboard
- Platform-wide business management
- Usage statistics and AI query monitoring
- Pricing plan management with feature flags
- Business impersonation for support

### Pricing Plans
| Feature | Sparrow (Free) | Crow Keeper ($29/mo) | The Murder ($79/mo) |
|---------|----------------|---------------------|---------------------|
| Bank connections | 1 | Unlimited | Unlimited |
| Transactions/month | 100 | Unlimited | Unlimited |
| Cashflow Crow | Basic | Full | Full + What-if |
| Expense Crow | - | Full | Full |
| Revenue Crow | - | Full | Full |
| Tax Crow | - | - | Full |
| Scout Crow | - | - | Full |
| Multi-business | - | - | Yes |

## Project Structure

```
src/
  app/
    page.tsx              # Landing page
    login/page.tsx        # Authentication
    dashboard/
      layout.tsx          # Dashboard shell with sidebar
      page.tsx            # Wallet Nest home
      cashflow/page.tsx   # Cashflow Crow module
      expenses/page.tsx   # Expense Crow module
      revenue/page.tsx    # Revenue Crow (gated)
      invoices/page.tsx   # Invoice management
      pos/page.tsx        # Point of Sale
      goals/page.tsx      # Nest Eggs / Budget Goals
      settings/page.tsx   # Business settings
    admin/
      layout.tsx          # Admin shell
      page.tsx            # Admin overview
      businesses/page.tsx # Business management
      plans/page.tsx      # Plan management
      usage/page.tsx      # Usage statistics
      settings/page.tsx   # Platform settings
    api/
      auth/               # NextAuth + registration
      crow/chat/          # AI Crow chat endpoint
  components/
    ui/                   # shadcn/ui components
    layout/               # Sidebar, Header
    nest/                 # Nest visualization
    crow/                 # Crow chat, alert cards
  lib/
    ai.ts                 # DeepSeek API integration
    auth.ts               # NextAuth configuration
    crows.ts              # Crow personas and prompts
    db.ts                 # Prisma client
    feature-gate.ts       # Plan-based feature gating
    utils.ts              # Shared utilities
  types/
    index.ts              # TypeScript type definitions
prisma/
  schema.prisma           # Database schema
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/TAZmalikjr/LebenOS.git
   cd LebenOS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and API keys
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for required configuration:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Session encryption key
- `DEEPSEEK_API_KEY` - AI Crow intelligence
- `PLAID_CLIENT_ID` / `PLAID_SECRET` - Bank connections
- `STRIPE_SECRET_KEY` - Payment processing

## License

Private - All rights reserved.
