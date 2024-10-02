import { describe, expect, test } from 'vitest';
import { buildUrl, joinUrlPaths } from './url';

describe('url', () => {
  describe('joinUrlPaths', () => {
    test('it merges url parts and trim slashes', () => {
      expect(joinUrlPaths('/part1/', '/part2/', 'part3', 'part4/')).to.eql('part1/part2/part3/part4');
      expect(joinUrlPaths('/part1/part2/', 'part3', 'part4/')).to.eql('part1/part2/part3/part4');
      expect(joinUrlPaths('/part1/part2/', '/', '/part3/')).to.eql('part1/part2/part3');
      expect(joinUrlPaths('/part1/part2/', '/', '', '/part3/')).to.eql('part1/part2/part3');
      expect(joinUrlPaths('')).to.eql('');
    });

    test('multiple slashes inside a part are preserved', () => {
      expect(joinUrlPaths('/part1//part2/', '/part3/')).to.eql('part1//part2/part3');
    });
  });

  describe('buildUrl', () => {
    test('creates an url string from a base url and optional path, query params and hash', () => {
      expect(buildUrl({ baseUrl: 'https://example.com' })).to.eql('https://example.com/');
      expect(buildUrl({ baseUrl: 'https://example.com', path: '/path' })).to.eql('https://example.com/path');
      expect(buildUrl({ baseUrl: 'https://example.com', path: 'path' })).to.eql('https://example.com/path');
      expect(buildUrl({ baseUrl: 'https://example.com', path: '/path', queryParams: { a: '1', b: '2' } })).to.eql('https://example.com/path?a=1&b=2');
      expect(buildUrl({ baseUrl: 'https://example.com', path: '/path', queryParams: new URLSearchParams('a=1&b=2') })).to.eql('https://example.com/path?a=1&b=2');
      expect(buildUrl({ baseUrl: 'https://example.com', path: '/path', hash: 'hash' })).to.eql('https://example.com/path#hash');
      expect(buildUrl({ baseUrl: 'https://example.com', path: '/path', queryParams: { a: '1', b: '2' }, hash: 'hash' })).to.eql('https://example.com/path?a=1&b=2#hash');
    });
  });
});
