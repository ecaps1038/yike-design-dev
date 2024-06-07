export { YikeResolver, matchComponents } from './yike';
import { matchComponents } from './yike';
export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}
function getComponentStyleDir(importName: string) {
  if (['ConfigProvider', 'Icon'].includes(importName)) return undefined;

  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
  return `@yike-design/ui/es/components/${componentDir}/style/css.js`;
}
export function sideEffects(importName: string) {
  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
  console.log(componentDir);
  return `@yike-design/ui/components/${componentDir}/style`;
}

// export function YikeResolver(options = {}) {
//   return {
//     type: 'component',
//     resolve: (name: string) => {
//       if (name.startsWith('Icon')) {
//         return {
//           name,
//           as: name,
//           from: '@yike-design/ui/es/components/svg-icon',
//         };
//       }
//       if (name.startsWith('Yk')) {
//         return {
//           name: name,
//           from: '@yike-design/ui',
//           sideEffects: getComponentStyleDir(name),
//         };
//       }
//     },
//   };
// }

const yikeSrcPath = '@yike-design/ui';

export function YikeDevResolver(compName: string) {
  if (compName.startsWith('Yk')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/index.ts`,
      sideEffects: sideEffects(compName),
    };
  }
  if (compName.startsWith('Icon')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/components/svg-icon`,
    };
  }
}
