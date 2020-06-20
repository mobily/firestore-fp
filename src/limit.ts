import { CollectionReference, Query } from '@firebase/firestore-types'
import { curry2 } from './internal/curry2'

type Acc<T> = Query<T> | CollectionReference<T>

type Curry2 = {
  (limit: number): <T>(acc: Acc<T>) => Query<T>
  <T>(limit: number, acc: Acc<T>): Query<T>
}

export const limit: Curry2 = curry2(<T>(limit: number, acc: Acc<T>): any => {
  return acc.limit(limit)
})
