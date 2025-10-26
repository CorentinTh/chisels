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
  if (error instanceof Error) {
    return error;
  }

  if (error === null || error === undefined) {
    return new Error('Unknown error');
  }

  const isObject = typeof error === 'object';

  if (isObject) {
    return Object.assign(new Error('Unknown error'), error);
  }

  return new Error(String(error));
}
