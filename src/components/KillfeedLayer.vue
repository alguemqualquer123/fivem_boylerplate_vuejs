<template>
  <div class="pointer-events-none fixed right-4 top-44 z-20 flex w-80 flex-col gap-2">
    <transition-group name="killfeed">
      <div
        v-for="entry in ui.killfeed"
        :key="entry.id"
        class="rounded-lg border border-white/10 bg-slate-950/75 px-3 py-2 text-sm text-slate-100 shadow-lg"
      >
        <span class="font-semibold text-cyan-200">{{ entry.killer }}</span>
        <span class="mx-2 text-slate-400">{{ entry.weapon }}</span>
        <span class="font-semibold text-rose-200">{{ entry.victim }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useUIManagerStore } from '../stores/uiManager'

const ui = useUIManagerStore()
</script>

<style scoped>
.killfeed-enter-active,
.killfeed-leave-active {
  transition: all 0.18s ease;
}

.killfeed-enter-from,
.killfeed-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
</style>
