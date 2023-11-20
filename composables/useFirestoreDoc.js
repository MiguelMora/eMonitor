import { onSnapshot } from 'firebase/firestore'
import { ref } from 'vue'

import { useFirestore } from '~/composables/useFirestore'
export const useFirestoreDoc = () => {
  const {
    path,
    error,
    clearError,
    add: _add,
    setPath: _setPath,
    update: _update,
    getDocRef,
  } = useFirestore()

  const doc = ref()
  const id = ref()
  const listener = ref()

  function unsubscribe() {
    if (listener.value) {
      listener.value()
      listener.value = undefined
      doc.value = undefined
      clearError()
    }
  }

  function onDocChange(snapshot) {
    doc.value = snapshot.exists ? snapshot.data() : undefined
  }

  function getRef() {
    return getDocRef(id.value)
  }

  function subscribe() {
    // si ha cambiado hay que dejar de escuchar primero
    if (listener.value) {
      unsubscribe()
    }
    clearError()
    if (path.value && id.value) {
      listener.value = onSnapshot(getRef(), onDocChange, (err) => {
        error.value = err.message
        // err.code contiene los códigos de error: https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
      })
    }
  }

  async function add(doc) {
    const ref = await _add(doc)
    setId(ref.id)
  }

  async function update(changes) {
    await _update(id.value, changes)
  }

  function setPath(newPath) {
    if (path.value !== newPath) {
      _setPath(newPath)
      if (listener.value) {
        unsubscribe()
        subscribe()
      }
    }
  }

  function setId(newId) {
    if (id.value !== newId) {
      id.value = newId
      if (listener.value) {
        unsubscribe()
        subscribe()
      }
    }
  }

  return {
    path,
    listener,
    error,
    doc,
    id,
    subscribe,
    unsubscribe,
    clearError,
    add,
    update,
    setId,
    setPath,
  }
}
