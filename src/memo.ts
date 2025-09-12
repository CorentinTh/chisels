/**
 * This function takes a function that returns a value and returns a new function that caches the result of the first call. Basically a argument-less memoization.
 *
 * @example
 * ```typescript
 * const getCwd = memoizeOnce(() => process.cwd());
 *
 * // process.cwd() is only called once
 * console.log(getCwd());
 * console.log(getCwd());
 * ```
 */
export function memoizeOnce<T>(value: () => T): () => T {
  let isCalled = false;
  let cache: T | undefined;

  return () => {
    if (!isCalled) {
      isCalled = true;
      cache = value();
    }

    return cache!;
  };
}
