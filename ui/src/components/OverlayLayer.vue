<template>
  <div class="pointer-events-none fixed inset-0 z-30">
    <div v-for="overlay in ui.overlays" :key="overlay.name" class="absolute inset-x-0 top-16 flex justify-center px-4">
      <div class="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-xl">
        <div class="font-semibold">{{ overlay.payload?.title || overlay.name }}</div>
        <div v-if="overlay.payload?.description" class="mt-1 text-slate-300">
          {{ overlay.payload.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUIManagerStore } from '../stores/uiManager'

const ui = useUIManagerStore()
</script>
