import { isError } from 'lodash-es';

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
  return isError(error) ? error : new Error(String(error));
}
