import {
  CollectionReference,
  DocumentReference,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'
import { ExtractData } from './internal/types'

type Curry2 = {
  <T extends CollectionReference>(data: ExtractData<T>): (
    acc: T,
  ) => Promise<DocumentReference<ExtractData<T>>>
  <T>(data: T, acc: CollectionReference<T>): Promise<DocumentReference<T>>
}

export const add: Curry2 = curry2(
  <T>(data: T, acc: CollectionReference<T>): any => {
    return acc.add(data)
  },
)
