import {
  CollectionReference,
  Query,
  FieldPath,
  OrderByDirection,
} from '@firebase/firestore-types'

import { curry3 } from './internal/curry3'

type Acc<T> = Query<T> | CollectionReference<T>

type Curry3 = {
  (fieldPath: string | FieldPath): (
    directionStr: OrderByDirection,
  ) => <T>(acc: Acc<T>) => Query<T>
  (fieldPath: string | FieldPath, directionStr: OrderByDirection): <T>(
    acc: Acc<T>,
  ) => Query<T>
  <T>(
    fieldPath: string | FieldPath,
    directionStr: OrderByDirection,
    acc: Acc<T>,
  ): Query<T>
}

export const orderBy: Curry3 = curry3(
  <T>(
    fieldPath: string | FieldPath,
    directionStr: OrderByDirection,
    acc: Acc<T>,
  ): any => {
    return acc.orderBy(fieldPath, directionStr)
  },
)
