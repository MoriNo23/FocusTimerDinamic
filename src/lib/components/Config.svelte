<script lang="ts">
  import { appState } from '../stores/appState.svelte';
  import { fmt } from '../services/timer';
  import { requestNotificationPermission } from '../services/notifications';
  import { Settings, Lock, ChevronDown, Volume2, VolumeX, Bell, Clock, Coffee } from 'svelte-lucide';
  
  const canConfig = $derived(appState.state === 'IDLE' && !appState.penaltyLocked);
</script>

<div>
  <div class="config-toggle" onclick={() => appState.configOpen = !appState.configOpen}>
    <div class="config-toggle__title">
      <Settings size="18" /> Configuración
    </div>
    <div class="config-toggle__right">
      {#if !canConfig && appState.state !== 'IDLE'}
        <span class="lock-badge">
          <Lock size="14" /> bloqueado
        </span>
      {/if}
      <span class="chevron" class:open={appState.configOpen}>
        <ChevronDown size="20" />
      </span>
    </div>
  </div>

  <div class="config-body" class:open={appState.configOpen}>
    <div class="config-grid">
      <div class="config-field">
        <label>Trabajo base (min)</label>
        <input 
          type="number" 
          bind:value={appState.cfg.T_work_base} 
          min="1" max="120" 
          disabled={!canConfig}
          onchange={() => appState.workSecs = appState.cfg.T_work_base * 60}
        />
      </div>
      <div class="config-field">
        <label>Break corto (min)</label>
        <input 
          type="number" 
          bind:value={appState.cfg.T_short_base} 
          min="1" max="60" 
          disabled={!canConfig}
          onchange={() => appState.breakSecs = appState.cfg.T_short_base * 60}
        />
      </div>
      <div class="config-field">
        <label>Break largo (min)</label>
        <input 
          type="number" 
          bind:value={appState.cfg.T_long_base} 
          min="1" max="120" 
          disabled={!canConfig}
        />
      </div>
      <div class="config-field">
        <label>Ciclos p/ break largo</label>
        <input 
          type="number" 
          bind:value={appState.cfg.N_cycle} 
          min="2" max="10" 
          disabled={!canConfig}
        />
      </div>
      <div class="config-field">
        <label>Recompensa (%/seg)</label>
        <input 
          type="number" 
          bind:value={appState.cfg.P_reward} 
          min="0" max="1" step="0.001" 
          disabled={!canConfig}
        />
      </div>
      <div class="config-field">
        <label>Penalización (%/seg)</label>
        <input 
          type="number" 
          bind:value={appState.cfg.P_penalty} 
          min="0" max="1" step="0.001" 
          disabled={!canConfig}
        />
      </div>
    </div>

    <div class="audio-controls">
      <button 
        class="btn btn--ghost" 
        class:active={appState.cfg.soundEnabled}
        onclick={() => appState.cfg.soundEnabled = !appState.cfg.soundEnabled}
      >
        {#if appState.cfg.soundEnabled}
          <Volume2 size="18" /> Sonido activo
        {:else}
          <VolumeX size="18" /> Sonido mute
        {/if}
      </button>
      <button class="btn btn--ghost notif-btn" onclick={requestNotificationPermission}>
        <Bell size="18" /> Notificaciones
      </button>
    </div>

    <div class="config-computed">
      <div class="computed-item">
        <span><Clock size="16" /> Trabajo actual</span>
        <span class="computed-item__value">{fmt(appState.workSecs || appState.cfg.T_work_base * 60)}</span>
      </div>
      <div class="computed-item">
        <span><Coffee size="16" /> Break actual</span>
        <span class="computed-item__value">{fmt(appState.breakSecs || appState.cfg.T_short_base * 60)}</span>
      </div>
    </div>
  </div>
</div>
