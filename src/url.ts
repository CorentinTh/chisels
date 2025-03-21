export { buildUrl, joinUrlPaths };

/**
 * Join URL parts and trim slashes.
 *
 * @example
 * ```typescript
 * const url = joinUrlPaths('/part1/', '/part2/', 'part3', 'part4/');
 *
 * console.log(url); // 'part1/part2/part3/part4'
 * ```
 */
function joinUrlPaths(...parts: string[]): string {
  return parts.map(part => part?.replace(/(^\/|\/$)/g, '')).filter(Boolean).join('/');
}

/**
 * Functional wrapper around URL constructor to build an URL string from a base URL and optional path, query params and hash.
 *
 * @example
 * ```typescript
 * const url = buildUrl({ baseUrl: 'https://example.com', path: 'foo', queryParams: { a: '1', b: '2' }, hash: 'hash' });
 *
 * console.log(url); // 'https://example.com/foo?a=1&b=2#hash'
 * ```
 */
function buildUrl({
  path: pathOrPaths = '',
  baseUrl,
  queryParams,
  hash,
}: {
  path?: string | string[];
  baseUrl: string;
  queryParams?: Record<string, string> | URLSearchParams;
  hash?: string;
}): string {
  const path = Array.isArray(pathOrPaths) ? joinUrlPaths(...pathOrPaths) : pathOrPaths;
  const url = new URL(path, baseUrl);

  if (queryParams) {
    if (queryParams instanceof URLSearchParams) {
      url.search = queryParams.toString();
    } else {
      url.search = new URLSearchParams(queryParams).toString();
    }
  }

  if (hash) {
    url.hash = hash;
  }

  return url.toString();
}
