<template>
  <div v-if="ui.hudVisible" class="fixed right-4 top-4 z-10 w-72 rounded-xl border border-white/10 bg-slate-950/75 p-3 text-slate-100 shadow-xl">
    <div class="flex items-center justify-between text-xs text-slate-300">
      <span class="font-semibold uppercase tracking-wider">Arena</span>
      <span>{{ ui.hud.arena }}</span>
    </div>

    <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div class="rounded-lg bg-white/10 p-2">Kills <b class="float-right">{{ ui.hud.kills }}</b></div>
      <div class="rounded-lg bg-white/10 p-2">Deaths <b class="float-right">{{ ui.hud.deaths }}</b></div>
      <div class="rounded-lg bg-white/10 p-2">HP <b class="float-right">{{ ui.hud.health }}</b></div>
      <div class="rounded-lg bg-white/10 p-2">Armor <b class="float-right">{{ ui.hud.armor }}</b></div>
    </div>

    <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
      <div class="h-full rounded-full bg-cyan-300" :style="{ width: weightPercent }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUIManagerStore } from '../stores/uiManager'

const ui = useUIManagerStore()

const weightPercent = computed(() => {
  const maxWeight = Number(ui.hud.maxWeight || 1)
  const weight = Number(ui.hud.weight || 0)
  return `${Math.min((weight / maxWeight) * 100, 100)}%`
})
</script>
