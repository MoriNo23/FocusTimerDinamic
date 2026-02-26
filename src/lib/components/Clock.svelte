<script lang="ts">
  import { appState } from '../stores/appState.svelte';
  import { fmt } from '../services/timer';
  import { Coffee, Brain, TriangleAlert, Flame, Leaf } from 'svelte-lucide';
  import { STATE_LABELS } from '../constants';
  
  // Computed
  const isOvertime = $derived(appState.state === 'WORK_OVERTIME' || appState.state === 'BREAK_OVERTIME');
  const isWorkOvertime = $derived(appState.state === 'WORK_OVERTIME');
  
  const phase = $derived(() => {
    if (appState.state === 'IDLE') return 'idle';
    if (appState.state === 'WORK_TIMER') return appState.paused ? 'paused' : 'work';
    if (appState.state === 'BREAK_TIMER') return 'break';
    return 'overtime';
  });
  
  const displayTime = $derived(() => {
    if (appState.state === 'IDLE') return fmt(appState.cfg.T_work_base * 60);
    if (appState.state === 'WORK_TIMER') return fmt(appState.workSecs);
    if (appState.state === 'BREAK_TIMER') return fmt(appState.breakSecs);
    return fmt(appState.overtimeSecs);
  });
  
  const ringProgress = $derived(() => {
    if (appState.state === 'IDLE') return 0;
    if (isOvertime) return 1;
    if (appState.state === 'WORK_TIMER') {
      const total = appState.cfg.T_work_base * 60;
      return total > 0 ? 1 - (appState.workSecs / total) : 0;
    }
    if (appState.state === 'BREAK_TIMER') {
      const total = appState.breakSecs || appState.cfg.T_short_base * 60;
      return total > 0 ? 1 - (appState.breakSecs / total) : 0;
    }
    return 0;
  });
  
  const ringColor = $derived(() => {
    if (isOvertime) return 'var(--danger, #8a3a3a)';
    if (appState.state === 'WORK_TIMER') return 'var(--work, #7a4a8a)';
    if (appState.state === 'BREAK_TIMER') return 'var(--brk, #3a6a4a)';
    return 'rgba(106, 109, 117, 0.4)';
  });
  
  const sublabel = $derived(() => {
    if (appState.state === 'IDLE') return '';
    if (appState.state === 'WORK_TIMER') return appState.paused ? '⏸ Pausado (Penalizando...)' : 'Enfócate';
    if (appState.state === 'WORK_OVERTIME') return '¡Pasaste el tiempo!';
    const isLong = (appState.cycleCount % appState.cfg.N_cycle) === (appState.cfg.N_cycle - 1);
    if (appState.state === 'BREAK_TIMER') return isLong ? 'Break largo' : 'Break corto';
    if (appState.state === 'BREAK_OVERTIME') return '¡Volvé al trabajo!';
    return '';
  });
  
  const overtimePct = $derived(() => {
    if (isWorkOvertime) {
      return (appState.overtimeSecs * appState.cfg.P_reward * 100).toFixed(1);
    }
    return (appState.overtimeSecs * appState.cfg.P_penalty * 100).toFixed(1);
  });
  
  const CIRC = 565.49;
</script>

<div class="card clock-card" data-phase={phase()}>
  <!-- State Pill + Icon -->
  <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
    <div class="state-pill" data-state={appState.state}>
      <span class="state-pill__dot"></span>
      <span>{appState.paused && appState.state === 'WORK_TIMER' ? 'Pausado' : STATE_LABELS[appState.state]}</span>
    </div>
    <div class="phase-icon" class:bounce={appState.state === 'WORK_TIMER' || appState.state === 'BREAK_TIMER'}>
      {#if appState.state === 'IDLE'}
        <Coffee size="20" />
      {:else if appState.state === 'WORK_TIMER'}
        <Brain size="20" />
      {:else if appState.state === 'WORK_OVERTIME'}
        <TriangleAlert size="20" />
      {:else if appState.state === 'BREAK_TIMER'}
        <Leaf size="20" />
      {:else if appState.state === 'BREAK_OVERTIME'}
        <Flame size="20" />
      {/if}
    </div>
  </div>

  <!-- Ring + Time -->
  <div class="ring-wrapper">
    <div class="ring-pulse-el" class:active={isOvertime}></div>
    <div class="ring-bg-circle"></div>
    <svg class="ring-svg" viewBox="0 0 200 200" width="210" height="210">
      <circle class="ring-track" cx="100" cy="100" r="90" />
      <circle 
        class="ring-progress" 
        cx="100" cy="100" r="90"
        stroke={ringColor()}
        stroke-dasharray={CIRC}
        stroke-dashoffset={CIRC * (1 - ringProgress())} 
      />
    </svg>
    <div class="clock-face">
      <div class="clock-time" class:overtime={isOvertime}>{displayTime()}</div>
      <div class="clock-sublabel">{sublabel()}</div>
    </div>
  </div>

  <!-- Overtime Chip -->
  <div 
    class="overtime-chip" 
    class:visible={isOvertime}
    style="background: {isWorkOvertime ? 'var(--brk)' : 'var(--danger)'}"
  >
    <span class="overtime-chip__pct">+{overtimePct()}%</span>
    <span class="overtime-chip__note">{isWorkOvertime ? 'recompensa' : 'penalización'}</span>
  </div>

  <!-- Modifier Bar -->
  <div class="modifier-bar" class:visible={isOvertime} style="width:100%;max-width:280px">
    <div class="modifier-bar__header">
      <span>{isWorkOvertime ? 'Recompensa' : 'Penalización'} acumulada</span>
      <span style="color: {isWorkOvertime ? 'var(--brk)' : 'var(--danger)'}">+{overtimePct()}%</span>
    </div>
    <div class="modifier-bar__track">
      <div 
        class="modifier-bar__fill" 
        style="width: {Math.min((appState.overtimeSecs / 120) * 100, 100)}%; background: {isWorkOvertime ? 'var(--brk)' : 'var(--danger)'}"
      ></div>
    </div>
  </div>
</div>
