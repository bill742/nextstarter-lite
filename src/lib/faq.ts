import { supportEmail } from "./upsell";

/** A single question and answer. */
export type FaqItem = {
  answer: string;
  id: string;
  question: string;
};

/** A titled group of related questions. */
export type FaqSection = {
  id: string;
  items: FaqItem[];
  title: string;
};

/**
 * Buyer-facing FAQ for the /pro page.
 *
 * Answers are plain strings rather than JSX on purpose: the same text is
 * rendered in the page body and emitted as FAQPage JSON-LD (see lib/schema.ts),
 * and Google requires the structured data to match the visible content exactly.
 * Keeping one source of truth means the two can never drift apart.
 */
export const faqSections: FaqSection[] = [
  {
    id: "getting-access",
    items: [
      {
        answer:
          "Instant access to the private NextStarter Pro GitHub repository. On purchase you're added as a collaborator automatically, so you can clone the repo and start building right away — plus every future update.",
        id: "what-you-get",
        question: "What do I actually get when I buy?",
      },
      {
        answer:
          "Through GitHub, not a zip. You clone the private repo and pull updates with git. That means you get fixes and new features by running git pull, instead of re-downloading and manually merging a file dump.",
        id: "delivery",
        question: "How is it delivered?",
      },
      {
        answer:
          "Yes — access is granted to your GitHub account. You connect it in the customer portal after checkout, and GitHub emails you a collaborator invitation for the repository.",
        id: "github-account",
        question: "Do I need a GitHub account?",
      },
    ],
    title: "Getting access",
  },
  {
    id: "pricing-licensing",
    items: [
      {
        answer:
          "One-time. You pay once and get lifetime access to the repository and its updates. There are no recurring fees and nothing to cancel.",
        id: "one-time",
        question: "Is this a one-time payment or a subscription?",
      },
      {
        answer:
          "Yes. A single-developer license covers unlimited personal and commercial projects — build client work, side projects, and your own products with it.",
        id: "multiple-projects",
        question: "Can I use it on more than one project?",
      },
      {
        answer:
          "You can ship the apps you build with it however you like. You can't redistribute, resell, or share the starter itself as a template, and each developer needs their own license. Full terms are in the repository's LICENSE.md.",
        id: "reselling",
        question: "Can I resell it or share it?",
      },
    ],
    title: "Pricing & licensing",
  },
  {
    id: "updates",
    items: [
      {
        answer:
          "For the lifetime of the product. Pull them anytime with git pull; the CHANGELOG and GitHub Releases track what changed in each version.",
        id: "update-length",
        question: "How long do I get updates?",
      },
      {
        answer:
          "You keep NextStarter as a separate git remote and merge updates when you choose. Because you build your app in your own files, merges are usually small — and the repository includes a short guide for doing this cleanly across multiple projects.",
        id: "update-conflicts",
        question: "Will updates break my project?",
      },
    ],
    title: "Updates",
  },
  {
    id: "technical",
    items: [
      {
        answer:
          "Next.js 16 (App Router), TypeScript in strict mode, Tailwind CSS v4, and React 19. Auth is Clerk, the database is Prisma + PostgreSQL, payments are Stripe, email is Resend, analytics is PostHog, and error tracking is Sentry.",
        id: "tech-stack",
        question: "What's the tech stack?",
      },
      {
        answer:
          "Node.js 22 or later, and a GitHub account to receive the repository. Every third-party service is optional, and each one has a generous free tier.",
        id: "node-version",
        question: "What Node version do I need?",
      },
      {
        answer:
          "No. Every integration is optional and gated by an environment variable. With no keys, the app builds, runs, and passes its tests — features you haven't configured simply show a tidy “not configured” notice. Turn on only what you need, when you need it.",
        id: "service-signups",
        question: "Do I have to sign up for all those services?",
      },
      {
        answer:
          "Yes. Because each integration is self-contained and env-gated, you can leave it off with zero configuration or delete it outright without unravelling the rest of the app.",
        id: "remove-parts",
        question: "Can I remove the parts I don't want?",
      },
      {
        answer:
          "Anywhere Next.js runs. Vercel is the one-click path, with a walkthrough in the docs, and there's a manual and self-hosted guide too.",
        id: "deployment",
        question: "Where can I deploy it?",
      },
      {
        answer:
          "Comfort with React and Next.js. If you've built with the App Router before, you'll be productive immediately; the docs cover setup, each integration, and deployment.",
        id: "prerequisites",
        question: "What do I need to know to use it?",
      },
    ],
    title: "Technical",
  },
  {
    id: "accessibility",
    items: [
      {
        answer:
          "It's tested. Every page is scanned with Axe-core in automated tests, in both light and dark mode, and the project targets WCAG 2.1 AA. That matters for government, enterprise, and agency work where accessibility is a requirement — and it's a rare thing to get in a starter at any price.",
        id: "accessibility-proof",
        question: "Is it really accessible, or is that just a bullet point?",
      },
    ],
    title: "Accessibility",
  },
  {
    id: "buying",
    items: [
      {
        answer:
          "The free version, NextStarter Lite, is a polished, accessible landing page with testing and tooling. Pro adds the whole SaaS foundation on top — authentication, database, billing, email, a dashboard, admin, i18n, security, and more — so you skip the weeks of plumbing every SaaS repeats.",
        id: "free-vs-pro",
        question: "How is this different from the free starter?",
      },
      {
        answer:
          "Yes. Pro is a separate repository rather than an upgrade you apply in place, so nothing you've already built on the free starter is wasted — the conventions, tooling, and structure are the same, and you move your own files across.",
        id: "upgrade-later",
        question: "I started on the free version. Can I upgrade later?",
      },
      {
        answer:
          "There's a 14-day money-back guarantee. If NextStarter Pro isn't a fit, email within 14 days of your purchase and you'll get a full refund — repository access is simply revoked.",
        id: "refunds",
        question: "What if it's not for me — can I get a refund?",
      },
      // Only worth asking when there is somewhere to send the question.
      ...(supportEmail
        ? [
            {
              answer: `Email ${supportEmail} and you'll get a reply before you buy. Happy to answer anything that isn't covered here.`,
              id: "pre-purchase-questions",
              question: "I have a question before buying.",
            },
          ]
        : []),
    ],
    title: "Buying",
  },
];
