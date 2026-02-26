<script lang="ts">
  import { Crosshair } from 'svelte-lucide';
  import { appState } from '../stores/appState.svelte';
  
  // Computed values
  const cyclePosition = $derived(() => {
    if (appState.cycleCount === 0) return 0;
    const pos = appState.cycleCount % appState.cfg.N_cycle;
    return pos === 0 ? appState.cfg.N_cycle : pos;
  });
</script>

<header class="header">
  <div class="header__left">
    <h1 class="header__title">
      <Crosshair class="header-icon" size="24" /> 
      Focus<span>Timer</span>
    </h1>
    <p class="header__sub">Sistema dinámico</p>
  </div>
  <div class="cycle-row">
    <span class="cycle-label">Ciclo</span>
    <div class="cycle-dots">
      {#each Array(appState.cfg.N_cycle) as _, i}
        {@const pos = cyclePosition()}
        <div 
          class="cycle-dot"
          class:active={i + 1 <= pos}
          class:long-break={i + 1 === appState.cfg.N_cycle && pos === appState.cfg.N_cycle}
        ></div>
      {/each}
    </div>
  </div>
</header>
