// Types for FocusTimerDinamic

export type TimerState = 'IDLE' | 'WORK_TIMER' | 'WORK_OVERTIME' | 'BREAK_TIMER' | 'BREAK_OVERTIME';

export interface AppConfig {
  T_work_base: number;
  T_short_base: number;
  T_long_base: number;
  P_penalty: number;
  P_reward: number;
  N_cycle: number;
  soundEnabled: boolean;
}

export interface AudioFiles {
  [key: string]: string;
}
