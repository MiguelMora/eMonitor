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
  const uid = ref('')

  function subscribe(userId) {
    if (uid.value !== userId) {
      uid.value = userId
      if (uid.value) subscribeCol('role/' + uid.value + '/event')
      else unsubscribe()
    }
  }

  return {
    path,
    documents,
    listener,
    error,
    uid,
    ids,
    docsArray,
    unsubscribe,
    subscribe,
    clearError,
    add,
    update,
  }
})
