import {
  DocumentReference,
  CollectionReference,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  SnapshotListenOptions,
} from '@firebase/firestore-types'

import { curry2 } from './internal/curry2'

type Acc = DocumentReference | CollectionReference | Query

type Snapshot<T> = T extends CollectionReference<infer U>
  ? QuerySnapshot<U>
  : T extends DocumentReference<infer U>
  ? QueryDocumentSnapshot<U>
  : T extends Query<infer U>
  ? QuerySnapshot<U>
  : never

interface Observer<T> {
  next: (snapshot: Snapshot<T>) => void
  error?: (error: Error) => void
  complete?: () => void
  options?: SnapshotListenOptions
}

type Curry2 = {
  <T extends Acc>(observer: Observer<T>): (acc: T) => () => void
  <T extends Acc>(observer: Observer<T>, acc: T): () => void
}

export const onSnapshot: Curry2 = curry2(
  <T extends Acc>(observer: Observer<T>, acc: T): any => {
    const { options, ...rest } = observer
    const defaultSnapshot = () =>
      // @ts-ignore
      acc.onSnapshot(rest.next, rest.error, rest.complete)

    if (options) {
      try {
        // @ts-ignore
        return acc.onSnapshot(options, rest)
      } catch (_e) {
        throw new Error("Your environment doesn't support onSnapshot options.")
      }
    }

    return defaultSnapshot()
  },
)
