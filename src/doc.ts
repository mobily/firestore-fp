import {
  CollectionReference,
  DocumentReference,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'

type Curry2 = {
  (id: string): <T>(acc: CollectionReference<T>) => DocumentReference<T>
  <T>(id: string, acc: CollectionReference<T>): DocumentReference<T>
}

export const doc: Curry2 = curry2(
  <T>(id: string | undefined, acc: CollectionReference<T>): any => {
    return id ? acc.doc(id) : acc.doc()
  },
)
