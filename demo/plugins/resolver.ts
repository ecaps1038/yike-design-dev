import { ComponentResolver } from 'unplugin-vue-components/types';
import fs from 'fs';

// 需要分析的文件路径
const from = 'yike-design-ui/component.ts';
const compentPath = '@yike/components';
const fileContent = fs.readFileSync(`../packages/${from}`, 'utf-8');
const compPaths = {};

parseImportStatements(fileContent);

export const YikeDevResolver: ComponentResolver = (compName) => {
  if (compName.startsWith('Yk')) {
    return {
      name: compName,
      from: `${compentPath}/index.ts`,
      sideEffects: sideEffects(`${compentPath}/${compPaths[compName]}`),
    };
  }
  if (compName.startsWith('Icon')) {
    return {
      name: compName,
      from: `${compentPath}/svg-icon/index.ts`,
    };
  }
};

// 提取导入路径和组件名称
function parseImportStatements(content: string) {
  /** @see https://regex101.com/r/jJfLJO/1 */
  const importRegex = /import\s+({[^}]+}|[^{}\n]+)\s+from\s+['"](.+)['"]/g;
  let match: RegExpExecArray;

  while ((match = importRegex.exec(content))) {
    const [, compNames, _compPath] = match;
    const compPath = _compPath.split('/').pop();

    if (compNames.at(0) === '{') {
      compNames
        .replace(/[{\s}]/g, '')
        .split(',')
        .forEach((item) => {
          if (item) compPaths[item] = compPath;
        });
    } else {
      compPaths[compNames.trim()] = compPath;
    }
  }
}

function sideEffects(name: string) {
  return `${name}/style/index`;
}
