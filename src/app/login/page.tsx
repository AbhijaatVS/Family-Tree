"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "./actions";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await loginAction(password);
      if (result.success) {
        const from = searchParams.get("from") || "/";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router.push(from as any);
        router.refresh();
      } else {
        setError(result.error || "Incorrect password.");
        setPassword("");
      }
    });
  };

  return (
    <main className="login-shell">
      <div className="login-card">
        {/* Crest / Logo */}
        <div className="login-crest">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path d="M40 12 L44 28 L60 28 L47 37 L51 53 L40 44 L29 53 L33 37 L20 28 L36 28 Z" fill="currentColor" opacity="0.85" />
          </svg>
        </div>

        <h1 className="login-title">The Batthi Royal Dynasty</h1>
        <p className="login-subtitle">Family Tree &amp; Branch Archives</p>
        <p className="login-desc">This site is private. Please enter the family passcode to continue.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="password" className="login-label">Family Passcode</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter passcode…"
              className="login-input"
              autoComplete="current-password"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              🔒 {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isPending || !password}>
            {isPending ? (
              <span className="login-spinner" aria-hidden="true" />
            ) : null}
            {isPending ? "Verifying…" : "Enter Site"}
          </button>
        </form>

        <p className="login-hint">
          Once entered, you won&apos;t need to type this again on this device for 30&nbsp;days.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="login-shell">
        <div className="login-card">
          <div className="login-crest">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <path d="M40 12 L44 28 L60 28 L47 37 L51 53 L40 44 L29 53 L33 37 L20 28 L36 28 Z" fill="currentColor" opacity="0.85" />
            </svg>
          </div>
          <h1 className="login-title">The Batthi Royal Dynasty</h1>
          <p className="login-subtitle">Family Tree &amp; Branch Archives</p>
        </div>
      </main>
    }>
      <LoginForm />
    </Suspense>
  );
}
