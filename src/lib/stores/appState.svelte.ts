// Global app state using Svelte 5 $state runes
import type { AppConfig, TimerState } from '../types';

// Default configuration
const DEFAULT_CONFIG: AppConfig = {
  T_work_base: 20,
  T_short_base: 4,
  T_long_base: 15,
  P_penalty: 0.02,
  P_reward: 0.05,
  N_cycle: 4,
  soundEnabled: true,
};

// Reactive state using $state rune
function createAppState() {
  let state = $state<TimerState>('IDLE');
  let workSecs = $state(DEFAULT_CONFIG.T_work_base * 60);
  let breakSecs = $state(DEFAULT_CONFIG.T_short_base * 60);
  let overtimeSecs = $state(0);
  let cycleCount = $state(0);
  let penaltyLocked = $state(false);
  let paused = $state(false);
  let pauseSecs = $state(0);
  let configOpen = $state(false);
  let bgUrl = $state('');
  
  // Audio flags
  let playedOT10 = $state(false);
  let playedOT30 = $state(false);
  let playedOT60 = $state(false);

  // Config
  let cfg = $state<AppConfig>({ ...DEFAULT_CONFIG });

  return {
    get state() { return state; },
    set state(v) { state = v; },
    get workSecs() { return workSecs; },
    set workSecs(v) { workSecs = v; },
    get breakSecs() { return breakSecs; },
    set breakSecs(v) { breakSecs = v; },
    get overtimeSecs() { return overtimeSecs; },
    set overtimeSecs(v) { overtimeSecs = v; },
    get cycleCount() { return cycleCount; },
    set cycleCount(v) { cycleCount = v; },
    get penaltyLocked() { return penaltyLocked; },
    set penaltyLocked(v) { penaltyLocked = v; },
    get paused() { return paused; },
    set paused(v) { paused = v; },
    get pauseSecs() { return pauseSecs; },
    set pauseSecs(v) { pauseSecs = v; },
    get configOpen() { return configOpen; },
    set configOpen(v) { configOpen = v; },
    get bgUrl() { return bgUrl; },
    set bgUrl(v) { bgUrl = v; },
    get playedOT10() { return playedOT10; },
    set playedOT10(v) { playedOT10 = v; },
    get playedOT30() { return playedOT30; },
    set playedOT30(v) { playedOT30 = v; },
    get playedOT60() { return playedOT60; },
    set playedOT60(v) { playedOT60 = v; },
    get cfg() { return cfg; },
    set cfg(v) { cfg = v; },
  };
}

export const appState = createAppState();
