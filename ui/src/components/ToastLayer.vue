<template>
  <div class="pointer-events-none fixed bottom-5 right-5 z-[80] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2">
    <transition-group name="toast">
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        class="rounded-xl border bg-slate-950/90 p-3 text-slate-100 shadow-xl"
        :class="classes[toast.type] || classes.info"
      >
        <div class="text-sm font-semibold">{{ toast.title }}</div>
        <div v-if="toast.description" class="mt-1 text-sm text-slate-300">{{ toast.description }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useUIManagerStore } from '../stores/uiManager'

const ui = useUIManagerStore()

const classes = {
  info: 'border-cyan-300/20',
  success: 'border-emerald-300/20',
  warning: 'border-amber-300/20',
  danger: 'border-rose-300/20'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.18s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
