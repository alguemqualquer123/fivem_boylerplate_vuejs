import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import { debugData } from './hooks/debugData'

createApp(App).use(createPinia()).mount('#app')

debugData([
  {
    action: 'hud:update',
    data: {
      arena: 'Dev Arena',
      kills: 12,
      deaths: 3,
      ping: 42,
      fps: 120,
      weight: 9,
      maxWeight: 30
    }
  },
  {
    action: 'ui:toast',
    data: {
      title: 'Modo browser',
      description: 'Eventos NUI simulados para desenvolvimento.',
      type: 'info'
    }
  },
  {
    action: 'ui:openWindow',
    data: {
      name: 'templatePanel',
      payload: {}
    }
  }
], 500)
