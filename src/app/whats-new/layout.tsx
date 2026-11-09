import EmailCapture from "@/components/email-capture";

/**
 * Adds the email capture below the What's New timeline.
 *
 * It lives in a layout rather than in the page so the scaffolder can drop it
 * by deleting this one file (see `.nextstarter/manifest.json`) — the page
 * itself survives into scaffolded projects and must not import a component
 * that is removed from them. Outside `<main>`, so it renders as an `<aside>`.
 *
 * @param children - The What's New page.
 * @returns The page followed by the email capture.
 */
const WhatsNewLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <EmailCapture landmark location="whats-new" />
  </>
);

WhatsNewLayout.displayName = "WhatsNewLayout";

export default WhatsNewLayout;
