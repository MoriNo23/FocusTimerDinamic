<script lang="ts">
  import { appState } from '../stores/appState.svelte';
  import { startWork, startBreak, resetSession, togglePause } from '../services/timer';
  import { Play, Pause, RotateCcw, Coffee, Brain } from 'svelte-lucide';
  
  const rewardPct = $derived((appState.overtimeSecs * appState.cfg.P_reward * 100).toFixed(1));
  const penaltyPct = $derived((appState.overtimeSecs * appState.cfg.P_penalty * 100).toFixed(1));
</script>

<div class="actions">
  {#if appState.state === 'IDLE'}
    <button class="btn btn--start" onclick={startWork}>
      <Play size="18" /> Iniciar trabajo
    </button>
    
  {:else if appState.state === 'WORK_TIMER'}
    <span class="waiting-label">{appState.paused ? 'Pausado' : 'Trabajando'}</span>
    <button 
      class="btn" 
      class:btn--start={appState.paused} 
      class:btn--ghost={!appState.paused}
      onclick={togglePause}
    >
      {#if appState.paused}
        <Play size="18" /> Reanudar
      {:else}
        <Pause size="18" /> Pausar
      {/if}
    </button>
    <button class="btn btn--ghost" onclick={resetSession}>
      <RotateCcw size="18" /> Resetear
    </button>
    
  {:else if appState.state === 'WORK_OVERTIME'}
    <button class="btn btn--break" onclick={startBreak}>
      <Coffee size="18" /> Iniciar break
      {#if appState.overtimeSecs > 0}
        <span class="btn__badge">+{rewardPct}%</span>
      {/if}
    </button>
    <button class="btn btn--ghost" onclick={resetSession}>
      <RotateCcw size="18" /> Resetear
    </button>
    
  {:else if appState.state === 'BREAK_TIMER'}
    <span class="waiting-label">Descansando</span>
    <button class="btn btn--ghost" onclick={resetSession}>
      <RotateCcw size="18" /> Resetear
    </button>
    
  {:else if appState.state === 'BREAK_OVERTIME'}
    <button class="btn btn--danger" onclick={startWork}>
      <Brain size="18" /> Volver a trabajar
      {#if appState.overtimeSecs > 0}
        <span class="btn__badge">+{penaltyPct}%</span>
      {/if}
    </button>
    <button class="btn btn--ghost" onclick={resetSession}>
      <RotateCcw size="18" /> Resetear
    </button>
  {/if}
</div>
