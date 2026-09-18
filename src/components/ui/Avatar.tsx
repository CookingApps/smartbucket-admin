import Image from "next/image";
import { cn } from "@/lib/cn";

interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: number;
  className?: string;
}

// Mirrors SbAvatar: circular, tinted-green fallback with the first initial —
// same rule for what counts as "no name yet" (blank -> "?").
export default function Avatar({ name, imageUrl, size = 40, className }: AvatarProps) {
  const trimmed = name.trim();
  const initial = trimmed ? trimmed[0].toUpperCase() : "?";

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-tint-green font-medium text-primary",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}
