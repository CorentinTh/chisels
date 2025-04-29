import type { Dictionary, Expand, Subtract } from './types';

export { injectArguments };

/**
 *  Injects arguments into a set of functions. Useful for DI of repositories, services, etc.
 *
 *  @example
 *  ```typescript
 *  const functions = {
 *   getUser: ({ userId, db }) => db.users.find({ id: userId }),
 *   removeUser: ({ userId, db }) => db.users.remove({ id: userId }),
 *  };
 *
 *  const { getUser, removeUser } = injectArguments(functions, { db });
 *
 *  getUser({ userId: 1 });
 *  removeUser({ userId: 1 });
 * ```
 */
function injectArguments<Functions extends Dictionary<(args: any) => any>, InjectedArgs>(functions: Functions, injectedArgs: InjectedArgs) {
  return Object.fromEntries(Object.entries(functions).map(([key, fn]) => [key, (args: any) => fn({ ...args, ...injectedArgs })])) as {
    [K in keyof Functions]: Expand<Subtract<Parameters<Functions[K]>[0], InjectedArgs>> extends infer Args
      ? keyof Args extends never
        ? () => ReturnType<Functions[K]>
        // eslint-disable-next-line ts/no-empty-object-type
        : {} extends Args
            ? (args?: Args) => ReturnType<Functions[K]>
            : (args: Args) => ReturnType<Functions[K]>
      : never;
  };
}
