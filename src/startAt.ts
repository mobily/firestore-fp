import { CollectionReference, Query } from '@firebase/firestore-types'
import { curry2 } from './internal/curry2'
import { ValuesOrSnapshot } from './internal/types'

type Acc<T> = Query<T> | CollectionReference<T>

type Curry2 = {
  <T>(valuesOrSnapshot: ValuesOrSnapshot<T>): (acc: Acc<T>) => Query<T>
  <T>(valuesOrSnapshot: ValuesOrSnapshot<T>, acc: Acc<T>): Query<T>
}

export const startAt: Curry2 = curry2(
  <T>(valuesOrSnapshot: ValuesOrSnapshot<T>, acc: Acc<T>): any => {
    return Array.isArray(valuesOrSnapshot)
      ? acc.startAt(...valuesOrSnapshot)
      : acc.startAt(valuesOrSnapshot)
  },
)
