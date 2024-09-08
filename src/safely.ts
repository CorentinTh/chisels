import { isFunction } from 'lodash-es';
import { castError } from './errors';

export { safely, safelySync };

/**
 * Safely executes a function and return a tuple with the result and an error if any.
 *
 * @example
 * ```typescript
 * const [result, error] = safely(myFunction);
 *
 * if (error) {
 *  console.error(error);
 * }
 *
 * console.log(result);
 * ```
 */
function safelySync<T>(fn: () => T): [T, null] | [null, Error] {
  try {
    return [fn(), null];
  } catch (error) {
    return [null, castError(error)];
  }
}

/**
 * Safely executes an async function or promise and return a tuple with the result and an error if any.
 *
 * @example
 * ```typescript
 * const [result, error] = await safely(myFunction);
 *
 * if (error) {
 *  console.error(error);
 * }
 *
 * console.log(result);
 * ```
 */
async function safely<T>(fn: (() => Promise<T> | T) | Promise<T>): Promise<[T, null] | [null, Error]> {
  try {
    const result = isFunction(fn) ? await fn() : await fn;
    return [result, null];
  } catch (error) {
    return [null, castError(error)];
  }
}
