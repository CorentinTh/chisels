# Chisels - Opinionated collection of reusable JS/TS utilities

Opinionated collection of reusable JS/TS utilities.

* Tree-shakable
* Fully tested

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

* Bytes
  * [formatBytes](./src/bytes.ts)

* Safely
  * [safelySync](./src/safely.ts)
  * [safely](./src/safely.ts)

* Types
  * [PartialBy](./src/types.ts)
  * [Expand](./src/types.ts)
  * [Dictionary](./src/types.ts)
  * [DeepPartial](./src/types.ts)
  * [Subtract](./src/types.ts)

* Injection
  * [injectArguments](./src/injection.ts)

<!-- API-DOCS-END -->

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Credits and Acknowledgements

This project is crafted with ❤️ by [Corentin Thomasset](https://corentin.tech).
