const defaultNamespace = 'yk';

/**
 * 生成BEM格式的css class名称
 * @param namespace
 * @param block
 * @param blockSuffix
 * @param element
 * @param modifier
 */
const toBEM = (
  namespace: string,
  block: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string,
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }

  return cls;
};

export const useNamespace = (block: string) => {
  const b = (blockSuffix?: string) =>
    toBEM(defaultNamespace, block, blockSuffix, '', '');

  const e = (element?: string) =>
    element ? toBEM(defaultNamespace, block, '', element, '') : '';

  const m = (modifier?: string) =>
    modifier ? toBEM(defaultNamespace, block, '', '', modifier) : '';

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? toBEM(defaultNamespace, block, blockSuffix, element, '')
      : '';

  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? toBEM(defaultNamespace, block, blockSuffix, '', modifier)
      : '';

  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? toBEM(defaultNamespace, block, '', element, modifier)
      : '';

  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? toBEM(defaultNamespace, block, blockSuffix, element, modifier)
      : '';

  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `is-${name}` : '';
  };

  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
};
