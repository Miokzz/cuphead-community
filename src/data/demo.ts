import type { Achievement, CommunityPost, CommunityUser } from "@/types/community";

export const currentUser: CommunityUser = {
  id: "u-sam",
  name: "Samuel",
  username: "inkrunner",
  initials: "SR",
  level: 47,
  xp: 7340,
  title: "Perfect Contract",
  status: "online",
  customStatus: "Grinding S-Ranks 🎲",
  verified: true
};

export const users: CommunityUser[] = [
  currentUser,
  { id:"u-rubber", name:"Rubber Soul", username:"rubbersoul", initials:"RS", level:39, xp:6020, title:"Poster Artist", status:"online", customStatus:"Drawing trouble in 12 fps" },
  { id:"u-calix", name:"Calix", username:"calixspeed", initials:"CX", level:56, xp:9800, title:"Clockbreaker", status:"idle", customStatus:"Route testing" },
  { id:"u-jazzy", name:"Jazzy Bean", username:"jazzybean", initials:"JB", level:31, xp:4210, title:"Lore Keeper", status:"online", customStatus:"Reading the fine print" }
];

export const posts: CommunityPost[] = [
  { id:"p1", author:currentUser, kind:"Achievement", createdAt:"4 min", content:"Finally got the S-Rank after 37 attempts. My hands are still vibrating.", likes:284, comments:41, saves:19, accent:"gold" },
  { id:"p2", author:users[1], kind:"Fan Art", createdAt:"18 min", content:"Made a fake 1930s theater poster for tonight's community challenge. Kept the ink edges intentionally rough.", likes:821, comments:76, saves:144, accent:"red" },
  { id:"p3", author:users[2], kind:"Speedrun", createdAt:"42 min", content:"New personal best. The risky phase-two route saved 11.8 seconds, but it is absolutely cursed.", likes:473, comments:58, saves:63, accent:"blue" },
  { id:"p4", author:users[3], kind:"Guide", createdAt:"1 h", content:"I wrote a compact guide for reading boss tells without memorizing an entire flowchart. Feedback welcome.", likes:356, comments:33, saves:102, accent:"ink" }
];

export const achievements: Achievement[] = [
  { id:"a1", name:"First Contract", description:"Publish your first post.", rarity:"Common", xp:50, progress:100, icon:"✒" },
  { id:"a2", name:"Social Butterfly", description:"Add 10 friends.", rarity:"Rare", xp:200, progress:70, icon:"♣" },
  { id:"a3", name:"Ink Master", description:"Receive 1,000 likes.", rarity:"Epic", xp:450, progress:84, icon:"★" },
  { id:"a4", name:"Perfect Run", description:"Complete a legendary community challenge.", rarity:"Legendary", xp:900, progress:42, icon:"♛" }
];

export const leaderboard = [
  { rank: 1, user: users[2], score: 18440, change: 2 },
  { rank: 2, user: currentUser, score: 16780, change: 1 },
  { rank: 3, user: users[1], score: 15110, change: -1 },
  { rank: 4, user: users[3], score: 13940, change: 0 }
];