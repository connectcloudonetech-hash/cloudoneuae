# Best Prompt for AI Studio — SR INFOTECH Stock App (Frontend-First)

Copy and paste the prompt below into `aistudio.google.com`.

---

You are a **principal frontend engineer + product designer (2025 standards)**.
Create a **production-ready, mobile-first web app UI** for my stock maintenance company.

## Business Context
- Company: **SR INFOTECH**
- Location: **Dubai, UAE**
- Industry: **IT Services**
- Scope: **Stock movement only** (no accounting, no invoicing, no finance module)

## What this app must do
I only need to track:
1. How many product pieces come from vendor/customer (**Carry IN**)
2. How many product pieces go to customer (**Carry OUT**)
3. Remaining balance stock

## Core Tech Requirements
- Framework: **Next.js 15+ (App Router) + TypeScript**
- UI: **Tailwind CSS + shadcn/ui**
- Forms: **React Hook Form + Zod**
- Data/API/Auth/Realtime: **Supabase**
- Tables: **TanStack Table**
- Charts: **Recharts**
- PDF export: **jsPDF** (or pdf-lib)
- Excel export: **xlsx**
- Deploy target: **Vercel**

## IMPORTANT Build Mode
Build this as **frontend-first but fully integratable with Supabase**:
- Create polished UI + reusable components first
- Use typed service layer for Supabase integration
- Include real Supabase-ready queries/mutations and realtime subscriptions
- Keep architecture clean so I can run immediately after adding Supabase env keys

## UI/UX Direction (strict)
Design must feel like a premium SaaS product in 2025:
- **Mobile-first** (perfect on phones, then tablet/desktop)
- Clean, professional, modern tech company style
- Subtle glassmorphism (cards, panels)
- Smooth scrolling and micro-interactions
- Fast transitions (not heavy animations)
- Excellent spacing/typography/visual hierarchy
- Accessible contrast and keyboard-friendly controls
- Dark mode + Light mode

## Branding + Assets
Use company branding name everywhere:
- **SR INFOTECH**

Create placeholders and usage docs for:
- Login logo (large)
- Main logo
- Android icon (192x192 + 512x512)
- Apple touch icon (180x180)
- Favicon (.ico/.png)

## Required Screens / Modules

### 1) Login Page
- Company logo
- Username
- Password
- Login button
- Elegant background + centered card
- Validation and clear error messages

### 2) Dashboard
Show:
- Total products
- Total stock quantity
- Today IN total
- Today OUT total
- Low stock alerts
- Recent movement history

Filters:
- Customer-wise
- Product-wise
- Day / Month / Year

Also include:
- IN vs OUT trend chart
- Quick actions (Carry IN, Carry OUT, Reports)

### 3) Carry IN Form
Fields:
- Date (required)
- Customer (required)
- Product (required)
- Qty (required, positive number)
- Nos (required, positive integer)
- Weight (optional, positive number)
- Button: **Carry IN**

Behavior:
- Insert movement type `IN`
- Update product stock balance (+)

### 4) Carry OUT Form
Fields:
- Date (required)
- Product (required)
- Qty (required, positive number)
- Nos (required, positive integer)
- Weight (optional, positive number)
- Button: **Carry OUT**

Behavior:
- Insert movement type `OUT`
- Update product stock balance (-)
- Prevent negative stock (unless admin override setting is enabled)

### 5) History + Advanced Search
- Combined IN/OUT timeline/table
- Instant keyword search across:
  - Customer name
  - Product name
  - Category
  - Description/remarks
- Debounced search input
- Date range + movement type filters
- Sorting + pagination

### 6) Reports
Generate report views by:
- Customer-wise
- Product-wise
- Day-wise
- Month-wise
- Year-wise

Exports:
- Export to **PDF**
- Export to **Excel (.xlsx)**

PDF output should include:
- SR INFOTECH logo/title
- Filter summary
- Table data
- Totals
- Generated datetime

### 7) Admin User Management
Admin can manage users:
- Add user: name, role, username, password
- Roles: admin / manager / staff
- Edit, deactivate users
- Role-based page access guards

### 8) Realtime Sync
Use Supabase realtime subscriptions so:
- Dashboard updates instantly on all devices
- History and stock balances auto-refresh
- Reports reflect latest data

## Data Model (Supabase)
Create SQL schema + RLS policy examples for:
- `profiles`
- `customers`
- `products`
- `stock_movements`
- `audit_logs` (optional)

Use robust stock update strategy:
- Transaction/function/trigger to keep stock consistent
- Prevent race conditions and negative stock

## Security Rules
- Enable RLS on all tables
- Suggested access:
  - admin: full access
  - manager: inventory CRUD + user read
  - staff: create/read movements + limited updates
- Never expose Supabase service role key in frontend

## Required Folder Structure
- `app/(auth)/login`
- `app/(dashboard)/dashboard`
- `app/(dashboard)/carry-in`
- `app/(dashboard)/carry-out`
- `app/(dashboard)/history`
- `app/(dashboard)/reports`
- `app/(dashboard)/users`
- `components/ui`
- `components/forms`
- `lib/supabase`
- `lib/validators`
- `lib/utils`
- `types`

## Frontend Quality Checklist
- Loading skeletons
- Empty states
- Success/error toast feedback
- Confirmation modals
- Sticky mobile bottom navigation
- Touch-friendly input sizes
- No layout shift
- Fast first paint

## Output Format (strict)
Return your response in this exact order:
1. Architecture overview (frontend-first + Supabase integration)
2. SQL schema + RLS policies
3. Setup instructions (local)
4. Full project code (key files complete, no pseudo-code)
5. Realtime implementation details
6. PDF + Excel export code
7. Vercel deployment steps
8. Environment variables (`.env.example`)
9. Post-deployment QA checklist

## Coding Standards
- Strict TypeScript
- Reusable components
- Clean naming
- Production-level code only
- Explain where each file should be placed

Now generate the complete solution.

---

## Short Version (Quick Paste)
Build a **mobile-first premium stock maintenance web app** for **SR INFOTECH (Dubai)** using **Next.js 15 + TypeScript + Tailwind + shadcn/ui + Supabase + Vercel**. Include Login, Dashboard, Carry IN, Carry OUT, History with advanced search, Reports, PDF/Excel export, Admin user management (admin/manager/staff), realtime sync, stock balance logic with negative-stock protection, Supabase SQL schema + RLS, dark/light mode, glassmorphism 2025 UI, smooth micro-interactions, and complete production-ready code with setup + deployment steps + `.env.example`.
