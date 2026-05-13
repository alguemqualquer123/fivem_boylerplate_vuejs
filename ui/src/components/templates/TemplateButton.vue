<template>
  <button
    type="button"
    :disabled="disabled || busy"
    class="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
    :class="classes"
  >
    <span v-if="busy" class="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  busy: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const variants = {
  primary: 'border-cyan-300/30 bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30',
  neutral: 'border-white/10 bg-white/10 text-slate-100 hover:bg-white/15',
  danger: 'border-rose-300/30 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30',
  success: 'border-emerald-300/30 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30'
}

const classes = computed(() => variants[props.variant] || variants.primary)
</script>
