"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Sheet from "@/components/ui/Sheet";
import { api, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { AdminUserSummary } from "@/types/user";
import { UserStatusBadge } from "@/components/customers/StatusBadge";
import CustomerDetail from "@/components/customers/CustomerDetail";
import { DEMO_MODE } from "@/lib/demo";
import { searchMockCustomers } from "@/lib/mockData";
import PreviewNote from "@/components/ui/PreviewNote";

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const handle = setTimeout(() => {
      if (DEMO_MODE) {
        setResults(searchMockCustomers(trimmed));
        setError(null);
        return;
      }
      setLoading(true);
      api
        .get<AdminUserSummary[]>(`/admin/users?query=${encodeURIComponent(trimmed)}`)
        .then((users) => {
          setResults(users);
          setError(null);
        })
        .catch((err) => setError(err instanceof ApiError ? err.message : "Search failed."))
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(handle);
  }, [query, refreshTick]);

  return (
    <div>
      <PageHeader title="Customers" subtitle="Search for any customer to see their full profile." />

      {DEMO_MODE && (
        <PreviewNote>
          Running on sample customers for today&rsquo;s demo — try &ldquo;Amaka&rdquo;, &ldquo;Tunde&rdquo;, or &ldquo;Fatima&rdquo;.
        </PreviewNote>
      )}

      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or phone…"
          className="h-12 w-full rounded-2xl border border-border bg-surface pl-11 pr-4 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-4">
        {query.trim().length < 2 && (
          <p className="py-8 text-center text-sm text-text-light">
            Type at least 2 characters to search.
          </p>
        )}

        {error && <p className="py-4 text-sm text-accent-red">{error}</p>}

        {loading && query.trim().length >= 2 && (
          <p className="py-8 text-center text-sm text-text-light">Searching…</p>
        )}

        {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
          <p className="py-8 text-center text-sm text-text-light">No customers matched &ldquo;{query}&rdquo;.</p>
        )}

        {results.length > 0 && (
          <Card className="divide-y divide-border p-0">
            {results.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedId(user.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-bg"
              >
                <Avatar name={user.firstName} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate text-xs text-text-secondary">{user.email}</p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                  <UserStatusBadge status={user.status} />
                  <span className="text-xs text-text-light">{formatDate(user.createdAt)}</span>
                </div>
              </button>
            ))}
          </Card>
        )}
      </div>

      <Sheet open={selectedId !== null} onClose={() => setSelectedId(null)} title="Customer">
        {selectedId && (
          <CustomerDetail userId={selectedId} onStatusChanged={() => setRefreshTick((t) => t + 1)} />
        )}
      </Sheet>
    </div>
  );
}
