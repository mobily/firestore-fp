import {
  CollectionReference,
  DocumentReference,
} from '@firebase/firestore-types'

export const listDocuments = <T>(
  acc: CollectionReference<T>,
): Promise<DocumentReference<T>[]> => {
  const casted = (acc as unknown) as any

  if (!casted.listDocuments) {
    throw Error('Only available in node env!')
  }

  // https://github.com/googleapis/nodejs-firestore/blob/master/types/firestore.d.ts#L1214
  return casted.listDocuments()
}
