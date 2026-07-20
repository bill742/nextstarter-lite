# NextStarter

A modern Next.js boilerplate to ship production-ready projects fast — with TypeScript, Tailwind CSS v4, accessibility, testing, and developer tooling pre-configured.

[![ESLint](https://github.com/bill742/nextstarter-lite/actions/workflows/eslint.yml/badge.svg)](https://github.com/bill742/nextstarter-lite/actions/workflows/eslint.yml)
[![Playwright Tests](https://github.com/bill742/nextstarter-lite/actions/workflows/playwright.yml/badge.svg)](https://github.com/bill742/nextstarter-lite/actions/workflows/playwright.yml)

**[Live Demo](https://www.nextstarter.app/)**

> **This is the free version of NextStarter.** [NextStarter Pro](https://www.nextstarter.app/)
> adds authentication, a database, Stripe billing, email, a dashboard, admin,
> internationalization, and more — a complete SaaS foundation.
> [See what's included ↓](#upgrade-to-pro)

## Tech Stack

| Layer      | Technology                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org/) (App Router)                                                  |
| Language   | [TypeScript](https://www.typescriptlang.org/) (strict mode)                                     |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/)                                                     |
| Components | [ShadCN/UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)                     |
| Icons      | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| Theming    | [next-themes](https://github.com/pacocoursey/next-themes)                                       |
| Testing    | [Playwright](https://playwright.dev/) + [Axe-core](https://github.com/dequelabs/axe-core)       |
| Runtime    | Node.js 22                                                                                      |

---

## Features

### Developer Experience

- **Turbopack** — faster local development builds
- **ESLint** with import sorting, key sorting, arrow functions, template literals, and TypeScript rules
- **Prettier** with automatic Tailwind class sorting
- **VS Code** settings and recommended extensions pre-configured
- **TypeScript strict mode** with `@/*` path alias
- **Node version file** for `nvm`, `fnm`, and other version managers

### Styling & Theming

- **Tailwind CSS v4** with a custom stone/orange design theme
- **Light and dark modes** — system preference by default, user-toggleable
- **ShadCN/UI** component library (Button, Tooltip)
- **Radix UI** primitives for accessible, headless components
- Mobile-first responsive design with Tailwind breakpoints

### Accessibility

- **Axe-core** automated accessibility scanning in Playwright tests
- Skip-to-content navigation link for keyboard users
- Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels, `aria-expanded`, `aria-current` on interactive elements
- WCAG 2.1 AA verified in both light and dark modes

### SEO & Metadata

- Auto-generated `robots.txt` and `sitemap.xml` via TypeScript
- Configurable `<title>` template (`%s | NextStarter`)
- Open Graph and Twitter card metadata support
- Canonical URL configuration

### Testing & CI/CD

- **Playwright** end-to-end tests across Chromium, Firefox, and WebKit
- **Axe-core** accessibility scans run on every test run
- **GitHub Actions** workflows for ESLint and Playwright on push and pull request
- HTML test reports

### Performance

- Server components by default — minimal client-side JavaScript
- `next/image` for optimized images
- Static generation for sitemap and robots metadata
- Custom 404 page

---

## Upgrade to Pro

This free starter gives you a polished, accessible marketing landing page with
testing and tooling built in. **NextStarter Pro** turns it into a complete SaaS
foundation.

**Everything in the free version, plus:**

- 🔐 Authentication (Clerk) — sign-in, protected routes, user profile
- 🗄️ Database (Prisma + PostgreSQL) — a user-owned CRUD example
- ✉️ Transactional email (Resend) and 💳 Stripe subscriptions
- 📊 Dashboard app shell + a protected admin panel
- 📝 MDX blog and a validated contact form
- 🌍 Internationalization — English, Spanish, and Arabic (RTL)
- 🛡️ Security headers, CSP, and API rate limiting
- 🚀 Waitlist mode, PostHog analytics, and Sentry error tracking
- 📚 Comprehensive documentation

**$199 one-time** — lifetime access and updates via a private GitHub repo (just
`git pull` to update).

**[Get NextStarter Pro →](https://www.nextstarter.app/)**

---

## Getting Started

**Requirements:** Node.js 22+ (see `.node-version`)

```bash
npx @bill742/create-nextstarter my-project
cd my-project
npm run dev
```

| Variable                | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Full URL of your site (e.g. `https://example.com/`) |
| `NEXT_PUBLIC_SITE_NAME` | Name displayed in the header and footer             |

---

## Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Serve the production build              |
| `npm run lint`  | Run ESLint                              |
| `npm run test`  | Run Playwright end-to-end tests         |
