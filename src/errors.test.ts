import { describe, expect, test } from 'vitest';
import { castError } from './errors';

describe('errors', () => {
  describe('castError', () => {
    test('casts unknown errors to Error instances', () => {
      expect(castError('error')).to.eql(new Error('error'));
      expect(castError(123)).to.eql(new Error('123'));
      expect(castError(null)).to.eql(new Error('Unknown error'));
      expect(castError(undefined)).to.eql(new Error('Unknown error'));
      expect(castError({})).to.eql(new Error('Unknown error'));

      expect(castError(new Error('error'))).to.eql(new Error('error'));
    });

    test('when given an object with a message property, the message is used for the error', () => {
      expect(castError({ message: 'foo' })).to.eql(new Error('foo'));
    });

    test('external properties are assigned to the Error instance', () => {
      const errorWithProps = castError({ message: 'foo', code: 500, detail: 'bar' });

      expect(errorWithProps).to.eql(Object.assign(new Error('foo'), { code: 500, detail: 'bar' }));
      expect(errorWithProps).to.be.instanceOf(Error);
      expect((errorWithProps as Error & Record<string, unknown>).code).to.eql(500);
      expect((errorWithProps as Error & Record<string, unknown>).detail).to.eql('bar');
      expect(errorWithProps.message).to.eql('foo');
    });
  });
});
