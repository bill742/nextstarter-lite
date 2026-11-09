"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useActionState, useEffect } from "react";

import {
  confirmUpdates,
  type EmailCaptureState,
} from "@/components/email-capture/actions";
import { Button } from "@/components/ui/button";
import { isAnalyticsEnabled } from "@/lib/analytics";

const initialState: EmailCaptureState = { status: "idle" };

const linkClass =
  "underline transition-colors hover:text-orange-700 dark:hover:text-orange-400";

/**
 * The "Confirm my email" button, posting the link's token to
 * {@link confirmUpdates}.
 *
 * @param token - The token from the confirmation link.
 * @returns The confirm button, then the outcome in its place.
 */
const ConfirmForm = ({ token }: { token: string }) => {
  const [state, formAction, isPending] = useActionState(
    confirmUpdates,
    initialState
  );

  useEffect(() => {
    // Confirmed subscribers, the last step of the signup funnel. No address
    // or token is sent.
    if (state.status === "success" && isAnalyticsEnabled) {
      posthog.capture("email_confirmed");
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="space-y-4" role="status">
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          You&rsquo;re on the list. We&rsquo;ll email you when there&rsquo;s
          news &mdash; and before the founding offer closes.
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          <Link className={linkClass} href="/whats-new">
            See what&rsquo;s shipped so far
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input name="token" type="hidden" value={token} />
      <Button
        className="dark:to-coral-600 bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:from-orange-600"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? "Confirming…" : "Confirm my email"}
      </Button>
      <p
        aria-live="polite"
        className="min-h-5 text-sm text-rose-700 dark:text-rose-300"
        role="status"
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
};

ConfirmForm.displayName = "ConfirmForm";

export default ConfirmForm;
