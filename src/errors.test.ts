/* eslint-disable unicorn/error-message */
import { describe, expect, test } from 'vitest';
import { castError } from './errors';

describe('errors', () => {
  describe('castError', () => {
    test('casts unknown errors to Error instances', () => {
      expect(castError('error')).to.eql(new Error('error'));
      expect(castError(123)).to.eql(new Error('123'));
      expect(castError(null)).to.eql(new Error());
      expect(castError(undefined)).to.eql(new Error());

      expect(castError(new Error('error'))).to.eql(new Error('error'));
    });
  });
});
