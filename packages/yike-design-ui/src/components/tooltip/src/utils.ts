/**
 * @function splitCameCase : 驼峰单词拆分
 * @param str : 需要拆分处理的字符串
 * @returns : 返回拆分后的结果 是一个数组
 */
export function splitCameCase(str: string): string[] {
  const matches = str.match(/[A-Z]?[a-z]+|[0-9]+/g);
  return matches ? matches : [];
}
