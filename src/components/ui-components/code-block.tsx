"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

/** How long the button reports the result of a copy before resetting. */
const RESET_DELAY_MS = 2000;

type CopyState = "copied" | "failed" | "idle";

/** What the button says and shows in each state. */
const copyLabels: Record<CopyState, string> = {
  copied: "Copied",
  failed: "Copy failed",
  idle: "Copy",
};

/**
 * The source for one example, collapsed behind a disclosure.
 *
 * Collapsed by default because the point of the page is to see the components;
 * the code is there for the moment you want to paste one into your own app.
 * `<details>` gives that for free — keyboard operable, searchable by the
 * browser's find-in-page in supporting browsers, and open with JS off.
 *
 * @param code - The snippet to display, already formatted.
 * @returns A disclosure containing the snippet and a copy button.
 */
const CodeBlock = ({ code }: { code: string }) => {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A copy right before navigating away would otherwise leave a timer holding
  // a setState on an unmounted component.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const copy = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    try {
      // Undefined outside a secure context, so this is a real failure path
      // rather than a defensive one.
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }

    timerRef.current = setTimeout(() => setState("idle"), RESET_DELAY_MS);
  };

  const Icon = state === "copied" ? Check : state === "failed" ? X : Copy;

  return (
    <details className="border-t border-stone-200 dark:border-stone-800">
      <summary className="cursor-pointer px-6 py-3 text-sm font-medium text-stone-600 transition-colors hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400">
        Code
      </summary>

      <div className="px-6 pb-6">
        <div className="flex justify-end pb-2">
          <Button onClick={copy} size="sm" type="button" variant="outline">
            <Icon aria-hidden="true" />
            {copyLabels[state]}
          </Button>
        </div>

        {/* tabIndex makes an overflowing block scrollable by keyboard, which
            axe flags when it is missing. */}
        <pre
          className="overflow-x-auto rounded-lg bg-stone-50 p-4 text-sm text-stone-800 dark:bg-stone-950 dark:text-stone-200"
          tabIndex={0}
        >
          <code className="font-mono">{code}</code>
        </pre>

        {/* The button's label changes, but a screen reader sitting on the
            focused button will not re-announce it; this says what happened. */}
        <p aria-live="polite" className="sr-only">
          {state === "idle" ? "" : copyLabels[state]}
        </p>
      </div>
    </details>
  );
};

CodeBlock.displayName = "CodeBlock";

export default CodeBlock;
