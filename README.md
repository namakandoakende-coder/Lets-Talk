# 💬 Let's Talk

> A bundle-based chat app where users pay via mobile carrier bundles — and you (the owner) earn revenue every time someone activates a plan.

---

## 🚀 What It Does

**Let's Talk** is a WhatsApp-style messaging app with a built-in monetization model:

1. User opens the app and logs in with name + phone number
2. They choose a **data bundle** (charged to their mobile carrier — no card needed)
3. They can now chat, call, and send messages up to their bundle limit
4. When their bundle runs out → they're prompted to **upgrade**
5. Every bundle purchase = **revenue for you**

---

## 📱 Screens

| Screen | Description |
|--------|-------------|
| **Splash** | Animated logo on launch |
| **Login** | Name + phone number entry |
| **Bundle Selection** | 4 pricing tiers (Starter → Premium) |
| **Chat** | Full messaging UI with contacts, message bubbles, live usage bar |
| **Owner Dashboard** | Revenue stats, bundle breakdown, earnings explanation |

---

## 💰 Bundle Plans (editable in `src/data/constants.js`)

| Plan | Data | Messages | Price |
|------|------|----------|-------|
| 🌱 Starter | 500MB | 200 | $2.99/mo |
| ⚡ Basic | 1GB | 500 | $4.99/mo |
| 🔥 Standard | 3GB | 1,500 | $9.99/mo |
| 👑 Premium | 10GB | 5,000 | $19.99/mo |

---

## 🛠️ Tech Stack

- **React 18** (Create React App)
- **CSS-in-JS** inline styles + global CSS animations
- **Google Fonts** — Playfair Display + DM Sans
- No external UI libraries — fully custom components

---

## ⚡ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/lets-talk.git
cd lets-talk

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

App will open at **http://localhost:3000**

---

## 🏗️ Project Structure

```
lets-talk/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/
│   │   ├── LetsTalk.js     # Root orchestrator (screen router)
│   │   ├── SplashScreen.js # Launch screen
│   │   ├── LoginScreen.js  # Login form
│   │   ├── BundleScreen.js # Bundle selection
│   │   ├── ChatScreen.js   # Messaging UI
│   │   └── AdminDashboard.js # Owner revenue dashboard
│   ├── data/
│   │   └── constants.js    # Bundle plans, contacts, stats (edit here)
│   ├── styles/
│   │   └── global.css      # Animations + global styles
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 Customization

### Change bundle prices or limits
Edit **`src/data/constants.js`** → `BUNDLE_PLANS` array.

### Connect real carrier billing
Integrate a **Direct Carrier Billing (DCB)** API such as:
- [Boku](https://boku.com)
- [Fortumo](https://fortumo.com)
- Your local carrier's developer portal (MTN, Airtel, Zain, etc.)

### Add real authentication
Replace the login form with:
- Firebase Auth (SMS OTP)
- Supabase Auth
- Twilio Verify

### Add real messaging
Replace demo messages with:
- Firebase Realtime Database / Firestore
- Supabase Realtime
- Socket.io backend

---

## 🚢 Deploy to Production

```bash
# Build for production
npm run build

# Deploy the /build folder to:
# - Vercel: vercel deploy
# - Netlify: drag & drop /build
# - GitHub Pages: gh-pages package
```

---

## 📄 License

MIT — free to use, modify, and sell.

---

> Built with 💚 · Let's Talk
