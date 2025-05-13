import { matchComponents } from './yike';

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}
export function sideEffects(importName: string) {
  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }

  return `@yike-design/ui/es/components/${componentDir}/style/css.js`;
}

const yikeSrcPath = '@yike-design/ui';

export function YikeDevResolver(compName: string) {
  console.log('Resolving component:', compName);

  if (compName.startsWith('Yk')) {
    const stylePath = sideEffects(compName);
    console.log('Resolved Yk component style path:', stylePath);
    return {
      name: compName,
      from: `${yikeSrcPath}/index.ts`,
      sideEffects: stylePath, // ✅ JS 模块
    };
  }

  if (compName.startsWith('Icon')) {
    console.log(
      'Resolved Icon component style path:',
      `${yikeSrcPath}/components/svg-icon`,
    );
    return {
      name: compName,
      from: `${yikeSrcPath}/components/svg-icon`,
    };
  }

  return null;
}

export function YikeResolver(compName: string) {
  console.log('Resolving component:', compName);

  if (compName.startsWith('Yk')) {
    const stylePath = sideEffects(compName);
    console.log('Resolved Yk component style path:', stylePath);
    return {
      name: compName,
      from: '@yike-design/ui/es',
      sideEffects: stylePath, // ✅ JS 模块
    };
  }

  if (compName.startsWith('Icon')) {
    console.log(
      'Resolved Icon component style path:',
      `${yikeSrcPath}/es/components/svg-icon`,
    );
    return {
      name: compName,
      from: `${yikeSrcPath}/es/components/svg-icon`,
    };
  }

  return null;
}
