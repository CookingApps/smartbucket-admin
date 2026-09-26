import type { LedgerTransactionType } from "@/types/admin";

// Shared between the per-customer ledger (Customers) and the all-customers
// feed (Transactions), so a transaction reads the same wherever it shows up.
export const LEDGER_TYPE_LABEL: Record<LedgerTransactionType, string> = {
  DEPOSIT: "Deposit",
  ALLOCATION: "Moved to a bucket",
  MANUAL_ALLOCATION: "Manually moved to a bucket",
  BUCKET_TRANSFER: "Moved between buckets",
  EXTERNAL_TRANSFER: "Sent to bank",
  TRANSFER_REVERSAL: "Transfer reversed",
  PENALTY: "Early-break penalty",
  FEE: "Fee",
};
