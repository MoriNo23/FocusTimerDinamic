// Timer logic service
import { appState } from '../stores/appState.svelte';
import { play, playOverlap } from './audio';
import { updateBackground } from './background';
import type { TimerState } from '../types';

let timerInterval: ReturnType<typeof setInterval> | null = null;

export function startInterval() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(tick, 1000);
}

export function stopInterval() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function tick() {
  const state = appState.state;
  
  if (state === 'WORK_TIMER') {
    if (appState.paused) {
      appState.pauseSecs++;
      if (appState.pauseSecs % 10 === 0) {
        appState.workSecs++;
      }
    } else {
      if (appState.workSecs > 0) {
        appState.workSecs--;
        if (appState.workSecs === 0 && appState.penaltyLocked) {
          appState.penaltyLocked = false;
        }
      } else {
        appState.state = 'WORK_OVERTIME';
        play('work_end');
        updateBackground('WORK_OVERTIME');
      }
    }
  } else if (state === 'WORK_OVERTIME') {
    appState.overtimeSecs++;
    handleWorkOvertimeAudio();
  } else if (state === 'BREAK_TIMER') {
    if (appState.breakSecs > 0) {
      appState.breakSecs--;
    } else {
      appState.state = 'BREAK_OVERTIME';
      play('break_end');
      updateBackground('BREAK_OVERTIME');
    }
  } else if (state === 'BREAK_OVERTIME') {
    appState.overtimeSecs++;
    handleBreakOvertimeAudio();
  }
}

function handleWorkOvertimeAudio() {
  if (appState.overtimeSecs === 10 && !appState.playedOT10) {
    play('work_overtime_10');
    appState.playedOT10 = true;
  } else if (appState.overtimeSecs === 30 && !appState.playedOT30) {
    play('work_overtime_30');
    appState.playedOT30 = true;
  } else if (appState.overtimeSecs > 30 && appState.overtimeSecs % 30 === 0) {
    play('work_overtime_tick');
  }
}

function handleBreakOvertimeAudio() {
  if (appState.overtimeSecs === 10 && !appState.playedOT10) {
    play('break_overtime_10');
    appState.playedOT10 = true;
  } else if (appState.overtimeSecs === 30 && !appState.playedOT30) {
    play('break_overtime_30');
    appState.playedOT30 = true;
  } else if (appState.overtimeSecs === 60 && !appState.playedOT60) {
    play('break_overtime_60');
    appState.playedOT60 = true;
  } else if (appState.overtimeSecs > 60 && appState.overtimeSecs % 30 === 0) {
    play('break_overtime_tick');
  } else if (appState.overtimeSecs === 20) {
    playOverlap('tension');
  }
}

// Actions
export function togglePause() {
  if (appState.state !== 'WORK_TIMER') return;
  appState.paused = !appState.paused;
}

export function startWork() {
  if (appState.state === 'BREAK_OVERTIME' && appState.overtimeSecs > 0) {
    const factor = 1 + (appState.overtimeSecs * appState.cfg.P_penalty);
    appState.workSecs = Math.round(appState.cfg.T_work_base * 60 * factor);
    appState.penaltyLocked = true;
    playOverlap('penalty_warning');
  } else {
    appState.workSecs = appState.cfg.T_work_base * 60;
    appState.penaltyLocked = false;
  }
  
  appState.overtimeSecs = 0;
  resetOTFlags();
  appState.state = 'WORK_TIMER';
  play('work_start');
  startInterval();
  updateBackground('WORK_TIMER');
}

export function startBreak() {
  const fromOvertime = appState.state === 'WORK_OVERTIME';
  const isLong = (appState.cycleCount % appState.cfg.N_cycle) === (appState.cfg.N_cycle - 1);
  const baseMin = isLong ? appState.cfg.T_long_base : appState.cfg.T_short_base;
  const baseSec = baseMin * 60;

  if (fromOvertime && appState.overtimeSecs > 0) {
    appState.breakSecs = Math.round(baseSec * (1 + appState.overtimeSecs * appState.cfg.P_reward));
  } else {
    appState.breakSecs = baseSec;
  }

  appState.cycleCount++;
  appState.overtimeSecs = 0;
  resetOTFlags();
  appState.state = 'BREAK_TIMER';

  if (isLong) {
    play('break_start_long');
  } else {
    play('break_start_short');
  }

  startInterval();
  updateBackground('BREAK_TIMER');
}

export function resetSession() {
  stopInterval();
  appState.state = 'IDLE';
  appState.paused = false;
  appState.pauseSecs = 0;
  appState.workSecs = appState.cfg.T_work_base * 60;
  appState.breakSecs = appState.cfg.T_short_base * 60;
  appState.overtimeSecs = 0;
  appState.cycleCount = 0;
  appState.penaltyLocked = false;
  resetOTFlags();
  play('session_reset');
  updateBackground('IDLE');
}

function resetOTFlags() {
  appState.playedOT10 = false;
  appState.playedOT30 = false;
  appState.playedOT60 = false;
}

// Helper functions
export function fmt(seconds: number): string {
  seconds = Math.max(0, Math.round(seconds));
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
