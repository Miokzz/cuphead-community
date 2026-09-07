export type PostKind = "Achievement" | "Fan Art" | "Guide" | "Discussion" | "Speedrun";

export interface CommunityUser {
  id: string;
  name: string;
  username: string;
  initials: string;
  level: number;
  xp: number;
  title: string;
  status: "online" | "idle" | "offline";
  customStatus?: string;
  verified?: boolean;
}

export interface CommunityPost {
  id: string;
  author: CommunityUser;
  kind: PostKind;
  createdAt: string;
  content: string;
  likes: number;
  comments: number;
  saves: number;
  accent: "red" | "blue" | "gold" | "ink";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Secret";
  xp: number;
  progress: number;
  icon: string;
}
