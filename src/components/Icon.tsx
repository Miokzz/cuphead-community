type IconName =
  | "home" | "explore" | "friends" | "rank" | "award"
  | "bell" | "search" | "plus" | "heart" | "comment"
  | "bookmark" | "arrow" | "user" | "settings";

const paths: Record<IconName, string> = {
  home: "M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3z",
  explore: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 6.5-2 5-5 2 2-5 5-2Z",
  friends: "M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 21v-2c0-3 3-5 6-5s6 2 6 5v2Zm12-7c4 0 8 2 8 6v1h-6v-2c0-2-1-4-2-5Z",
  rank: "M5 3h14v4c0 3-2 5-5 6v3h3v3H7v-3h3v-3c-3-1-5-3-5-6zm-3 2h3v2c0 2 1 3 3 4C4 11 2 9 2 5Zm20 0h-3v2c0 2-1 3-3 4 4 0 6-2 6-6Z",
  award: "M12 2a6 6 0 0 0-3 11.2L7 22l5-3 5 3-2-8.8A6 6 0 0 0 12 2Z",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 11h4a2 2 0 0 1-4 0Z",
  search: "M10.5 3a7.5 7.5 0 1 0 4.7 13.3L21 22l1-1-5.7-5.8A7.5 7.5 0 0 0 10.5 3Z",
  plus: "M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z",
  heart: "M12 21S3 15 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z",
  comment: "M4 4h16v12H9l-5 5z",
  bookmark: "M6 3h12v19l-6-4-6 4z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-5 3-7 8-7s8 2 8 7",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.5 4a8 8 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L16 3h-4l-.4 3a8 8 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a8 8 0 0 0 0 2L5.5 14.5l2 3.4 2.4-1a8 8 0 0 0 1.7 1L12 21h4l.4-3a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5a8 8 0 0 0 .1-1Z"
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill={name === "arrow" || name === "user" ? "none" : "currentColor"} stroke="currentColor" strokeWidth={name === "arrow" || name === "user" ? 1.8 : 0} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}