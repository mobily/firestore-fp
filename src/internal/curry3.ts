export function curry3<A, B, C, D>(fn: (arg0: A, arg1: B, arg2: C) => D) {
  return function curry(arg0: A, arg1?: B, arg2?: C) {
    if (arguments.length === 1) {
      return (x: B) => curry(arg0, x)
    }

    if (arguments.length === 2) {
      return (y: C) => curry(arg0, arg1, y)
    }

    return fn(arg0, arg1 as B, arg2 as C)
  }
}
