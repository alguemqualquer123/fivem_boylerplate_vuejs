import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({ selectedPlayer: null, logs: [] })
})
