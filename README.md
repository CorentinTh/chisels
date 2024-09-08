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

* Bytes
  * [formatBytes](./src/bytes.ts)

* Errors
  * [castError](./src/errors.ts)

* Injection
  * [injectArguments](./src/injection.ts)

* Safely
  * [safely](./src/safely.ts)
  * [safelySync](./src/safely.ts)

* Types
  * [PartialBy](./src/types.ts)
  * [Expand](./src/types.ts)
  * [Dictionary](./src/types.ts)
  * [DeepPartial](./src/types.ts)
  * [Subtract](./src/types.ts)

<!-- API-DOCS-END -->

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Credits and Acknowledgements

This project is crafted with ❤️ by [Corentin Thomasset](https://corentin.tech).
