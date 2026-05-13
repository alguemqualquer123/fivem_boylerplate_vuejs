<template>
  <div class="rounded-lg border border-white/10 bg-white/[0.04] p-3">
    <div class="flex items-center justify-between gap-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ label }}</span>
      <span class="h-2 w-2 rounded-full" :class="dotClass" />
    </div>
    <div class="mt-2 text-2xl font-semibold text-white">{{ value }}</div>
    <div v-if="hint" class="mt-1 text-xs text-slate-400">{{ hint }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  hint: { type: String, default: '' },
  tone: { type: String, default: 'cyan' }
})

const tones = {
  cyan: 'bg-cyan-300',
  emerald: 'bg-emerald-300',
  amber: 'bg-amber-300',
  rose: 'bg-rose-300'
}

const dotClass = computed(() => tones[props.tone] || tones.cyan)
</script>
