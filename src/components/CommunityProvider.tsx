"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { currentUser, posts as seedPosts } from "@/data/demo";
import type { CommunityPost, PostKind } from "@/types/community";

type Toast = { id: string; title: string; body?: string; icon?: string };
type Notification = { id: string; title: string; body: string; href: string; read: boolean; time: string; icon: string };
type Message = { id: string; from: "me" | "them"; body: string; time: string };

type CommunityContextValue = {
  posts: CommunityPost[];
  liked: Set<string>;
  saved: Set<string>;
  friends: Set<string>;
  joinedCommunities: Set<string>;
  joinedChallenges: Set<string>;
  notifications: Notification[];
  messages: Record<string, Message[]>;
  composerOpen: boolean;
  searchOpen: boolean;
  notificationsOpen: boolean;
  toasts: Toast[];
  signedIn: boolean;
  authUsername: string | null;
  openComposer: () => void;
  closeComposer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openNotifications: () => void;
  closeNotifications: () => void;
  createPost: (content: string, kind: PostKind) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  toggleSave: (postId: string) => void;
  toggleFriend: (username: string) => Promise<void>;
  toggleCommunity: (slug: string) => Promise<void>;
  toggleChallenge: (slug: string) => Promise<void>;
  sendMessage: (username: string, body: string) => void;
  markNotificationsRead: () => void;
  notify: (title: string, body?: string, icon?: string) => void;
};

const CommunityContext = createContext<CommunityContextValue | null>(null);

const starterNotifications: Notification[] = [
  { id: "n1", title: "Achievement unlocked", body: "First Contract is waiting in your cabinet.", href: "/achievements", read: false, time: "2 min", icon: "★" },
  { id: "n2", title: "Rubber Soul liked your post", body: "That S-Rank post is getting noisy.", href: "/post/p1", read: false, time: "8 min", icon: "♥" },
  { id: "n3", title: "No-Hit Night starts tonight", body: "286 players are already in.", href: "/challenges/no-hit-night", read: true, time: "1 h", icon: "♛" }
];

const starterMessages: Record<string, Message[]> = {
  rubbersoul: [
    { id: "m1", from: "them", body: "You joining No-Hit Night or hiding behind that S-Rank?", time: "14:03" },
    { id: "m2", from: "me", body: "I am absolutely joining. Terrible decision, excellent content.", time: "14:05" }
  ],
  calixspeed: [
    { id: "m3", from: "them", body: "Found another 0.4s in phase two. Route is disgusting now.", time: "13:22" }
  ],
  jazzybean: [
    { id: "m4", from: "them", body: "I posted the lore thread. Bring a magnifying glass.", time: "Yesterday" }
  ]
};

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>(seedPosts);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [friends, setFriends] = useState<Set<string>>(new Set(["rubbersoul", "jazzybean"]));
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(["boss-strategies", "fan-art"]));
  const [joinedChallenges, setJoinedChallenges] = useState<Set<string>>(new Set(["no-hit-night"]));
  const [notifications, setNotifications] = useState<Notification[]>(starterNotifications);
  const [messages, setMessages] = useState<Record<string, Message[]>>(starterMessages);
  const [composerOpen, setComposerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [authUsername, setAuthUsername] = useState<string | null>(null);

  useEffect(() => {
    setPosts(safeRead("cupclub:posts", seedPosts));
    setLiked(new Set(safeRead<string[]>("cupclub:liked", [])));
    setSaved(new Set(safeRead<string[]>("cupclub:saved", [])));
    setFriends(new Set(safeRead<string[]>("cupclub:friends", ["rubbersoul", "jazzybean"])));
    setJoinedCommunities(new Set(safeRead<string[]>("cupclub:communities", ["boss-strategies", "fan-art"])));
    setJoinedChallenges(new Set(safeRead<string[]>("cupclub:challenges", ["no-hit-night"])));
    setNotifications(safeRead("cupclub:notifications", starterNotifications));
    setMessages(safeRead("cupclub:messages", starterMessages));

    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setSignedIn(true);
      const { data: profile } = await supabase.from("profiles").select("username").eq("id", data.user.id).maybeSingle();
      setAuthUsername(profile?.username ?? data.user.email?.split("@")[0] ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
      if (!session?.user) setAuthUsername(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const persistSet = useCallback((key: string, value: Set<string>) => {
    localStorage.setItem(key, JSON.stringify([...value]));
  }, []);

  const notify = useCallback((title: string, body = "", icon = "✦") => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, title, body, icon }]);
    window.setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3600);
  }, []);

  const createPost = useCallback(async (content: string, kind: PostKind) => {
    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    let id = `local-${Date.now()}`;

    if (auth.user) {
      const { data, error } = await supabase.from("posts").insert({
        author_id: auth.user.id,
        body: content,
        kind: kind.toLowerCase().replaceAll(" ", "_")
      }).select("id").single();
      if (!error && data?.id) id = data.id;
    }

    const next: CommunityPost = {
      id,
      author: { ...currentUser, username: authUsername || currentUser.username },
      kind,
      createdAt: "now",
      content,
      likes: 0,
      comments: 0,
      saves: 0,
      accent: kind === "Fan Art" ? "red" : kind === "Speedrun" ? "blue" : kind === "Achievement" ? "gold" : "ink"
    };
    setPosts(prev => {
      const merged = [next, ...prev];
      localStorage.setItem("cupclub:posts", JSON.stringify(merged));
      return merged;
    });
    setComposerOpen(false);
    notify("Post broadcast!", "Your post is now on the community feed.", "✒");
  }, [authUsername, notify]);

  const toggleLike = useCallback(async (postId: string) => {
    const next = new Set(liked);
    const wasLiked = next.has(postId);
    wasLiked ? next.delete(postId) : next.add(postId);
    setLiked(next); persistSet("cupclub:liked", next);

    if (/^[0-9a-f-]{36}$/i.test(postId)) {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (auth.user) {
        if (wasLiked) await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", auth.user.id);
        else await supabase.from("post_likes").insert({ post_id: postId, user_id: auth.user.id });
      }
    }
  }, [liked, persistSet]);

  const toggleSave = useCallback((postId: string) => {
    const next = new Set(saved);
    next.has(postId) ? next.delete(postId) : next.add(postId);
    setSaved(next); persistSet("cupclub:saved", next);
  }, [saved, persistSet]);

  const toggleFriend = useCallback(async (username: string) => {
    const next = new Set(friends);
    const removing = next.has(username);
    removing ? next.delete(username) : next.add(username);
    setFriends(next); persistSet("cupclub:friends", next);
    notify(removing ? "Friend removed" : "Friend added", removing ? `@${username} left your crew.` : `@${username} joined your crew.`, removing ? "×" : "♣");
  }, [friends, notify, persistSet]);

  const toggleCommunity = useCallback(async (slug: string) => {
    const next = new Set(joinedCommunities);
    const leaving = next.has(slug);
    leaving ? next.delete(slug) : next.add(slug);
    setJoinedCommunities(next); persistSet("cupclub:communities", next);
    notify(leaving ? "Community left" : "Community joined", slug.replaceAll("-", " "), "◎");
  }, [joinedCommunities, notify, persistSet]);

  const toggleChallenge = useCallback(async (slug: string) => {
    const next = new Set(joinedChallenges);
    const leaving = next.has(slug);
    leaving ? next.delete(slug) : next.add(slug);
    setJoinedChallenges(next); persistSet("cupclub:challenges", next);
    notify(leaving ? "Challenge left" : "Challenge accepted", slug.replaceAll("-", " "), "♛");
  }, [joinedChallenges, notify, persistSet]);

  const sendMessage = useCallback((username: string, body: string) => {
    if (!body.trim()) return;
    setMessages(prev => {
      const next = { ...prev, [username]: [...(prev[username] || []), { id: crypto.randomUUID(), from: "me" as const, body: body.trim(), time: "now" }] };
      localStorage.setItem("cupclub:messages", JSON.stringify(next));
      return next;
    });
  }, []);

  const markNotificationsRead = useCallback(() => {
    setNotifications(prev => {
      const next = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem("cupclub:notifications", JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false); setComposerOpen(false); setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<CommunityContextValue>(() => ({
    posts, liked, saved, friends, joinedCommunities, joinedChallenges, notifications, messages,
    composerOpen, searchOpen, notificationsOpen, toasts, signedIn, authUsername,
    openComposer: () => setComposerOpen(true), closeComposer: () => setComposerOpen(false),
    openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
    openNotifications: () => setNotificationsOpen(true), closeNotifications: () => setNotificationsOpen(false),
    createPost, toggleLike, toggleSave, toggleFriend, toggleCommunity, toggleChallenge, sendMessage, markNotificationsRead, notify
  }), [posts, liked, saved, friends, joinedCommunities, joinedChallenges, notifications, messages, composerOpen, searchOpen, notificationsOpen, toasts, signedIn, authUsername, createPost, toggleLike, toggleSave, toggleFriend, toggleCommunity, toggleChallenge, sendMessage, markNotificationsRead, notify]);

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) throw new Error("useCommunity must be used inside CommunityProvider");
  return context;
}