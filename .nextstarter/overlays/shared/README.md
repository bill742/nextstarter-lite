# My Site

A Next.js project scaffolded with
[NextStarter](https://github.com/bill742/nextstarter-lite).

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

## Getting Started

**Requirements:** Node.js 22+ (see `.node-version`)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page lives in
`src/app/page.tsx`.

## Environment Variables

Copy `.env.example` to `.env` (create-nextstarter has already done this) and
fill in:

| Variable                            | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Full URL of your site (e.g. `https://example.com`)      |
| `NEXT_PUBLIC_SITE_NAME`             | Name shown in the header, footer, and page titles       |
| `NEXT_PUBLIC_SITE_META_DESCRIPTION` | Description used in search results and link previews    |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Optional. Leave blank and analytics never loads         |
| `NEXT_PUBLIC_PRIVACY_EMAIL`         | Contact address for privacy requests, shown on /privacy |

## Making this yours

- **`src/app/page.tsx`** — the home page.
- **`src/components/header/navigation-items.ts`** — header links and the
  optional call-to-action button.
- **`src/components/footer/`** — footer content.
- **`src/app/privacy/page.tsx`** — a privacy notice written to the UK GDPR and
  PECR. It reads your analytics configuration, but review it against what your
  site actually does before going live.
- **`src/app/layout.tsx`** and **`src/lib/schema.ts`** — site-wide metadata and
  structured data.

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
