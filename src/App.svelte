<script lang="ts">
  import { onMount } from 'svelte';
  import { appState } from './lib/stores/appState.svelte';
  import { preloadAudio } from './lib/services/audio';
  import { updateBackground } from './lib/services/background';
  import Header from './lib/components/Header.svelte';
  import PenaltyBanner from './lib/components/PenaltyBanner.svelte';
  import Clock from './lib/components/Clock.svelte';
  import Actions from './lib/components/Actions.svelte';
  import Config from './lib/components/Config.svelte';
  
  onMount(() => {
    // Initialize
    appState.workSecs = appState.cfg.T_work_base * 60;
    appState.breakSecs = appState.cfg.T_short_base * 60;
    
    preloadAudio();
    updateBackground('IDLE');
    
    // Re-init Lucide icons after DOM updates
    const initLucide = () => {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };
    
    // Initial init
    setTimeout(initLucide, 100);
    
    // Watch for changes
    const observer = new MutationObserver(() => {
      initLucide();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => observer.disconnect();
  });
</script>

<div class="app">
  <Header />
  <PenaltyBanner />
  <Clock />
  <Actions />
  <Config />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: var(--bg, #0a0b0c);
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  }
  
  :global(body)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 11, 12, 0.92);
    z-index: -1;
  }
  
  /* Scanline effect */
  :global(body)::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 9999;
    opacity: 0.08;
  }
  
  .app {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100vh;
    position: relative;
  }
</style>
