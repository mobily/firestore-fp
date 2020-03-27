import {
  DocumentReference,
  CollectionReference,
  Query,
  FirestoreDataConverter,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'
import { ExtractData } from './internal/types'

type Acc = DocumentReference | CollectionReference | Query

type Curry2 = {
  <T extends Acc>(converter: FirestoreDataConverter<ExtractData<T>>): (
    acc: T,
  ) => T
  <T>(converter: FirestoreDataConverter<ExtractData<T>>, acc: T): T
}

export const withConverter: Curry2 = curry2(
  (converter: FirestoreDataConverter<any>, acc: any): any => {
    return acc.withConverter(converter)
  },
)
