import {
  CollectionReference,
  Query,
  FieldPath,
  WhereFilterOp,
} from '@firebase/firestore-types'

import { curry4 } from './internal/curry4'

type Acc<T> = Query<T> | CollectionReference<T>

type Curry4 = {
  (fieldPath: string | FieldPath): (
    opStr: WhereFilterOp,
  ) => (value: any) => <T>(acc: Acc<T>) => Query<T>
  (fieldPath: string | FieldPath, opStr: WhereFilterOp): (
    value: any,
  ) => <T>(acc: Acc<T>) => Query<T>
  (fieldPath: string | FieldPath, opStr: WhereFilterOp, value: any): <T>(
    acc: Acc<T>,
  ) => Query<T>
  <T>(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: any,
    acc: Acc<T>,
  ): Query<T>
}

export const where: Curry4 = curry4(
  <T>(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: any,
    acc: Acc<T>,
  ): any => {
    return acc.where(fieldPath, opStr, value)
  },
)
