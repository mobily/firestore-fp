import { DocumentReference } from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'
import { ExtractData } from './internal/types'

type Curry2 = {
  <T extends DocumentReference>(data: ExtractData<T>): (acc: T) => Promise<void>
  <T>(data: T, acc: DocumentReference<T>): Promise<void>
}

export const set: Curry2 = curry2(
  <T>(data: T, acc: DocumentReference<T>): any => {
    return acc.set(data)
  },
)
