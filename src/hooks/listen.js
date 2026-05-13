import { onMounted, onUnmounted, shallowRef, watch } from 'vue'

const eventListeners = new Map()

const eventListener = (event) => {
   const { action, payload, infos, data } = event.data || {}

   if (!action) return

   const handlers = eventListeners.get(action)

   if (!handlers) return

   const responseData = payload ?? infos ?? data

   handlers.forEach((handler) => {
      try {
         handler(responseData)
      } catch (err) {
         console.error(`[NUI] Error on action "${action}"`, err)
      }
   })
}

if (typeof window !== 'undefined') {
   window.addEventListener('message', eventListener)
}

export function listen(action, handler) {
   const handlerRef = shallowRef(handler)

   watch(
      () => handler,
      (newHandler) => {
         handlerRef.value = newHandler
      }
   )

   const wrapper = (data) => {
      if (typeof handlerRef.value === 'function') {
         handlerRef.value(data)
      }
   }

   onMounted(() => {
      const handlers = eventListeners.get(action) || []

      if (!handlers.includes(wrapper)) {
         handlers.push(wrapper)
         eventListeners.set(action, handlers)
      }
   })

   onUnmounted(() => {
      const handlers = eventListeners.get(action)

      if (!handlers) return

      const filtered = handlers.filter(
         (stored) => stored !== wrapper
      )

      if (filtered.length <= 0) {
         eventListeners.delete(action)
         return
      }

      eventListeners.set(action, filtered)
   })
}