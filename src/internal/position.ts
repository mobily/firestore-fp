import {
  DocumentSnapshot,
  CollectionReference,
  Query,
} from '@firebase/firestore-types'

import { curry2 } from './curry2'

type ValuesOrSnapshot<T> = any[] | DocumentSnapshot<T>

type Curry2 = {
  <T>(valuesOrSnapshot: ValuesOrSnapshot<T>): (
    acc: CollectionReference<T>,
  ) => Query<T>
  <T>(
    valuesOrSnapshot: ValuesOrSnapshot<T>,
    acc: CollectionReference<T>,
  ): Query<T>
}

export const position: (
  factory: (acc: CollectionReference<any>) => any,
) => Curry2 = factory =>
  curry2(
    <T>(
      valuesOrSnapshot: ValuesOrSnapshot<T>,
      acc: CollectionReference<T>,
    ): any => {
      const fn = factory(acc)
      return Array.isArray(valuesOrSnapshot)
        ? fn(...valuesOrSnapshot)
        : fn(valuesOrSnapshot)
    },
  )
