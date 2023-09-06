import fs from 'fs';

const entry = '../packages/yike-design-ui/src/index.ts';
const fileContent = fs.readFileSync(entry, 'utf-8');
const yikeSrcPath = '@yike-design/ui/src';
const compPaths = {};

parseImportStatements(fileContent);

export default function YikeDevResolver(compName: string) {
  if (compName.startsWith('Yk')) {
    return {
      name: compName,
      from: yikeSrcPath,
      sideEffects: sideEffects(compPaths[compName]),
    };
  }
  if (compName.startsWith('Icon')) {
    return {
      name: compName,
      from: yikeSrcPath,
    };
  }
}

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
  return `@yike-design/ui/src/components/${name}/style`;
}
