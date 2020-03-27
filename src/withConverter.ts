import {
  DocumentReference,
  CollectionReference,
  Query,
  DocumentData,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'
import { ExtractData } from './internal/types'

type Acc = DocumentReference | CollectionReference | Query

export type DataConverter<T> = {
  fromFirestore: (data: T) => T
  toFirestore: (data: T) => DocumentData
}

type Curry2 = {
  <T extends Acc>(converter: DataConverter<ExtractData<T>>): (acc: T) => T
  <T>(converter: DataConverter<ExtractData<T>>, acc: T): T
}

export const withConverter: Curry2 = curry2(
  (converter: DataConverter<any>, acc: any): any => {
    return acc.withConverter(converter)
  },
)
