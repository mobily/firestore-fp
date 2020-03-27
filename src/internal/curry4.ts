export function curry4<A, B, C, D, E>(
  fn: (arg0: A, arg1: B, arg2: C, arg3: D) => E,
) {
  return function curry(arg0: A, arg1?: B, arg2?: C, arg3?: D) {
    if (arguments.length === 1) {
      return (x: B) => curry(arg0, x)
    }

    if (arguments.length === 2) {
      return (y: C) => curry(arg0, arg1, y)
    }

    if (arguments.length === 3) {
      return (z: D) => curry(arg0, arg1, arg2, z)
    }

    return fn(arg0, arg1 as B, arg2 as C, arg3 as D)
  }
}
