<template>
  <section class="overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl">
    <header class="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
      <div class="min-w-0">
        <p v-if="eyebrow" class="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          {{ eyebrow }}
        </p>
        <h2 class="truncate text-lg font-semibold text-white">
          {{ title }}
        </h2>
        <p v-if="description" class="mt-1 max-w-2xl text-sm text-slate-300">
          {{ description }}
        </p>
      </div>

      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </header>

    <div class="p-4">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>
