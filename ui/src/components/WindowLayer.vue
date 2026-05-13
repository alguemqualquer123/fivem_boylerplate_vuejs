<template>
  <div v-if="ui.activeWindows.length" class="fixed inset-0 z-50">
    <transition-group name="window">
      <div
        v-for="window in ui.activeWindows"
        :key="window.name"
        class="absolute inset-0 flex items-center justify-center bg-black/35 p-6"
      >
        <div class="w-[min(1120px,94vw)]">
          <div class="mb-2 flex justify-end">
            <button class="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900" @click="ui.closeWindow(window.name)">
              Fechar
            </button>
          </div>

          <component :is="resolveWindow(window.name)" :payload="window.payload" />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useUIManagerStore } from '../stores/uiManager'
import { windows } from '../registry/windows'

const ui = useUIManagerStore()

const FallbackWindow = {
  props: ['payload'],
  template: '<div class="rounded-xl border border-white/10 bg-slate-950/90 p-4 text-slate-100"><div class="text-lg font-semibold">Janela sem template</div><pre class="mt-3 overflow-auto rounded bg-black/30 p-3 text-xs text-slate-300">{{ JSON.stringify(payload, null, 2) }}</pre></div>'
}

const resolveWindow = (name) => windows[name] || FallbackWindow
</script>

<style scoped>
.window-enter-active,
.window-leave-active {
  transition: all 0.18s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
