export type Mod = string | { [key: string]: any };
export type Mods = Mod | Mod[];

// yk-message -> YkMessage
function dashToCamelCase(str) {
  return str
    .replace(/-([a-z])/g, function (match, letter) {
      return letter.toUpperCase();
    })
    .replace(/^(.)/, function (match, letter) {
      return letter.toUpperCase();
    });
}

function genBem(name: string, mods?: Mods): string {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }

  if (Array.isArray(mods)) {
    return (<Mod[]>mods).reduce<string>(
      (ret: any, item: any) => ret + genBem(name, item),
      '',
    );
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name, key) : ''),
    '',
  );
}

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? `${name}__${el}` : name;

    return `${el}${genBem(el, mods)}`;
  };
}

/**
 * 命名空间
 *
 * @export
 * @param {string} name
 * @return {[]}
 *    arr[0]: 组件名: yk-message
 *    arr[1]: bem() 方法 @see createBEM
 */
export function createNamespace(name: string, flag = 'yk-') {
  const prefixedName = `${flag}${name}`;
  const nameOption = dashToCamelCase(prefixedName);
  return [nameOption, createBEM(prefixedName)] as const;
}
