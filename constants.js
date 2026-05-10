// ─── Bundle Plans ────────────────────────────────────────────────────────────
// Edit prices, data amounts, and message limits here
export const BUNDLE_PLANS = [
  {
    id: "starter",
    name: "Starter",
    data: "500MB",
    price: 2.99,
    color: "#00C9A7",
    messages: 200,
    emoji: "🌱",
  },
  {
    id: "basic",
    name: "Basic",
    data: "1GB",
    price: 4.99,
    color: "#4F8EF7",
    messages: 500,
    emoji: "⚡",
  },
  {
    id: "standard",
    name: "Standard",
    data: "3GB",
    price: 9.99,
    color: "#A855F7",
    messages: 1500,
    emoji: "🔥",
  },
  {
    id: "premium",
    name: "Premium",
    data: "10GB",
    price: 19.99,
    color: "#F59E0B",
    messages: 5000,
    emoji: "👑",
  },
];

// ─── Demo Contacts ────────────────────────────────────────────────────────────
export const DEMO_CONTACTS = [
  { id: 1, name: "Amara K.", avatar: "AK", status: "online",  lastMsg: "See you at 5!",    time: "2m",  unread: 2, color: "#00C9A7" },
  { id: 2, name: "Dev Group 🚀", avatar: "DG", status: "online",  lastMsg: "Push the build!", time: "10m", unread: 5, color: "#4F8EF7" },
  { id: 3, name: "Malik J.", avatar: "MJ", status: "away",    lastMsg: "Thanks man 🙏",    time: "1h",  unread: 0, color: "#A855F7" },
  { id: 4, name: "Zara H.", avatar: "ZH", status: "offline", lastMsg: "Call me later",     time: "3h",  unread: 0, color: "#F59E0B" },
  { id: 5, name: "Family 💛", avatar: "FA", status: "online",  lastMsg: "Dinner Sunday?",   time: "5h",  unread: 1, color: "#EF4444" },
];

// ─── Demo Messages ────────────────────────────────────────────────────────────
export const DEMO_MESSAGES = [
  { id: 1, from: "them", text: "Hey! Did you get the bundle deal?",               time: "10:02 AM" },
  { id: 2, from: "me",   text: "Yeah just activated the Standard plan! 3GB 🔥",   time: "10:03 AM" },
  { id: 3, from: "them", text: "Nice! We've been using Lets Talk all day",         time: "10:05 AM" },
  { id: 4, from: "them", text: "The calls are so clear too 📞",                   time: "10:05 AM" },
  { id: 5, from: "me",   text: "I know right! Way better than before",             time: "10:07 AM" },
];

// ─── Auto-reply pool (demo) ───────────────────────────────────────────────────
export const AUTO_REPLIES = [
  "Sounds great! 😄",
  "On my way!",
  "LOL 😂",
  "Let me check...",
  "Agreed!",
  "👍👍",
  "Can't wait!",
];

// ─── Owner Dashboard Stats (replace with real API data) ──────────────────────
export const OWNER_STATS = {
  totalUsers:    12847,
  activeToday:   3241,
  totalRevenue:  89432.50,
  bundlesSold:   18923,
  topBundle:     "Standard",
  growth:        "+18.4%",
  // Per-bundle user counts (index matches BUNDLE_PLANS order)
  bundleUserCounts: [38, 62, 89, 41],
};
