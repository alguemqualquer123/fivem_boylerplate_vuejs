<template>
  <div class="rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-4 py-8 text-center">
    <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-slate-200">
      {{ initials }}
    </div>
    <div class="mt-3 text-sm font-semibold text-white">{{ title }}</div>
    <p v-if="description" class="mx-auto mt-1 max-w-md text-sm text-slate-400">{{ description }}</p>
    <div v-if="$slots.default" class="mt-4 flex justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
})

const initials = computed(() => props.title.slice(0, 2).toUpperCase())
</script>
