# WalletCrow Design Guide

This document defines the visual language, UI patterns, and UX principles used across all WalletCrow products.

---

## 1. Brand Identity

### Name & Tagline
- **Product Name:** WalletCrow
- **Tagline:** "Your wallet's smartest flock."
- **Metaphor:** A murder of intelligent, loyal, slightly cheeky crows that guard business finances.

### Logo
- Stylized crow silhouette inside a rounded square
- Primary color background (#D4A017 gold) with dark crow icon
- The crow appears contextually: calm when healthy, ruffled when alerting

---

## 2. Color System

### Core Palette (HSL CSS Variables)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `222 47% 6%` | Page backgrounds |
| `--foreground` | `210 40% 98%` | Primary text |
| `--card` | `222 47% 8%` | Card backgrounds |
| `--primary` | `43 74% 46%` | Gold - primary actions, brand accent |
| `--primary-foreground` | `222 47% 6%` | Text on primary |
| `--secondary` | `217 33% 17%` | Secondary backgrounds |
| `--muted` | `217 33% 17%` | Muted backgrounds |
| `--muted-foreground` | `215 20% 65%` | Secondary text |
| `--destructive` | `0 84% 60%` | Error states |
| `--border` | `217 33% 17%` | Borders |
| `--ring` | `43 74% 46%` | Focus rings |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `crow-gold` | `#D4A017` | Brand, success states, premium |
| `crow-dark` | `#1A1A2E` | Deep backgrounds |
| `crow-nest` | `#2D2D44` | Nest UI element |
| `crow-danger` | `#E74C3C` | Errors, dangers, overdue |
| `crow-success` | `#2ECC71` | Positive values, income |
| `crow-warning` | `#F39C12` | Warnings, caution states |
| `crow-info` | `#3498DB` | Informational, Cashflow Crow |

### Crow-Specific Colors

| Crow | Color | Hex |
|------|-------|-----|
| Cashflow Crow | Blue | `text-blue-400` / `bg-blue-500/10` |
| Expense Crow | Red | `text-red-400` / `bg-red-500/10` |
| Revenue Crow | Green | `text-green-400` / `bg-green-500/10` |
| Tax Crow | Purple | `text-purple-400` / `bg-purple-500/10` |
| Scout Crow | Yellow | `text-yellow-400` / `bg-yellow-500/10` |

---

## 3. Typography

### Font Family
- **Primary:** Inter (Google Fonts)
- **Fallback:** system-ui, sans-serif

### Scale

| Element | Class | Size |
|---------|-------|------|
| Page heading | `text-2xl font-bold` | 24px |
| Section heading | `text-lg font-semibold` | 18px |
| Card title | `text-base font-semibold` | 16px |
| Body text | `text-sm` | 14px |
| Caption/label | `text-xs` | 12px |
| Tiny label | `text-[10px]` | 10px |

---

## 4. Spacing & Layout

### Border Radius
- `--radius: 0.75rem` (12px)
- Cards: `rounded-lg`
- Buttons: `rounded-md`
- Badges: `rounded-full`
- Small elements: `rounded-sm`

### Spacing Scale
- Section gaps: `space-y-6` (24px)
- Card padding: `p-6` (24px)
- Inner gaps: `gap-4` (16px)
- Tight gaps: `gap-2` (8px)

### Layout Patterns
- **Dashboard:** Fixed sidebar (w-64) + scrollable content area
- **Auth pages:** Centered card on full-screen background
- **Marketing:** Max-width container (max-w-6xl) with section-based layout

---

## 5. Component Patterns

### Cards
```
rounded-lg border bg-card text-card-foreground shadow-sm
```
- Use `CardHeader` with `CardTitle` for titled sections
- Use `CardContent` for body content (p-6 pt-0)
- Accent borders: `border-crow-gold/30` for premium, `border-crow-danger/30` for danger

### Buttons
| Variant | Usage |
|---------|-------|
| `default` | Primary actions (gold) |
| `secondary` | Secondary actions |
| `outline` | Tertiary actions |
| `ghost` | Icon buttons, subtle actions |
| `destructive` | Dangerous actions |

### Badges
| Variant | Usage |
|---------|-------|
| `default` | Default label (gold) |
| `secondary` | Neutral label |
| `success` | Positive states (green) |
| `warning` | Caution states (yellow) |
| `danger` | Negative states (red) |
| `outline` | Subtle labels |

### Form Inputs
- Height: `h-10` (40px)
- Border: `border-input bg-background`
- Focus: `ring-2 ring-ring ring-offset-2`
- Labels: `text-sm font-medium` above input with `mb-1.5` gap

---

## 6. Nest Health Visualization

### States
| State | Class | Visual |
|-------|-------|--------|
| Healthy | `nest-healthy` | Golden glow animation (3s cycle) |
| Caution | `nest-caution` | Amber glow animation (2s cycle) |
| Danger | `nest-danger` | Red pulse animation (1.5s cycle) |

### Crow Status Icons
- **Calm:** `bg-secondary border-border text-muted-foreground`
- **Alert:** `bg-crow-warning/20 border-crow-warning text-crow-warning`
- **Danger:** `bg-crow-danger/20 border-crow-danger text-crow-danger` + `animate-crow-ruffle`

---

## 7. Animation System

| Animation | Class | Duration | Usage |
|-----------|-------|----------|-------|
| Crow ruffle | `animate-crow-ruffle` | 0.5s infinite | Danger state crows |
| Nest glow | `nest-glow` | 3s infinite | Healthy nest |
| Nest danger | `nest-danger` | 1.5s infinite | Danger nest |
| Bounce (loading) | `animate-bounce` | default | Chat typing indicator |
| Spin (loading) | `animate-spin` | default | Button loading states |

---

## 8. AI Chat Interface

### Structure
- Full-height container with scrollable message area
- Fixed input bar at bottom
- Crow avatar + name header with persona color

### Messages
- **User:** Right-aligned, `bg-primary text-primary-foreground`, rounded-lg
- **Assistant:** Left-aligned, `bg-secondary text-foreground`, rounded-lg, with crow avatar
- **Loading:** Three bouncing dots with staggered animation delays

### Chat Header
- Crow avatar circle with persona bg color
- Crow name in persona text color
- Role description in muted-foreground

---

## 9. Navigation

### Sidebar
- Fixed width: `w-64`
- Background: `bg-card`
- Active item: `bg-primary/10 text-primary`
- Inactive: `text-muted-foreground hover:bg-accent hover:text-foreground`
- Locked items: `opacity-50 cursor-not-allowed` with "PRO" badge
- Section headers: `text-xs font-semibold uppercase text-muted-foreground tracking-wider`

### Header
- Height: `h-16`
- Background: `bg-card`
- Content: Business name left, user info + notifications right

---

## 10. Feature Gating UI

### Locked Features
- Sidebar shows locked icon with "PRO" badge
- Page shows centered lock icon with upgrade CTA
- Card with `border-dashed` style

### Plan Badges
- Sparrow: `variant="outline"` (subtle)
- Crow Keeper: `variant="secondary"`
- The Murder: `variant="default"` (gold) or `text-crow-gold`

---

## 11. Responsive Breakpoints

| Breakpoint | Prefix | Min Width |
|-----------|--------|-----------|
| Mobile | (default) | 0px |
| Tablet | `md:` | 768px |
| Desktop | `lg:` | 1024px |

### Patterns
- Dashboard sidebar: Hidden on mobile (future), always visible on desktop
- Grids: 1 col mobile, 2 col tablet, 3-4 col desktop
- Stats: Stack on mobile, inline on desktop

---

## 12. Dark Theme

WalletCrow uses **dark mode by default**. The `dark` class is applied to `<html>`.

The entire color system is designed for dark backgrounds. Light mode is not supported in the alpha release to maintain visual consistency and reduce complexity.

---

## 13. Iconography

- **Library:** Lucide React
- **Default size:** `h-5 w-5` in navigation, `h-6 w-6` in headers
- **Small:** `h-4 w-4` in buttons and inline
- **Large:** `h-8 w-8` in empty states, `h-12 w-12` in stat cards

### Key Icons
| Concept | Icon |
|---------|------|
| WalletCrow brand | `Bird` |
| Cashflow | `TrendingUp` |
| Expenses | `Scissors` |
| Revenue | `BarChart3` |
| Tax | `FileText` |
| Scout | `Shield` |
| POS | `ShoppingCart` |
| Invoices | `FileText` |
| Goals | `Target` / `Egg` |
| Settings | `Settings` |
| Admin | `Shield` |
| Danger | `AlertTriangle` / `AlertOctagon` |

---

## 14. Subdomain Architecture

| Domain | App | Purpose |
|--------|-----|---------|
| `walletcrow.com` | `apps/web` | Marketing website |
| `app.walletcrow.com` | `apps/app` | Dashboard + Super Admin |
| `accounts.walletcrow.com` | `apps/accounts` | Authentication |

### Auth Flow
1. User visits `app.walletcrow.com`
2. Middleware checks Supabase session
3. No session: redirect to `accounts.walletcrow.com/login?redirect_to=...`
4. User authenticates (Google or email)
5. Callback creates profile + business if new
6. Redirect back to original URL

---

## 15. Accessibility

- All interactive elements have focus rings (`ring-2 ring-ring`)
- Buttons use semantic HTML (`<button>`, `<a>`)
- Form inputs have associated labels
- Color is never the only means of conveying information (always paired with text/icons)
- Minimum contrast ratios maintained on dark background

---

## 16. File Naming Conventions

- **Components:** PascalCase (`CrowChat.tsx`)
- **Pages:** `page.tsx` (Next.js convention)
- **Utilities:** camelCase (`feature-gate.ts`)
- **Types:** camelCase (`index.ts`)
- **CSS:** `globals.css` per app

---

*This guide should be referenced when building any new feature or product in the WalletCrow ecosystem to maintain visual and behavioral consistency.*
