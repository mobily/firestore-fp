import {
  FirebaseFirestore,
  CollectionReference,
  DocumentReference,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'

type Acc<T> = FirebaseFirestore | DocumentReference<T>

type Curry2 = {
  <T>(name: string): (acc: Acc<T>) => CollectionReference<T>
  <T>(name: string, acc: Acc<T>): CollectionReference<T>
}

export const collection: Curry2 = curry2(
  <T>(name: string, acc: Acc<T>): any => {
    return acc.collection(name)
  },
)
