"use client";

import { useState } from "react";
import { FileBarChart2, ShieldAlert } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PreviewNote from "@/components/ui/PreviewNote";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Sheet from "@/components/ui/Sheet";
import CustomerDetail from "@/components/customers/CustomerDetail";
import { formatNaira, formatDateTime } from "@/lib/format";
import {
  MOCK_CUSTOMERS,
  MOCK_LIMITS,
  getMockCustomer,
  getMockFlaggedTransactions,
  getAllMockLedgerEntries,
  clearMockFlag,
} from "@/lib/mockData";

export default function RiskPage() {
  const [limitInput, setLimitInput] = useState(String(MOCK_LIMITS.dailyTransferLimitKobo / 100));
  const [savedLimit, setSavedLimit] = useState(MOCK_LIMITS.dailyTransferLimitKobo);
  const [saved, setSaved] = useState(false);
  const [flags, setFlags] = useState(getMockFlaggedTransactions());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reportState, setReportState] = useState<"idle" | "loading" | "ready">("idle");

  const saveLimit = () => {
    const naira = Number(limitInput.replace(/,/g, ""));
    if (!Number.isFinite(naira) || naira <= 0) return;
    MOCK_LIMITS.dailyTransferLimitKobo = Math.round(naira * 100);
    setSavedLimit(MOCK_LIMITS.dailyTransferLimitKobo);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const dismissFlag = (id: string) => {
    clearMockFlag(id);
    setFlags(getMockFlaggedTransactions());
  };

  const generateReport = () => {
    setReportState("loading");
    setTimeout(() => setReportState("ready"), 900);
  };

  const allEntries = getAllMockLedgerEntries();
  const totalVolumeKobo = allEntries.reduce((sum, e) => sum + Math.abs(e.amount), 0);
  const verifiedCount = MOCK_CUSTOMERS.filter((c) => c.identityStatus === "VERIFIED").length;

  return (
    <div>
      <PageHeader
        title="Risk & Compliance"
        subtitle="The controls expected of any Nigerian fintech handling real money."
      />

      <PreviewNote>
        Running on sample data for today&rsquo;s demo — limits, flags, and the report below
        aren&rsquo;t backed by real endpoints yet. The layout and the actions are final; only
        the numbers behind them are illustrative.
      </PreviewNote>

      <Card className="p-5">
        <h2 className="text-sm font-medium text-text">Daily transfer limit</h2>
        <p className="mt-1 text-xs text-text-secondary">
          The most any one customer can move out in a day, before it needs a manual look.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-light">
              ₦
            </span>
            <input
              value={limitInput}
              onChange={(e) => setLimitInput(e.target.value)}
              inputMode="numeric"
              className="h-11 w-full rounded-2xl border border-border bg-surface pl-8 pr-4 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <Button onClick={saveLimit}>Save</Button>
          {saved && <span className="text-xs font-medium text-primary">Saved</span>}
        </div>
        <p className="mt-2 text-xs text-text-light">Currently {formatNaira(savedLimit)} per day.</p>
      </Card>

      <div className="mt-5">
        <h2 className="mb-3 text-base font-medium text-text">Flagged transactions</h2>
        {flags.length === 0 ? (
          <Card className="py-8 text-center text-sm text-text-light">Nothing flagged right now.</Card>
        ) : (
          <Card className="divide-y divide-border p-0">
            {flags.map((flag) => {
              const customer = getMockCustomer(flag.customerId);
              return (
                <div key={flag.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-tint-red">
                    <ShieldAlert size={16} className="text-accent-red" />
                  </div>
                  <button
                    onClick={() => customer && setSelectedId(customer.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="text-sm font-medium text-text">
                      {customer ? `${customer.firstName} ${customer.lastName}` : "Unknown customer"} ·{" "}
                      {formatNaira(flag.amountKobo)}
                    </p>
                    <p className="text-xs text-text-secondary">{flag.reason}</p>
                    <p className="mt-0.5 text-xs text-text-light">{formatDateTime(flag.createdAt)}</p>
                  </button>
                  <Badge tone={flag.severity === "high" ? "red" : "orange"}>
                    {flag.severity === "high" ? "High" : "Medium"}
                  </Badge>
                  <Button variant="text" onClick={() => dismissFlag(flag.id)}>
                    Dismiss
                  </Button>
                </div>
              );
            })}
          </Card>
        )}
      </div>

      <div className="mt-5">
        <h2 className="mb-3 text-base font-medium text-text">Compliance report</h2>
        <Card className="p-5">
          {reportState !== "ready" ? (
            <>
              <p className="text-sm text-text-secondary">
                A snapshot of customers, verification, and money moved — the kind of summary
                a bank partner or regulator would ask for.
              </p>
              <Button
                icon={<FileBarChart2 size={16} />}
                onClick={generateReport}
                loading={reportState === "loading"}
                className="mt-3"
              >
                Generate report
              </Button>
            </>
          ) : (
            <div>
              <p className="mb-3 text-sm font-medium text-text">Report ready — {new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ReportStat label="Customers" value={MOCK_CUSTOMERS.length.toLocaleString()} />
                <ReportStat label="Verified" value={verifiedCount.toLocaleString()} />
                <ReportStat label="Transactions" value={allEntries.length.toLocaleString()} />
                <ReportStat label="Volume moved" value={formatNaira(totalVolumeKobo)} />
              </div>
              <Button variant="text" onClick={() => setReportState("idle")} className="mt-3 px-0">
                Generate another
              </Button>
            </div>
          )}
        </Card>
      </div>

      <Sheet open={selectedId !== null} onClose={() => setSelectedId(null)} title="Customer">
        {selectedId && <CustomerDetail userId={selectedId} onStatusChanged={() => {}} />}
      </Sheet>
    </div>
  );
}

function ReportStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-bg p-3">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="mt-1 text-sm font-medium text-text">{value}</p>
    </div>
  );
}
