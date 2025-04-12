import { describe, expect, test } from 'vitest';
import { memoizeOnce } from './memo';

describe('memo', () => {
  describe('memoizeOnce', () => {
    test('the provided function is evaluated once, at the first call, and the result is cached', () => {
      let counter = 0;

      const fn = memoizeOnce(() => ++counter);

      expect(fn()).to.eql(1);
      expect(fn()).to.eql(1);
      expect(counter).to.eql(1);
    });

    test('event if the function returns undefined or falsy value, it is still cached', () => {
      let counter = 0;

      const fn = memoizeOnce(() => {
        counter++;
        return undefined;
      });

      expect(fn()).to.eql(undefined);
      expect(fn()).to.eql(undefined);
      expect(counter).to.eql(1);
    });
  });
});
