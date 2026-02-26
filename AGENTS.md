# Codebase Guide: FocusTimerDinamic (Svelte 5)

A dynamic Pomodoro timer with dark hacker cartoon aesthetic and smart penalty/reward system. Built with **Svelte 5 + Vite + TypeScript**.

---

## 1. Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build for production
pnpm build
```

### Tech Stack

- **Framework**: Svelte 5 with runes ($state, $derived)
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Icons**: svelte-lucide (Lucide icons)
- **Package Manager**: pnpm

---

## 2. Project Structure

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

## 3. Code Style Guidelines

### Svelte 5 Runes

Use `$state` for reactive state and `$derived` for computed values:

```typescript
// State
let count = $state(0);

// Derived
const doubled = $derived(count * 2);
```

### State Management

All state is in `src/lib/stores/appState.svelte.ts` using Svelte 5 runes:

```typescript
function createAppState() {
  let state = $state<TimerState>('IDLE');
  let workSecs = $state(1200);
  // ...
  return { /* getters/setters */ };
}

export const appState = createAppState();
```

### Components

Components are in `src/lib/components/`. Import and use:

```svelte
<script>
  import { appState } from '../stores/appState.svelte';
  import { startWork, startBreak } from '../services/timer';
</script>

<button onclick={startWork}>Start Work</button>
```

### Services

Business logic in `src/lib/services/`:

| Service | Purpose |
|---------|---------|
| `timer.ts` | Timer logic, state transitions, actions |
| `audio.ts` | Audio playback with HTML5 Audio |
| `background.ts` | Wallhaven API for dynamic backgrounds |
| `notifications.ts` | Browser notifications |

### Icons

Use svelte-lucide components:

```svelte
<script>
  import { Play, Pause, Settings } from 'svelte-lucide';
</script>

<Play size="18" />
<Pause size="18" />
<Settings size="20" />
```

---

## 4. Architecture

### State Machine

```
IDLE → WORK_TIMER → WORK_OVERTIME → BREAK_TIMER → BREAK_OVERTIME → (cycle)
         ↑              ↓              ↓              ↓
         └──────────────┴──────────────┴──────────────┘ (reset)
```

### Timer States

- `IDLE` - Initial state
- `WORK_TIMER` - Work session running
- `WORK_OVERTIME` - Work time exceeded
- `BREAK_TIMER` - Break session running
- `BREAK_OVERTIME` - Break time exceeded

### Key Functions

| Function | Purpose |
|----------|---------|
| `startWork()` | Begin work session |
| `startBreak()` | Begin break (short or long) |
| `resetSession()` | Full reset to IDLE |
| `togglePause()` | Pause with penalty tracking |
| `play(key)` | Play audio file |
| `updateBackground(state)` | Fetch Wallhaven background |

---

## 5. Configuration

Edit in `src/lib/stores/appState.svelte.ts`:

```typescript
const DEFAULT_CONFIG: AppConfig = {
  T_work_base: 20,      // minutes
  T_short_base: 4,     // minutes
  T_long_base: 15,      // minutes
  P_penalty: 0.02,     // per second
  P_reward: 0.05,      // per second
  N_cycle: 4,          // cycles before long break
  soundEnabled: true,
};
```

---

## 6. Audio System

Audio files in `public/audio/`:

- `work_start.mp3`, `work_end.mp3`
- `break_start_short.mp3`, `break_start_long.mp3`, `break_end.mp3`
- `work_overtime_10.mp3`, `work_overtime_30.mp3`, `work_overtime_tick.mp3`
- `break_overtime_10.mp3`, `break_overtime_30.mp3`, `break_overtime_60.mp3`, `break_overtime_tick.mp3`
- `penalty_warning.mp3`, `session_reset.mp3`, `tension.mp3`

Use in code:

```typescript
import { play, playOverlap } from './services/audio';

play('work_start');        // Stops current audio
playOverlap('tension');   // Overlays new audio
```

---

## 7. Dynamic Backgrounds

Wallhaven API with CORS proxy in `background.ts`:

```typescript
import { updateBackground } from './services/background';

updateBackground('WORK_TIMER'); // Fetches tech background
updateBackground('BREAK_TIMER'); // Fetches nature background
```

Queries defined in `src/lib/constants/index.ts`:

```typescript
export const WALLHAVEN_QUERIES = {
  IDLE: 'dark+minimal+abstract',
  WORK_TIMER: 'hacking+code+technology',
  WORK_OVERTIME: 'fire+danger+cyberpunk',
  BREAK_TIMER: 'nature+minimal+calm',
  BREAK_OVERTIME: 'fire+danger+warning',
};
```

---

## 8. Testing

```bash
# Development with hot reload
pnpm dev

# Production build
pnpm build
pnpm preview
```

---

Generated for MoriNo23/FocusTimerDinamic (Svelte 5 version)
