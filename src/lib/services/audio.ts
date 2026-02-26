// Audio service for playing sounds
import { AUDIO_FILES } from '../constants';
import { appState } from '../stores/appState.svelte';

const AUDIO: Record<string, HTMLAudioElement> = {};
let currentAudio: HTMLAudioElement | null = null;

export function preloadAudio() {
  Object.entries(AUDIO_FILES).forEach(([key, src]) => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    AUDIO[key] = audio;
  });
}

export function play(key: string) {
  if (!appState.cfg.soundEnabled) return;
  
  const audio = AUDIO[key];
  if (!audio) return;
  
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  audio.currentTime = 0;
  audio.play().catch(() => {});
  currentAudio = audio;
}

export function playOverlap(key: string) {
  if (!appState.cfg.soundEnabled) return;
  
  const src = AUDIO_FILES[key as keyof typeof AUDIO_FILES];
  if (!src) return;
  
  const audio = new Audio(src);
  audio.play().catch(() => {});
}
