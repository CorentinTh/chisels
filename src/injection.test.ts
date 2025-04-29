import { describe, expect, test } from 'vitest';
import { injectArguments } from './injection';

describe('injection', () => {
  describe('injectArguments', () => {
    test('the injected dependencies are added to each function arguments', () => {
      const functions = injectArguments(
        {
          foo: ({ a, b }: { a: number; b: number }) => a + b,
          bar: ({ a, c }: { a: number; c: number }) => a + c,
          baz: ({ f }: { f: number }) => f,
          qux: ({ a, c = 2 }: { a: number; c?: number }) => a + c,
        },
        { a: 1, b: 3 },
      );

      expect(Object.keys(functions)).toEqual(['foo', 'bar', 'baz', 'qux']);

      const { foo, bar, baz, qux } = functions;

      expect(foo()).toBe(4);
      expect(bar({ c: 2 })).toBe(3);
      expect(baz({ f: 5 })).toBe(5);

      expect(qux()).toBe(3);
      expect(qux({})).toBe(3);
      expect(qux({ c: 4 })).toBe(5);
    });
  });
});
