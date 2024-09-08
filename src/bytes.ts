export { formatBytes };

const unitsByBase = {
  1000: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  1024: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
};

function formatBytes({
  bytes,
  decimals = 2,
  base = 1024,
  units = unitsByBase[base],
}: {
  bytes: number;
  decimals?: number;
  base?: 1000 | 1024;
  units?: string[];
}) {
  if (units === undefined || units.length === 0) {
    throw new Error(`No units defined for base ${base}`);
  }

  if (bytes === 0) {
    return `0 ${units[0]}`;
  }

  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1);
  const value = bytes / base ** exponent;

  return `${value.toFixed(decimals)} ${units[exponent]}`;
}
