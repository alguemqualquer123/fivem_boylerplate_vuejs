<template>
  <span class="inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold" :class="classes">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'neutral' }
})

const tones = {
  neutral: 'border-white/10 bg-white/10 text-slate-200',
  success: 'border-emerald-300/30 bg-emerald-500/15 text-emerald-100',
  warning: 'border-amber-300/30 bg-amber-500/15 text-amber-100',
  danger: 'border-rose-300/30 bg-rose-500/15 text-rose-100',
  info: 'border-cyan-300/30 bg-cyan-500/15 text-cyan-100'
}

const classes = computed(() => tones[props.tone] || tones.neutral)
</script>
