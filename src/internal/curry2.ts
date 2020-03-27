export function curry2<A, B, C>(fn: (arg0: A, arg1: B) => C) {
  return function curry(arg0: A, arg1?: B) {
    if (arguments.length === 1) {
      return (arg: B) => curry(arg0, arg)
    }

    return fn(arg0, arg1 as B)
  }
}
