"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl bg-primary-dark px-8 pt-9 pb-8 text-center">
          <Image
            src="/logo.png"
            alt="SmartBucket"
            width={56}
            height={56}
            className="mx-auto rounded-2xl bg-white p-1.5"
          />
          <h1 className="mt-4 text-xl font-medium text-white">SmartBucket Admin</h1>
          <p className="mt-1 text-sm text-tint-green">Sign in to manage the business</p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@smartbucket.ng"
              className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 w-full rounded-2xl border border-border bg-surface px-4 pr-11 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-tint-red px-4 py-3 text-sm text-accent-red">{error}</div>
          )}

          <Button type="submit" loading={loading} className="mt-2 w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
