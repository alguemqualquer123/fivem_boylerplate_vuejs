import { defineStore } from 'pinia'

export const useUIManagerStore = defineStore('uiManager', {
  state: () => ({
    hudVisible: true,
    hud: {
      arena: 'Lobby',
      kills: 0,
      deaths: 0,
      ping: 0,
      fps: 0,
      health: 100,
      armor: 0,
      weight: 0,
      maxWeight: 30
    },
    killfeed: [],
    activeWindows: [],
    activeModals: [],
    overlays: [],
    toasts: [],
    loading: false,
    nuiFocus: false,
    keepInput: false
  }),

  actions: {
    openWindow(name, payload = {}) {
      if (!name) return

      const current = this.activeWindows.find((window) => window.name === name)
      if (current) {
        current.payload = payload
      } else {
        this.activeWindows.push({ name, payload })
      }

      this.recalculateFocus()
    },

    closeWindow(name) {
      this.activeWindows = this.activeWindows.filter((window) => window.name !== name)
      this.recalculateFocus()
    },

    toggleWindow(name, payload = {}) {
      const exists = this.activeWindows.some((window) => window.name === name)
      if (exists) {
        this.closeWindow(name)
      } else {
        this.openWindow(name, payload)
      }
    },

    openModal(name, payload = {}) {
      if (!name) return
      this.activeModals.push({ id: Date.now() + Math.random(), name, payload })
      this.recalculateFocus()
    },

    closeModal(id) {
      this.activeModals = this.activeModals.filter((modal) => modal.id !== id)
      this.recalculateFocus()
    },

    closeAll() {
      this.activeWindows = []
      this.activeModals = []
      this.recalculateFocus()
    },

    showOverlay(name, payload = {}) {
      if (!name) return

      const current = this.overlays.find((overlay) => overlay.name === name)
      if (current) {
        current.payload = payload
      } else {
        this.overlays.push({ name, payload })
      }
    },

    hideOverlay(name) {
      this.overlays = this.overlays.filter((overlay) => overlay.name !== name)
    },

    pushToast(data = {}) {
      const id = Date.now() + Math.random()
      const toast = {
        id,
        title: data.title || 'Notificacao',
        description: data.description || data.message || '',
        type: data.type || 'info',
        duration: Number(data.duration || 3500)
      }

      this.toasts.unshift(toast)
      this.toasts = this.toasts.slice(0, 5)

      window.setTimeout(() => {
        this.toasts = this.toasts.filter((item) => item.id !== id)
      }, toast.duration)
    },

    pushKillfeed(entry = {}) {
      this.killfeed.unshift({
        id: Date.now() + Math.random(),
        killer: entry.killer || 'Player',
        victim: entry.victim || 'Target',
        weapon: entry.weapon || 'weapon'
      })
      this.killfeed = this.killfeed.slice(0, 6)
    },

    setHudVisible(visible) {
      this.hudVisible = !!visible
    },

    updateHud(data = {}) {
      this.hud = { ...this.hud, ...data }
    },

    setLoading(visible) {
      this.loading = !!visible
    },

    recalculateFocus() {
      this.nuiFocus = this.activeWindows.length > 0 || this.activeModals.length > 0
      this.keepInput = false
    }
  }
})
