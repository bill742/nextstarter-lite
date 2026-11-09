"use client";

import posthog from "posthog-js";
import { useActionState, useEffect, useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { isAnalyticsEnabled } from "@/lib/analytics";

import { type EmailCaptureState, joinUpdates } from "./actions";
import { HONEYPOT_FIELD, TIMING_FIELD } from "./bot-check";

/**
 * Where on the site the form sits, sent with the signup event. The home page
 * has two (`home-hero` near the top, `home` at the end), so this is what
 * tells you which one people actually use.
 */
export type EmailCaptureLocation = "home-hero" | "home" | "pro" | "whats-new";

const initialState: EmailCaptureState = { status: "idle" };

/**
 * The email field and submit button.
 *
 * A plain `<form action>` bound to a server action through `useActionState`,
 * so it works before JavaScript loads and needs none of the form libraries
 * Pro uses. The result is announced through a polite live region, and the
 * field keeps the browser's own `type="email"` check as the first line of
 * validation.
 *
 * It also carries two quiet bot checks, read by `joinUpdates` (see
 * `bot-check.ts`): an off-screen field people never see or fill in, and how
 * long the form was on screen before it was sent.
 *
 * @param location - Which page the form is on, for analytics.
 * @returns The signup form.
 */
const EmailCaptureForm = ({ location }: { location: EmailCaptureLocation }) => {
  const [state, formAction, isPending] = useActionState(
    joinUpdates,
    initialState
  );
  const id = useId();
  const inputId = `${id}-email`;
  const statusId = `${id}-status`;
  const honeypotId = `${id}-${HONEYPOT_FIELD}`;
  const mountedAt = useRef<number | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    // Counts form submissions, not confirmed subscribers — those are
    // `email_confirmed`, sent from /updates/confirm. The address itself is
    // never sent, just the fact of a signup and which form it came from.
    if (state.status === "success" && isAnalyticsEnabled) {
      posthog.capture("email_signup", { location });
    }
  }, [state, location]);

  if (state.status === "success") {
    return (
      <p
        aria-live="polite"
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
        role="status"
      >
        Almost there &mdash; check your inbox for a link to confirm your email.
        Nothing is added to the list until you click it.
      </p>
    );
  }

  const hasError = state.status === "error";

  return (
    <form
      action={formAction}
      className="relative w-full"
      onSubmit={(event) => {
        // Measured on the visitor's own clock, so server clock skew cannot
        // matter. Without JavaScript the field stays empty and only the
        // honeypot applies.
        const field = event.currentTarget.elements.namedItem(TIMING_FIELD);
        if (field instanceof HTMLInputElement && mountedAt.current !== null) {
          field.value = String(Date.now() - mountedAt.current);
        }
      }}
    >
      <input name={TIMING_FIELD} type="hidden" />
      {/* Honeypot. Off screen rather than display:none, which many bots skip;
          hidden from assistive tech and out of the tab order, so people never
          meet it. Autofill is off so browsers do not fill it in either. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={honeypotId}>Leave this field empty</label>
        <input
          autoComplete="off"
          id={honeypotId}
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          type="text"
        />
      </div>
      <label
        className="block text-left text-sm font-medium text-stone-900 dark:text-stone-100"
        htmlFor={inputId}
      >
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          aria-describedby={hasError ? statusId : undefined}
          aria-invalid={hasError || undefined}
          autoComplete="email"
          // React resets a form after its action runs; restore the address
          // after a failed attempt so it can be corrected, not retyped.
          defaultValue={state.email}
          key={state.email}
          className="h-10 w-full min-w-0 rounded-md border border-stone-300 bg-white px-3 text-stone-900 placeholder:text-stone-500 focus-visible:border-orange-600 focus-visible:ring-2 focus-visible:ring-orange-600/40 focus-visible:outline-none aria-invalid:border-rose-600 sm:flex-1 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50 dark:placeholder:text-stone-400"
          id={inputId}
          maxLength={254}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <Button
          className="dark:to-coral-600 h-10 shrink-0 bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:from-orange-600"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Joining…" : "Notify me"}
        </Button>
      </div>
      <p
        aria-live="polite"
        className="mt-2 min-h-5 text-left text-sm text-rose-700 dark:text-rose-300"
        id={statusId}
        role="status"
      >
        {hasError ? state.message : ""}
      </p>
    </form>
  );
};

EmailCaptureForm.displayName = "EmailCaptureForm";

export default EmailCaptureForm;
