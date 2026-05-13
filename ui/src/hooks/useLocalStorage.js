import { ref, watch } from 'vue'

const memoryStore = new Map()

const parseValue = (value, fallback) => {
   try {
      return JSON.parse(value)
   } catch {
      return fallback
   }
}

const readValue = (key, initialValue) => {
   const normalizedKey = String(key)

   if (!memoryStore.has(normalizedKey)) {
      return initialValue
   }

   return parseValue(
      memoryStore.get(normalizedKey),
      initialValue
   )
}

/**
 * Vue composable semelhante ao useLocalStorage do React.
 *
 * @param {string} key
 * @param {any} initialValue
 */
export const useLocalStorage = (
   key,
   initialValue = null
) => {
   const normalizedKey = String(key)

   const value = ref(
      readValue(normalizedKey, initialValue)
   )

   watch(
      value,
      (newValue) => {
         try {
            memoryStore.set(
               normalizedKey,
               JSON.stringify(newValue)
            )
         } catch (err) {
            console.error(
               `[LocalStorage] Failed to save "${normalizedKey}"`,
               err
            )
         }
      },
      {
         deep: true,
         immediate: true,
      }
   )

   return value
}

/**
 * Pega valor existente sem criar estado inicial.
 *
 * @param {string} key
 */
export const getUseLocalStorage = (key) => {
   const normalizedKey = String(key)

   return ref(
      readValue(normalizedKey, null)
   )
}

/**
 * Remove valor da memória.
 *
 * @param {string} key
 */
export const clearUseLocalStorage = (key) => {
   return memoryStore.delete(String(key))
}

/**
 * Retorna todos os dados armazenados.
 */
export const getLocalStorageEntries = () => {
   return Object.fromEntries(memoryStore)
}

/**
 * Limpa tudo.
 */
export const clearAllLocalStorage = () => {
   memoryStore.clear()
}