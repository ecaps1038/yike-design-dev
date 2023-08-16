const toUpperCase = (_m: any, p1: string) => p1.toLocaleUpperCase();

/**
 * Converts a string to kebab-case.
 * @example 'IconAlarmFill' -> 'icon-alarm-fill'
 * @param {string} str - The input string to be converted.
 */
export function toKebabCase(str: string) {
  return str.replace(/[A-Z]+/g, (match, offset) => {
    return `${offset > 0 ? '-' : ''}${match.toLocaleLowerCase()}`;
  });
}

/**
 * Converts a string to PascalCase.
 * @example 'icon-alarm-fill' -> 'IconAlarmFill'
 * @param {string} str - The input string to be converted.
 */
export function toPascalCase(str: string) {
  const carry = str.replace(/^(.)/, toUpperCase);
  return carry.replace(/-(.)/g, toUpperCase);
}
