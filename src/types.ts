/**
 * Make some properties of T optional
 *
 * @example
 * ```typescript
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 * };
 *
 * type PartialUser = PartialBy<User, 'email' | 'name'>;
 *
 * const user: PartialUser = { id: 1 };
 * ```
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Flatten an object type for better IDE support
 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/**
 * Record<string, T> alias
 *
 * @example
 * ```typescript
 * const dictionary: Dictionary<number> = {
 *   a: 1,
 *   b: 2,
 * };
 * ```
 */
export type Dictionary<T = unknown> = Record<string, T>;

/**
 * Make all properties of T optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Exclude properties of T that are in U
 *
 * @example
 * ```typescript
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 * };
 *
 * type WithId = {
 *   id: number;
 * }
 *
 * type UserWithoutId = Subtract<User, WithId>;
 * ```
 */
export type Subtract<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
