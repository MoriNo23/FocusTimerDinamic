# Codebase Guide: FocusTimerDinamic (Svelte 5)

A dynamic Pomodoro timer with dark hacker cartoon aesthetic and smart penalty/reward system. Built with **Svelte 5 + Vite + TypeScript**.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build for production
pnpm build
```

### Deploy

**Recommended: Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Import repo `MoriNo23/FocusTimerDinamic`
3. Auto-detects Svelte + Vite
4. Build: `pnpm build`
5. Output: `dist`

---

## 📁 Project Structure

```
focus-timer/
├── public/
│   └── audio/           # Audio files (mp3)
├── src/
│   ├── App.svelte      # Main app component
│   ├── app.css         # Global styles
│   ├── main.ts         # Entry point
│   └── lib/
│       ├── components/ # Svelte components
│       │   ├── Header.svelte
│       │   ├── Clock.svelte
│       │   ├── Actions.svelte
│       │   ├── Config.svelte
│       │   └── PenaltyBanner.svelte
│       ├── stores/      # Svelte 5 state
│       │   └── appState.svelte.ts
│       ├── services/    # Business logic
│       │   ├── audio.ts
│       │   ├── background.ts
│       │   ├── notifications.ts
│       │   └── timer.ts
│       ├── types/       # TypeScript types
│       │   └── index.ts
│       └── constants/   # App constants
│           └── index.ts
├── index.html
├── package.json
├── vite.config.ts
├── svelte.config.js
└── tsconfig.json
```

---

## 🎯 Core Concept

FocusTimerDinamic is a **dynamic Pomodoro timer** with penalty/reward system:

- **Pause = Penalty**: Every 10s paused adds 1s to work timer
- **Work Overtime = Reward**: +0.05% per second (good!)
- **Break Overtime = Penalty**: +0.02% per second (next work session gets longer)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Svelte 5 | UI framework with runes ($state, $derived) |
| TypeScript | Type safety |
| Vite 7 | Build tool |
| svelte-lucide | Icons |
| Wallhaven API | Dynamic backgrounds |
| HTML5 Audio | Sound notifications |

---

## 💻 Development

### Svelte 5 Runes

```typescript
// State
let count = $state(0);

// Derived
const doubled = $derived(count * 2);
```

### State Management

All state in `src/lib/stores/appState.svelte.ts`:

```typescript
function createAppState() {
  let state = $state<TimerState>('IDLE');
  let workSecs = $state(1200);
  // ...
}

export const appState = createAppState();
```

### Components

```svelte
<script>
  import { appState } from '../stores/appState.svelte';
  import { startWork, startBreak } from '../services/timer';
</script>

<button onclick={startWork}>Start Work</button>
```

### Services

| Service | Purpose |
|---------|---------|
| `timer.ts` | Timer logic, state transitions |
| `audio.ts` | Audio playback |
| `background.ts` | Wallhaven API |
| `notifications.ts` | Browser notifications |

### Icons

```svelte
<script>
  import { Play, Pause, Settings } from 'svelte-lucide';
</script>

<Play size="18" />
```

---

## 🏗️ Architecture

### State Machine

```
IDLE → WORK_TIMER → WORK_OVERTIME → BREAK_TIMER → BREAK_OVERTIME → (cycle)
         ↑              ↓              ↓              ↓
         └──────────────┴──────────────┴──────────────┘ (reset)
```

### Timer States

- `IDLE` - Initial state
- `WORK_TIMER` - Work session running
- `WORK_OVERTIME` - Work time exceeded (reward!)
- `BREAK_TIMER` - Break session running
- `BREAK_OVERTIME` - Break time exceeded (penalty!)

---

## ⚙️ Configuration

Edit in `src/lib/stores/appState.svelte.ts`:

```typescript
const DEFAULT_CONFIG: AppConfig = {
  T_work_base: 20,      // minutes
  T_short_base: 4,     // minutes
  T_long_base: 15,      // minutes
  P_penalty: 0.02,    // per second (break overtime)
  P_reward: 0.05,      // per second (work overtime)
  N_cycle: 4,          // cycles before long break
  soundEnabled: true,
};
```

---

## 🔊 Audio System

Files in `public/audio/`:

| Event | File |
|-------|------|
| Work start | `work_start.mp3` |
| Work end | `work_end.mp3` |
| Break short | `break_start_short.mp3` |
| Break long | `break_start_long.mp3` |
| Break end | `break_end.mp3` |
| Work OT 10s | `work_overtime_10.mp3` |
| Work OT 30s | `work_overtime_30.mp3` |
| Work OT tick | `work_overtime_tick.mp3` |
| Break OT 10s | `break_overtime_10.mp3` |
| Break OT 30s | `break_overtime_30.mp3` |
| Break OT 60s | `break_overtime_60.mp3` |
| Break OT tick | `break_overtime_tick.mp3` |
| Penalty warning | `penalty_warning.mp3` |
| Session reset | `session_reset.mp3` |
| Tension | `tension.mp3` |

Usage:

```typescript
import { play, playOverlap } from './services/audio';

play('work_start');        // Stops current audio
playOverlap('tension');   // Overlays new audio
```

---

## 🖼️ Dynamic Backgrounds

Wallhaven API in `background.ts`:

```typescript
import { updateBackground } from './services/background';

updateBackground('WORK_TIMER');
updateBackground('BREAK_TIMER');
```

Queries in `src/lib/constants/index.ts`:

```typescript
export const WALLHAVEN_QUERIES = {
  IDLE: 'dark+minimal+abstract',
  WORK_TIMER: 'hacking+code+technology',
  WORK_OVERTIME: 'fire+danger+cyberpunk',
  BREAK_TIMER: 'nature+minimal+calm',
  BREAK_OVERTIME: 'fire+danger+warning',
};
```

Uses CORS proxy: `https://api.allorigins.win/raw?url=`

---

## 🎨 Styles

CSS variables in `src/app.css`:

```css
:root {
  --bg: #1a1b1e;
  --work: #cc5de8;
  --brk: #51cf66;
  --danger: #ff6b6b;
}
```

---

## 📱 Responsive Design (Dual System)

The app uses a **Dual Design Strategy** to provide a native-like experience on all devices:

- **Mobile/Tablet (< 1024px)**: Single-column vertical layout (`flex`). Focus on one element at a time.
- **Laptop/PC (≥ 1025px)**: Dashboard-style grid layout. Giant clock on the left (`grid-area: clock`), control station side-panel on the right (`grid-area: side`).

Key responsive values in `app.css`:
- Max width for desktop: `1600px`.
- Side panel width: `480px`.
- Clock scaling: Uses `min(vw, rem)` for fluid growth without overlapping headers.


Generated for MoriNo23/FocusTimerDinamic

---

## ⚡ RULES

### CSS Editing
For CSS edits always use:
```typescript
task(category="visual-engineering", load_skills=["frontend-ui-ux"], ...)
```

### Code Review
Before completing any task, always run:
```bash
npx @biomejs/biome check src/
```
Fix lint errors with: `npx @biomejs/biome check --write src/`

### Git Commits
When committing changes, follow conventional commits:
```bash
git add . && git commit -m "type: description"
```
Types: feat, fix, refactor, docs, style, test, chore

---

## CSS Skill
For CSS edits always use: task(category="visual-engineering", load_skills=["frontend-ui-ux"])
Generated for MoriNo23/FocusTimerDinamic
