import { defineStore } from 'pinia'
import { useFirestoreCollection } from '~/composables/useFirestoreCollection'

export const useRoleStore = defineStore('role', () => {
  const {
    path,
    documents,
    listener,
    error,
    ids,
    docsArray,
    unsubscribe,
    subscribe: subscribeCol,
    clearError,
    add,
    update,
  } = useFirestoreCollection()

  const roles = ref(['Admin', 'Faculty', 'User'])
  function subscribe() {
    subscribeCol('role')
  }

  return {
    path,
    documents,
    listener,
    error,
    roles,
    ids,
    docsArray,
    unsubscribe,
    subscribe,
    clearError,
    add,
    update,
  }
})
