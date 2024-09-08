import { describe, expect, test } from 'vitest';
import { formatBytes } from './bytes';

describe('bytes', () => {
  describe('formatBytes', () => {
    test('formats bytes to human readable format', () => {
      expect(formatBytes({ bytes: 0 })).to.eql('0 B');
      expect(formatBytes({ bytes: 1024 })).to.eql('1.00 KiB');
      expect(formatBytes({ bytes: 1024 ** 2 })).to.eql('1.00 MiB');
      expect(formatBytes({ bytes: 8235942 })).to.eql('7.85 MiB');
    });

    test('the amount of decimals can be customized using the decimals option', () => {
      expect(formatBytes({ bytes: 1024, decimals: 0 })).to.eql('1 KiB');
      expect(formatBytes({ bytes: 1024, decimals: 3 })).to.eql('1.000 KiB');
    });

    test('the base can be customized using the base option in order to switch between binary and decimal units', () => {
      expect(formatBytes({ bytes: 1024, base: 1000 })).to.eql('1.02 KB');
      expect(formatBytes({ bytes: 1024, base: 1024 })).to.eql('1.00 KiB');
    });

    test('a custom set of units can be provided using the units option', () => {
      expect(formatBytes({ bytes: 12, units: ['A', 'B', 'C'] })).to.eql('12.00 A');
      expect(formatBytes({ bytes: 11652, units: ['A', 'B', 'C'] })).to.eql('11.38 B');
    });

    test('if no units are provided for the base, an error is thrown', () => {
      expect(() => formatBytes({ bytes: 12, units: [] })).to.throw('No units defined for base 1024');
      expect(() => formatBytes({ bytes: 12, base: 42 as any })).to.throw('No units defined for base 42');
    });
  });
});
