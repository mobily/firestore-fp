import { DocumentReference } from '@firebase/firestore-types'

export const remove = <T>(acc: DocumentReference<T>) => {
  return acc.delete()
}
