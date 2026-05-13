<template>
  <div class="overflow-hidden rounded-lg border border-white/10">
    <table class="w-full table-fixed border-collapse text-left text-sm">
      <thead class="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
        <tr>
          <th v-for="column in columns" :key="column.key" class="px-3 py-2 font-semibold">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/10">
        <tr v-for="row in rows" :key="row[idKey]" class="bg-slate-950/30">
          <td v-for="column in columns" :key="column.key" class="truncate px-3 py-2 text-slate-200">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="rows.length === 0" class="px-3 py-8 text-center text-sm text-slate-400">
      {{ emptyLabel }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  idKey: { type: String, default: 'id' },
  emptyLabel: { type: String, default: 'Nenhum registro encontrado.' }
})
</script>
