# Chisels - JS/TS utilities and types

Opinionated collection of reusable JS/TS utilities and types.

* **Tree-shakable ES modules**: Import only what you need
* **Fully tested**: Rigorous unit tests with comprehensive coverage
* **TypeScript support**: Written in TypeScript with full type definitions
* **Lightweight**: Small bundle size
* **Modern**: Written with modern JS/TS syntax
* **Named arguments**: Functions with preferably named arguments

## Installation

```bash
# Using npm
npm install @corentinth/chisels

# Using yarn
yarn add @corentinth/chisels

# Using pnpm
pnpm add @corentinth/chisels
```

## Usage

```ts
// Using ES6 import
import { safely } from '@corentinth/chisels';

// Using CommonJS require
const { safely } = require('@corentinth/chisels');

const [result, error] = safely(mayThrowError);

console.log({ result, error });
```

## API

<!-- API-DOCS-START -->

### `safelySync`

Function - [See source](./src/safely.ts#L43)

Safely executes a function and return a tuple with the result and an error if any.


```typescript
const [result, error] = safelySync(myFunction);

if (error) {
 console.error(error);
}

console.log(result);
```

### `safely`

Function - [See source](./src/safely.ts#L20)

Safely executes an async function or promise and return a tuple with the result and an error if any.


```typescript
const [result, error] = await safely(myFunction);

if (error) {
 console.error(error);
}

console.log(result);
```

### `formatBytes`

Function - [See source](./src/bytes.ts#L18)

Formats a number of bytes into a human-readable string.


```typescript
const formatted = formatBytes({ bytes: 4194304 });

console.log(formatted); // 4 MiB
```

### `castError`

Function - [See source](./src/errors.ts#L19)

Casts an unknown value to an Error.


```typescript
 try {
     // ...
 } catch (rawError) {
   const error = castError(rawError);

   // Do something with a proper Error instance
 }
 ```

### `joinUrlPaths`

Function - [See source](./src/url.ts#L13)

Join URL parts and trim slashes.


```typescript
const url = joinUrlPaths('/part1/', '/part2/', 'part3', 'part4/');

console.log(url); // 'part1/part2/part3/part4'
```

### `buildUrl`

Function - [See source](./src/url.ts#L27)

Functional wrapper around URL constructor to build an URL string from a base URL and optional path, query params and hash.


```typescript
const url = buildUrl({ baseUrl: 'https://example.com', path: 'foo', queryParams: { a: '1', b: '2' }, hash: 'hash' });

console.log(url); // 'https://example.com/foo?a=1&b=2#hash'
```

### `injectArguments`

Function - [See source](./src/injection.ts#L22)

Injects arguments into a set of functions. Useful for DI of repositories, services, etc.


```typescript
 const functions = {
  getUser: ({ userId, db }) => db.users.find({ id: userId }),
  removeUser: ({ userId, db }) => db.users.remove({ id: userId }),
 };

 const { getUser, removeUser } = injectArguments(functions, { db });

 getUser({ userId: 1 });
 removeUser({ userId: 1 });
```

### `PartialBy`

Type alias - [See source](./src/types.ts#L17)

Make some properties of T optional


```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = PartialBy<User, 'email' | 'name'>;

const user: PartialUser = { id: 1 };
```

### `Expand`

Type alias - [See source](./src/types.ts#L22)

Flatten an object type for better IDE support

### `Dictionary`

Type alias - [See source](./src/types.ts#L35)

Record<string, T> alias


```typescript
const dictionary: Dictionary<number> = {
  a: 1,
  b: 2,
};
```

### `DeepPartial`

Type alias - [See source](./src/types.ts#L40)

Make all properties of T optional recursively

### `Subtract`

Type alias - [See source](./src/types.ts#L64)

Exclude properties of T that are in U


```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

type WithId = {
  id: number;
}

type UserWithoutId = Subtract<User, WithId>;
```

<!-- API-DOCS-END -->

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Credits and Acknowledgements

This project is crafted with ❤️ by [Corentin Thomasset](https://corentin.tech).
