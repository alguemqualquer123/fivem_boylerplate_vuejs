import { isEnvBrowser } from './isEnvBrowser'

/**
 * @typedef {Object} DebugEvent
 * @property {string} action
 * @property {any} [payload]
 * @property {any} [data]
 * @property {any} [infos]
 */

/**
 * Simula eventos NUI no browser durante desenvolvimento.
 *
 * @param {DebugEvent[]} events
 * @param {number} timer
 */
export const debugData = (events = [], timer = 1000) => {
   if (
      import.meta.env.MODE !== 'development' ||
      !isEnvBrowser()
   ) {
      return
   }

   if (!Array.isArray(events)) {
      console.error('[debugData] events must be an array')
      return
   }

   events.forEach((event, index) => {
      const timeout = timer * (index + 1)

      setTimeout(() => {
         const message = {
            action: event.action,
            payload:
               event.payload ??
               event.data ??
               event.infos ??
               null,
         }

         window.dispatchEvent(
            new MessageEvent('message', {
               data: message,
            })
         )

         console.log(
            `%c[NUI DEBUG] ${event.action}`,
            'color: #00ff99; font-weight: bold;',
            message.payload
         )
      }, timeout)
   })
}
