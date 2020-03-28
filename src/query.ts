import { Piped } from './internal/types'
import { pipe } from './pipe'

export const query = (firestore: () => any): Piped => (...fns: any[]): any => {
  // @ts-ignore
  const result = pipe(firestore, ...fns)
  return result()
}
