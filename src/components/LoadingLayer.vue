<template>
  <div v-if="ui.loading" class="fixed inset-0 z-[90] flex items-center justify-center bg-black/65">
    <div class="rounded-xl border border-white/10 bg-slate-950/90 px-5 py-4 text-center text-slate-100 shadow-2xl">
      <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-200 border-t-transparent" />
      <div class="mt-3 text-sm font-semibold">Carregando</div>
    </div>
  </div>
</template>

<script setup>
import { useUIManagerStore } from '../stores/uiManager'

const ui = useUIManagerStore()
</script>
