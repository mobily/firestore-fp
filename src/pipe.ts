import { Pipe } from './internal/types'

export const pipe: Pipe = (...fns: any[]): any => (x: any) => {
  return fns.reduce((v, f) => f(v), x)
}
