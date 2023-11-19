import {getDB} from "~/services/fireinit";
import {onSnapshot, collection, addDoc, doc, updateDoc} from 'firebase/firestore'
export const useFirestoreCollection = () => {
  const path = ref('')
  const documents = ref({})
  const listener = ref()
  const error = ref('')

  function unsubscribe(){
    if (listener.value) {
        listener.value()
        listener.value = undefined
        documents.value = {}
        path.value = ''
        error.value = ''
    }
  }
  function getCollection(){
    return collection(getDB(), path.value)
  }
  function onSnapshotChange(change) {
    const {type, doc} = change
    if (type === "added" || type === "modified") {
      documents.value[doc.id] = doc.data()
    }
    if (type === "removed") {
      delete documents.value[doc.id]
    }
  }
  function subscribe(newPath) {
    // si ha cambiado hay que dejar de escuchar primero
    if (path.value!==newPath){
      unsubscribe()
      clearError()
      path.value = newPath
      if (newPath) {
        listener.value = onSnapshot(
          getCollection(),
          (snapshot) => {
            snapshot.docChanges().forEach(onSnapshotChange);
          },
          (err) => {
            error.value = err.message
            // err.code contiene los códigos de error: https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
          })
      }
    }
  }
  function clearError() {
    error.value = ''
  }

  /**
   *
   * @param d document
   * @returns {Promise<string>} Promise with the id
   */
  async function add(d){
    const docRef = await addDoc(getCollection(), d)
    return docRef.id
  }

  function getDocRef(id){
    return doc(getCollection(), id)
  }

  async function update(id, changes){
    await updateDoc(getDocRef(id), changes)
  }

  return { ids, loading, toLoad, error, items, setIds, clearError }
}
