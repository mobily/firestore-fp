import { DocumentReference } from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'
import { ExtractData } from './internal/types'

type Curry2 = {
  <T extends DocumentReference>(data: Partial<ExtractData<T>>): (
    acc: T,
  ) => Promise<void>
  <T>(data: Partial<T>, acc: DocumentReference<T>): Promise<void>
}

export const update: Curry2 = curry2(
  <T>(data: Partial<T>, acc: DocumentReference<T>): any => {
    return acc.update(data)
  },
)
