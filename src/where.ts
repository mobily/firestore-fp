import {
  CollectionReference,
  Query,
  FieldPath,
  WhereFilterOp,
} from '@firebase/firestore-types'

import { curry4 } from './internal/curry4'

type Acc<T> = Query<T> | CollectionReference<T>

type Curry4 = {
  <T>(fieldPath: Extract<keyof T, string>): (
    opStr: WhereFilterOp,
  ) => <K extends keyof T>(value: T[K]) => <X>(acc: Acc<X & T>) => Query<X>
  <T>(fieldPath: Extract<keyof T, string>, opStr: WhereFilterOp): <
    K extends keyof T
  >(
    value: T[K],
  ) => <X>(acc: Acc<X & T>) => Query<X>
  <T, K extends keyof T>(fieldPath: K, opStr: WhereFilterOp, value: T[K]): (
    acc: Acc<T>,
  ) => Query<T>
  <T, K extends keyof T>(
    fieldPath: T,
    opStr: WhereFilterOp,
    value: T[K],
    acc: Acc<T>,
  ): Query<T>
}

export const where: Curry4 = curry4(
  (
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: any,
    acc: Acc<any>,
  ): any => {
    return acc.where(fieldPath, opStr, value)
  },
)
