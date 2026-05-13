<template>
  <HudLayer />
  <KillfeedLayer />
  <OverlayLayer />
  <WindowLayer />
  <ModalLayer />
  <ToastLayer />
  <LoadingLayer />
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useUIManagerStore } from './stores/uiManager'
import { nuiCallback } from './services/nui'
import HudLayer from './components/HudLayer.vue'
import KillfeedLayer from './components/KillfeedLayer.vue'
import OverlayLayer from './components/OverlayLayer.vue'
import WindowLayer from './components/WindowLayer.vue'
import ModalLayer from './components/ModalLayer.vue'
import ToastLayer from './components/ToastLayer.vue'
import LoadingLayer from './components/LoadingLayer.vue'

const ui = useUIManagerStore()

const handlers = {
  'ui:openWindow': (data) => ui.openWindow(data?.name, data?.payload),
  'ui:closeWindow': (data) => ui.closeWindow(data?.name),
  'ui:toggleWindow': (data) => ui.toggleWindow(data?.name, data?.payload),
  'ui:closeAll': () => ui.closeAll(),
  'ui:openModal': (data) => ui.openModal(data?.name, data?.payload),
  'ui:closeModal': (data) => ui.closeModal(data?.id),
  'ui:showOverlay': (data) => ui.showOverlay(data?.name, data?.payload),
  'ui:hideOverlay': (data) => ui.hideOverlay(data?.name),
  'ui:toast': (data) => ui.pushToast(data),
  'ui:setHudVisible': (data) => ui.setHudVisible(data?.visible),
  'hud:update': (data) => ui.updateHud(data),
  'killfeed:add': (data) => ui.pushKillfeed(data),
  'loading:set': (data) => ui.setLoading(data?.visible)
}

const onMessage = (event) => {
  const action = event?.data?.action
  const data = event?.data?.data ?? event?.data?.payload ?? event?.data?.infos ?? {}
  const fn = handlers[action]
  if (fn) fn(data)
}

const onKeydown = async (event) => {
  if (event.key !== 'Escape') return

  if (ui.nuiFocus) {
    ui.closeAll()
    await nuiCallback('ui:escape')
  }
}

watch(
  () => [ui.nuiFocus, ui.keepInput],
  ([hasFocus, keepInput]) => {
    nuiCallback('ui:focus', {
      hasFocus,
      hasCursor: hasFocus,
      keepInput
    }).catch((err) => console.error('[NUI] focus callback failed', err))
  }
)

onMounted(async () => {
  window.addEventListener('message', onMessage)
  window.addEventListener('keydown', onKeydown)

  await nuiCallback('ui:ready').catch((err) => {
    console.error('[NUI] ready callback failed', err)
  })
})

onUnmounted(() => {
  window.removeEventListener('message', onMessage)
  window.removeEventListener('keydown', onKeydown)
})
</script>
