// Background service for Wallhaven API
import { WALLHAVEN_QUERIES } from '../constants';
import type { TimerState } from '../types';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

let currentBgUrl = '';

export async function updateBackground(state: TimerState) {
  const query = WALLHAVEN_QUERIES[state] || WALLHAVEN_QUERIES.IDLE;
  
  try {
    const apiUrl = `https://wallhaven.cc/api/v1/search?q=${query}&sorting=random&atleast=1920x1080&purity=100`;
    const response = await fetch(CORS_PROXY + encodeURIComponent(apiUrl));
    const data = await response.json();
    
    if (data.data && data.data[0] && data.data[0].path) {
      const newUrl = `url('${data.data[0].path}')`;
      if (newUrl !== currentBgUrl) {
        currentBgUrl = newUrl;
        // Apply directly to body
        document.body.style.backgroundImage = newUrl;
      }
    }
  } catch (error) {
    console.error('Background fetch failed:', error);
  }
}
