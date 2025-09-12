export { castError };

/**
 *  Casts an unknown value to an Error.
 *
 *  @example
 *  ```typescript
 *  try {
 *      // ...
 *  } catch (rawError) {
 *    const error = castError(rawError);
 *
 *    // Do something with a proper Error instance
 *  }
 *  ```
 */
function castError(error: unknown): Error {
  return error instanceof Error ? error : new Error(error !== undefined && error !== null ? String(error) : undefined);
}
