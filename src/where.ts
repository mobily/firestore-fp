import {
  CollectionReference,
  Query,
  FieldPath,
  WhereFilterOp,
  DocumentData,
} from '@firebase/firestore-types'

import { curry4 } from './internal/curry4'
import { ExtractData } from './internal/types'

type Acc<T> = Query<T> | CollectionReference<T>
type ValueByOperator<O, T> = O extends 'array-contains-any' | 'in' ? T[] : T
type ExtractField<T> = Extract<keyof T, string>
type ExtractValue<T, O, X> = T extends keyof X
  ? ValueByOperator<O, X[T]>
  : never

type Curry4 = {
  <T>(fieldPath: ExtractField<T>): <O extends WhereFilterOp>(
    opStr: O,
  ) => <X extends DocumentData>(
    value: ExtractValue<ExtractField<T>, O, X>,
  ) => <Z extends Acc<X>>(acc: Z) => Query<ExtractData<Z>>
  <T, O extends WhereFilterOp>(fieldPath: ExtractField<T>, opStr: O): <
    X extends DocumentData
  >(
    value: ExtractValue<ExtractField<T>, O, X>,
  ) => <Z extends Acc<X>>(acc: Z) => Query<ExtractData<Z>>
  <T, K extends keyof T, O extends WhereFilterOp>(
    fieldPath: K,
    opStr: O,
    value: ValueByOperator<O, T[K]>,
  ): (acc: Acc<T>) => Query<T>
  <T, K extends keyof T, O extends WhereFilterOp>(
    fieldPath: T,
    opStr: O,
    value: ValueByOperator<O, T[K]>,
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
