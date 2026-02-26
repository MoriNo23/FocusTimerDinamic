// Background service for dynamic wallpapers
// Using Wallhaven API - free, no API key required (rate limited)

import { WALLHAVEN_QUERIES } from '../constants';
import type { TimerState } from '../types';

// Wallhaven API base URL
const WALLHAVEN_BASE = 'https://wallhaven.cc/api/v1/search';

const getQuery = (state: TimerState): string => {
  return WALLHAVEN_QUERIES[state] || WALLHAVEN_QUERIES.IDLE;
};

let currentBgUrl = '';
let cache: Map<string, string[]> = new Map();

async function fetchWallhavenImages(query: string): Promise<string[]> {
  // Check cache first
  if (cache.has(query)) {
    return cache.get(query)!;
  }

  try {
    // Use CORS proxy since Wallhaven doesn't allow direct browser calls
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `${WALLHAVEN_BASE}?q=${query}&sorting=random&atleast=1920x1080&purity=100`
    )}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    const images = (data.data || []).map((img: { path: string }) => img.path);
    
    // Cache the results
    if (images.length > 0) {
      cache.set(query, images);
    }
    
    return images;
  } catch (error) {
    console.error('Wallhaven fetch error:', error);
    return [];
  }
}

function getRandomImage(images: string[]): string {
  if (images.length === 0) return '';
  return images[Math.floor(Math.random() * images.length)];
}

export async function updateBackground(state: TimerState) {
  const query = getQuery(state);
  
  try {
    let images = cache.get(query);
    
    if (!images || images.length === 0) {
      images = await fetchWallhavenImages(query);
    }
    
    const imageUrl = getRandomImage(images);
    
    if (imageUrl && imageUrl !== currentBgUrl) {
      currentBgUrl = imageUrl;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
    }
  } catch (error) {
    console.error('Background update failed:', error);
    // Fallback to solid color
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = '#0a0b0c';
  }
}

// Preload backgrounds for smoother transitions
export async function preloadBackgrounds() {
  const queries = Object.values(WALLHAVEN_QUERIES);
  
  await Promise.all(
    queries.map(query => fetchWallhavenImages(query))
  );
}
