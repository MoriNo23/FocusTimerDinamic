<script lang="ts">
  import { appState } from '../stores/appState.svelte';
  import { TriangleAlert } from 'svelte-lucide';
</script>

{#if appState.penaltyLocked}
  <div class="penalty-banner">
    <TriangleAlert size="20" class="penalty-banner__icon" />
    <div class="penalty-banner__text">
      Penalización activa — config bloqueada
      <small>Completa el bloque de trabajo o reinicia para desbloquear</small>
    </div>
  </div>
{/if}
