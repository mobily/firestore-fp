import {
  CollectionReference,
  DocumentReference,
  Query,
  DocumentSnapshot,
  QuerySnapshot,
} from '@firebase/firestore-types'

type Acc = CollectionReference | DocumentReference | Query

type Snapshot<T> = T extends DocumentReference<infer U>
  ? Promise<DocumentSnapshot<U>>
  : T extends CollectionReference<infer U>
  ? Promise<QuerySnapshot<U>>
  : T extends Query<infer U>
  ? Promise<QuerySnapshot<U>>
  : never

export const get = <T extends Acc>(acc: T): Snapshot<T> => {
  return acc.get() as any
}
