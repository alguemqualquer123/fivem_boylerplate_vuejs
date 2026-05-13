<template>
  <TemplatePanel
    eyebrow="Templates"
    title="Componentes base"
    description="Ponto de partida para paineis, tabelas, status e acoes de resources FiveM."
  >
    <template #actions>
      <TemplateButton variant="neutral" @click="sendAction('refresh')">Atualizar</TemplateButton>
      <TemplateButton @click="sendAction('save')">Salvar</TemplateButton>
    </template>

    <div class="grid gap-3 md:grid-cols-4">
      <TemplateStatCard label="Online" :value="128" hint="Jogadores conectados" tone="emerald" />
      <TemplateStatCard label="Fila" :value="7" hint="Aguardando arena" tone="amber" />
      <TemplateStatCard label="Tickets" :value="3" hint="Pendentes" tone="rose" />
      <TemplateStatCard label="FPS" :value="120" hint="Cliente local" />
    </div>

    <div class="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
      <TemplateTable :columns="columns" :rows="players">
        <template #cell-status="{ value }">
          <TemplateStatusPill :label="value" :tone="value === 'online' ? 'success' : 'warning'" />
        </template>
        <template #cell-action="{ row }">
          <TemplateButton variant="neutral" @click="sendAction('inspect', row)">Ver</TemplateButton>
        </template>
      </TemplateTable>

      <TemplateEmptyState
        title="Slot livre"
        description="Use este espaco para filtros, detalhes do item selecionado ou acoes rapidas."
      >
        <TemplateButton variant="success" @click="sendAction('create')">Criar registro</TemplateButton>
      </TemplateEmptyState>
    </div>
  </TemplatePanel>
</template>

<script setup>
import TemplateButton from './TemplateButton.vue'
import TemplateEmptyState from './TemplateEmptyState.vue'
import TemplatePanel from './TemplatePanel.vue'
import TemplateStatCard from './TemplateStatCard.vue'
import TemplateStatusPill from './TemplateStatusPill.vue'
import TemplateTable from './TemplateTable.vue'
import { nuiCallback } from '../../services/nui'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nome' },
  { key: 'role', label: 'Grupo' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Acao' }
]

const players = [
  { id: 1, name: 'Player 1', role: 'Admin', status: 'online' },
  { id: 2, name: 'Player 2', role: 'Staff', status: 'online' },
  { id: 3, name: 'Player 3', role: 'VIP', status: 'ausente' }
]

const sendAction = async (action, payload = {}) => {
  await nuiCallback('template:action', { action, payload })
}
</script>
