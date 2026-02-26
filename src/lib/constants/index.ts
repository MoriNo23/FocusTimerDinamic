// Audio files mapping
export const AUDIO_FILES = {
  work_start: '/audio/work_start.mp3',
  break_start_short: '/audio/break_start_short.mp3',
  break_start_long: '/audio/break_start_long.mp3',
  work_end: '/audio/work_end.mp3',
  break_end: '/audio/break_end.mp3',
  work_overtime_10: '/audio/work_overtime_10.mp3',
  work_overtime_30: '/audio/work_overtime_30.mp3',
  work_overtime_tick: '/audio/work_overtime_tick.mp3',
  break_overtime_10: '/audio/break_overtime_10.mp3',
  break_overtime_30: '/audio/break_overtime_30.mp3',
  break_overtime_60: '/audio/break_overtime_60.mp3',
  break_overtime_tick: '/audio/break_overtime_tick.mp3',
  penalty_warning: '/audio/penalty_warning.mp3',
  session_reset: '/audio/session_reset.mp3',
  tension: '/audio/tension.mp3',
} as const;

// Wallhaven API queries for dynamic backgrounds
export const WALLHAVEN_QUERIES = {
  IDLE: 'dark+minimal+abstract',
  WORK_TIMER: 'hacking+code+technology',
  WORK_OVERTIME: 'fire+danger+cyberpunk',
  BREAK_TIMER: 'nature+minimal+calm',
  BREAK_OVERTIME: 'fire+danger+warning',
} as const;

// Phase icons mapping
export const PHASE_ICONS = {
  IDLE: 'coffee',
  WORK_TIMER: 'brain',
  WORK_OVERTIME: 'alert-triangle',
  BREAK_TIMER: 'leaf',
  BREAK_OVERTIME: 'flame',
} as const;

// State labels
export const STATE_LABELS = {
  IDLE: 'Listo',
  WORK_TIMER: 'Trabajando',
  WORK_OVERTIME: 'Overtime !!',
  BREAK_TIMER: 'Descansando',
  BREAK_OVERTIME: 'Overtime !!',
} as const;
