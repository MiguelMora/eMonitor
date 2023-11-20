import { defineStore } from 'pinia'
import { useFirestoreDoc } from '~/composables/useFirestoreDoc'

export const useUserDataStore = defineStore('userData', () => {
  const {
    path,
    listener,
    error,
    doc,
    id,
    subscribe,
    unsubscribe,
    clearError,
    update,
    setId,
    setPath,
  } = useFirestoreDoc()

  setPath('role')

  const rol = computed(() => doc.value?.rol || '')

  return {
    path,
    listener,
    error,
    doc,
    id,
    rol,
    unsubscribe,
    subscribe,
    clearError,
    update,
    setId,
  }
})
