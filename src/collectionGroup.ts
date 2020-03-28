import { FirebaseFirestore, Query } from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'

type Curry2 = {
  <T>(name: string): (acc: FirebaseFirestore) => Query<T>
  <T>(name: string, acc: FirebaseFirestore): Query<T>
}

export const collectionGroup: Curry2 = curry2((name: any, acc: any) => {
  return acc.collectionGroup(name)
})
