import type { CommunityUser } from "@/types/community";

export function Avatar({ user, size = "md" }: { user: CommunityUser; size?: "sm" | "md" | "lg" }) {
  return (
    <span className={`avatar avatar-${size}`} aria-label={`${user.name} avatar`}>
      <span>{user.initials}</span>
      <i className={`presence presence-${user.status}`} />
    </span>
  );
}