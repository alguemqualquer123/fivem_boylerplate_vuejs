<template>
  <div v-if="ui.activeModals.length" class="fixed inset-0 z-[70]">
    <transition-group name="modal">
      <div
        v-for="modal in ui.activeModals"
        :key="modal.id"
        class="absolute inset-0 flex items-center justify-center bg-black/60 p-4"
      >
        <div class="w-[min(520px,92vw)] rounded-xl border border-white/10 bg-slate-950 p-4 text-slate-100 shadow-2xl">
          <component :is="resolveModal(modal.name)" :payload="modal.payload" :modal-id="modal.id" />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useUIManagerStore } from '../stores/uiManager'
import { modals } from '../registry/modals'

const ui = useUIManagerStore()

const FallbackModal = {
  props: ['payload', 'modalId'],
  setup() {
    return { ui }
  },
  template: '<div><div class="text-lg font-semibold">Modal</div><pre class="mt-3 overflow-auto rounded bg-black/30 p-3 text-xs text-slate-300">{{ JSON.stringify(payload, null, 2) }}</pre><div class="mt-4 flex justify-end"><button class="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15" @click="ui.closeModal(modalId)">Fechar</button></div></div>'
}

const resolveModal = (name) => modals[name] || FallbackModal
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.18s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
