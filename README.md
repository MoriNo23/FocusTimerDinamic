# FocusTimerDinamic 🔥

A dynamic Pomodoro timer with a **dark low-light hacker aesthetic** and **smart penalty/reward system** that keeps you accountable for your distractions.

![Status](https://img.shields.io/badge/status-active-success) ![License](https://img.shields.io/badge/license-MIT-blue) ![Tech](https://img.shields.io/badge/tech-Svelte%205-blue)

---

## What's FocusTimerDinamic?

FocusTimerDinamic is a **productivity timer** based on the Pomodoro Technique, but with a twist. It features a dynamic penalty system that keeps you accountable for distractions, plus a reward system for your dedication.

### The Core Concept

Traditional Pomodoro timers are passive - they just count down. FocusTimerDinamic is **dynamic**:

- **Pause = Penalty**: Every 10 seconds paused adds 1 extra second to your work timer. This prevents "fake breaks" where you check your phone and lose focus.

- **Overtime = Consequence**: If you work past your time, you earn **reward points** (+0.05% per second). If you take too long on break, your next work session gets **longer** (+0.02% per second).

- **Cycle System**: Complete 4 work sessions (configurable) to earn a long break. But don't waste it!

---

## ✨ Features

### 🧠 Smart Work Sessions
- **Customizable work time** (default: 20 minutes)
- **Pause with penalty**: Every 10 seconds paused adds 1 extra second to your work timer
- **No cheating** - get up for water or a stretch break without losing focus time

### 🌿 Intelligent Breaks
- **Short breaks** (default: 4 minutes) between work sessions
- **Long breaks** (default: 15 minutes) after completing a cycle
- **Overtime penalties**: If you take too long on break, your next work session gets longer

### 🔊 Audio Notifications
Voice alerts for:
- Work start / end
- Break start / end
- Overtime warnings (10s, 30s, 60s)
- Penalty warnings
- Session reset

### 🎨 Dynamic Backgrounds
- **Picsum Photos** integration - free, no API key required
- Curated image IDs per state (minimal, tech, nature, intense)
- Auto-changes as you progress through states

### 📊 Visual Feedback
- **Dark Low-Light Aesthetic** - optimized for monitor use
- Muted color palette (deep purple, forest green, crimson)
- CRT scanline effect for retro-hacker vibe
- Animated progress ring with phase-specific colors
- Cycle progress dots
- Real-time penalty/reward percentage display

### ⚙️ Fully Customizable
- Work duration
- Short break duration
- Long break duration
- Cycles before long break
- Penalty/Reward multipliers
- Sound on/off

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build
```

Then open `http://localhost:5173` in your browser.

---

## 🎮 How to Use

1. Click **▶ Iniciar trabajo** to start a work session
2. Focus until the timer ends
3. Take your break when prompted
4. Repeat!

### Controls
- **Iniciar trabajo**: Start a new work session
- **Pausar**: Pause timer (⚠️ adds penalty time!)
- **Reanudar**: Resume from pause
- **Iniciar break**: Begin your break (short or long)
- **Resetear**: Start over completely

---

## 🎨 Design System

### Color Palette (Low-Light Monitor Friendly)
| Variable | Hex | Usage |
|----------|-----|-------|
| `--bg` | `#0a0b0c` | Background |
| `--card-bg` | `#12131a` | Card background |
| `--text` | `#6a6d75` | Main text |
| `--work` | `#7a4a8a` | Work phase (deep purple) |
| `--brk` | `#3a6a4a` | Break phase (forest green) |
| `--danger` | `#8a3a3a` | Danger/overtime (crimson) |

### Typography
- **Font**: JetBrains Mono / Fira Code / Consolas
- Monospace for that terminal/hacker feel

### Effects
- Subtle CRT scanline overlay
- Layered shadows for depth
- Smooth state transitions

---

## 🛠️ Tech Stack

- **Svelte 5** - Reactive UI framework with runes
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **svelte-lucide** - Vector icons
- **Picsum Photos** - Free dynamic backgrounds
- **HTML5 Audio API** - Sound notifications

---

## 📁 Project Structure

```
focus-timer/
├── public/
│   └── audio/           # Voice notification files (mp3)
├── src/
│   ├── App.svelte      # Main app component
│   ├── app.css         # Global styles (dark low-light theme)
│   ├── main.ts         # Entry point
│   └── lib/
│       ├── components/ # Svelte components
│       ├── stores/     # Svelte 5 state ($state runes)
│       ├── services/   # Timer, audio, background logic
│       ├── types/      # TypeScript interfaces
│       └── constants/  # App constants
├── index.html
├── package.json
└── vite.config.ts
```

---

## 📜 License

MIT License - Feel free to use and modify!

---

Built with 🔥 by [MoriNo23](https://github.com/MoriNo23)
