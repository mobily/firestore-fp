import {
  DocumentReference,
  CollectionReference,
  Query,
  DocumentData,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'
import { ExtractData } from './internal/types'

type Acc = DocumentReference | CollectionReference | Query

type ExtractReference<T, X> = T extends CollectionReference
  ? CollectionReference<X>
  : T extends DocumentReference
  ? DocumentReference<X>
  : T extends Query
  ? Query<X>
  : never

export type DataConverter<T, X> = {
  fromFirestore: (data: T) => X
  toFirestore: (data: T) => DocumentData
}

type Curry2 = {
  <T extends Acc, X>(converter: DataConverter<ExtractData<T>, X>): (
    acc: T,
  ) => ExtractReference<T, X>
  <T, X>(converter: DataConverter<ExtractData<T>, X>, acc: T): ExtractReference<
    T,
    X
  >
}

export const withConverter: Curry2 = curry2(
  (converter: DataConverter<any, any>, acc: any): any => {
    return acc.withConverter(converter)
  },
)
