# FocusTimerDinamic 🔥

A Pomodoro timer with soul. Stay focused, avoid distractions, and earn rewards for your dedication.

---

## The Problem

Regular Pomodoro apps just count down. They don't care if you:
- Pause to check your phone (and lose focus)
- Scroll through social media during "breaks"
- Never actually finish what you started

## The Solution

FocusTimerDinamic makes you **accountable** for your time:

| Action | Consequence |
|--------|-------------|
| Pause during work | +1 second added per 10s paused |
| Overtime on work | Earn **reward points** (+0.05%/sec) |
| Overtime on break | Your next work session gets **longer** (+0.02%/sec) |
| Complete cycle | Long break earned |

---

## Features

### 🎯 Smart Timer
- Default 20 min work sessions
- Short breaks (4 min) between sessions
- Long breaks (15 min) after 4 cycles

### ⚡ Accountability System
- **Pause penalty**: No fake breaks - every pause costs you
- **Overtime rewards**: Working late earns you points
- **Break penalties**: Wasting break time makes next work harder

### 🔊 Voice Alerts
- "Work session started"
- "Break time"
- "Overtime warning"
- "Session complete"

### 🎨 Beautiful Dark Theme
- Low-light optimized colors (easy on eyes)
- Dynamic backgrounds that match your mood
- CRT-style scanline effect
- Smooth animations

---

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173` and start focusing.

---

## How to Use

1. Click **▶ Iniciar trabajo**
2. Focus until timer ends
3. Take your break when prompted
4. Repeat until cycle complete

### Controls
| Button | Action |
|--------|--------|
| Iniciar trabajo | Start work session |
| Pausar | Pause (adds penalty!) |
| Reanudar | Resume work |
| Iniciar break | Start break |
| Resetear | Start over |

---

## Why This Works

The key insight: **most Pomodoro apps treat all time equally**. But 10 seconds of checking Instagram isn't the same as 10 seconds stretching.

FocusTimerDinamic:
- Makes **pause time costly** so you only pause for real needs
- Rewards **overtime work** (you get points)
- Penalizes **wasted break time** (next session harder)

It's not about being strict - it's about being honest with yourself.

---

## Credits

Built with 🔥 by [MoriNo23](https://github.com/MoriNo23)

Inspired by the Pomodoro Technique
