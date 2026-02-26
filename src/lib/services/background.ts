// Background service for dynamic wallpapers
// Using Picsum Photos - free, no API key required

import type { TimerState } from '../types';

// Picsum image IDs for different moods (high-quality curated images)
const PICSUM_IDS = {
  IDLE: [1080, 1081, 1082, 1083, 1084],        // Minimal abstract
  WORK_TIMER: [1, 10, 100, 1000, 1001],         // Technology/code feel
  WORK_OVERTIME: [1015, 1016, 1018, 1019],      // Intense/dark
  BREAK_TIMER: [101, 102, 103, 104, 105],        // Nature/calm
  BREAK_OVERTIME: [1074, 1075, 1076, 1077],     // Fire/warning
} as const;

const getRandomId = (ids: readonly number[]): number => {
  return ids[Math.floor(Math.random() * ids.length)];
};

let currentBgUrl = '';

export async function updateBackground(state: TimerState) {
  const ids = PICSUM_IDS[state] || PICSUM_IDS.IDLE;
  const randomId = getRandomId(ids);
  
  try {
    // Use Picsum with specific ID for consistent but random images
    // Add random param to prevent caching
    const newUrl = `url('https://picsum.photos/id/${randomId}/1920/1080?random=${Date.now()}')`;
    
    if (newUrl !== currentBgUrl) {
      currentBgUrl = newUrl;
      document.body.style.backgroundImage = newUrl;
    }
  } catch (error) {
    console.error('Background update failed:', error);
    // Fallback to solid color
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = '#0a0b0c';
  }
}
