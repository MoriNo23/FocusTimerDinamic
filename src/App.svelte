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
  
  <div class="side-panel">
    <Actions />
    <Config />
  </div>
</div>

<style>
  .app {
    width: 100%;
  }
</style>
