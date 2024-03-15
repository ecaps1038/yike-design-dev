export const splitUnit = (v: string) => {
  return Number(v.replace('px', ''));
};
// Refer to arco design
const sizeStyles = [
  'border-width',
  'box-sizing',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'text-indent',
  'text-rendering',
  'text-transform',
  'white-space',
  'overflow-wrap',
  'width',
];

export const getSizeStyles = (styleDeclaration: CSSStyleDeclaration) => {
  const styles: Record<string, any> = {};
  sizeStyles.forEach((item) => {
    styles[item] = styleDeclaration.getPropertyValue(item);
  });
  return styles;
};

// 获取非content高度
export const getOutProp = (computedStyle: CSSStyleDeclaration) => {
  const pt = splitUnit(computedStyle.getPropertyValue('padding-top'));
  const pb = splitUnit(computedStyle.getPropertyValue('padding-bottom'));
  const bw = splitUnit(computedStyle.getPropertyValue('border-width'));
  return { pt, pb, bw };
};
