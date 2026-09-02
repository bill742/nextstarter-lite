# NextStarter

A modern Next.js boilerplate to ship production-ready projects fast — with TypeScript, Tailwind CSS v4, accessibility, testing, and developer tooling pre-configured.

[![ESLint](https://github.com/bill742/nextstarter-lite/actions/workflows/eslint.yml/badge.svg)](https://github.com/bill742/nextstarter-lite/actions/workflows/eslint.yml)
[![Playwright Tests](https://github.com/bill742/nextstarter-lite/actions/workflows/playwright.yml/badge.svg)](https://github.com/bill742/nextstarter-lite/actions/workflows/playwright.yml)
[![Lighthouse](https://github.com/bill742/nextstarter-lite/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/bill742/nextstarter-lite/actions/workflows/lighthouse.yml)

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
| Analytics  | [PostHog](https://posthog.com/) (cookieless, optional)                                          |
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

### Analytics & Privacy

- **PostHog analytics**, configured cookieless — no cookies, no local storage,
  and therefore no consent banner. Visitors are counted with a server-side
  privacy-preserving hash instead of an identifier that follows them around
- **Core Web Vitals** captured alongside pageviews
- Opt-in: with no `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` set, PostHog never
  initializes and the app makes no third-party requests at all
- Autocapture and session recording are **off** by default under data
  minimisation — turn them on deliberately, not by inheriting a default
- **A `/privacy` page** written to the UK GDPR and PECR, linked from the footer
  on every page. It reads the same config the SDK does, so it describes what
  the site actually does rather than drifting away from it
- Self-hosted fonts via `next/font` — no visitor IP is ever sent to Google
- The cost of going cookieless, stated plainly: PostHog strips the IP before
  enrichment, so there is **no geography and no bot filtering** — the world map
  reads zero for every country by design. Not having a consent banner is what
  you are buying with that

### Testing & CI/CD

- **Playwright** end-to-end tests across Chromium, Firefox, and WebKit
- **Axe-core** accessibility scans run on every test run
- **GitHub Actions** workflows for ESLint and Playwright on push and pull request
- HTML test reports

### Performance

- **Lighthouse 100/100/100/100** on desktop in production — performance,
  accessibility, best practices, and SEO
- **Lighthouse CI** runs on every push and pull request, on both mobile and
  desktop, and fails the build if the scores regress
- Accessibility and SEO are asserted at a flat 100 on both form factors;
  performance gets a floor rather than an exact target, because it is a timing
  measurement on a shared CI runner
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
- 🚀 Waitlist mode and Sentry error tracking
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

## Making this yours

Two files carry NextStarter's own content rather than yours, and both are built
to be emptied:

- **`src/lib/changelog.ts`** — the entries behind `/whats-new`. Empty both
  arrays and the route disappears along with its navigation entries and its
  sitemap listing; add your first entry and it comes back. `CHANGELOG.md` is the
  complete record it is curated from — reset that too.
- **`.env`** — leaving `NEXT_PUBLIC_PRO_URL` unset switches off the whole upsell
  surface: the home-page teaser, its navigation entries, and the `/pro` and
  `/thanks` routes. A project built on this starter never advertises NextStarter
  Pro unless you point it at a checkout of your own.

---

## Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Serve the production build              |
| `npm run lint`  | Run ESLint                              |
| `npm run test`  | Run Playwright end-to-end tests         |

Lighthouse runs in CI on every push. To run it locally against a production
build (it starts and stops the server itself):

```bash
npm run lighthouse           # mobile preset
npm run lighthouse:desktop   # desktop preset
```

---

## License

Released under the [MIT License](LICENSE) — free to use for personal and
commercial projects.
