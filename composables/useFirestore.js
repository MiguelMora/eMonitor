import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

import { getDB } from '~/services/fireinit'
export const useFirestore = () => {
  const path = ref('')
  const error = ref('')

  function getCollection() {
    return collection(getDB(), path.value)
  }
  function clearError() {
    error.value = ''
  }

  function setPath(newPath) {
    path.value = newPath
  }
  /**
   *
   * @param d document
   * @returns {Promise<string>} Promise with the id
   */
  async function add(d) {
    const docRef = await addDoc(getCollection(), d)
    return docRef.id
  }

  function getDocRef(id) {
    return doc(getCollection(), id)
  }

  async function update(id, changes) {
    await updateDoc(getDocRef(id), changes)
  }

  return {
    path,
    error,
    setPath,
    clearError,
    add,
    update,
    getCollection,
    getDocRef,
  }
}
