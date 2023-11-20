import { defineStore } from 'pinia'
import { useFirestoreCollection } from '~/composables/useFirestoreCollection'

export const useEventStore = defineStore('event', () => {
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

  function subscribe() {
    subscribeCol('event')
  }

  return {
    path,
    documents,
    listener,
    error,
    ids,
    docsArray,
    unsubscribe,
    subscribe,
    clearError,
    add,
    update,
  }
})
