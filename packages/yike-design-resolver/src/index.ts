export { YikeResolver, matchComponents } from './yike';
import { matchComponents, YikeResolverOptions } from './yike';
import type { ComponentInfo, ComponentResolver } from './types';
import { isExclude } from './_utils';
export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}
function getComponentStyleDir(
  importName: string,
  importStyle: boolean | 'css' | 'less',
) {
  if (['ConfigProvider', 'Icon'].includes(importName)) return undefined;

  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
  return `@yike-design/ui/components/${componentDir}/style/index.ts`;
}

export function sideEffects(importName: string) {
  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
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

// export function YikeDevResolver(compName: string) {
//   if (compName.startsWith('Yk')) {
//     return {
//       name: compName,
//       from: `${yikeSrcPath}/index.ts`,
//       sideEffects: sideEffects(compName),
//     };
//   }
//   if (compName.startsWith('Icon')) {
//     return {
//       name: compName,
//       from: `${yikeSrcPath}/components/svg-icon`,
//     };
//   }
// }
export function YikeDevResolver(
  options: YikeResolverOptions = {},
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Icon')) {
        const config = {
          name,
          as: name,
          from: '@yike-design/ui/components/svg-icon',
        };
        return config;
      }
      if (name.match(/^Yk[A-Z]/) && !isExclude(name, options.exclude)) {
        const importStyle = options.importStyle ?? 'css';

        const importName = name;
        const config: ComponentInfo = {
          name: importName,
          from: '@yike-design/ui/index.ts',
        };
        if (options.sideEffect !== false)
          config.sideEffects = getComponentStyleDir(importName, importStyle);
        return config;
      }
    },
  };
}
