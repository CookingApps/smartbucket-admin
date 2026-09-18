// Single switch for today's demo: skips the auth guard and swaps every page
// that would normally hit the real API over to in-memory sample data. Flip
// NEXT_PUBLIC_DEMO_MODE back to "false" (or delete it) to restore the real
// login + live Customers wiring — nothing built for the real backend was
// removed, just bypassed behind this flag.
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
