import { isFunction } from 'lodash-es';
import { castError } from './errors';

export { safely, safelySync };

function safelySync<T>(fn: () => T): [T, null] | [null, Error] {
  try {
    return [fn(), null];
  } catch (error) {
    return [null, castError(error)];
  }
}

async function safely<T>(fn: (() => Promise<T> | T) | Promise<T>): Promise<[T, null] | [null, Error]> {
  try {
    const result = isFunction(fn) ? await fn() : await fn;
    return [result, null];
  } catch (error) {
    return [null, castError(error)];
  }
}
