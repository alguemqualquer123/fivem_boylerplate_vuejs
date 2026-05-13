import { onMounted, onUnmounted, shallowRef, watch } from 'vue'

const noop = () => {}

/**
 * @typedef {Object} NuiMessageData
 * @property {string} action
 * @property {any} payload
 * @property {any} data
 * @property {any} infos
 */

/**
 * Vue composable para ouvir eventos NUI.
 *
 * @param {string} action
 * @param {(data:any)=>void} handler
 */
export const useNuiEvent = (action, handler) => {
   const savedHandler = shallowRef(handler || noop)

   watch(
      () => handler,
      (newHandler) => {
         savedHandler.value = newHandler || noop
      }
   )

   const eventListener = (event) => {
      const message = event.data

      if (!message || typeof message !== 'object') {
         return
      }

      const {
         action: eventAction,
         payload,
         data,
         infos,
      } = message

      if (eventAction !== action) {
         return
      }

      try {
         savedHandler.value(
            payload ?? data ?? infos
         )
      } catch (err) {
         console.error(
            `[NUI EVENT ERROR] ${action}`,
            err
         )
      }
   }

   onMounted(() => {
      window.addEventListener(
         'message',
         eventListener
      )
   })

   onUnmounted(() => {
      window.removeEventListener(
         'message',
         eventListener
      )
   })
}