import { CollectionReference, Query } from '@firebase/firestore-types'
import { curry2 } from './internal/curry2'

type Curry2 = {
  (limit: number): <T>(acc: CollectionReference<T>) => Query<T>
  <T>(limit: number, acc: CollectionReference<T>): Query<T>
}

export const limit: Curry2 = curry2(
  <T>(limit: number, acc: CollectionReference<T>): any => {
    return acc.limit(limit)
  },
)
