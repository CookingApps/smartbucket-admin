import { FlaskConical } from "lucide-react";

// Flags a screen (or part of one) as running on sample data because the
// backend endpoint it needs doesn't exist yet — so this never gets mistaken
// for real numbers while the panel is still being wired up.
export default function PreviewNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-start gap-2 rounded-2xl bg-tint-yellow px-4 py-3 text-sm text-text-secondary">
      <FlaskConical size={16} className="mt-0.5 flex-shrink-0 text-accent-orange" />
      <span>{children}</span>
    </div>
  );
}
