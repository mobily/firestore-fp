import {
  FirebaseFirestore,
  CollectionReference,
  DocumentReference,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'

type Acc<T> = FirebaseFirestore | DocumentReference<T>

type ExtractReference<T, X> = T extends infer U
  ? CollectionReference<U>
  : CollectionReference<X>

type Curry2 = {
  <T>(name: string): <X>(acc: Acc<X>) => ExtractReference<T, X>
  <T>(name: string, acc: Acc<T>): CollectionReference<T>
}

export const collection: Curry2 = curry2((name: any, acc: any) => {
  return acc.collection(name)
})
